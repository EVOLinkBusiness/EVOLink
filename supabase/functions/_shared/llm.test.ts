import { assert, assertEquals, assertStringIncludes } from "jsr:@std/assert";
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
    websiteUrl: null,
    presence: {},
    subscores: { gbp: 40 } as never,
    overall: 40,
    insufficient: [],
  });
  assertEquals(r.narrative.executive_summary, "Resumen ejecutivo de prueba.");
  assertEquals(r.usage.input_tokens, 1000);
});

// Captura los params enviados al modelo para auditar el prompt construido.
function capturingClient(): { client: NarrativeClient; seen: () => Record<string, unknown> } {
  let captured: Record<string, unknown> = {};
  const client: NarrativeClient = {
    // deno-lint-ignore require-await
    create: async (params) => {
      captured = params;
      return {
        content: [{ type: "text", text: JSON.stringify(FAKE_NARRATIVE) }],
        stop_reason: "end_turn",
        usage: { input_tokens: 1, output_tokens: 1 },
      };
    },
  };
  return { client, seen: () => captured };
}

function userMsg(params: Record<string, unknown>): string {
  return (params.messages as { content: string }[])[0].content;
}

// Bug (run 8fe639d0): con web propia el Auditor decía "no existe página web" y
// recomendaba crearla, porque website_url nunca llegaba al prompt.
Deno.test("generateNarrative: la web propia llega al prompt cuando existe", async () => {
  const { client, seen } = capturingClient();
  await generateNarrative(client, {
    clientName: "Mudanzas Roy",
    category: "mudanzas",
    city: "Madrid",
    websiteUrl: "https://mudanzasroy.es",
    presence: {},
    subscores: {} as never,
    overall: null,
    insufficient: [],
  });
  assertStringIncludes(userMsg(seen()), "https://mudanzasroy.es");
  assertStringIncludes(userMsg(seen()), "SÍ");
});

Deno.test("generateNarrative: sin web propia el prompt dice 'no consta'", async () => {
  const { client, seen } = capturingClient();
  await generateNarrative(client, {
    clientName: "Negocio X",
    category: "mudanzas",
    city: "Madrid",
    websiteUrl: null,
    presence: {},
    subscores: {} as never,
    overall: null,
    insufficient: [],
  });
  const msg = userMsg(seen());
  assertStringIncludes(msg, "no consta");
  assert(!msg.includes("https://"));
});

Deno.test("generateNarrative: el SYSTEM prohíbe negar/duplicar una web existente", async () => {
  const { client, seen } = capturingClient();
  await generateNarrative(client, {
    clientName: "Mudanzas Roy",
    category: "mudanzas",
    city: "Madrid",
    websiteUrl: "https://mudanzasroy.es",
    presence: {},
    subscores: {} as never,
    overall: null,
    insufficient: [],
  });
  const system = seen().system as string;
  assertStringIncludes(system, "NUNCA afirmes que no tiene web");
});

Deno.test("NARRATIVE_SCHEMA exige los 3 campos", () => {
  assertEquals(NARRATIVE_SCHEMA.required, ["executive_summary", "findings", "recommendations"]);
});

Deno.test("NARRATIVE_SCHEMA: dimension restringida a las 7 claves (no etiquetas)", () => {
  // Sin enum, el modelo devuelve 'Google Business Profile' y el supervisor
  // no casa la cobertura => 7 flags espurios (run dffb63b6).
  const dimEnum = NARRATIVE_SCHEMA.properties.findings.items.properties.dimension.enum;
  assertEquals(dimEnum, [
    "gbp",
    "reviews",
    "maps_visibility",
    "opportunity",
    "nap",
    "social",
    "local_seo",
  ]);
});
