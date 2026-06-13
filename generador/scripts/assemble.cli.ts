// generador/scripts/assemble.cli.ts
// Uso: npm run assemble -- <id-cliente>
// Lee clientes/<id>/{marca.json, plan-pagina.json} (raiz del repo) y escribe
// clientes/<id>/site/ (proyecto Astro listo para `npm install && npm run build`).

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { assembleSite } from "./assemble.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");

const id = process.argv[2];
if (!id) {
  console.error("Uso: npm run assemble -- <id-cliente>");
  process.exit(1);
}

const base = join(REPO_ROOT, "clientes", id);
const out = join(base, "site");
await assembleSite(join(base, "marca.json"), join(base, "plan-pagina.json"), out);
console.log(`Sitio ensamblado en ${out}`);
