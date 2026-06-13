// generador/scripts/assemble.ts
// Ensamblador DETERMINISTA: marca.json + plan-pagina.json -> proyecto Astro
// self-contained en outDir. Misma entrada -> misma salida byte a byte (claves
// ordenadas, sin timestamps, sin aleatoriedad). El modelo nunca escribe Astro:
// escribe el plan; esto es codigo normal y reproducible (principio del Auditor).

import { readFileSync, writeFileSync, rmSync, cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateMarca,
  validatePlanPagina,
  type Marca,
  type Pagina,
  type PlanPagina,
  type Seccion,
} from "./schema.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const GENERADOR_ROOT = join(HERE, "..");
const CATALOGO = join(GENERADOR_ROOT, "catalogo");
const PLANTILLA = join(GENERADOR_ROOT, "plantilla-astro");

const SYS_FALLBACK = 'system-ui, -apple-system, "Segoe UI", sans-serif';

export async function assembleSite(marcaPath: string, planPath: string, outDir: string): Promise<void> {
  const marca = JSON.parse(readFileSync(marcaPath, "utf8")) as Marca;
  const plan = JSON.parse(readFileSync(planPath, "utf8")) as PlanPagina;

  const vm = validateMarca(marca);
  if (!vm.ok) throw new Error(`marca.json invalido:\n- ${vm.errors.join("\n- ")}`);
  const vp = validatePlanPagina(plan);
  if (!vp.ok) throw new Error(`plan-pagina.json invalido:\n- ${vp.errors.join("\n- ")}`);

  // Clean build: misma entrada -> misma salida (sin restos de un ensamblado previo).
  rmSync(outDir, { recursive: true, force: true });
  cpSync(PLANTILLA, outDir, { recursive: true });
  cpSync(CATALOGO, join(outDir, "src", "components", "catalog"), { recursive: true });

  writeFileSync(join(outDir, "src", "styles", "marca.css"), renderMarcaCss(marca), "utf8");

  const pagesDir = join(outDir, "src", "pages");
  for (const pagina of plan.paginas) {
    const dest = join(pagesDir, routeToFile(pagina.ruta));
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, renderPage(pagina, marca), "utf8");
  }
}

function renderMarcaCss(marca: Marca): string {
  const c = marca.colores;
  const fam = (f: string | undefined) => (f ? `"${f}", ${SYS_FALLBACK}` : SYS_FALLBACK);
  return [
    "/* marca.css generado por scripts/assemble.ts desde marca.json. No editar a mano:",
    "   se sobreescribe en cada ensamblado. */",
    ":root {",
    `  --color-primario: ${c.primario};`,
    `  --color-primario-contraste: ${contrastColor(c.primario)};`,
    `  --color-secundario: ${c.secundario ?? "#163a5f"};`,
    `  --color-acento: ${c.acento ?? c.primario};`,
    `  --color-fondo: ${c.fondo ?? "#ffffff"};`,
    `  --color-superficie: #f6f7f9;`,
    `  --color-texto: ${c.texto ?? "#1a1a1a"};`,
    `  --color-texto-suave: #555b66;`,
    `  --color-borde: #e5e7eb;`,
    `  --font-titulares: ${fam(marca.tipografia?.titulares)};`,
    `  --font-cuerpo: ${fam(marca.tipografia?.cuerpo)};`,
    "}",
    "",
  ].join("\n");
}

function renderPage(pagina: Pagina, marca: Marca): string {
  const secciones = pagina.secciones.map((s) => injectDefaults(s, marca));
  const componentes = Array.from(new Set(secciones.map((s) => s.componente + s.variante))).sort();

  const imports = [
    `import Layout from "../components/catalog/Layout.astro";`,
    ...componentes.map((c) => `import ${c} from "../components/catalog/${c}.astro";`),
  ];
  const propConsts = secciones.map((s, i) => `const s${i} = ${stableStringify(s.props)};`);
  const fonts = marca.tipografia?.google_fonts ?? [];
  const body = secciones.map((s, i) => `  <${s.componente}${s.variante} {...s${i}} />`).join("\n");

  return [
    "---",
    ...imports,
    ...propConsts,
    "---",
    "",
    `<Layout titulo={${JSON.stringify(pagina.titulo)}} descripcion={${JSON.stringify(pagina.descripcion)}} google_fonts={${stableStringify(fonts)}}>`,
    body,
    "</Layout>",
    "",
  ].join("\n");
}

// nombre_negocio se deriva de la marca (determinista); el plan puede sobreescribirlo.
function injectDefaults(s: Seccion, marca: Marca): Seccion {
  if (s.componente === "Header" || s.componente === "Footer") {
    return { ...s, props: { nombre_negocio: marca.nombre_negocio, ...s.props } };
  }
  return s;
}

function routeToFile(ruta: string): string {
  const r = ruta.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  return r === "" ? "index.astro" : `${r}.astro`;
}

// JSON con claves ordenadas recursivamente -> salida estable.
function stableStringify(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return Object.keys(obj)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys(obj[k]);
        return acc;
      }, {});
  }
  return value;
}

// Color de texto (#111 o #fff) con mejor contraste sobre el primario (WCAG-ish).
function contrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lin = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return L > 0.4 ? "#111111" : "#ffffff";
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
