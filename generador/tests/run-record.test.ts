import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRunRow } from "../scripts/run-record.ts";

test("buildRunRow construye fila con coste 0 (v1) y defaults", () => {
  const row = buildRunRow({ stage: "brief", clientId: "c1", status: "ok", output: { brief: "x" } });
  assert.equal(row.agent, "generador");
  assert.equal(row.stage, "brief");
  assert.equal(row.client_id, "c1");
  assert.equal(row.status, "ok");
  assert.equal(row.cost, 0);
  assert.equal(row.tokens_in, 0);
  assert.equal(row.tokens_out, 0);
  assert.deepEqual(row.output, { brief: "x" });
  assert.deepEqual(row.input, {});
  assert.deepEqual(row.flags, []);
});

test("buildRunRow exige mensaje de error cuando status es error", () => {
  assert.throws(() => buildRunRow({ stage: "construccion", status: "error" }), /requiere.*error/i);
});

test("buildRunRow acepta status error con mensaje", () => {
  const row = buildRunRow({ stage: "construccion", status: "error", error: "build fallo" });
  assert.equal(row.status, "error");
  assert.equal(row.error, "build fallo");
});
