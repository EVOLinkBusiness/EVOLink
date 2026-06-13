import { createClient } from "npm:@supabase/supabase-js@2";
import { computeScoring } from "../_shared/scoring/rubric.ts";
import type { PresenceData } from "../_shared/scoring/types.ts";
import { generateNarrative, type NarrativeClient, realClient } from "../_shared/llm.ts";
import { supervise } from "../_shared/supervisor.ts";

// Precios por modelo ($/MTok) — la narrativa va en Opus 4.8 y el supervisor en
// Haiku 4.5: tarifar ambos a precio Opus inflaba agent_runs.cost (lo mina el bloque 7).
const OPUS_IN = 5 / 1_000_000;
const OPUS_OUT = 25 / 1_000_000;
const HAIKU_IN = 1 / 1_000_000;
const HAIKU_OUT = 5 / 1_000_000;

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
  let opusIn = 0, opusOut = 0; // narrativa (Opus)
  let haikuIn = 0, haikuOut = 0; // supervisor (Haiku)

  // 1. Carga
  const client = await deps.loadClient(body.client_id);
  if (!client) throw new Error(`client not found: ${body.client_id}`);

  // 2. Scoring determinista (cero LLM en los números)
  const scoring = computeScoring(client.presence_data ?? {});

  // 3+4. Claude narrativa + supervisión; si falla, los subscores se guardan igual (spec §9)
  let result: Record<string, unknown> = {
    subscores: scoring.subscores,
    insufficient: scoring.insufficient,
  };
  let llmDraft: Record<string, unknown> | null = null;
  let flags: string[] = [];
  let narrativeError: string | null = null;

  try {
    const { narrative, usage } = await generateNarrative(deps.llm, {
      clientName: client.name,
      category: client.category,
      city: client.city,
      presence: client.presence_data ?? {},
      subscores: scoring.subscores,
      overall: scoring.overall,
      insufficient: scoring.insufficient,
    });
    opusIn += usage.input_tokens;
    opusOut += usage.output_tokens;
    const sup = await supervise(deps.llm, narrative, scoring.subscores, scoring.insufficient);
    haikuIn += sup.usage.input_tokens;
    haikuOut += sup.usage.output_tokens;
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
    tokens_in: opusIn + haikuIn,
    tokens_out: opusOut + haikuOut,
    cost: opusIn * OPUS_IN + opusOut * OPUS_OUT + haikuIn * HAIKU_IN + haikuOut * HAIKU_OUT,
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
