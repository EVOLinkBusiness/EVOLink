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
    clientName: "Mudanzas Roy",
    category: "mudanzas",
    city: "Madrid",
    presence: {},
    subscores: { gbp: 40 } as never,
    overall: 40,
    insufficient: [],
  });
  assertEquals(r.narrative.executive_summary, "Resumen ejecutivo de prueba.");
  assertEquals(r.usage.input_tokens, 1000);
});

Deno.test("NARRATIVE_SCHEMA exige los 3 campos", () => {
  assertEquals(NARRATIVE_SCHEMA.required, ["executive_summary", "findings", "recommendations"]);
});
