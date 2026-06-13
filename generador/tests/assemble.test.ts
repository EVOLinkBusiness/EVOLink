import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, rmSync } from "node:fs";
import { assembleSite } from "../scripts/assemble.ts";

const OUT = "tests/.tmp/site";
const MARCA = "tests/fixtures/marca.json";
const PLAN = "tests/fixtures/plan-pagina.json";

test("assemble es determinista y monta el sitio", async () => {
  rmSync(OUT, { recursive: true, force: true });
  await assembleSite(MARCA, PLAN, OUT);
  const a = readFileSync(`${OUT}/src/pages/index.astro`, "utf8");

  rmSync(OUT, { recursive: true, force: true });
  await assembleSite(MARCA, PLAN, OUT);
  const b = readFileSync(`${OUT}/src/pages/index.astro`, "utf8");

  assert.equal(a, b, "misma entrada debe producir la misma salida (determinismo)");
  assert.ok(existsSync(`${OUT}/src/components/catalog/HeroA.astro`), "el catalogo se copia al sitio");
  assert.ok(existsSync(`${OUT}/src/styles/marca.css`), "marca.css se genera");
  assert.match(a, /import HeroA from/, "la pagina importa la variante usada");
  assert.match(a, /<HeroA \{\.\.\.s\d\} \/>/, "la pagina renderiza la variante usada");

  const marcaCss = readFileSync(`${OUT}/src/styles/marca.css`, "utf8");
  assert.match(marcaCss, /--color-primario:\s*#1f5f3f/, "marca.css refleja el color primario del cliente");

  rmSync(OUT, { recursive: true, force: true });
});

test("assemble aborta con plan invalido", async () => {
  await assert.rejects(
    () => assembleSite(MARCA, "tests/fixtures/marca.json", `${OUT}-bad`),
    /plan-pagina\.json invalido/,
  );
});
