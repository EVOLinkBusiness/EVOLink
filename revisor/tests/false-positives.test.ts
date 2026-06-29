// revisor/tests/false-positives.test.ts
// Tests de REGRESION para los dos falsos positivos detectados en la revisión del verificador.
// BLOQUEANTE para cumple-spec §9: "NO marca GRAVE falsos en una preview limpia".
//
// Falso positivo 1 (GRAVE en placeholders):
//   /\bplaceholder\b/i matchea el ATRIBUTO HTML `placeholder="..."` en <input>/<textarea>
//   como si fuera texto de relleno visible. El atributo es UI legítima; no es placeholder.
//
// Falso positivo 2 (GRAVE en links):
//   `href="#"` en un elemento de navegación (logo/marca) se marca GRAVE como "ancla rota".
//   En previews locales, href="#" es un patrón no-op habitual en links de logo que aún no
//   tienen destino; no indica un enlace roto funcional.
//
// Estos tests FALLAN con el código actual y DEBEN PASAR tras el fix del programador.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

import { findPlaceholders, findBrokenLinks } from "../scripts/evaluate-checks.ts";
import { review } from "../scripts/review.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");

// ---------------------------------------------------------------------------
// FP-1: findPlaceholders NO debe marcar el atributo HTML `placeholder=`
// ---------------------------------------------------------------------------
describe("findPlaceholders — NO marca atributos HTML placeholder= (FP-1)", () => {
  test("atributo placeholder en <input> NO se detecta como placeholder visible", () => {
    const html = '<input type="text" placeholder="Tu nombre aquí">';
    const results = findPlaceholders(html);
    // El atributo `placeholder` del input no debe marcarse como texto de relleno
    const falsePositive = results.find((r) => r === "placeholder");
    assert.equal(
      falsePositive,
      undefined,
      `findPlaceholders marca el atributo HTML 'placeholder=' como texto de relleno: ${JSON.stringify(results)}`
    );
  });

  test("atributo placeholder en <textarea> NO se detecta como placeholder visible", () => {
    const html = '<textarea placeholder="Origen, destino y fecha aproximada"></textarea>';
    const results = findPlaceholders(html);
    const falsePositive = results.find((r) => r === "placeholder");
    assert.equal(
      falsePositive,
      undefined,
      `findPlaceholders marca el atributo HTML 'placeholder=' de textarea: ${JSON.stringify(results)}`
    );
  });

  test("texto visible 'placeholder' en el body SÍ debe detectarse como GRAVE", () => {
    // Solo si la palabra aparece como texto visible (no en atributo)
    const html = "<p>Este es un placeholder para el texto real.</p>";
    const results = findPlaceholders(html);
    assert.ok(
      results.length > 0,
      "texto visible 'placeholder' debe detectarse"
    );
  });
});

// ---------------------------------------------------------------------------
// FP-2: findBrokenLinks NO debe marcar href="#" en elementos de navegación como ancla rota GRAVE
// ---------------------------------------------------------------------------
describe("findBrokenLinks — href='#' en logo/nav NO se marca como ancla rota GRAVE (FP-2)", () => {
  test("href='#' en un enlace de logo de navegación NO se marca como roto", () => {
    const html =
      '<a class="brand" href="#"><img src="logo.png" alt="Logo"> Mi empresa</a>' +
      '<nav><a href="#servicios">Servicios</a></nav>' +
      '<section id="servicios"><h2>Servicios</h2></section>';
    const broken = findBrokenLinks(html, ["/", "/index.html"]);
    // href="#" (no-op, no ancla a id) no debe aparecer en broken como roto GRAVE
    assert.ok(
      !broken.includes("#"),
      `href='#' (no-op en logo) no debe marcarse como ancla rota: ${JSON.stringify(broken)}`
    );
  });
});

// ---------------------------------------------------------------------------
// FP-3: review() sobre fixture con formulario legítimo NO produce REJECTED
// Este es el test de integración end-to-end que valida el criterio §9 completo.
// ---------------------------------------------------------------------------
describe("review() — preview con formulario legítimo NO es rejected (FP-1+FP-2 integrados)", () => {
  test("form-legit.html con placeholder= y href='#' en logo → NO rejected", async () => {
    const result = await review(join(FIXTURES, "form-legit.html"));
    const graveFindings = result.output.findings.filter((f) => f.severity === "grave");
    assert.notEqual(
      result.output.verdict,
      "rejected",
      [
        "form-legit.html (preview legítima con formulario y logo) fue RECHAZADA.",
        "Hallazgos GRAVE (deben ser 0 en una preview limpia):",
        JSON.stringify(graveFindings, null, 2),
      ].join("\n")
    );
  });
});
