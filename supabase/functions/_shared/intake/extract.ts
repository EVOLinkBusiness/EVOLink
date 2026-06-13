import type { NarrativeClient } from "../llm.ts";
import type { IntakeForm } from "./form.ts";

// Visión barata para OCR de una ficha de Maps (céntimos, anexo §4). Multimodal.
export const EXTRACT_MODEL = "claude-haiku-4-5";

export interface ScreenshotImage {
  media_type: "image/png" | "image/jpeg" | "image/webp";
  data: string; // base64 sin prefijo data:
}

// Subconjunto de IntakeForm que es razonable leer de una captura. Sin "required":
// lo que el modelo no vea se devuelve null o se omite (anexo §4).
export const EXTRACT_SCHEMA = {
  type: "object",
  properties: {
    business_name: { type: ["string", "null"] },
    maps_category: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    email: { type: ["string", "null"] },
    address: { type: ["string", "null"] },
    hours: { type: ["string", "null"] },
    website_url: { type: ["string", "null"] },
    reviews_count: { type: ["integer", "null"] },
    reviews_avg: { type: ["number", "null"] },
    photos_count: { type: ["integer", "null"] },
    social_urls: { type: ["array", "null"], items: { type: "string" } },
  },
  required: [],
  additionalProperties: false,
} as const;

const PROMPT =
  `Eres un extractor de datos. Lees capturas de una ficha de Google Maps de un negocio local y devuelves SOLO los campos que VEAS con certeza.
REGLAS:
- No inventes. Lo que no aparezca en la imagen: null.
- reviews_count = número de reseñas; reviews_avg = nota media (1-5).
- photos_count: aprox. de fotos visibles si se indica; si no, null.
- No deduzcas el teléfono ni la web si no están escritos.`;

export async function extractFromScreenshot(
  client: NarrativeClient,
  images: ScreenshotImage[],
): Promise<{ form: Partial<IntakeForm>; usage: { input_tokens: number; output_tokens: number } }> {
  const imageBlocks = images.map((img) => ({
    type: "image",
    source: { type: "base64", media_type: img.media_type, data: img.data },
  }));

  const res = await client.create({
    model: EXTRACT_MODEL,
    max_tokens: 1024,
    output_config: { format: { type: "json_schema", schema: EXTRACT_SCHEMA } },
    messages: [{
      role: "user",
      content: [...imageBlocks, { type: "text", text: PROMPT }],
    }],
  });

  if (res.stop_reason === "refusal") throw new Error("Claude refused the extraction request");
  const text = res.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("No text block in extraction response");

  const raw = JSON.parse(text) as Partial<IntakeForm>;
  // Si hay captura, por definición el negocio TIENE ficha de Maps.
  const form: Partial<IntakeForm> = { ...raw, has_maps_listing: true };
  return { form, usage: res.usage };
}
