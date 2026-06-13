import { test } from "node:test";
import assert from "node:assert/strict";
import { validateMarca, validatePlanPagina } from "../scripts/schema.ts";

test("validateMarca acepta una marca valida", () => {
  const r = validateMarca({ nombre_negocio: "Reformas X", colores: { primario: "#1a5fb4" } });
  assert.equal(r.ok, true);
});

test("validateMarca rechaza marca sin color primario", () => {
  const r = validateMarca({ nombre_negocio: "X", colores: {} });
  assert.equal(r.ok, false);
});

test("validatePlanPagina acepta un plan valido", () => {
  const r = validatePlanPagina({
    tipo: "one-page",
    paginas: [
      {
        ruta: "/",
        titulo: "T",
        descripcion: "D",
        secciones: [
          { componente: "Hero", variante: "A", props: { titulo: "t", subtitulo: "s", cta_label: "c", cta_ruta: "/" } },
        ],
      },
    ],
  });
  assert.equal(r.ok, true);
});

test("validatePlanPagina rechaza componente desconocido", () => {
  const r = validatePlanPagina({
    tipo: "one-page",
    paginas: [{ ruta: "/", titulo: "T", descripcion: "D", secciones: [{ componente: "Nope", variante: "A", props: {} }] }],
  });
  assert.equal(r.ok, false);
});

test("validatePlanPagina rechaza props requeridas ausentes", () => {
  const r = validatePlanPagina({
    tipo: "one-page",
    paginas: [{ ruta: "/", titulo: "T", descripcion: "D", secciones: [{ componente: "Hero", variante: "A", props: { titulo: "t" } }] }],
  });
  assert.equal(r.ok, false);
});
