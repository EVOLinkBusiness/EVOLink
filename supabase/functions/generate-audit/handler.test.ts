import { assertAlmostEquals, assertEquals, assertStringIncludes } from "jsr:@std/assert";
import { type Deps, handleGenerateAudit } from "./index.ts";

function makeDeps(overrides: Partial<Deps> = {}): { deps: Deps; writes: Record<string, unknown>[] } {
  const writes: Record<string, unknown>[] = [];
  const deps: Deps = {
    loadClient: () =>
      Promise.resolve({
        id: "c1",
        name: "Mudanzas Roy",
        category: "mudanzas",
        city: "Madrid",
        website_url: null,
        presence_data: {
          gbp: {
            has_hours: true,
            photos_count: 5,
            has_category: true,
            has_description: true,
            has_phone: true,
          },
        },
      }),
    insertAudit: (row) => {
      writes.push({ table: "audits", ...row });
      return Promise.resolve("a1");
    },
    insertRun: (row) => {
      writes.push({ table: "agent_runs", ...row });
      return Promise.resolve();
    },
    llm: {
      create: () =>
        Promise.resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              executive_summary:
                "Resumen ejecutivo lo bastante largo para pasar todas las reglas del supervisor sin generar flags.",
              findings: [{ dimension: "gbp", finding: "ok", severity: "low" }],
              recommendations: [
                { priority: 1, action: "a", impact: "i" },
                { priority: 2, action: "b", impact: "i" },
                { priority: 3, action: "c", impact: "i" },
              ],
            }),
          }],
          stop_reason: "end_turn",
          usage: { input_tokens: 100, output_tokens: 50 },
        }),
    },
    ...overrides,
  };
  return { deps, writes };
}

Deno.test("happy path: crea audit draft + agent_run ok", async () => {
  const { deps, writes } = makeDeps();
  const out = await handleGenerateAudit({ client_id: "c1" }, deps);
  assertEquals(out.status, "draft");
  const audit = writes.find((w) => w.table === "audits")!;
  assertEquals(audit.status, "draft");
  assertEquals(typeof audit.overall_score, "number");
  const run = writes.find((w) => w.table === "agent_runs")!;
  assertEquals(run.status, "ok");
  assertEquals(run.agent, "auditor");
});

Deno.test("coste: narrativa (Opus) y supervisor (Haiku) se tarifan por separado", async () => {
  // 1ª llamada = narrativa (Opus $5/$25); 2ª = supervisor (Haiku $1/$5).
  // El bug original sumaba ambos y aplicaba tarifa Opus a todo => coste inflado.
  let call = 0;
  const { deps, writes } = makeDeps({
    llm: {
      // deno-lint-ignore require-await
      create: async () => {
        call += 1;
        if (call === 1) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                executive_summary:
                  "Resumen ejecutivo lo bastante largo para pasar todas las reglas del supervisor sin generar ningún flag.",
                findings: [{ dimension: "gbp", finding: "ok", severity: "low" }],
                recommendations: [
                  { priority: 1, action: "a", impact: "i" },
                  { priority: 2, action: "b", impact: "i" },
                  { priority: 3, action: "c", impact: "i" },
                ],
              }),
            }],
            stop_reason: "end_turn",
            usage: { input_tokens: 1000, output_tokens: 500 }, // Opus
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ flags: [] }) }],
          stop_reason: "end_turn",
          usage: { input_tokens: 200, output_tokens: 40 }, // Haiku
        };
      },
    },
  });
  await handleGenerateAudit({ client_id: "c1" }, deps);
  const run = writes.find((w) => w.table === "agent_runs")!;
  // tokens: totales (Opus + Haiku)
  assertEquals(run.tokens_in, 1200);
  assertEquals(run.tokens_out, 540);
  // coste: Opus 1000·5 + 500·25 ; Haiku 200·1 + 40·5 ; todo /1e6
  const expected = (1000 * 5 + 500 * 25 + 200 * 1 + 40 * 5) / 1_000_000;
  assertAlmostEquals(run.cost as number, expected, 1e-12);
});

Deno.test("website_url del cliente llega al prompt de la narrativa (regresión run 8fe639d0)", async () => {
  let firstUserMsg = "";
  let call = 0;
  const { deps } = makeDeps({
    loadClient: () =>
      Promise.resolve({
        id: "c1",
        name: "Mudanzas Roy",
        category: "mudanzas",
        city: "Madrid",
        website_url: "https://mudanzasroy.es",
        presence_data: {},
      }),
    llm: {
      // deno-lint-ignore require-await
      create: async (params) => {
        call += 1;
        if (call === 1) {
          firstUserMsg = (params.messages as { content: string }[])[0].content;
        }
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              executive_summary:
                "Resumen ejecutivo lo bastante largo para pasar todas las reglas del supervisor sin generar ningún flag.",
              findings: [{ dimension: "gbp", finding: "ok", severity: "low" }],
              recommendations: [
                { priority: 1, action: "a", impact: "i" },
                { priority: 2, action: "b", impact: "i" },
                { priority: 3, action: "c", impact: "i" },
              ],
            }),
          }],
          stop_reason: "end_turn",
          usage: { input_tokens: 10, output_tokens: 5 },
        };
      },
    },
  });
  await handleGenerateAudit({ client_id: "c1" }, deps);
  assertStringIncludes(firstUserMsg, "https://mudanzasroy.es");
});

Deno.test("fallo de Claude: guarda subscores deterministas + run error", async () => {
  const { deps, writes } = makeDeps({
    llm: { create: () => Promise.reject(new Error("timeout")) },
  });
  const out = await handleGenerateAudit({ client_id: "c1" }, deps);
  assertEquals(out.status, "draft");
  assertEquals(out.narrative_error, true);
  const audit = writes.find((w) => w.table === "audits")!;
  // los números deterministas se guardan igual (spec §9)
  assertEquals(typeof audit.overall_score, "number");
  const run = writes.find((w) => w.table === "agent_runs")!;
  assertEquals(run.status, "error");
});
