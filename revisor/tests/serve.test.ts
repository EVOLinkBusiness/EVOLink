// revisor/tests/serve.test.ts
// Test TDD del harness http.server (serve.ts).
// Verifica: arranca en puerto libre, sirve archivos, stop() termina el proceso.
// El test NO debe dejar procesos colgados aunque falle (try/finally).

import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

import { serveDir } from "../scripts/serve.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");

test("serveDir arranca en puerto libre y sirve archivos estáticos", async () => {
  const server = await serveDir(FIXTURES);
  try {
    // El servidor debe devolver URL bien formada
    assert.match(server.url, /^http:\/\/localhost:\d+$/);

    // Debe servir clean.html con status 200
    const res = await fetch(`${server.url}/clean.html`);
    assert.equal(res.status, 200, `esperaba 200 al servir clean.html, got ${res.status}`);

    // El body debe contener contenido HTML real
    const body = await res.text();
    assert.ok(body.includes("<html"), "el body debe contener HTML");
  } finally {
    await server.stop();
  }
});

test("stop() termina el proceso sin dejar el puerto ocupado", async () => {
  const server = await serveDir(FIXTURES);
  const url = server.url;
  await server.stop();

  // Tras stop, el servidor no debe responder (fetch debe rechazar o dar error de red)
  let errorThrown = false;
  try {
    // Damos un tiempo mínimo para que el OS libere el puerto
    await new Promise((r) => setTimeout(r, 100));
    await fetch(`${url}/clean.html`, { signal: AbortSignal.timeout(500) });
  } catch {
    errorThrown = true;
  }
  assert.ok(errorThrown, "tras stop() el servidor no debe aceptar conexiones");
});

test("stop() es idempotente (llamar dos veces no lanza error)", async () => {
  const server = await serveDir(FIXTURES);
  await server.stop();
  // Segunda llamada no debe lanzar
  await server.stop();
});
