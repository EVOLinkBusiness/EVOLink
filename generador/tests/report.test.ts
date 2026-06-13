import { test } from "node:test";
import assert from "node:assert/strict";
import { renderInforme, veredictoScript, type EvalResultado } from "../scripts/report.ts";

const base: EvalResultado = {
  cliente_id: "demo",
  url: "http://localhost:1234/",
  timestamp: "2026-06-13T00:00:00Z",
  lighthouse_movil: 95,
  enlaces_rotos: [],
  enlaces_externos_fallidos: [],
  placeholders: [],
  contraste_fallos: [],
  formulario_ok: true,
  capturas: ["eval/movil.png", "eval/escritorio.png"],
};

test("veredicto PASA cuando todo esta limpio", () => {
  assert.equal(veredictoScript(base), "PASA");
});

test("veredicto FALLA con un placeholder y el informe lo lista", () => {
  const r = { ...base, placeholders: ["lorem ipsum"] };
  assert.equal(veredictoScript(r), "FALLA");
  const md = renderInforme(r);
  assert.match(md, /❌ FALLA/);
  assert.match(md, /lorem ipsum/);
});

test("lighthouse null no bloquea el veredicto", () => {
  assert.equal(veredictoScript({ ...base, lighthouse_movil: null }), "PASA");
});
