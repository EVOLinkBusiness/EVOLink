// revisor/tests/runtime-checks.test.ts
// Tests de integración LIGERA para los checks de runtime (Wave 2 / Fase D).
// Corren contra el harness serveDir sobre fixtures locales — sin internet abierto.
//
// Decisión de diseño:
//   - checkExternalLinks: testeable con fixture que contiene href externos.
//     En test, el fixture usa URLs de localhost (no internet real). Los externos
//     reales se validan en E2E (Fase F). Aquí sólo verificamos que la función
//     devuelve Finding[] con el tipo correcto.
//   - checkResponsive: testeable con serveDir sobre fixtures; verifica que
//     devuelve Finding[] y captura PNGs en el directorio de trabajo.
//   - checkSlop: testeable con HTML de fixture; usamos la API programática
//     de impeccable (detectHtml) en vez de CLI para evitar spawns externos.
//   - checkLighthouse: NO se testea unitariamente (resulta no determinista en
//     local). Cubierto sólo en E2E (Fase F). La función se testea para que
//     devuelva Finding[] de severidad 'warning'.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { join, resolve } from "node:path";
import { mkdirSync, existsSync } from "node:fs";

import { serveDir } from "../scripts/serve.ts";
import {
  checkExternalLinks,
  checkResponsive,
  checkSlop,
} from "../scripts/runtime-checks.ts";
import type { Finding } from "../scripts/evaluate-checks.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");
const WORK_DIR = join(import.meta.dirname, "..", "previews-qa", "test-runtime");

// Crea el directorio de trabajo para capturas de test si no existe
mkdirSync(WORK_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// 1. checkExternalLinks — enlaces externos rotos (GRAVE)
// ---------------------------------------------------------------------------
describe("checkExternalLinks", () => {
  test("devuelve un array de Finding (puede estar vacío para HTML sin externos)", async () => {
    const server = await serveDir(FIXTURES);
    try {
      const findings = await checkExternalLinks(`${server.url}/clean.html`);
      assert.ok(Array.isArray(findings), "debe devolver Finding[]");
      // clean.html no tiene externos → no debe haber ningún GRAVE de links
      const graves = findings.filter((f) => f.severity === "grave");
      assert.equal(graves.length, 0, "clean.html no debe tener enlaces externos rotos GRAVE");
    } finally {
      await server.stop();
    }
  });

  test("cada Finding tiene check='links', severity, y detail", async () => {
    const server = await serveDir(FIXTURES);
    try {
      const findings = await checkExternalLinks(`${server.url}/broken-link.html`);
      assert.ok(Array.isArray(findings));
      for (const f of findings) {
        assert.equal(f.check, "links", `check debe ser 'links', got '${f.check}'`);
        assert.ok(f.severity === "grave" || f.severity === "warning");
        assert.ok(typeof f.detail === "string" && f.detail.length > 0);
      }
    } finally {
      await server.stop();
    }
  });
});

// ---------------------------------------------------------------------------
// 2. checkResponsive — render 375px y desktop (WARNING)
// ---------------------------------------------------------------------------
describe("checkResponsive", () => {
  test("devuelve Finding[] y genera capturas PNG", async () => {
    const server = await serveDir(FIXTURES);
    try {
      const findings = await checkResponsive(`${server.url}/clean.html`, WORK_DIR);
      assert.ok(Array.isArray(findings), "debe devolver Finding[]");
      // Las capturas deben existir
      const mobilePng = join(WORK_DIR, "mobile-375.png");
      const desktopPng = join(WORK_DIR, "desktop.png");
      assert.ok(existsSync(mobilePng), `debe crear mobile-375.png en ${WORK_DIR}`);
      assert.ok(existsSync(desktopPng), `debe crear desktop.png en ${WORK_DIR}`);
    } finally {
      await server.stop();
    }
  });

  test("cualquier Finding de responsive tiene severity='warning'", async () => {
    const server = await serveDir(FIXTURES);
    try {
      const findings = await checkResponsive(`${server.url}/clean.html`, WORK_DIR);
      for (const f of findings) {
        assert.equal(f.check, "responsive");
        assert.equal(f.severity, "warning", "responsive sólo emite WARNINGs");
      }
    } finally {
      await server.stop();
    }
  });
});

// ---------------------------------------------------------------------------
// 3. checkSlop — anti-slop (WARNING)
// ---------------------------------------------------------------------------
describe("checkSlop", () => {
  test("clean.html → 0 findings o findings todos warning", async () => {
    const findings = await checkSlop(join(FIXTURES, "clean.html"), WORK_DIR);
    assert.ok(Array.isArray(findings));
    for (const f of findings) {
      assert.equal(f.check, "slop");
      assert.equal(f.severity, "warning", "slop sólo emite WARNINGs");
    }
  });

  test("cada Finding de slop tiene check='slop' y detail no vacío", async () => {
    const findings = await checkSlop(join(FIXTURES, "placeholder.html"), WORK_DIR);
    assert.ok(Array.isArray(findings));
    for (const f of findings) {
      assert.equal(f.check, "slop");
      assert.ok(typeof f.detail === "string" && f.detail.length > 0);
    }
  });
});

// ---------------------------------------------------------------------------
// NOTA: checkLighthouse NO se testa unitariamente — resultados no deterministas
// en localhost sin CDN real. Cubierto en tests/e2e.test.ts (Fase F).
// La función siempre devuelve WARNING como máximo (nunca GRAVE) per spec §4.
// ---------------------------------------------------------------------------
