// generador/scripts/evaluate.cli.ts
// Uso: npm run evaluate -- <id-cliente>
// Pase de script de la etapa 5: build (si falta) -> sirve dist -> Playwright
// (capturas movil/escritorio, enlaces, formulario) -> checkers deterministas ->
// Lighthouse movil (degradacion elegante) -> clientes/<id>/informe-evaluacion.md.
// Exit 0 = pasa el script, 1 = falla.

import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { execSync } from "node:child_process";
import { chromium, type Page } from "playwright";
import { findPlaceholders, findContrastFailures, findBrokenLinks } from "./evaluate-checks.ts";
import { renderInforme, veredictoScript, type EvalResultado } from "./report.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

main().catch((e) => {
  console.error("Error en la evaluacion:", e instanceof Error ? e.message : e);
  process.exit(1);
});

async function main(): Promise<void> {
  const id = process.argv[2];
  if (!id) {
    console.error("Uso: npm run evaluate -- <id-cliente>");
    process.exit(1);
  }
  const clienteDir = join(REPO_ROOT, "clientes", id);
  const siteDir = join(clienteDir, "site");
  const distDir = join(siteDir, "dist");
  if (!existsSync(distDir)) {
    console.log("dist no existe; construyendo el sitio...");
    execSync("npm run build", { cwd: siteDir, stdio: "inherit" });
  }
  const evalDir = join(clienteDir, "eval");
  mkdirSync(evalDir, { recursive: true });

  const { server, port } = await startStaticServer(distDir);
  const baseUrl = `http://localhost:${port}/`;
  const validRoutes = listRoutes(distDir);

  const capturas: string[] = [];
  let html = "";
  let formularioOk = false;
  let enlacesExternosFallidos: string[] = [];

  const browser = await chromium.launch();
  try {
    const ctxM = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const pageM = await ctxM.newPage();
    await pageM.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    await pageM.screenshot({ path: join(evalDir, "movil.png"), fullPage: true });
    capturas.push("eval/movil.png");
    html = await pageM.content();
    formularioOk = (await pageM.locator("form[action]").count()) > 0;
    const externos = await pageM.$$eval("a[href^='http']", (as) =>
      (as as HTMLAnchorElement[]).map((a) => a.href),
    );
    enlacesExternosFallidos = await checkExternal(pageM, externos);
    await ctxM.close();

    const ctxD = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const pageD = await ctxD.newPage();
    await pageD.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    await pageD.screenshot({ path: join(evalDir, "escritorio.png"), fullPage: true });
    capturas.push("eval/escritorio.png");
    await ctxD.close();
  } finally {
    await browser.close();
  }

  const placeholders = findPlaceholders(html);
  const contraste = findContrastFailures(html);
  const enlacesRotos = findBrokenLinks(html, validRoutes);
  const lighthouseMovil = await runLighthouse(baseUrl, evalDir).catch((e) => {
    console.warn("Lighthouse no ejecutado:", e instanceof Error ? e.message : e);
    return null;
  });

  server.close();

  const resultado: EvalResultado = {
    cliente_id: id,
    url: baseUrl,
    timestamp: new Date().toISOString(),
    lighthouse_movil: lighthouseMovil,
    enlaces_rotos: enlacesRotos,
    enlaces_externos_fallidos: enlacesExternosFallidos,
    placeholders,
    contraste_fallos: contraste,
    formulario_ok: formularioOk,
    capturas,
  };

  writeFileSync(join(clienteDir, "informe-evaluacion.md"), renderInforme(resultado), "utf8");
  writeFileSync(join(evalDir, "resultado.json"), JSON.stringify(resultado, null, 2), "utf8");

  const v = veredictoScript(resultado);
  console.log(`\nVeredicto del pase de script: ${v}`);
  console.log(`Informe: clientes/${id}/informe-evaluacion.md`);
  process.exit(v === "PASA" ? 0 : 1);
}

function startStaticServer(distDir: string): Promise<{ server: Server; port: number }> {
  const server = createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = join(distDir, urlPath);
      if (urlPath.endsWith("/")) filePath = join(filePath, "index.html");
      if (!existsSync(filePath)) {
        if (existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;
        else if (existsSync(join(filePath, "index.html"))) filePath = join(filePath, "index.html");
        else {
          res.statusCode = 404;
          res.end("not found");
          return;
        }
      }
      res.setHeader("content-type", MIME[extname(filePath)] ?? "application/octet-stream");
      res.end(readFileSync(filePath));
    } catch {
      res.statusCode = 500;
      res.end("error");
    }
  });
  return new Promise((resolve) => {
    server.listen(0, () => {
      const addr = server.address();
      resolve({ server, port: typeof addr === "object" && addr ? addr.port : 0 });
    });
  });
}

function listRoutes(distDir: string): string[] {
  const routes: string[] = [];
  const walk = (dir: string, prefix: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name === "_astro") continue;
        walk(join(dir, entry.name), `${prefix}${entry.name}/`);
      } else if (entry.name === "index.html") {
        routes.push(prefix === "" ? "/" : `/${prefix.replace(/\/$/, "")}`);
      } else if (entry.name.endsWith(".html")) {
        routes.push(`/${prefix}${entry.name.replace(/\.html$/, "")}`);
      }
    }
  };
  walk(distDir, "");
  return Array.from(new Set(routes));
}

async function checkExternal(page: Page, urls: string[]): Promise<string[]> {
  const failed: string[] = [];
  for (const u of Array.from(new Set(urls))) {
    try {
      const head = await page.request.head(u, { timeout: 8000 });
      if (head.status() >= 400) {
        const get = await page.request.get(u, { timeout: 8000 });
        if (get.status() >= 400) failed.push(`${u} (${get.status()})`);
      }
    } catch {
      failed.push(`${u} (sin respuesta)`);
    }
  }
  return failed;
}

async function runLighthouse(url: string, evalDir: string): Promise<number> {
  const ChromeLauncher = await import("chrome-launcher");
  const { default: lighthouse } = await import("lighthouse");
  // userDataDir local: el temp global del sistema esta restringido en algunos
  // entornos (EPERM); un perfil dentro del repo siempre es escribible.
  const userDataDir = join(evalDir, ".chrome-profile");
  mkdirSync(userDataDir, { recursive: true });
  const chrome = await ChromeLauncher.launch({
    chromePath: chromium.executablePath(),
    userDataDir,
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "silent",
      onlyCategories: ["performance"],
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2, disabled: false },
    });
    const score = result?.lhr?.categories?.performance?.score ?? 0;
    return Math.round(score * 100);
  } finally {
    await chrome.kill();
  }
}
