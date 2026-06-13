// Suite adversaria (diagnostico v1): el ensamblador no debe reventar ni inventar
// con datos raros/incompletos pero VALIDOS de esquema. Datos invalidos ya los
// rechaza schema.test.ts; aqui probamos entrada valida pero hostil: emojis,
// comillas, HTML, caracteres del espanol, textos enormes y opcionales ausentes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assembleSite } from "../scripts/assemble.ts";

const HOSTIL = '<script>alert(1)</script> "Roy" & Cía ñ ¿¡ áé 🚚';
const LARGO = "Mudanzas ".repeat(200); // ~1800 chars: no debe romper el ensamblado

const marca = {
  nombre_negocio: HOSTIL,
  colores: { primario: "#1f5f3f" }, // solo el minimo requerido; resto -> defaults
};

const plan = {
  tipo: "one-page",
  paginas: [
    {
      ruta: "/",
      titulo: HOSTIL,
      descripcion: LARGO,
      secciones: [
        // Header con nav vacia? nav es required no-vacio -> usamos 1 item con texto hostil.
        { componente: "Header", variante: "A", props: { nav: [{ label: HOSTIL, ruta: "#x" }] } },
        // Hero SIN imagen ni cta_secundario (opcionales ausentes): no deben renderizar nada.
        { componente: "Hero", variante: "A", props: { titulo: HOSTIL, subtitulo: LARGO, cta_label: HOSTIL, cta_ruta: "#c" } },
        // Item de servicio sin 'icono' (opcional) y con texto hostil.
        { componente: "Services", variante: "A", props: { titulo: HOSTIL, items: [{ titulo: HOSTIL, texto: HOSTIL }] } },
        // Testimonial sin 'rol' (opcional ausente).
        { componente: "Testimonials", variante: "B", props: { items: [{ nombre: HOSTIL, texto: HOSTIL }] } },
        { componente: "ContactForm", variante: "A", props: { email: "a@b.es", form_action: "https://x.es/f" } },
        { componente: "Footer", variante: "A", props: { nav: [{ label: HOSTIL, ruta: "#x" }], contacto: { email: "a@b.es" } } },
      ],
    },
  ],
};

function assemble(): { dir: string; index: string } {
  const dir = mkdtempSync(join(tmpdir(), "gen-adv-"));
  writeFileSync(join(dir, "marca.json"), JSON.stringify(marca), "utf8");
  writeFileSync(join(dir, "plan.json"), JSON.stringify(plan), "utf8");
  return { dir, index: "" };
}

test("ensamblador no revienta con entrada valida pero hostil", async () => {
  const { dir } = assemble();
  const out = join(dir, "site");
  await assert.doesNotReject(
    () => assembleSite(join(dir, "marca.json"), join(dir, "plan.json"), out),
    "datos hostiles validos no deben lanzar",
  );
  rmSync(dir, { recursive: true, force: true });
});

test("opcionales ausentes no emiten 'undefined' ni markup roto en el .astro", async () => {
  const { dir } = assemble();
  const out = join(dir, "site");
  await assembleSite(join(dir, "marca.json"), join(dir, "plan.json"), out);
  const src = readFileSync(join(out, "src", "pages", "index.astro"), "utf8");

  // Los props van como JSON dentro de `const sN = {...}` (datos, no markup):
  // el HTML hostil NO debe aparecer como etiqueta suelta fuera de una cadena.
  // Heuristica: cada linea `const sN =` debe ser JSON.parse-able.
  for (const line of src.split("\n")) {
    const m = line.match(/^const s\d+ = (.+);$/);
    if (m) assert.doesNotThrow(() => JSON.parse(m[1]), `const no es JSON valido: ${line.slice(0, 60)}`);
  }
  // El opcional ausente (imagen del Hero) no debe producir el literal "undefined".
  assert.ok(!/\bundefined\b/.test(src), "no debe filtrarse 'undefined' al .astro generado");
  rmSync(dir, { recursive: true, force: true });
});

test("Footer sin nombre_negocio en el plan se deriva de la marca (no falla)", async () => {
  const { dir } = assemble(); // el plan de este fixture OMITE Footer.nombre_negocio a proposito
  const out = join(dir, "site");
  await assembleSite(join(dir, "marca.json"), join(dir, "plan.json"), out);
  const footer = readFileSync(join(out, "src", "pages", "index.astro"), "utf8");
  assert.ok(footer.includes('"nombre_negocio"'), "nombre_negocio debe inyectarse en el Footer desde la marca");
  rmSync(dir, { recursive: true, force: true });
});

test("ensamblado hostil es determinista (misma entrada -> misma salida)", async () => {
  const { dir } = assemble();
  const a = join(dir, "a");
  const b = join(dir, "b");
  await assembleSite(join(dir, "marca.json"), join(dir, "plan.json"), a);
  await assembleSite(join(dir, "marca.json"), join(dir, "plan.json"), b);
  assert.equal(
    readFileSync(join(a, "src", "pages", "index.astro"), "utf8"),
    readFileSync(join(b, "src", "pages", "index.astro"), "utf8"),
  );
  rmSync(dir, { recursive: true, force: true });
});
