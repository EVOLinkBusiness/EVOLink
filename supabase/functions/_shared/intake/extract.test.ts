import { assertEquals } from "jsr:@std/assert";
import { EXTRACT_MODEL, extractFromScreenshot, type ScreenshotImage } from "./extract.ts";
import type { NarrativeClient } from "../llm.ts";

const IMG: ScreenshotImage = { media_type: "image/png", data: "BASE64FAKE" };

function fakeClient(payload: unknown): NarrativeClient {
  return {
    // deno-lint-ignore require-await
    create: async (_params) => ({
      content: [{ type: "text", text: JSON.stringify(payload) }],
      stop_reason: "end_turn",
      usage: { input_tokens: 1200, output_tokens: 200 },
    }),
  };
}

Deno.test("EXTRACT_MODEL es Haiku (visión barata)", () => {
  assertEquals(EXTRACT_MODEL, "claude-haiku-4-5");
});

Deno.test("extractFromScreenshot: parsea campos + devuelve usage", async () => {
  const client = fakeClient({
    business_name: "Mudanzas Roy",
    maps_category: "Empresa de mudanzas",
    phone: "600123456",
    reviews_count: 42,
    reviews_avg: 4.6,
    photos_count: 8,
    address: "Calle Falsa 1, Madrid",
    hours: "L-V 9-18",
    website_url: null,
  });
  const { form, usage } = await extractFromScreenshot(client, [IMG]);
  assertEquals(form.business_name, "Mudanzas Roy");
  assertEquals(form.reviews_count, 42);
  assertEquals(form.reviews_avg, 4.6);
  assertEquals(form.has_maps_listing, true); // si hay captura, hay ficha
  assertEquals(usage.input_tokens, 1200);
});

Deno.test("extractFromScreenshot: campos no vistos => null preservado", async () => {
  const client = fakeClient({ business_name: "X", phone: null, website_url: null });
  const { form } = await extractFromScreenshot(client, [IMG]);
  assertEquals(form.phone, null);
  assertEquals(form.website_url, null);
});

Deno.test("extractFromScreenshot: envía las imágenes como bloques image al modelo", async () => {
  let captured: Record<string, unknown> = {};
  const client: NarrativeClient = {
    // deno-lint-ignore require-await
    create: async (params) => {
      captured = params;
      return {
        content: [{ type: "text", text: "{}" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 1, output_tokens: 1 },
      };
    },
  };
  await extractFromScreenshot(client, [IMG, IMG]);
  const messages = captured.messages as { content: { type: string }[] }[];
  const imageBlocks = messages[0].content.filter((b) => b.type === "image");
  assertEquals(imageBlocks.length, 2);
});
