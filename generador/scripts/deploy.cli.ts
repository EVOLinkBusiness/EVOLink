// generador/scripts/deploy.cli.ts
// Uso: npm run deploy -- <id-cliente> [--production]
// Despliega clientes/<id>/site/dist a Cloudflare Pages. Por defecto SOLO preview
// (URL temporal). Produccion requiere --production Y confirmacion humana explicita
// (EVOLINK_CONFIRM_PRODUCTION=yes): nunca dominio definitivo sin orden humana.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");

const id = process.argv[2];
const production = process.argv.includes("--production");
if (!id) {
  console.error("Uso: npm run deploy -- <id-cliente> [--production]");
  process.exit(1);
}

const distDir = join(REPO_ROOT, "clientes", id, "site", "dist");
if (!existsSync(distDir)) {
  console.error(`No existe ${distDir}. Construye el sitio (build/evaluate) antes de desplegar.`);
  process.exit(1);
}

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  console.error(
    "Faltan credenciales de Cloudflare: CLOUDFLARE_API_TOKEN y CLOUDFLARE_ACCOUNT_ID (env local, nunca commiteadas).",
  );
  process.exit(1);
}

// Guard de produccion: doble cerrojo (flag + confirmacion humana).
if (production && process.env.EVOLINK_CONFIRM_PRODUCTION !== "yes") {
  console.error(
    "Deploy a produccion bloqueado: requiere --production Y EVOLINK_CONFIRM_PRODUCTION=yes (confirmacion humana). Abortado.",
  );
  process.exit(1);
}

const branch = production ? "main" : "preview";
const projectName = `evolink-${id}`;
console.log(`Desplegando '${id}' a Cloudflare Pages (rama ${branch})...`);

try {
  execSync(
    `npx wrangler pages deploy "${distDir}" --project-name=${projectName} --branch=${branch}`,
    { stdio: "inherit", cwd: REPO_ROOT },
  );
} catch {
  console.error("Fallo el deploy con wrangler.");
  process.exit(1);
}
