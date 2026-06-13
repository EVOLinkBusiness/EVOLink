import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findPlaceholders, findContrastFailures, findBrokenLinks } from "../scripts/evaluate-checks.ts";

const read = (f: string) => readFileSync(`tests/fixtures/${f}`, "utf8");

test("findPlaceholders detecta lorem / TODO / href vacio", () => {
  assert.ok(findPlaceholders(read("placeholder.html")).length > 0);
});

test("findPlaceholders no marca HTML limpio", () => {
  assert.equal(findPlaceholders("<h1>Reformas en Bilbao</h1><p>Presupuesto cerrado.</p>").length, 0);
});

test("findContrastFailures detecta contraste insuficiente", () => {
  assert.ok(findContrastFailures(read("low-contrast.html")).length > 0);
});

test("findContrastFailures no marca contraste correcto", () => {
  assert.equal(findContrastFailures('<p style="color:#111111;background-color:#ffffff">ok</p>').length, 0);
});

test("findBrokenLinks detecta enlace interno roto", () => {
  assert.ok(findBrokenLinks(read("broken-link.html"), ["/", "/servicios"]).length > 0);
});

test("findBrokenLinks no marca enlaces validos ni externos", () => {
  const html = '<a href="/">x</a><a href="/servicios">y</a><a href="https://x.com">z</a><a href="tel:944">t</a>';
  assert.equal(findBrokenLinks(html, ["/", "/servicios"]).length, 0);
});

test("findBrokenLinks valida anclas internas por id", () => {
  assert.equal(findBrokenLinks('<a href="#contacto">ir</a><section id="contacto"></section>', ["/"]).length, 0);
  assert.ok(findBrokenLinks('<a href="#fantasma">ir</a>', ["/"]).length > 0);
});
