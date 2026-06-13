import { assertEquals } from "jsr:@std/assert";
import { type Deps, handleExtractPresence } from "./index.ts";
import type { ScreenshotImage } from "../_shared/intake/extract.ts";

const IMG: ScreenshotImage = { media_type: "image/png", data: "BASE64FAKE" };

function makeDeps(overrides: Partial<Deps> = {}): { deps: Deps; writes: Record<string, unknown>[] } {
  const writes: Record<string, unknown>[] = [];
  const deps: Deps = {
    llm: {
      // deno-lint-ignore require-await
      create: async (_p) => ({
        content: [{
          type: "text",
          text: JSON.stringify({ business_name: "Mudanzas Roy", phone: "600123456", reviews_count: 42 }),
        }],
        stop_reason: "end_turn",
        usage: { input_tokens: 1200, output_tokens: 200 },
      }),
    },
    insertRun: (row) => {
      writes.push(row);
      return Promise.resolve();
    },
    ...overrides,
  };
  return { deps, writes };
}

Deno.test("happy path: devuelve borrador + lista campos que faltan + run ok", async () => {
  const { deps, writes } = makeDeps();
  const out = await handleExtractPresence({ images: [IMG] }, deps);
  assertEquals(out.status, "draft");
  assertEquals(out.form.business_name, "Mudanzas Roy");
  assertEquals(out.form.has_maps_listing, true);
  // niche y service_area no salen de una captura => el humano debe rellenarlos
  assertEquals(out.missing_required.includes("niche"), true);
  assertEquals(out.missing_required.includes("service_area"), true);
  const run = writes[0];
  assertEquals(run.agent, "auditor_intake");
  assertEquals(run.status, "ok");
  assertEquals(run.tokens_in, 1200);
});

Deno.test("sin imágenes => error sin llamar al modelo", async () => {
  const { deps, writes } = makeDeps();
  const out = await handleExtractPresence({ images: [] }, deps);
  assertEquals(out.status, "error");
  assertEquals(writes.length, 0);
});

Deno.test("fallo de visión: registra run error y status error", async () => {
  const { deps, writes } = makeDeps({
    llm: { create: () => Promise.reject(new Error("vision timeout")) },
  });
  const out = await handleExtractPresence({ images: [IMG] }, deps);
  assertEquals(out.status, "error");
  const run = writes[0];
  assertEquals(run.status, "error");
  assertEquals(run.agent, "auditor_intake");
});
