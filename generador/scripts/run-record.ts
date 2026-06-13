// generador/scripts/run-record.ts
// Construye la fila de agent_runs para una etapa del Generador. Funcion pura
// (testeable sin red). Reusa la semantica del Auditor: coste 0 en v1 (Claude Code),
// campos tokens/cost previstos para la migracion a API en v2.

export interface RunInput {
  agent?: string;
  stage: string;
  clientId?: string | null;
  auditId?: string | null;
  status: "ok" | "error";
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  flags?: unknown[];
  durationMs?: number;
  error?: string | null;
}

export interface AgentRunRow {
  agent: string;
  stage: string;
  client_id: string | null;
  audit_id: string | null;
  status: "ok" | "error";
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  flags: unknown[];
  tokens_in: number;
  tokens_out: number;
  cost: number;
  duration_ms: number;
  error: string | null;
}

export function buildRunRow(r: RunInput): AgentRunRow {
  if (r.status === "error" && (!r.error || r.error.trim() === "")) {
    throw new Error("un run con status 'error' requiere un mensaje en 'error'");
  }
  return {
    agent: r.agent ?? "generador",
    stage: r.stage,
    client_id: r.clientId ?? null,
    audit_id: r.auditId ?? null,
    status: r.status,
    input: r.input ?? {},
    output: r.output ?? {},
    flags: r.flags ?? [],
    tokens_in: 0,
    tokens_out: 0,
    cost: 0,
    duration_ms: r.durationMs ?? 0,
    error: r.error ?? null,
  };
}
