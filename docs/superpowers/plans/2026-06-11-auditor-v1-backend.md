# Auditor v1 — Plan A (Backend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Backbone Supabase (tablas + RLS) + motor de scoring determinista (TDD) + Edge Function `generate-audit` con narrativa Claude y supervisión automática — backend completo y testeable del Agente Auditor v1, sin UI.

**Architecture:** Monorepo: `supabase/` en raíz (migraciones SQL + Edge Functions Deno). El scoring es código puro TypeScript en `supabase/functions/_shared/` con tests Deno. La Edge Function orquesta los 5 pasos (carga → scoring → Claude → supervisión → registro) con dependencias inyectadas para testear con Claude mockeado. Claude vía SDK oficial `@anthropic-ai/sdk` (npm: en Deno): **Opus 4.8** narrativa (decisión del usuario, ~6-7 cént/auditoría), **Haiku 4.5** check de supervisión.

**Tech Stack:** Supabase (Postgres + RLS + Edge Functions/Deno) · Anthropic API (`claude-opus-4-8` + `claude-haiku-4-5`, structured outputs) · Deno test · pgTAP (tests RLS).

**Contexto:** Spec aprobada `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`. Accesos: `docs/bloques/2-auditor/referencias/auditor-agente-accesos.md`. Proyecto Supabase: `kdernwxajzzrriolnnmq` (MCP conectado). El Plan B (dashboard Next + informe público `/r/[slug]`) se escribirá cuando este backend funcione.

**Al aprobar:** guardar este plan en `docs/superpowers/plans/2026-06-11-auditor-v1-backend.md` y actualizar `docs/bloques/2-auditor/ESTADO.md`.

---

## Estructura de archivos

```
supabase/
  config.toml                          (supabase init)
  migrations/
    20260611000001_schema.sql          (tablas + índices)
    20260611000002_rls.sql             (políticas RLS + get_public_audit)
  tests/
    rls.test.sql                       (pgTAP)
  functions/
    _shared/
      scoring/
        types.ts                       (PresenceData, Subscores, pesos)
        rubric.ts                      (7 scorers + computeOverall)
        rubric.test.ts
      llm.ts                           (cliente Anthropic: narrativa Opus 4.8)
      llm.test.ts
      supervisor.ts                    (reglas deterministas + check Haiku)
      supervisor.test.ts
    generate-audit/
      index.ts                         (handler con deps inyectadas)
      handler.test.ts
docs/bloques/2-auditor/rubrica.md      (qué comprueba script vs modelo)
```

---

### Task 1: Inicializar estructura Supabase

**Files:**
- Create: `supabase/config.toml` (vía CLI)

- [ ] **Step 1: Inicializar proyecto Supabase local**

Run: `npx supabase init` (en la raíz del repo)
Expected: crea `supabase/config.toml`. Si pregunta por Deno settings para VS Code, responder `y`.

- [ ] **Step 2: Añadir artefactos generados al gitignore si no lo están**

Verificar que `.gitignore` (crear si no existe) contiene:
```
node_modules/
.env
supabase/.temp/
```

- [ ] **Step 3: Commit**

```bash
git add supabase/config.toml .gitignore
git commit -m "chore: init supabase project structure"
```

---

### Task 2: Migración de esquema (4 tablas)

**Files:**
- Create: `supabase/migrations/20260611000001_schema.sql`

- [ ] **Step 1: Escribir la migración de esquema**

```sql
-- Auditor v1 schema: profiles, clients, audits, agent_runs
-- Spec: docs/superpowers/specs/2026-06-08-auditor-v1-design.md §5

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  full_name text,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  city text,
  contact jsonb not null default '{}'::jsonb,
  website_url text,
  status text not null default 'prospect' check (status in ('prospect','active','churned')),
  source text not null default 'manual' check (source in ('manual','maps','outreach')),
  presence_data jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.audits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  version int not null default 1,
  status text not null default 'draft' check (status in ('draft','approved','sent')),
  overall_score int check (overall_score between 0 and 100),
  result jsonb not null default '{}'::jsonb,
  llm_draft jsonb,
  supervisor_flags jsonb not null default '[]'::jsonb,
  share_slug text unique not null default encode(gen_random_bytes(9), 'base64url'),
  approved_by uuid references public.profiles (id),
  approved_at timestamptz,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent text not null,
  client_id uuid references public.clients (id) on delete set null,
  audit_id uuid references public.audits (id) on delete set null,
  status text not null check (status in ('ok','error')),
  input jsonb not null default '{}'::jsonb,
  tokens_in int not null default 0,
  tokens_out int not null default 0,
  cost numeric(10,6) not null default 0,
  duration_ms int not null default 0,
  error text,
  created_at timestamptz not null default now()
);

create index audits_client_id_idx on public.audits (client_id);
create index audits_share_slug_idx on public.audits (share_slug);
create index agent_runs_agent_created_idx on public.agent_runs (agent, created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger audits_updated_at before update on public.audits
  for each row execute function public.set_updated_at();
```

- [ ] **Step 2: Aplicar la migración al proyecto remoto**

Vía MCP `supabase` → `apply_migration` con nombre `schema` y el SQL anterior. (Alternativa CLI: `npx supabase link --project-ref kdernwxajzzrriolnnmq && npx supabase db push`.)
Expected: las 4 tablas existen. Verificar con MCP `list_tables`.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260611000001_schema.sql
git commit -m "feat: auditor v1 schema (profiles, clients, audits, agent_runs)"
```

---

### Task 3: Migración RLS + `get_public_audit`

**Files:**
- Create: `supabase/migrations/20260611000002_rls.sql`

- [ ] **Step 1: Escribir la migración RLS**

```sql
-- RLS: admins acceso total; público solo vía get_public_audit (security definer)
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.audits enable row level security;
alter table public.agent_runs enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "admins read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

create policy "admins all clients" on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins all audits" on public.audits
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins all agent_runs" on public.agent_runs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Informe público: SOLO approved/sent y campos saneados (sin llm_draft ni flags)
create or replace function public.get_public_audit(slug text)
returns table (
  client_name text,
  client_category text,
  client_city text,
  overall_score int,
  result jsonb,
  approved_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select c.name, c.category, c.city, a.overall_score, a.result, a.approved_at
  from public.audits a
  join public.clients c on c.id = a.client_id
  where a.share_slug = slug and a.status in ('approved','sent');
$$;

grant execute on function public.get_public_audit(text) to anon, authenticated;
```

- [ ] **Step 2: Aplicar vía MCP `apply_migration` (nombre `rls`)**

Expected: MCP `get_advisors` (security) sin avisos de "RLS disabled".

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260611000002_rls.sql
git commit -m "feat: RLS policies + get_public_audit security-definer function"
```

---

### Task 4: Tests de RLS (pgTAP)

**Files:**
- Create: `supabase/tests/rls.test.sql`

- [ ] **Step 1: Escribir tests pgTAP**

```sql
begin;
create extension if not exists pgtap with schema extensions;
select plan(4);

-- 1. anon no lee clients
set local role anon;
select is_empty('select * from public.clients', 'anon cannot read clients');

-- 2. anon no lee audits
select is_empty('select * from public.audits', 'anon cannot read audits');

-- 3. get_public_audit no devuelve borradores
select is_empty(
  $$select * from public.get_public_audit('slug-inexistente')$$,
  'get_public_audit returns nothing for unknown/draft slug'
);

-- 4. usuario autenticado SIN perfil admin no lee clients
set local role authenticated;
set local request.jwt.claims to '{"sub":"00000000-0000-0000-0000-000000000099","role":"authenticated"}';
select is_empty('select * from public.clients', 'non-admin authenticated cannot read clients');

select * from finish();
rollback;
```

- [ ] **Step 2: Ejecutar tests**

Requiere stack local: `npx supabase start` (Docker) y luego `npx supabase test db`.
Expected: `4/4 tests passed`. *(Si Docker no está disponible en la máquina, marcar el paso como verificación diferida y validar las políticas manualmente vía MCP `execute_sql` con `set role anon`.)*

- [ ] **Step 3: Commit**

```bash
git add supabase/tests/rls.test.sql
git commit -m "test: RLS policies via pgTAP"
```

---

### Task 5: Tipos y pesos del motor de scoring

**Files:**
- Create: `supabase/functions/_shared/scoring/types.ts`

- [ ] **Step 1: Escribir tipos y constantes**

```ts
// Datos manuales de presencia digital (spec §6). Todo opcional:
// campo ausente => dimensión "datos insuficientes" (null), nunca 0 falso.
export interface PresenceData {
  gbp?: {
    has_hours?: boolean;
    photos_count?: number;
    has_category?: boolean;
    has_description?: boolean;
    has_phone?: boolean;
  };
  reviews?: {
    count?: number;
    avg_rating?: number; // 1-5
    last_review_months_ago?: number;
  };
  maps_visibility?: {
    position?: number; // posición percibida 1..N vs competidores
  };
  opportunity?: {
    search_volume?: "low" | "medium" | "high"; // volumen estimado del sector
    competitors_with_web?: number;
  };
  nap?: {
    consistent_listings?: number;
    total_listings?: number;
  };
  social?: {
    profiles_count?: number;
    active?: boolean;
    has_contact_link?: boolean;
  };
  local_seo?: {
    appears_for_keywords?: number;
    keywords_checked?: number;
  };
}

export type DimensionKey =
  | "gbp" | "reviews" | "maps_visibility" | "opportunity"
  | "nap" | "social" | "local_seo";

// Pesos v1 (spec §6) — constantes en código, ajustables vía CHANGELOG del bloque
export const WEIGHTS: Record<DimensionKey, number> = {
  gbp: 0.20,
  reviews: 0.20,
  maps_visibility: 0.15,
  opportunity: 0.25,
  nap: 0.10,
  social: 0.05,
  local_seo: 0.05,
};

// null = datos insuficientes (se excluye del peso y se renormaliza)
export type Subscores = Record<DimensionKey, number | null>;

export interface ScoringResult {
  subscores: Subscores;
  overall: number | null; // null si TODAS las dimensiones son insuficientes
  insufficient: DimensionKey[];
}
```

- [ ] **Step 2: Commit**

```bash
git add supabase/functions/_shared/scoring/types.ts
git commit -m "feat: scoring types and dimension weights"
```

---

### Task 6: Rúbrica de scoring (TDD)

**Files:**
- Create: `supabase/functions/_shared/scoring/rubric.test.ts`
- Create: `supabase/functions/_shared/scoring/rubric.ts`

- [ ] **Step 1: Escribir tests que fallan**

```ts
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { computeScoring, scoreGbp, scoreReviews, scoreNap } from "./rubric.ts";

Deno.test("scoreGbp: perfil completo = 100", () => {
  assertEquals(scoreGbp({
    has_hours: true, photos_count: 5, has_category: true,
    has_description: true, has_phone: true,
  }), 100);
});

Deno.test("scoreGbp: sin datos => null (datos insuficientes)", () => {
  assertEquals(scoreGbp(undefined), null);
});

Deno.test("scoreGbp: 2 de 5 señales = 40", () => {
  assertEquals(scoreGbp({ has_hours: true, has_phone: true }), 40);
});

Deno.test("scoreReviews: muchas reseñas, nota alta, recientes => alto", () => {
  const s = scoreReviews({ count: 60, avg_rating: 4.8, last_review_months_ago: 1 });
  assertEquals(s !== null && s >= 90, true);
});

Deno.test("scoreReviews: sin datos => null", () => {
  assertEquals(scoreReviews(undefined), null);
});

Deno.test("scoreNap: 3 de 4 listados coherentes = 75", () => {
  assertEquals(scoreNap({ consistent_listings: 3, total_listings: 4 }), 75);
});

Deno.test("computeScoring: dimensión faltante se excluye y renormaliza", () => {
  // Solo gbp (peso .20) y reviews (peso .20) presentes, ambos = 100
  const r = computeScoring({
    gbp: { has_hours: true, photos_count: 5, has_category: true, has_description: true, has_phone: true },
    reviews: { count: 60, avg_rating: 5, last_review_months_ago: 1 },
  });
  assertEquals(r.subscores.nap, null);
  assertEquals(r.insufficient.includes("nap"), true);
  // renormalizado: (100*.2 + 100*.2) / (.2+.2) = 100, no 40
  assertAlmostEquals(r.overall!, 100, 1);
});

Deno.test("computeScoring: sin ningún dato => overall null", () => {
  const r = computeScoring({});
  assertEquals(r.overall, null);
  assertEquals(r.insufficient.length, 7);
});
```

- [ ] **Step 2: Ejecutar y verificar que fallan**

Run: `deno test supabase/functions/_shared/scoring/rubric.test.ts`
Expected: FAIL — `Module not found "rubric.ts"`.

- [ ] **Step 3: Implementar la rúbrica**

```ts
import { type DimensionKey, type PresenceData, type ScoringResult, type Subscores, WEIGHTS } from "./types.ts";

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function scoreGbp(d: PresenceData["gbp"]): number | null {
  if (!d || Object.keys(d).length === 0) return null;
  const signals = [
    d.has_hours === true,
    (d.photos_count ?? 0) >= 3,
    d.has_category === true,
    d.has_description === true,
    d.has_phone === true,
  ];
  return clamp((signals.filter(Boolean).length / signals.length) * 100);
}

export function scoreReviews(d: PresenceData["reviews"]): number | null {
  if (!d || d.count === undefined) return null;
  const volume = Math.min(d.count, 50) / 50 * 50;          // hasta 50 pts
  const rating = d.avg_rating ? ((d.avg_rating - 1) / 4) * 30 : 0; // hasta 30 pts
  const months = d.last_review_months_ago;
  const recency = months === undefined ? 0 : months <= 3 ? 20 : months <= 12 ? 10 : 0;
  return clamp(volume + rating + recency);
}

export function scoreMaps(d: PresenceData["maps_visibility"]): number | null {
  if (!d || d.position === undefined) return null;
  return clamp(100 - (d.position - 1) * 15); // pos 1=100, 2=85, ... 7+=0
}

export function scoreOpportunity(d: PresenceData["opportunity"]): number | null {
  // Negocio SIN web: a mayor volumen de búsqueda del sector, mayor pérdida => menor score
  if (!d || d.search_volume === undefined) return null;
  const base = { low: 60, medium: 30, high: 10 }[d.search_volume];
  const pressure = Math.min(d.competitors_with_web ?? 0, 5) * 2; // competencia con web agrava
  return clamp(base - pressure);
}

export function scoreNap(d: PresenceData["nap"]): number | null {
  if (!d || !d.total_listings) return null;
  return clamp(((d.consistent_listings ?? 0) / d.total_listings) * 100);
}

export function scoreSocial(d: PresenceData["social"]): number | null {
  if (!d || d.profiles_count === undefined) return null;
  let s = d.profiles_count > 0 ? 40 : 0;
  if (d.active) s += 40;
  if (d.has_contact_link) s += 20;
  return clamp(s);
}

export function scoreLocalSeo(d: PresenceData["local_seo"]): number | null {
  if (!d || !d.keywords_checked) return null;
  return clamp(((d.appears_for_keywords ?? 0) / d.keywords_checked) * 100);
}

const SCORERS: Record<DimensionKey, (p: PresenceData) => number | null> = {
  gbp: (p) => scoreGbp(p.gbp),
  reviews: (p) => scoreReviews(p.reviews),
  maps_visibility: (p) => scoreMaps(p.maps_visibility),
  opportunity: (p) => scoreOpportunity(p.opportunity),
  nap: (p) => scoreNap(p.nap),
  social: (p) => scoreSocial(p.social),
  local_seo: (p) => scoreLocalSeo(p.local_seo),
};

export function computeScoring(presence: PresenceData): ScoringResult {
  const subscores = {} as Subscores;
  const insufficient: DimensionKey[] = [];
  let weighted = 0;
  let totalWeight = 0;

  for (const key of Object.keys(SCORERS) as DimensionKey[]) {
    const s = SCORERS[key](presence);
    subscores[key] = s;
    if (s === null) {
      insufficient.push(key);
    } else {
      weighted += s * WEIGHTS[key];
      totalWeight += WEIGHTS[key];
    }
  }
  return {
    subscores,
    overall: totalWeight > 0 ? clamp(weighted / totalWeight) : null,
    insufficient,
  };
}
```

- [ ] **Step 4: Ejecutar tests y verificar que pasan**

Run: `deno test supabase/functions/_shared/scoring/rubric.test.ts`
Expected: `ok | 8 passed`.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/_shared/scoring/
git commit -m "feat: deterministic scoring rubric with renormalization (TDD)"
```

---

### Task 7: Cliente LLM — narrativa con Opus 4.8 (structured output)

**Files:**
- Create: `supabase/functions/_shared/llm.ts`
- Create: `supabase/functions/_shared/llm.test.ts`

- [ ] **Step 1: Escribir test con cliente mockeado (falla)**

```ts
import { assertEquals } from "jsr:@std/assert";
import { generateNarrative, NARRATIVE_SCHEMA, type NarrativeClient } from "./llm.ts";

const FAKE_NARRATIVE = {
  executive_summary: "Resumen ejecutivo de prueba.",
  findings: [{ dimension: "gbp", finding: "Perfil incompleto.", severity: "high" }],
  recommendations: [
    { priority: 1, action: "Completar perfil de Google Business", impact: "Más visibilidad" },
  ],
};

const fakeClient: NarrativeClient = {
  // deno-lint-ignore require-await
  create: async (_params) => ({
    content: [{ type: "text", text: JSON.stringify(FAKE_NARRATIVE) }],
    stop_reason: "end_turn",
    usage: { input_tokens: 1000, output_tokens: 500 },
  }),
};

Deno.test("generateNarrative: parsea JSON y devuelve usage", async () => {
  const r = await generateNarrative(fakeClient, {
    clientName: "Mudanzas Roy", category: "mudanzas", city: "Madrid",
    presence: {}, subscores: { gbp: 40 } as never, overall: 40, insufficient: [],
  });
  assertEquals(r.narrative.executive_summary, "Resumen ejecutivo de prueba.");
  assertEquals(r.usage.input_tokens, 1000);
});

Deno.test("NARRATIVE_SCHEMA exige los 3 campos", () => {
  assertEquals(NARRATIVE_SCHEMA.required, ["executive_summary", "findings", "recommendations"]);
});
```

- [ ] **Step 2: Ejecutar y verificar que falla**

Run: `deno test supabase/functions/_shared/llm.test.ts`
Expected: FAIL — `Module not found "llm.ts"`.

- [ ] **Step 3: Implementar el cliente**

```ts
import Anthropic from "npm:@anthropic-ai/sdk";
import type { DimensionKey, PresenceData, Subscores } from "./scoring/types.ts";

export const NARRATIVE_MODEL = "claude-opus-4-8";

export const NARRATIVE_SCHEMA = {
  type: "object",
  properties: {
    executive_summary: { type: "string" },
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          dimension: { type: "string" },
          finding: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
        },
        required: ["dimension", "finding", "severity"],
        additionalProperties: false,
      },
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          priority: { type: "integer" },
          action: { type: "string" },
          impact: { type: "string" },
        },
        required: ["priority", "action", "impact"],
        additionalProperties: false,
      },
    },
  },
  required: ["executive_summary", "findings", "recommendations"],
  additionalProperties: false,
} as const;

export interface Narrative {
  executive_summary: string;
  findings: { dimension: string; finding: string; severity: string }[];
  recommendations: { priority: number; action: string; impact: string }[];
}

export interface NarrativeInput {
  clientName: string;
  category: string | null;
  city: string | null;
  presence: PresenceData;
  subscores: Subscores;
  overall: number | null;
  insufficient: DimensionKey[];
}

// Interfaz mínima mockeable: solo lo que usamos del SDK
export interface NarrativeClient {
  create(params: Record<string, unknown>): Promise<{
    content: { type: string; text?: string }[];
    stop_reason: string | null;
    usage: { input_tokens: number; output_tokens: number };
  }>;
}

export function realClient(apiKey: string): NarrativeClient {
  const anthropic = new Anthropic({ apiKey });
  return {
    create: (params) =>
      anthropic.messages.create(params as never) as never,
  };
}

const SYSTEM = `Eres el analista senior de EVOLink, agencia web. Redactas auditorías de presencia digital para negocios locales SIN página web, con tono profesional y persuasivo (es un gancho de venta honesto).
REGLAS ESTRICTAS:
- Los números (scores) los calcula el sistema: EXPLÍCALOS, jamás inventes métricas ni cifras nuevas.
- Si una dimensión está marcada como "datos insuficientes", dilo tal cual; no especules.
- Escribe en español. Recomendaciones accionables, priorizadas, máximo 5.`;

export async function generateNarrative(
  client: NarrativeClient,
  input: NarrativeInput,
): Promise<{ narrative: Narrative; usage: { input_tokens: number; output_tokens: number } }> {
  const res = await client.create({
    model: NARRATIVE_MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: NARRATIVE_SCHEMA } },
    messages: [{
      role: "user",
      content: `Negocio: ${input.clientName} (${input.category ?? "sin categoría"}, ${input.city ?? "sin ciudad"})
Datos de presencia (recogidos a mano): ${JSON.stringify(input.presence)}
Subscores deterministas (0-100, null = datos insuficientes): ${JSON.stringify(input.subscores)}
Score global: ${input.overall ?? "datos insuficientes"}
Dimensiones sin datos: ${input.insufficient.join(", ") || "ninguna"}

Redacta la auditoría: resumen ejecutivo, un hallazgo por dimensión con datos, y recomendaciones priorizadas.`,
    }],
  });
  if (res.stop_reason === "refusal") {
    throw new Error("Claude refused the narrative request");
  }
  const text = res.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("No text block in Claude response");
  return { narrative: JSON.parse(text) as Narrative, usage: res.usage };
}
```

- [ ] **Step 4: Ejecutar tests y verificar que pasan**

Run: `deno test supabase/functions/_shared/llm.test.ts`
Expected: `ok | 2 passed`.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/_shared/llm.ts supabase/functions/_shared/llm.test.ts
git commit -m "feat: Claude narrative client with structured output (Opus 4.8)"
```

---

### Task 8: Supervisión automática (reglas + check Haiku)

**Files:**
- Create: `supabase/functions/_shared/supervisor.ts`
- Create: `supabase/functions/_shared/supervisor.test.ts`

- [ ] **Step 1: Escribir tests de las reglas deterministas (fallan)**

```ts
import { assertEquals } from "jsr:@std/assert";
import { ruleChecks } from "./supervisor.ts";
import type { Narrative } from "./llm.ts";

const goodNarrative: Narrative = {
  executive_summary: "Un resumen ejecutivo suficientemente largo para pasar la validación de longitud mínima del supervisor automático.",
  findings: [
    { dimension: "gbp", finding: "x", severity: "high" },
    { dimension: "reviews", finding: "x", severity: "low" },
  ],
  recommendations: [
    { priority: 1, action: "a", impact: "i" },
    { priority: 2, action: "b", impact: "i" },
    { priority: 3, action: "c", impact: "i" },
  ],
};

Deno.test("ruleChecks: narrativa correcta => sin flags", () => {
  const flags = ruleChecks(goodNarrative, ["gbp", "reviews"], []);
  assertEquals(flags, []);
});

Deno.test("ruleChecks: dimensión con score sin hallazgo => flag", () => {
  const flags = ruleChecks(goodNarrative, ["gbp", "reviews", "nap"], []);
  assertEquals(flags.some((f) => f.includes("nap")), true);
});

Deno.test("ruleChecks: hallazgo sobre dimensión insuficiente => flag", () => {
  const flags = ruleChecks(goodNarrative, ["gbp"], ["reviews"]);
  assertEquals(flags.some((f) => f.includes("reviews")), true);
});

Deno.test("ruleChecks: menos de 3 recomendaciones => flag", () => {
  const n = { ...goodNarrative, recommendations: goodNarrative.recommendations.slice(0, 1) };
  const flags = ruleChecks(n, ["gbp", "reviews"], []);
  assertEquals(flags.some((f) => f.includes("recomendaciones")), true);
});
```

- [ ] **Step 2: Ejecutar y verificar que fallan**

Run: `deno test supabase/functions/_shared/supervisor.test.ts`
Expected: FAIL — `Module not found "supervisor.ts"`.

- [ ] **Step 3: Implementar supervisor**

```ts
import type { Narrative, NarrativeClient } from "./llm.ts";
import type { DimensionKey } from "./scoring/types.ts";

export const SUPERVISOR_MODEL = "claude-haiku-4-5";

// Determinista primero: lo que un script puede comprobar, lo comprueba un script.
export function ruleChecks(
  narrative: Narrative,
  scoredDimensions: string[],
  insufficient: string[],
): string[] {
  const flags: string[] = [];
  const covered = new Set(narrative.findings.map((f) => f.dimension));
  for (const d of scoredDimensions) {
    if (!covered.has(d)) flags.push(`Falta hallazgo para la dimensión con score: ${d}`);
  }
  for (const f of narrative.findings) {
    if (insufficient.includes(f.dimension)) {
      flags.push(`Hallazgo sobre dimensión sin datos (${f.dimension}): riesgo de invención`);
    }
  }
  if (narrative.executive_summary.length < 80) flags.push("Resumen ejecutivo demasiado corto");
  if (narrative.recommendations.length < 3) flags.push("Menos de 3 recomendaciones");
  return flags;
}

// Juicio del modelo: coherencia score↔texto y afirmaciones inventadas (check breve, Haiku)
export async function llmCheck(
  client: NarrativeClient,
  narrative: Narrative,
  subscores: Record<string, number | null>,
): Promise<{ flags: string[]; usage: { input_tokens: number; output_tokens: number } }> {
  const res = await client.create({
    model: SUPERVISOR_MODEL,
    max_tokens: 1024,
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: { flags: { type: "array", items: { type: "string" } } },
          required: ["flags"],
          additionalProperties: false,
        },
      },
    },
    messages: [{
      role: "user",
      content: `Revisa esta auditoría. Devuelve flags SOLO si: (1) el texto contradice los subscores, (2) afirma cifras que no están en los datos, (3) el tono no es profesional. Si todo está bien, flags = [].
Subscores: ${JSON.stringify(subscores)}
Narrativa: ${JSON.stringify(narrative)}`,
    }],
  });
  const text = res.content.find((b) => b.type === "text")?.text ?? '{"flags":[]}';
  return { flags: (JSON.parse(text) as { flags: string[] }).flags, usage: res.usage };
}

export async function supervise(
  client: NarrativeClient,
  narrative: Narrative,
  subscores: Record<DimensionKey, number | null>,
  insufficient: string[],
): Promise<{ flags: string[]; usage: { input_tokens: number; output_tokens: number } }> {
  const scored = Object.entries(subscores).filter(([, v]) => v !== null).map(([k]) => k);
  const deterministic = ruleChecks(narrative, scored, insufficient);
  const llm = await llmCheck(client, narrative, subscores);
  return { flags: [...deterministic, ...llm.flags], usage: llm.usage };
}
```

- [ ] **Step 4: Ejecutar tests y verificar que pasan**

Run: `deno test supabase/functions/_shared/supervisor.test.ts`
Expected: `ok | 4 passed`.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/_shared/supervisor.ts supabase/functions/_shared/supervisor.test.ts
git commit -m "feat: supervision pass (deterministic rules + Haiku check)"
```

---

### Task 9: Edge Function `generate-audit`

**Files:**
- Create: `supabase/functions/generate-audit/index.ts`
- Create: `supabase/functions/generate-audit/handler.test.ts`

- [ ] **Step 1: Escribir test del handler con deps mockeadas (falla)**

```ts
import { assertEquals } from "jsr:@std/assert";
import { handleGenerateAudit, type Deps } from "./index.ts";

function makeDeps(overrides: Partial<Deps> = {}): { deps: Deps; writes: Record<string, unknown>[] } {
  const writes: Record<string, unknown>[] = [];
  const deps: Deps = {
    loadClient: () => Promise.resolve({
      id: "c1", name: "Mudanzas Roy", category: "mudanzas", city: "Madrid",
      presence_data: {
        gbp: { has_hours: true, photos_count: 5, has_category: true, has_description: true, has_phone: true },
      },
    }),
    insertAudit: (row) => { writes.push({ table: "audits", ...row }); return Promise.resolve("a1"); },
    insertRun: (row) => { writes.push({ table: "agent_runs", ...row }); return Promise.resolve(); },
    llm: {
      create: () => Promise.resolve({
        content: [{ type: "text", text: JSON.stringify({
          executive_summary: "Resumen ejecutivo lo bastante largo para pasar todas las reglas del supervisor sin generar flags.",
          findings: [{ dimension: "gbp", finding: "ok", severity: "low" }],
          recommendations: [
            { priority: 1, action: "a", impact: "i" },
            { priority: 2, action: "b", impact: "i" },
            { priority: 3, action: "c", impact: "i" },
          ],
        }) }],
        stop_reason: "end_turn",
        usage: { input_tokens: 100, output_tokens: 50 },
      }),
    },
    ...overrides,
  };
  return { deps, writes };
}

Deno.test("happy path: crea audit draft + agent_run ok", async () => {
  const { deps, writes } = makeDeps();
  const out = await handleGenerateAudit({ client_id: "c1" }, deps);
  assertEquals(out.status, "draft");
  const audit = writes.find((w) => w.table === "audits")!;
  assertEquals(audit.status, "draft");
  assertEquals(typeof audit.overall_score, "number");
  const run = writes.find((w) => w.table === "agent_runs")!;
  assertEquals(run.status, "ok");
  assertEquals(run.agent, "auditor");
});

Deno.test("fallo de Claude: guarda subscores deterministas + run error", async () => {
  const { deps, writes } = makeDeps({
    llm: { create: () => Promise.reject(new Error("timeout")) },
  });
  const out = await handleGenerateAudit({ client_id: "c1" }, deps);
  assertEquals(out.status, "draft");
  assertEquals(out.narrative_error, true);
  const audit = writes.find((w) => w.table === "audits")!;
  // los números deterministas se guardan igual (spec §9)
  assertEquals(typeof audit.overall_score, "number");
  const run = writes.find((w) => w.table === "agent_runs")!;
  assertEquals(run.status, "error");
});
```

- [ ] **Step 2: Ejecutar y verificar que falla**

Run: `deno test supabase/functions/generate-audit/handler.test.ts`
Expected: FAIL — `Module not found "index.ts"`.

- [ ] **Step 3: Implementar la Edge Function**

```ts
import { createClient } from "npm:@supabase/supabase-js@2";
import { computeScoring } from "../_shared/scoring/rubric.ts";
import type { PresenceData } from "../_shared/scoring/types.ts";
import { generateNarrative, realClient, type NarrativeClient } from "../_shared/llm.ts";
import { supervise } from "../_shared/supervisor.ts";

// Precios Opus 4.8 ($5/$25 MTok) — coste aproximado del run para agent_runs.cost
const PRICE_IN = 5 / 1_000_000;
const PRICE_OUT = 25 / 1_000_000;

export interface ClientRow {
  id: string;
  name: string;
  category: string | null;
  city: string | null;
  presence_data: PresenceData;
}

export interface Deps {
  loadClient(clientId: string): Promise<ClientRow | null>;
  insertAudit(row: Record<string, unknown>): Promise<string>; // devuelve audit id
  insertRun(row: Record<string, unknown>): Promise<void>;
  llm: NarrativeClient;
}

export async function handleGenerateAudit(
  body: { client_id: string },
  deps: Deps,
): Promise<{ audit_id?: string; status: string; narrative_error?: boolean }> {
  const t0 = Date.now();
  let tokensIn = 0, tokensOut = 0;

  // 1. Carga
  const client = await deps.loadClient(body.client_id);
  if (!client) throw new Error(`client not found: ${body.client_id}`);

  // 2. Scoring determinista (cero LLM en los números)
  const scoring = computeScoring(client.presence_data ?? {});

  // 3+4. Claude narrativa + supervisión; si falla, los subscores se guardan igual (spec §9)
  let result: Record<string, unknown> = { subscores: scoring.subscores, insufficient: scoring.insufficient };
  let llmDraft: Record<string, unknown> | null = null;
  let flags: string[] = [];
  let narrativeError: string | null = null;

  try {
    const { narrative, usage } = await generateNarrative(deps.llm, {
      clientName: client.name, category: client.category, city: client.city,
      presence: client.presence_data ?? {},
      subscores: scoring.subscores, overall: scoring.overall, insufficient: scoring.insufficient,
    });
    tokensIn += usage.input_tokens; tokensOut += usage.output_tokens;
    const sup = await supervise(deps.llm, narrative, scoring.subscores, scoring.insufficient);
    tokensIn += sup.usage.input_tokens; tokensOut += sup.usage.output_tokens;
    flags = sup.flags;
    result = { ...result, ...narrative };
    llmDraft = { ...narrative }; // señal de aprendizaje: original vs result editado
  } catch (e) {
    narrativeError = e instanceof Error ? e.message : String(e);
  }

  // 5. Registro
  const auditId = await deps.insertAudit({
    client_id: client.id,
    status: "draft",
    overall_score: scoring.overall,
    result,
    llm_draft: llmDraft,
    supervisor_flags: flags,
  });
  await deps.insertRun({
    agent: "auditor",
    client_id: client.id,
    audit_id: auditId,
    status: narrativeError ? "error" : "ok",
    input: { client_id: body.client_id },
    tokens_in: tokensIn,
    tokens_out: tokensOut,
    cost: tokensIn * PRICE_IN + tokensOut * PRICE_OUT,
    duration_ms: Date.now() - t0,
    error: narrativeError,
  });

  return { audit_id: auditId, status: "draft", ...(narrativeError ? { narrative_error: true } : {}) };
}

// --- Entry point real (no se ejecuta en tests) ---
if (import.meta.main) {
  Deno.serve(async (req) => {
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      const deps: Deps = {
        loadClient: async (id) => {
          const { data, error } = await supabase.from("clients")
            .select("id,name,category,city,presence_data").eq("id", id).maybeSingle();
          if (error) throw error;
          return data as ClientRow | null;
        },
        insertAudit: async (row) => {
          const { data, error } = await supabase.from("audits").insert(row).select("id").single();
          if (error) throw error;
          return data.id as string;
        },
        insertRun: async (row) => {
          const { error } = await supabase.from("agent_runs").insert(row);
          if (error) throw error;
        },
        llm: realClient(Deno.env.get("ANTHROPIC_API_KEY")!),
      };
      const body = await req.json();
      if (!body?.client_id) {
        return new Response(JSON.stringify({ error: "client_id required" }), { status: 400 });
      }
      const out = await handleGenerateAudit(body, deps);
      return new Response(JSON.stringify(out), { headers: { "content-type": "application/json" } });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e instanceof Error ? e.message : "internal error" }),
        { status: 500 },
      );
    }
  });
}
```

- [ ] **Step 4: Ejecutar tests y verificar que pasan**

Run: `deno test supabase/functions/generate-audit/handler.test.ts`
Expected: `ok | 2 passed`. También: `deno test supabase/functions/` → todos los suites en verde.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/generate-audit/
git commit -m "feat: generate-audit edge function (5-step run, mocked-LLM tests)"
```

---

### Task 10: rubrica.md del bloque

**Files:**
- Create: `docs/bloques/2-auditor/rubrica.md`

- [ ] **Step 1: Documentar qué comprueba script vs qué juzga el modelo**

Contenido (contrato del bloque, CLAUDE.md §Arquitectura de bloques): tabla con las 7 dimensiones, sus pesos, la fórmula determinista de cada scorer (referencia a `rubric.ts`), la regla de renormalización, y la división de la supervisión: `ruleChecks` (script: cobertura de hallazgos, dimensiones insuficientes, longitudes) vs `llmCheck` (Haiku: coherencia score↔texto, cifras inventadas, tono). Máximo ~60 líneas.

- [ ] **Step 2: Commit**

```bash
git add docs/bloques/2-auditor/rubrica.md
git commit -m "docs: rubrica del bloque auditor (script vs modelo)"
```

---

### Task 11: Deploy + smoke test real

**Files:**
- (sin archivos nuevos; despliegue y verificación)

- [ ] **Step 1: Configurar el secret de Anthropic**

Run: `npx supabase secrets set ANTHROPIC_API_KEY=<clave> --project-ref kdernwxajzzrriolnnmq`
(La clave la aporta el usuario en el momento; NUNCA se commitea.)

- [ ] **Step 2: Desplegar la función**

Vía MCP `deploy_edge_function` (o CLI: `npx supabase functions deploy generate-audit --project-ref kdernwxajzzrriolnnmq`).
Expected: función activa en el dashboard.

- [ ] **Step 3: Insertar un negocio real de prueba**

Vía MCP `execute_sql`: insertar fila en `clients` con datos reales del piloto (p.ej. un negocio de reformas auditado a mano) y `presence_data` completo.

- [ ] **Step 4: Invocar la función y verificar el run completo**

```bash
curl -s -X POST "https://kdernwxajzzrriolnnmq.supabase.co/functions/v1/generate-audit" \
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"<id insertado>"}'
```

Expected: `{"audit_id":"...","status":"draft"}`. Verificar vía MCP `execute_sql`:
- `audits`: fila con `overall_score` numérico, `result` con narrativa, `llm_draft` poblado, `supervisor_flags` (idealmente `[]`).
- `agent_runs`: fila `status='ok'` con `tokens_in/out`, `cost` (~0.05-0.10 €) y `duration_ms`.

- [ ] **Step 5: Revisión humana de la primera auditoría**

El usuario lee la narrativa generada y valida calidad/tono. Cualquier corrección a prompt o rúbrica → entrada en `docs/bloques/2-auditor/CHANGELOG.md` citando el run.

- [ ] **Step 6: Commit de cierre**

```bash
git add -A
git commit -m "chore: auditor v1 backend deployed and smoke-tested"
```

---

## Self-review (hecho)

- **Cobertura de spec:** §5 modelo de datos → Tasks 2-3 · §6 scoring → Tasks 5-6 · narrativa Claude → Task 7 · §7 supervisión → Task 8 · flujo 5 pasos + §9 errores → Task 9 · §10 testing (TDD rúbrica, mock Claude, RLS) → Tasks 4/6/7/8/9. Fuera de este plan (Plan B): §8 interfaz, informe público render. `agent_runs` con tokens/coste → Task 9.
- **Tipos consistentes:** `Subscores`/`DimensionKey` definidos en Task 5, usados en 6-9. `NarrativeClient` definido en Task 7, reutilizado en 8-9.
- **Sin placeholders:** todo paso de código lleva el código; el único contenido descrito sin literal es `rubrica.md` (documentación derivada del código ya escrito).

## Verificación end-to-end

1. `deno test supabase/functions/` → todos los tests unitarios en verde (scoring, llm mock, supervisor, handler).
2. `npx supabase test db` → 4/4 tests RLS (o verificación manual vía MCP si no hay Docker).
3. Smoke test real (Task 11): auditoría completa de un negocio del piloto con coste registrado en `agent_runs`.
