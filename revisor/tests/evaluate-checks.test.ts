// revisor/tests/evaluate-checks.test.ts
// Tests TDD — primero RED, luego GREEN en evaluate-checks.ts
// Cubre: verdict, placeholders, contrast, broken-links, domain-mix

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  computeVerdict,
  findPlaceholders,
  findContrastFailures,
  findBrokenLinks,
  findDomainIssues,
  type Finding,
} from "../scripts/evaluate-checks.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");
const read = (f: string) => readFileSync(join(FIXTURES, f), "utf8");

// ---------------------------------------------------------------------------
// 1. Regla de veredicto
// ---------------------------------------------------------------------------
describe("computeVerdict", () => {
  test("sin hallazgos → pass", () => {
    assert.equal(computeVerdict([]), "pass");
  });

  test("solo warnings → pass_with_warnings", () => {
    const findings: Finding[] = [
      { check: "responsive", severity: "warning", detail: "overflow en 375px" },
    ];
    assert.equal(computeVerdict(findings), "pass_with_warnings");
  });

  test("≥1 grave → rejected", () => {
    const findings: Finding[] = [
      { check: "links", severity: "grave", detail: "enlace roto: /no-existe" },
    ];
    assert.equal(computeVerdict(findings), "rejected");
  });

  test("grave + warning → rejected (grave tiene prioridad)", () => {
    const findings: Finding[] = [
      { check: "links", severity: "grave", detail: "enlace roto" },
      { check: "responsive", severity: "warning", detail: "overflow" },
    ];
    assert.equal(computeVerdict(findings), "rejected");
  });
});

// ---------------------------------------------------------------------------
// 2. Placeholders (GRAVE)
// ---------------------------------------------------------------------------
describe("findPlaceholders", () => {
  test("detecta lorem ipsum, TODO y href vacío", () => {
    const results = findPlaceholders(read("placeholder.html"));
    assert.ok(results.length > 0, "debe detectar placeholders");
  });

  test("no marca HTML limpio", () => {
    assert.equal(
      findPlaceholders(read("clean.html")).length,
      0,
      "HTML limpio no debe tener placeholders"
    );
  });

  test("detecta 'john doe'", () => {
    assert.ok(findPlaceholders("<p>John Doe es el cliente</p>").length > 0);
  });

  test("no marca contenido real en español", () => {
    assert.equal(
      findPlaceholders("<h1>Empresa de mudanzas en Madrid desde 1990</h1>").length,
      0
    );
  });
});

// ---------------------------------------------------------------------------
// 3. Contraste AA (GRAVE)
// ---------------------------------------------------------------------------
describe("findContrastFailures", () => {
  test("detecta contraste insuficiente (gris claro sobre blanco)", () => {
    assert.ok(findContrastFailures(read("low-contrast.html")).length > 0);
  });

  test("no marca contraste correcto (#111 sobre #fff)", () => {
    assert.equal(
      findContrastFailures('<p style="color:#111111;background-color:#ffffff">ok</p>').length,
      0
    );
  });

  test("no marca HTML sin estilos inline de color", () => {
    assert.equal(
      findContrastFailures(read("clean.html")).length,
      0
    );
  });
});

// ---------------------------------------------------------------------------
// 4. Enlaces internos rotos (GRAVE)
// ---------------------------------------------------------------------------
describe("findBrokenLinks", () => {
  test("detecta enlace interno roto", () => {
    assert.ok(
      findBrokenLinks(read("broken-link.html"), ["/", "/servicios"]).length > 0
    );
  });

  test("no marca enlace válido ni enlaces externos/tel/mailto", () => {
    const html = '<a href="/">x</a><a href="/servicios">y</a>' +
      '<a href="https://x.com">z</a><a href="tel:944">t</a>' +
      '<a href="mailto:a@b.com">m</a>';
    assert.equal(findBrokenLinks(html, ["/", "/servicios"]).length, 0);
  });

  test("valida anclas internas por id existente", () => {
    assert.equal(
      findBrokenLinks('<a href="#contacto">ir</a><section id="contacto"></section>', ["/"]).length,
      0
    );
  });

  test("marca ancla que apunta a id inexistente", () => {
    assert.ok(
      findBrokenLinks('<a href="#fantasma">ir</a>', ["/"]).length > 0
    );
  });
});

// ---------------------------------------------------------------------------
// 5. Mezcla de dominios / URL malformada (GRAVE, NUEVO)
// ---------------------------------------------------------------------------
describe("findDomainIssues", () => {
  test("detecta mezcla .com / .es del mismo sitio como grave", () => {
    const results = findDomainIssues(read("domain-mix.html"));
    const hasMix = results.some((r) => r.detail.includes("dominio"));
    assert.ok(hasMix, `debe detectar mezcla de dominio canónico: ${JSON.stringify(results)}`);
  });

  test("detecta URL malformada (doble esquema https://http://)", () => {
    const results = findDomainIssues(read("domain-mix.html"));
    const hasMalformed = results.some((r) => r.detail.includes("malformada") || r.detail.includes("malformed"));
    assert.ok(hasMalformed, `debe detectar URL malformada: ${JSON.stringify(results)}`);
  });

  test("detecta URL con host vacío (http://)", () => {
    const html = '<a href="http://">link roto</a>';
    const results = findDomainIssues(html);
    assert.ok(results.length > 0, "host vacío debe detectarse como grave");
  });

  test("detecta URL con espacios en host", () => {
    const html = '<a href="https://mi sitio.com/page">link</a>';
    const results = findDomainIssues(html);
    assert.ok(results.length > 0, "espacios en host deben detectarse como grave");
  });

  test("no marca enlaces internos relativos", () => {
    const results = findDomainIssues(read("clean.html"));
    assert.equal(
      results.length,
      0,
      `HTML limpio no debe tener issues de dominio: ${JSON.stringify(results)}`
    );
  });

  test("no marca dominio único consistente", () => {
    const html =
      '<a href="https://mudanzasroy.com/">Inicio</a>' +
      '<a href="https://mudanzasroy.com/servicios">Servicios</a>' +
      '<a href="https://mudanzasroy.com/contacto">Contacto</a>';
    const results = findDomainIssues(html);
    assert.equal(
      results.length,
      0,
      `Un solo dominio no debe marcarse como grave: ${JSON.stringify(results)}`
    );
  });
});
