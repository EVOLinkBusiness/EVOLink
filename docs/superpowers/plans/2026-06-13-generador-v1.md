# Generador web v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el Agente Generador (bloque 3): pipeline de 6 etapas que convierte el `result` de una auditoría + datos de cliente en una web Astro con marca, evaluada automáticamente y desplegable en preview de Cloudflare Pages.

**Architecture:** Determinista primero, LLM solo para juicio (heredado del Auditor). El modelo produce artefactos JSON/markdown por etapa (`brief.md`, `marca.json`, `plan-pagina.json`); un **ensamblador determinista en Node** convierte `plan-pagina.json` + `marca.json` en un proyecto Astro self-contained por cliente (`clientes/<id>/site/`); un **script de evaluación** (Playwright + Lighthouse) mide lo objetivo y el modelo juzga el gusto; un **script de entrega** publica preview en Cloudflare Pages; cada etapa se registra en `agent_runs`. Dos skills nuevas (`estilo-evolink`, `generador-web`) encapsulan la voz de diseño y la orquestación.

**Tech Stack:** Node 24 + TypeScript, Astro + Tailwind (stack cerrado para webs de cliente), test runner `node:test` (sin dependencia extra), `@playwright/test` + `lighthouse` (evaluación), `wrangler` (Cloudflare Pages), `@supabase/supabase-js` (registro `agent_runs`). Artefactos por cliente en `clientes/<id>/` (gitignored).

---

## Decisiones que toma este plan (CONFIRMAR en el HARD-GATE)

La spec delega explícitamente a writing-plans la "estructura exacta", el "inventario exacto de componentes" y los "campos exactos". Este plan las fija así:

1. **Ubicación del tooling:** todo el motor del Generador vive en `generador/` (raíz). Subcarpetas: `generador/catalogo/` (componentes Astro), `generador/plantilla-astro/` (esqueleto base del sitio), `generador/scripts/` (ensamblador, evaluación, entrega, registro), `generador/tests/` (`node:test`).
2. **Artefactos de cliente:** `clientes/<id-cliente>/` (nombres de artefacto exactos de la spec: `brief.md`, `marca.json`, `plan-pagina.json`, `informe-evaluacion.md`, `site/`). **`clientes/` se gitignorea** en v1 (datos de cliente fuera del repo; el registro durable es `agent_runs`). Reanudable porque los artefactos persisten en disco entre sesiones.
3. **Runtime de los sitios de cliente:** cada `clientes/<id>/site/` es un proyecto Astro **self-contained** con su propio `package.json` (`npm install` por cliente). Coste de install por cliente aceptado en v1; optimización a workspace compartido diferida (YAGNI).
4. **Test runner:** `node:test` (incluido en Node 24, sin instalar nada nuevo) para la lógica determinista. Astro/Tailwind/Playwright/Lighthouse/wrangler/supabase-js son dependencias **locales** de `generador/` (no globales).
5. **`agent_runs`:** migración **aditiva** que añade `stage text`, `output jsonb default '{}'`, `flags jsonb default '[]'` (no rompe el Auditor: defaults). Un run por etapa, `agent='generador'`, `stage` = nombre de etapa.
6. **Catálogo mínimo v1:** Layout base + 8 familias de componentes (Header, Hero, Services, Testimonials, Gallery, CTA, ContactForm, Footer), 2-3 variantes cada una, suficientes para one-page y 3-5 páginas del nicho reformas.
7. **`estilo-evolink` coexiste con `frontend-design`** (decisión del usuario 2026-06-13): `estilo-evolink` = voz específica EVOLink (destilada del grupo taste); `frontend-design` = método general Anthropic. La skill nueva referencia esa relación.
8. **Variedad sin romper determinismo:** la variedad entre webs la decide el MODELO eligiendo variantes/props en `plan-pagina.json` (etapa 3). El ensamblador es 100% reproducible (misma entrada → misma salida byte a byte).

### Dependencias externas / credenciales (no bloquean FASE 8; sí el run piloto real)
- **Cloudflare Pages:** `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (env local, gitignored). Necesarios solo para deploy real (etapa 6). Se construye y testea el script; el deploy vivo se difiere al piloto.
- **Supabase:** `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (env local) para insertar en `agent_runs`. La lógica de construcción de fila se testea offline; la inserción viva se difiere al piloto.
- **Resend:** el formulario de contacto enruta a un endpoint; el envío real se valida en el piloto (la evaluación comprueba que el form existe y apunta a una acción válida, no el envío real en FASE 8).
- **Playwright/Lighthouse:** `npx playwright install chromium` (FASE 4). Lighthouse usa el chromium de Playwright vía `chromePath`.

### Alcance de la verificación E2E (FASE 8)
La ORDEN define el E2E como: `plan-pagina.json` ejemplo → ensamblado → **build Astro OK** → **pase de script de evaluación ejecuta y reporta**. NO incluye deploy vivo ni inserción viva en `agent_runs` (ambos dependen de credenciales y van al run piloto). El plan lo respeta.

---

## File Structure

```
generador/
  package.json                      # deps locales del motor + scripts (test, assemble, evaluate, deploy)
  tsconfig.json
  .gitignore                        # clientes/, *.env, node_modules, dist
  catalogo/
    _contract.ts                    # interfaces Props de todos los componentes (fuente de verdad del catálogo)
    Layout.astro                    # layout base (head, fonts, marca CSS vars, slot)
    HeaderA.astro  HeaderB.astro
    HeroA.astro    HeroB.astro    HeroC.astro
    ServicesA.astro ServicesB.astro
    TestimonialsA.astro TestimonialsB.astro
    GalleryA.astro GalleryB.astro
    CtaA.astro     CtaB.astro
    ContactFormA.astro ContactFormB.astro
    FooterA.astro  FooterB.astro
  plantilla-astro/                  # esqueleto que el ensamblador copia a cada cliente
    package.json  astro.config.mjs  tailwind.config.mjs  tsconfig.json
    src/styles/global.css
  scripts/
    schema.ts                       # tipos Marca, PlanPagina, Seccion + validadores (zod-free, deterministas)
    assemble.ts                     # ensamblador determinista (núcleo del bloque)
    assemble.cli.ts                 # entrypoint: node scripts/assemble.cli.ts <id>
    evaluate-checks.ts              # checkers deterministas (links, placeholders, contraste, form)
    evaluate.cli.ts                 # orquesta build+serve+playwright+lighthouse → informe-evaluacion.md
    report.ts                       # render de informe-evaluacion.md desde resultados
    run-record.ts                   # buildRunRow(): construye fila agent_runs (pura, testeable)
    record.cli.ts                   # inserta fila vía supabase-js
    deploy.cli.ts                   # wrangler pages deploy (preview)
  tests/
    schema.test.ts  assemble.test.ts  evaluate-checks.test.ts  run-record.test.ts
    fixtures/
      marca.json  plan-pagina.json  # ejemplo "reformas" para E2E
      broken-link.html placeholder.html low-contrast.html  # fixtures de checkers

clientes/<id>/                      # gitignored — artefactos por cliente
  brief.md  marca.json  plan-pagina.json  informe-evaluacion.md  site/

supabase/migrations/20260613000002_agent_runs_stage.sql   # migración aditiva
.claude/skills/estilo-evolink/SKILL.md
.claude/skills/generador-web/SKILL.md
docs/contexto/inventario-skills.md                          # actualizado
docs/bloques/3-generador/{BLOQUE.md,ESTADO.md,CHANGELOG.md} # actualizados
```

---

# PARTE A — FASE 2: Skill `estilo-evolink` (consolidación taste)

No es código: es redacción de skill. Sin TDD; verificación = lectura + conteo de líneas.

### Task A1: Crear `estilo-evolink` fusionando el grupo taste

**Files:**
- Read: `docs/archivo-skills/taste-skill/`, `docs/archivo-skills/soft-skill/`, `docs/archivo-skills/minimalist-skill/`
- Create: `.claude/skills/estilo-evolink/SKILL.md`

- [ ] **Step 1:** Leer las 3 skills archivadas y extraer sus principios útiles (paleta/contraste, espaciado/aire, tipografía editorial, jerarquía, "evitar look de plantilla").
- [ ] **Step 2:** Escribir `.claude/skills/estilo-evolink/SKILL.md` (≤200 líneas, español, una sola voz) con: frontmatter `name`/`description`; sección "Relación con frontend-design" (frontend-design = método general Anthropic; estilo-evolink = voz específica EVOLink, se aplica DESPUÉS); principios de diseño consolidados; checklist accionable para etapas 2-3 del Generador. Detalle extenso → subarchivos `referencias/` bajo demanda.
- [ ] **Step 3:** Verificar `wc -l .claude/skills/estilo-evolink/SKILL.md` ≤ 200.

### Task A2: Confirmar archivado del grupo taste + actualizar inventario

**Files:**
- Verify: `docs/archivo-skills/{taste-skill,soft-skill,minimalist-skill}` (ya archivadas 2026-06-10, NO en `.claude/skills/`)
- Modify: `docs/contexto/inventario-skills.md` (crear si no existe)

- [ ] **Step 1:** Confirmar que las 3 ya están en `docs/archivo-skills/` (lo están) y NO en `.claude/skills/`. La ORDEN nombra `docs/contexto/skills-archivadas/`; **reutilizar la carpeta existente** `docs/archivo-skills/` (no duplicar). Anotar esta desviación en el commit.
- [ ] **Step 2:** Actualizar/crear `docs/contexto/inventario-skills.md`: grupo taste → "consolidado en estilo-evolink (archivado en docs/archivo-skills/)"; `estilo-evolink` → activa; `frontend-design` → activa (método general base); `ui-ux-pro-max` y `gpt-tasteskill` → "activa, en evaluación".
- [ ] **Step 3 (commit):** `git add -A && git commit -m "feat: estilo-evolink skill (taste consolidation)"`

---

# PARTE B — FASE 3: Catálogo + ensamblador determinista (TDD)

### Task B1: Bootstrap del proyecto `generador/`

**Files:**
- Create: `generador/package.json`, `generador/tsconfig.json`, `generador/.gitignore`
- Modify: `.gitignore` (raíz) → añadir `clientes/`

- [ ] **Step 1:** Crear `generador/package.json` con `"type": "module"`, scripts `test` (`node --test --import tsx tests/`), `assemble`, `evaluate`, `deploy`, `record`; devDeps: `tsx`, `typescript`, `@types/node`. (deps de Astro/Playwright/Lighthouse/wrangler/supabase se añaden en sus tasks.)
- [ ] **Step 2:** Crear `generador/tsconfig.json` (target ES2022, module NodeNext, strict).
- [ ] **Step 3:** Añadir `clientes/` a `.gitignore` raíz y `node_modules`/`dist`/`*.env` a `generador/.gitignore`.
- [ ] **Step 4:** `cd generador && npm install`. Verificar `npm test` corre (0 tests aún → exit 0).
- [ ] **Step 5 (commit):** `git add generador .gitignore && git commit -m "chore: bootstrap generador tooling project"`

### Task B2: Esquema y validadores (TDD)

**Files:**
- Create: `generador/scripts/schema.ts`
- Test: `generador/tests/schema.test.ts`

- [ ] **Step 1 — test que falla:** En `schema.test.ts`, casos: (a) `validateMarca` acepta una marca válida y rechaza una sin `colores.primario`; (b) `validatePlanPagina` acepta un plan válido y rechaza una sección con `componente` desconocido; (c) `validatePlanPagina` rechaza `props` que no cumplen el contrato del componente (p.ej. `Hero` sin `titulo`).

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateMarca, validatePlanPagina } from "../scripts/schema.ts";

test("validateMarca rechaza marca sin color primario", () => {
  const r = validateMarca({ nombre_negocio: "X", colores: {} });
  assert.equal(r.ok, false);
});
test("validatePlanPagina rechaza componente desconocido", () => {
  const r = validatePlanPagina({ tipo: "one-page", paginas: [{ ruta: "/", secciones: [{ componente: "Nope", variante: "A", props: {} }] }] });
  assert.equal(r.ok, false);
});
```

- [ ] **Step 2:** `cd generador && npm test` → FAIL (módulo/funciones no existen).
- [ ] **Step 3 — implementación:** Definir tipos `Marca`, `PlanPagina`, `Pagina`, `Seccion` y un `CATALOG_CONTRACT` (mapa `componente → variantes válidas → claves de props requeridas`). `validateMarca`/`validatePlanPagina` devuelven `{ ok: true } | { ok: false, errors: string[] }`. Sin dependencias externas (validación a mano, determinista).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5 (commit):** `git add generador/scripts/schema.ts generador/tests/schema.test.ts && git commit -m "feat: generador schema + validators (TDD)"`

### Task B3: Catálogo de componentes Astro + contrato

**Files:**
- Create: `generador/catalogo/_contract.ts` y los `.astro` del inventario; `generador/plantilla-astro/*`

Inventario y props (contrato — cada variante respeta variables de marca, nada en duro):

| Componente | Variantes | Props requeridas |
|---|---|---|
| Layout | — | `titulo`, `descripcion`, `marca` (tokens), `nav`, `footer` |
| Header | A (logo izq + nav), B (centrado) | `nav: {label,ruta}[]`, `cta?` |
| Hero | A (texto izq/imagen der), B (centrado full), C (imagen fondo) | `titulo`, `subtitulo`, `cta_label`, `cta_ruta`, `imagen?` |
| Services | A (grid 3), B (lista alterna) | `titulo`, `items: {icono?,titulo,texto}[]` |
| Testimonials | A (carrusel), B (grid 2) | `items: {nombre,texto,rol?}[]` |
| Gallery | A (masonry), B (grid uniforme) | `imagenes: {src,alt}[]` |
| Cta | A (banda color), B (split) | `titulo`, `texto?`, `cta_label`, `cta_ruta` |
| ContactForm | A (campos + mapa), B (solo campos) | `email`, `telefono?`, `direccion?`, `form_action` |
| Footer | A (columnas), B (simple) | `nav`, `contacto`, `nombre_negocio` |

- [ ] **Step 1:** Crear `generador/catalogo/_contract.ts` exportando las interfaces `Props` por componente (importadas por `schema.ts` para `CATALOG_CONTRACT`). Mantener `_contract.ts` y `CATALOG_CONTRACT` sincronizados (mismo nombre de claves).
- [ ] **Step 2:** Crear `generador/plantilla-astro/` (esqueleto): `package.json` (astro, @astrojs/tailwind, tailwindcss), `astro.config.mjs`, `tailwind.config.mjs` (lee CSS vars), `src/styles/global.css` con placeholders `--color-primario` etc.
- [ ] **Step 3 — componente de referencia (patrón a replicar):** Implementar `HeroA.astro` completo:

```astro
---
// generador/catalogo/HeroA.astro — variante texto izquierda / imagen derecha.
// Reglas: cero color/medida en duro; todo vía CSS vars de marca (clases Tailwind
// que mapean a var(--color-*)). Imagen opcional con alt obligatorio si existe.
interface Props {
  titulo: string;
  subtitulo: string;
  cta_label: string;
  cta_ruta: string;
  imagen?: { src: string; alt: string };
}
const { titulo, subtitulo, cta_label, cta_ruta, imagen } = Astro.props;
---
<section class="hero hero--a">
  <div class="hero__text">
    <h1>{titulo}</h1>
    <p>{subtitulo}</p>
    <a class="btn btn--primary" href={cta_ruta}>{cta_label}</a>
  </div>
  {imagen && <img class="hero__img" src={imagen.src} alt={imagen.alt} />}
</section>
```

- [ ] **Step 4:** Implementar el resto del inventario (HeaderA/B, HeroB/C, ServicesA/B, TestimonialsA/B, GalleryA/B, CtaA/B, ContactFormA/B, FooterA/B, Layout) siguiendo el MISMO contrato: `interface Props` que coincide con `_contract.ts`, estilos vía clases mapeadas a CSS vars de marca, `alt` obligatorio en imágenes, sin enlaces `#` placeholder.
- [ ] **Step 5:** Verificación manual: `cd generador/plantilla-astro && npm install && npx astro check` (los componentes compilan en aislamiento copiados a un sitio de prueba — se valida de verdad en B5).
- [ ] **Step 6 (commit):** `git add generador/catalogo generador/plantilla-astro && git commit -m "feat: astro component catalog v1 + base template"`

### Task B4: Ensamblador determinista (TDD)

**Files:**
- Create: `generador/scripts/assemble.ts`, `generador/scripts/assemble.cli.ts`
- Test: `generador/tests/assemble.test.ts`
- Fixtures: `generador/tests/fixtures/marca.json`, `generador/tests/fixtures/plan-pagina.json`

- [ ] **Step 1 — fixtures:** Crear `marca.json` y `plan-pagina.json` de ejemplo (one-page reformas: Header A, Hero A, Services A, Gallery A, Testimonials B, Cta A, ContactForm A, Footer A; textos reales del nicho, cero lorem).
- [ ] **Step 2 — test que falla:** En `assemble.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { assembleSite } from "../scripts/assemble.ts";
import { readFileSync, existsSync, rmSync } from "node:fs";

test("assemble es determinista (misma entrada → misma salida)", async () => {
  const out = "tests/.tmp/site";
  rmSync(out, { recursive: true, force: true });
  await assembleSite("tests/fixtures/marca.json", "tests/fixtures/plan-pagina.json", out);
  const a = readFileSync(`${out}/src/pages/index.astro`, "utf8");
  rmSync(out, { recursive: true, force: true });
  await assembleSite("tests/fixtures/marca.json", "tests/fixtures/plan-pagina.json", out);
  const b = readFileSync(`${out}/src/pages/index.astro`, "utf8");
  assert.equal(a, b);                                  // determinismo
  assert.ok(existsSync(`${out}/src/components/catalog/HeroA.astro`)); // catálogo copiado
  assert.match(a, /import HeroA/);                      // import de la variante elegida
});
```

- [ ] **Step 3:** `npm test` → FAIL.
- [ ] **Step 4 — implementación de `assembleSite(marcaPath, planPath, outDir)`:** (1) valida ambos con `schema.ts`, aborta con error legible si no; (2) `rm -rf outDir` y recrea (clean build); (3) copia `plantilla-astro/*` → outDir; (4) copia `catalogo/*` → `outDir/src/components/catalog/`; (5) genera `outDir/src/styles/marca.css` (CSS vars desde `marca.json`, claves ordenadas); (6) por cada página, genera `src/pages/<ruta>.astro`: frontmatter con imports de las variantes usadas (orden estable) + consts de props (JSON serializado con claves ordenadas), cuerpo que renderiza `<Layout>` envolviendo las secciones en orden; (7) sin timestamps ni aleatoriedad en la salida. Determinismo: ordenar siempre claves y listas de imports, formato fijo.
- [ ] **Step 5:** `npm test` → PASS. Crear `assemble.cli.ts` (`node scripts/assemble.cli.ts <id>` → lee `clientes/<id>/{marca,plan-pagina}.json`, escribe `clientes/<id>/site/`).
- [ ] **Step 6 (commit):** `git add generador/scripts/assemble*.ts generador/tests/assemble.test.ts generador/tests/fixtures && git commit -m "feat: deterministic astro assembler (TDD)"`

### Task B5: Verificación de build real (integración)

- [ ] **Step 1:** `cd generador && node scripts/assemble.cli.ts demo` con un `clientes/demo/` copiado de fixtures.
- [ ] **Step 2:** `cd clientes/demo/site && npm install && npm run build` → `dist/` generado sin error. Esta es la prueba de que el catálogo + ensamblador producen un sitio Astro que compila (criterio FASE 3).
- [ ] **Step 3 (commit, si hubo ajustes):** `git commit -am "fix: catalog/assembler adjustments for clean astro build"`

---

# PARTE C — FASE 4: Pipeline de evaluación (TDD en checkers)

### Task C1: Instalar navegadores + deps de evaluación

- [ ] **Step 1:** `cd generador && npm install -D @playwright/test lighthouse` y `npx playwright install chromium`.
- [ ] **Step 2 (commit):** `git add generador/package*.json && git commit -m "chore: add playwright + lighthouse for evaluation"`

### Task C2: Checkers deterministas (TDD)

**Files:**
- Create: `generador/scripts/evaluate-checks.ts`
- Test: `generador/tests/evaluate-checks.test.ts`
- Fixtures: `generador/tests/fixtures/{broken-link,placeholder,low-contrast}.html`

- [ ] **Step 1 — fixtures:** 3 HTML mínimos: uno con `<a href="/no-existe">` interno roto, uno con "lorem ipsum"/"placeholder", uno con texto de contraste < AA sobre su fondo.
- [ ] **Step 2 — test que falla:**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { findPlaceholders, findContrastFailures, findBrokenLinks } from "../scripts/evaluate-checks.ts";
import { readFileSync } from "node:fs";

test("detecta placeholders", () => {
  const html = readFileSync("tests/fixtures/placeholder.html", "utf8");
  assert.ok(findPlaceholders(html).length > 0);
});
test("detecta contraste insuficiente", () => {
  const html = readFileSync("tests/fixtures/low-contrast.html", "utf8");
  assert.ok(findContrastFailures(html).length > 0);
});
test("detecta enlace interno roto", () => {
  const html = readFileSync("tests/fixtures/broken-link.html", "utf8");
  assert.ok(findBrokenLinks(html, ["/", "/servicios"]).length > 0);
});
```

- [ ] **Step 3:** `npm test` → FAIL.
- [ ] **Step 4 — implementación:** `findPlaceholders(html)` (regex lorem/placeholder/TODO/`href="#"`); `findContrastFailures(html)` (parse colores inline/clases conocidas → ratio WCAG, < 4.5 falla); `findBrokenLinks(html, rutasValidas)` (extrae `href` internos, marca los que no están en rutas válidas; externos → lista para verificación de red en C3). Funciones puras sobre string → testeables sin navegador.
- [ ] **Step 5:** `npm test` → PASS.
- [ ] **Step 6 (commit):** `git add generador/scripts/evaluate-checks.ts generador/tests/evaluate-checks.test.ts generador/tests/fixtures/*.html && git commit -m "feat: deterministic evaluation checkers (TDD)"`

### Task C3: Orquestador de evaluación + informe

**Files:**
- Create: `generador/scripts/evaluate.cli.ts`, `generador/scripts/report.ts`

- [ ] **Step 1:** `report.ts`: `renderInforme(resultado)` → markdown (`informe-evaluacion.md`) con secciones PASA/FALLA por criterio de la rúbrica de script + huecos para el juicio del modelo. Test mínimo: dado un resultado con 1 fallo, el markdown lo lista.
- [ ] **Step 2:** `evaluate.cli.ts` (`node scripts/evaluate.cli.ts <id>`): build del sitio → `astro preview` en puerto local → Playwright: capturas a 375px y escritorio (guardadas en `clientes/<id>/eval/`), recorre enlaces (internos vía `findBrokenLinks`, externos con `page.request.head`), comprueba presencia y `action` del formulario; corre Lighthouse (chromium de Playwright vía `chromePath`) y extrae performance móvil; aplica `findPlaceholders`/`findContrastFailures` sobre el HTML renderizado; escribe `clientes/<id>/informe-evaluacion.md` con `renderInforme`. Devuelve exit code 0 (pasa script) / 1 (falla).
- [ ] **Step 3 — lógica de iteración (documentada, ejecuta el modelo/orquestador):** el pase de script produce el informe; el modelo lo lee + las capturas y juzga el gusto (rúbrica §"Juzga MODELO"); si falla, corrige `plan-pagina.json` o el componente y re-ensambla; **máximo 2 iteraciones**; tras la 2ª, si sigue fallando → para y entrega `informe-evaluacion.md` al humano. Esta lógica vive en la skill `generador-web` (FASE 6), no en el script.
- [ ] **Step 4:** Verificación: correr `evaluate.cli.ts demo` contra el sitio `demo` de B5 → genera `informe-evaluacion.md` + capturas, reporta. (Criterio FASE 4 / parte de FASE 8.)
- [ ] **Step 5 (commit):** `git add generador/scripts/evaluate.cli.ts generador/scripts/report.ts && git commit -m "feat: evaluation orchestrator + report (playwright + lighthouse)"`

---

# PARTE D — FASE 5: Entrega + registro `agent_runs`

### Task D1: Migración aditiva de `agent_runs` (stage/output/flags)

**Files:**
- Create: `supabase/migrations/20260613000002_agent_runs_stage.sql`

- [ ] **Step 1:** Escribir migración:

```sql
-- Generador v1: un run por etapa. Aditivo, no rompe el Auditor (defaults).
alter table public.agent_runs
  add column if not exists stage  text,
  add column if not exists output jsonb not null default '{}'::jsonb,
  add column if not exists flags  jsonb not null default '[]'::jsonb;
create index if not exists agent_runs_stage_idx on public.agent_runs (agent, stage, created_at desc);
```

- [ ] **Step 2:** Aplicar vía MCP `apply_migration` (proyecto remoto; no hay Docker local — patrón del Auditor).
- [ ] **Step 3:** Verificar con MCP `list_tables`/`execute_sql` que las 3 columnas existen.
- [ ] **Step 4 (commit):** `git add supabase/migrations/20260613000002_agent_runs_stage.sql && git commit -m "feat: extend agent_runs with stage/output/flags (additive)"`

### Task D2: Constructor de fila + inserción (TDD en la parte pura)

**Files:**
- Create: `generador/scripts/run-record.ts`, `generador/scripts/record.cli.ts`
- Test: `generador/tests/run-record.test.ts`

- [ ] **Step 1 — test que falla:** `buildRunRow({agent:'generador', stage:'brief', clientId, input, output, durationMs, status})` devuelve fila con `agent`, `stage`, `cost:0`, `tokens_in:0`, `tokens_out:0`, `status` válido, `input`/`output` como objetos. Caso error: `status:'error'` requiere `error` no vacío.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3 — implementación:** `buildRunRow` (pura, sin red), reusa la semántica del Auditor (cost 0 en v1). `record.cli.ts`: crea cliente supabase-js con `SUPABASE_URL`+`SUPABASE_SERVICE_ROLE_KEY` e inserta (`from('agent_runs').insert(row)`), mismo patrón que `insertRun` del Auditor.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5 (commit):** `git add generador/scripts/run-record.ts generador/scripts/record.cli.ts generador/tests/run-record.test.ts && git commit -m "feat: agent_runs row builder + insert (TDD)"`

### Task D3: Script de entrega a Cloudflare Pages (preview)

**Files:**
- Create: `generador/scripts/deploy.cli.ts`

- [ ] **Step 1:** `npm install -D wrangler`.
- [ ] **Step 2:** `deploy.cli.ts` (`node scripts/deploy.cli.ts <id>`): valida que existe `clientes/<id>/site/dist`; ejecuta `wrangler pages deploy clientes/<id>/site/dist --project-name=evolink-<id> --branch=preview`; captura y devuelve la **URL de preview**. **NUNCA** dominio definitivo (guard: si falta flag `--production` explícito + confirmación humana, solo preview). Si faltan `CLOUDFLARE_*` env → error claro "credenciales de Cloudflare requeridas" y NO intenta deploy.
- [ ] **Step 3:** Verificación offline: `deploy.cli.ts demo` sin credenciales → falla con el mensaje claro (no rompe; documenta que el deploy vivo va al piloto).
- [ ] **Step 4 (commit):** `git add generador/scripts/deploy.cli.ts generador/package*.json && git commit -m "feat: cloudflare pages preview deploy script (guarded)"`

---

# PARTE E — FASE 6: Skill `generador-web` (orquestación)

### Task E1: Crear `generador-web/SKILL.md`

**Files:**
- Create: `.claude/skills/generador-web/SKILL.md`

- [ ] **Step 1:** Escribir SKILL.md (≤200 líneas, español) con: frontmatter; las **6 etapas** (entrada, qué hace, artefacto de salida, comando/skill); los **2 checkpoints humanos** (🔵 tras etapas 1+3 brief+plan; 🔵 tras etapa 5 final pre-cliente); qué skills usa cada paso (etapa 2 `brandkit`; etapa 3 `estilo-evolink`+`ui-ux-pro-max`+`copywriting`; componentes `ui-animation`/`gpt-tasteskill`; etapa 5 `playwright-cli`+`web-design-guidelines`+`verification-before-completion`); la lógica de **máx. 2 iteraciones** de evaluación; el registro `agent_runs` por etapa. Detalle extenso → `referencias/`.
- [ ] **Step 2:** Verificar `wc -l .claude/skills/generador-web/SKILL.md` ≤ 200.
- [ ] **Step 3 (commit):** `git add .claude/skills/generador-web && git commit -m "feat: generador-web orchestration skill"`

---

# PARTE F — FASE 7: Documentación del bloque

### Task F1: BLOQUE.md, ESTADO.md, BUSINESS.md, CHANGELOG.md

**Files:**
- Modify: `docs/bloques/3-generador/BLOQUE.md` (estado → ACTIVO/implementado v1; contrato spec §6; índice de skills con `estilo-evolink`+`generador-web`; reservas)
- Create: `docs/bloques/3-generador/ESTADO.md` (checklist de implementación + dónde retomar)
- Modify: `docs/BUSINESS.md` §Decisiones (añadir las de spec §10 que falten, numeración correlativa)
- Modify: `docs/bloques/3-generador/CHANGELOG.md` (si alguna corrección vino de un fallo durante la implementación)

- [ ] **Step 1:** Actualizar BLOQUE.md (≤200 líneas).
- [ ] **Step 2:** Crear ESTADO.md con la tabla de tasks de este plan y su estado.
- [ ] **Step 3:** Añadir a BUSINESS.md §Decisiones las decisiones cerradas de spec §10 no presentes.
- [ ] **Step 4 (commit):** `git add docs/bloques/3-generador docs/BUSINESS.md && git commit -m "docs: bloque 3 generador v1 (estado, contrato, decisiones)"`

---

# PARTE G — FASE 8: Verificación final (evidencia antes de afirmar)

- [ ] **Step 1 — E2E:** `clientes/demo/` (fixtures) → `assemble.cli.ts demo` → `cd clientes/demo/site && npm run build` OK → `evaluate.cli.ts demo` ejecuta y escribe `informe-evaluacion.md`. Mostrar salida.
- [ ] **Step 2 — 200 líneas:** `wc -l CLAUDE.md HANDOVER.md docs/bloques/*/BLOQUE.md .claude/skills/estilo-evolink/SKILL.md .claude/skills/generador-web/SKILL.md` → TODOS ≤200.
- [ ] **Step 3 — symlinks:** `find .claude/skills -type l | wc -l` → 0.
- [ ] **Step 4 — suite:** `cd generador && npm test` → todo verde (mostrar salida).
- [ ] **Step 5 — git limpio:** `git status`.
- Si algo falla: reportar con ❌ (fase, comando, error) y NO continuar a FASE 9.

---

# PARTE H — FASE 9: HANDOVER + autoborrado de la ORDEN

- [ ] **Step 1:** Reescribir `HANDOVER.md` (formato `/cierre`): hecho en la sesión, bloque activo → 3-generador, riesgos vivos + nuevos, y en **Pendientes** (al final de la cola): el run piloto "Mudanzas Roy" como CLIENTE NUEVO (texto literal de la ORDEN FASE 9) + "evaluar ui-ux-pro-max y gpt-tasteskill tras las primeras webs".
- [ ] **Step 2:** `git rm 2026-06-12-ORDEN-Programacion-Agente-Generador_v1.md`.
- [ ] **Step 3 (commit + push):** `git commit -m "docs: handover generador v1 + remove completed ORDEN" && git push`.
- [ ] **Step 4:** Mostrar el mensaje final de cierre (estructura literal de la ORDEN).

---

## Self-Review

**1. Cobertura de spec:**
- §4 pipeline 6 etapas → artefactos (brief/marca/plan por el modelo; etapas 4-6 por scripts) cubiertos; checkpoints en `generador-web` (E1). ✅
- §4 evaluación (script+modelo, máx 2 iteraciones) → C2/C3 + lógica en E1. ✅
- §5 catálogo Astro 2-3 variantes, variables de marca → B3. ✅
- §6 contrato (entrada `result` auditoría, salida web+artefactos+`agent_runs` por etapa) → D1/D2. ✅
- §7 skills (CREAR estilo-evolink + generador-web; poda) → A1/E1 + inventario A2. ✅
- §9 criterios de éxito → E2E FASE 8 valida ensamblado+build+eval; web real del nicho = run piloto (Pendientes). ✅
- §10 decisiones → BUSINESS.md (F1). ✅

**2. Placeholders:** los scripts deterministas (schema, assemble, checkers, run-record) llevan código/tests concretos. Catálogo: 1 componente de referencia completo (HeroA) + contrato exacto por componente; el resto sigue el mismo contrato (no es placeholder: el contrato fija props y reglas). Lighthouse/deploy/insert: lógica concreta; ejecución viva diferida al piloto por credenciales (declarado en "Dependencias externas").

**3. Consistencia de tipos:** `CATALOG_CONTRACT` (schema.ts) e `_contract.ts` comparten nombres de props (B2 step 3 + B3 step 1 lo exigen). `assembleSite(marcaPath, planPath, outDir)` consistente en test y CLI. `buildRunRow` consistente con columnas de la migración D1.

**Gaps conocidos (declarados, no omitidos):** deploy real, inserción real en `agent_runs` y envío real de Resend dependen de credenciales → se construyen y testean offline; su ejecución viva es el run piloto (Pendientes del HANDOVER). FASE 8 no los exige (alineado con la ORDEN).
