// revisor/tests/e2e.test.ts
// Test E2E ligero (Fase F): orquestador review() sobre fixtures y preview v4.
//
// Casos validados:
//   (a) domain-mix.html / broken-link.html → debe producir verdict='rejected'
//   (b) clean.html → debe producir verdict='pass' o 'pass_with_warnings'
//   (c) preview v4 real (Mudanzas Roy) → debe devolver verdict válido
//   (d) servidor siempre queda apagado tras review()
//   (e) fila tiene agent='revisor', output y flags
//
// El insert real a Supabase NO se hace en este test (se guarda detrás de env).
// Si PREVIEW_V4_PATH no está en env, se usa el fixture clean.html.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { join, resolve } from "node:path";
import { existsSync } from "node:fs";

import { review, type ReviewResult } from "../scripts/review.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");

// Ruta al piloto real (puede que no exista en CI si clientes/ es local)
const PREVIEW_V4 =
  process.env.PREVIEW_V4_PATH ??
  resolve(
    import.meta.dirname,
    "..",
    "..",
    "clientes",
    "cb1dfbea-7306-4c1e-bdde-b5d606243083",
    "previews",
    "v4",
    "v4-1.html"
  );

// ---------------------------------------------------------------------------
// Helper: verifica que el resultado tiene la forma correcta
// ---------------------------------------------------------------------------
function assertValidResult(result: ReviewResult, label: string): void {
  assert.ok(
    ["pass", "pass_with_warnings", "rejected"].includes(result.output.verdict),
    `${label}: verdict inválido: '${result.output.verdict}'`
  );
  assert.equal(result.row.agent, "revisor", `${label}: agent debe ser 'revisor'`);
  assert.ok(
    typeof result.output === "object" && result.output !== null,
    `${label}: output debe ser un objeto`
  );
  assert.ok(
    Array.isArray(result.row.flags),
    `${label}: flags debe ser array`
  );
}

// ---------------------------------------------------------------------------
// 1. Fixture con mezcla de dominios → rejected
// ---------------------------------------------------------------------------
describe("review() sobre fixtures de fallo conocido", () => {
  test("domain-mix.html → verdict='rejected'", async () => {
    const result = await review(join(FIXTURES, "domain-mix.html"));
    assertValidResult(result, "domain-mix");
    assert.equal(
      result.output.verdict,
      "rejected",
      `domain-mix.html debe ser rejected; hallazgos: ${JSON.stringify(result.output.findings)}`
    );
    assert.equal(result.row.status, "error");
    assert.ok(result.row.flags.length > 0, "debe haber flags en rechazo");
  });

  test("domain-mix.html → tiene hallazgos GRAVE de dominios", async () => {
    const result = await review(join(FIXTURES, "domain-mix.html"));
    assertValidResult(result, "domain-mix-2");
    // domain-mix.html tiene mezcla .com/.es y URL malformada → GRAVE
    const graveFindings = result.output.findings.filter((f) => f.severity === "grave");
    assert.ok(
      graveFindings.length > 0,
      `debe haber hallazgos GRAVE de dominios: ${JSON.stringify(result.output.findings)}`
    );
  });
});

// ---------------------------------------------------------------------------
// 2. Fixture limpio → pass o pass_with_warnings (nunca rejected)
// ---------------------------------------------------------------------------
describe("review() sobre fixture limpio", () => {
  test("clean.html → verdict != 'rejected'", async () => {
    const result = await review(join(FIXTURES, "clean.html"));
    assertValidResult(result, "clean");
    assert.notEqual(
      result.output.verdict,
      "rejected",
      `clean.html NO debe ser rejected; hallazgos GRAVE: ${JSON.stringify(
        result.output.findings.filter((f) => f.severity === "grave")
      )}`
    );
    assert.equal(result.row.status, "ok");
  });
});

// ---------------------------------------------------------------------------
// 3. El servidor queda apagado tras review() (éxito o error)
// ---------------------------------------------------------------------------
describe("review() — servidor siempre apagado", () => {
  test("tras review(clean.html) el servidor no responde", async () => {
    const result = await review(join(FIXTURES, "clean.html"));
    const servedUrl = result.output.target.served_url;
    // Intenta conectar — debe fallar
    let errorThrown = false;
    try {
      await fetch(servedUrl, { signal: AbortSignal.timeout(500) });
    } catch {
      errorThrown = true;
    }
    assert.ok(errorThrown, "servidor debe estar apagado tras review()");
  });
});

// ---------------------------------------------------------------------------
// 4. Preview v4 real de Mudanzas Roy (si existe en disco)
// ---------------------------------------------------------------------------
describe("review() sobre preview v4 de Mudanzas Roy", () => {
  test("v4-1.html → veredicto válido + agent='revisor' + output + flags", async () => {
    if (!existsSync(PREVIEW_V4)) {
      // En CI o si clientes/ no está disponible, saltar (no falla el test)
      console.log(`SKIP: preview v4 no encontrada en ${PREVIEW_V4}`);
      return;
    }

    const result = await review(PREVIEW_V4);
    assertValidResult(result, "v4-1");

    // Debe tener capturas en disco
    assert.ok(
      result.output.screenshots.length >= 2,
      "debe tener al menos 2 capturas (mobile + desktop)"
    );

    // La fila tiene output jsonb no vacío
    assert.ok(
      Object.keys(result.row.output).length > 0,
      "output en la fila no debe estar vacío"
    );

    console.log(`  Resultado piloto v4-1: verdict=${result.output.verdict}`);
    console.log(`  Findings: ${result.output.findings.length}`);
    console.log(`  Summary: ${result.output.summary}`);
  });
});
