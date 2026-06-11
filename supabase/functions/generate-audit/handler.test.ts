import { assertEquals } from "jsr:@std/assert";
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
