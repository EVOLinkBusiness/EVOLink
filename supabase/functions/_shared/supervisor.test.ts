import { assertEquals } from "jsr:@std/assert";
import { ruleChecks } from "./supervisor.ts";
import type { Narrative } from "./llm.ts";

const goodNarrative: Narrative = {
  executive_summary:
    "Un resumen ejecutivo suficientemente largo para pasar la validación de longitud mínima del supervisor automático.",
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
