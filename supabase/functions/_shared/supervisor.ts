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
      content:
        `Revisa esta auditoría. Devuelve flags SOLO si: (1) el texto contradice los subscores, (2) afirma cifras que no están en los datos, (3) el tono no es profesional. Si todo está bien, flags = [].
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
