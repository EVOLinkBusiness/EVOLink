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
          // Claves exactas de las dimensiones (no etiquetas): el supervisor casa
          // la cobertura de hallazgos contra estas claves.
          dimension: {
            type: "string",
            enum: ["gbp", "reviews", "maps_visibility", "opportunity", "nap", "social", "local_seo"],
          },
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
  websiteUrl: string | null; // web propia del cliente (clients.website_url); null = no consta
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
    create: (params) => anthropic.messages.create(params as never) as never,
  };
}

const SYSTEM =
  `Eres el analista senior de EVOLink, agencia web. Redactas auditorías de presencia digital para negocios locales, con tono profesional y persuasivo (es un gancho de venta honesto).
REGLAS ESTRICTAS:
- Los números (scores) los calcula el sistema: EXPLÍCALOS, jamás inventes métricas ni cifras nuevas.
- Si una dimensión está marcada como "datos insuficientes", dilo tal cual; no especules.
- Página web: se te indica si el negocio YA tiene web propia (con su URL) o si no consta. Si la tiene, trátala como un activo existente; NUNCA afirmes que no tiene web, que su presencia digital es "nula/inexistente", ni recomiendes "crear/lanzar una web" que ya existe (a lo sumo, mejorarla u optimizarla). Si no consta, su ausencia sí es un hallazgo válido.
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
      content: `Negocio: ${input.clientName} (${input.category ?? "sin categoría"}, ${
        input.city ?? "sin ciudad"
      })
Página web propia: ${input.websiteUrl ? `SÍ — ${input.websiteUrl} (activo existente; no es un hallazgo de ausencia)` : "no consta"}
Datos de presencia (recogidos a mano): ${JSON.stringify(input.presence)}
Subscores deterministas (0-100, null = datos insuficientes): ${JSON.stringify(input.subscores)}
Score global: ${input.overall ?? "datos insuficientes"}
Dimensiones sin datos: ${input.insufficient.join(", ") || "ninguna"}

Redacta la auditoría: resumen ejecutivo, un hallazgo por dimensión con datos, y recomendaciones priorizadas.
En cada hallazgo, el campo "dimension" DEBE ser la clave exacta (gbp, reviews, maps_visibility, opportunity, nap, social, local_seo), no una etiqueta legible; el nombre legible va en el texto del hallazgo.`,
    }],
  });
  if (res.stop_reason === "refusal") {
    throw new Error("Claude refused the narrative request");
  }
  const text = res.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("No text block in Claude response");
  return { narrative: JSON.parse(text) as Narrative, usage: res.usage };
}
