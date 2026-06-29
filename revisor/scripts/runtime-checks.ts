// revisor/scripts/runtime-checks.ts
// Checks de runtime (Wave 2 / Fase D): enlaces externos, responsive+capturas,
// anti-slop, lighthouse. Todos reciben una URL servida (de serveDir) y/o rutas
// en disco, y devuelven Finding[].
//
// Decisiones de diseño:
//   - checkExternalLinks: usa Playwright para interceptar respuestas de red.
//     Sondea sólo los href absolutos (https?://...) encontrados en el HTML.
//     Un 4xx/5xx → Finding GRAVE check:"links".
//     NOTA: en unit tests, se usa sobre fixtures locales (sin internet real).
//     El test E2E (Fase F) cubre el caso de red externa real.
//
//   - checkResponsive: viewports 375px (móvil) y desktop (1280x800).
//     Captura PNG de cada uno en el directorio de trabajo del run.
//     Detecta overflow horizontal como WARNING.
//     severity: siempre "warning" (revisión humana, no bloquea).
//
//   - checkSlop: invoca la API programática de impeccable (detectHtml)
//     sobre el archivo HTML en disco (engine: static-html). Degradado a WARNING.
//     Motivo: la API de impeccable retorna hallazgos de calidad de diseño que
//     son subjetivos; nunca justifican rechazar una web automáticamente.
//     Se prefiere la API programática sobre el CLI para evitar spawns externos
//     y simplificar el test.
//
//   - checkLighthouse: performance móvil vía la API de lighthouse + Playwright
//     (sin Chrome real del SO — usa el Chromium de playwright).
//     SIEMPRE devuelve WARNING como máximo, nunca GRAVE (spec §4 §2).
//     Motivo: en localhost los números no son representativos (sin CDN/red real).
//     Si lighthouse falla (timeout, dependencia rota), degrada silenciosamente
//     a un único WARNING informativo con el error técnico en detail.
//     El test unitario de lighthouse se omite (no determinista en local);
//     cubierto por E2E (Fase F).

import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Finding } from "./evaluate-checks.ts";

// ---------------------------------------------------------------------------
// 1. checkExternalLinks — enlaces externos rotos (GRAVE)
// ---------------------------------------------------------------------------

/**
 * Navega pageUrl con Playwright, recoge todos los href absolutos del DOM,
 * los sondea con fetch (HEAD primero, GET como fallback) y devuelve Finding[]
 * GRAVE por cada uno que responda 4xx o 5xx.
 *
 * No inspecciona recursos estáticos (imágenes, CSS, JS) — sólo <a href>.
 */
export async function checkExternalLinks(pageUrl: string): Promise<Finding[]> {
  const findings: Finding[] = [];
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 15_000 });

    // Extrae todos los href absolutos del DOM que NO sean de localhost
    // (Playwright convierte hrefs relativos a absolutos con el host del servidor;
    //  esos no son enlaces externos reales — los filtramos por host)
    const pageOrigin = new URL(pageUrl).origin;
    const hrefs: string[] = await page.evaluate((origin: string) => {
      return Array.from(document.querySelectorAll("a[href]"))
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((h) => {
          if (!/^https?:\/\//i.test(h)) return false;
          try {
            const u = new URL(h);
            // Excluir mismo origen y mailto/tel (ya tratados por el browser)
            return u.origin !== origin && !h.startsWith("mailto:") && !h.startsWith("tel:");
          } catch {
            return false;
          }
        });
    }, pageOrigin);

    // Deduplica
    const unique = [...new Set(hrefs)];

    // Sondea cada enlace externo (con HEAD, fallback GET)
    for (const href of unique) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8_000);
        let status: number;
        try {
          const res = await fetch(href, {
            method: "HEAD",
            signal: controller.signal,
            redirect: "follow",
          });
          status = res.status;
        } catch {
          // HEAD puede fallar en servidores que no lo admiten — intenta GET
          const res = await fetch(href, {
            method: "GET",
            signal: controller.signal,
            redirect: "follow",
          });
          status = res.status;
        } finally {
          clearTimeout(timeout);
        }

        if (status >= 400) {
          findings.push({
            check: "links",
            severity: "grave",
            detail: `enlace externo roto: ${href} (HTTP ${status})`,
          });
        }
      } catch (err) {
        // Error de red (ECONNREFUSED, timeout, etc.) — no marcamos GRAVE
        // automáticamente en local porque localhost puede devolver ECONNREFUSED
        // para URLs de localhost que no existen. Solo marcamos si es externa real.
        const isLocalhost =
          href.includes("localhost") || href.includes("127.0.0.1");
        if (!isLocalhost) {
          findings.push({
            check: "links",
            severity: "grave",
            detail: `enlace externo inaccesible: ${href} (${err instanceof Error ? err.message : String(err)})`,
          });
        }
      }
    }
  } finally {
    await browser.close();
  }
  return findings;
}

// ---------------------------------------------------------------------------
// 2. checkResponsive — render 375px y desktop (WARNING)
// ---------------------------------------------------------------------------

/**
 * Navega pageUrl con dos viewports (375px móvil, 1280x800 desktop),
 * captura PNG de cada uno a workDir, y detecta overflow horizontal.
 * severity: siempre "warning" (revisión humana).
 */
export async function checkResponsive(
  pageUrl: string,
  workDir: string
): Promise<Finding[]> {
  const findings: Finding[] = [];
  mkdirSync(workDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const viewports: Array<{ name: string; width: number; height: number }> = [
      { name: "mobile-375", width: 375, height: 812 },
      { name: "desktop", width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 15_000 });

      // Captura PNG
      const pngPath = join(workDir, `${vp.name}.png`);
      await page.screenshot({ path: pngPath, fullPage: false });

      // Detecta overflow horizontal: scrollWidth > clientWidth en body
      const hasHorizontalOverflow: boolean = await page.evaluate(() => {
        const b = document.body;
        return b.scrollWidth > b.clientWidth + 2; // +2 tolerancia de píxeles
      });

      if (hasHorizontalOverflow) {
        findings.push({
          check: "responsive",
          severity: "warning",
          detail: `Overflow horizontal detectado en viewport ${vp.width}px`,
          evidence: pngPath,
        });
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }
  return findings;
}

// ---------------------------------------------------------------------------
// 3. checkSlop — anti-slop (WARNING)
// ---------------------------------------------------------------------------

/**
 * Invoca la API programática de impeccable (detectHtml, engine: static-html)
 * sobre el archivo HTML en disco. Si impeccable reporta hallazgos → Finding
 * WARNING con check:"slop".
 *
 * Degradado a WARNING porque: los hallazgos de calidad de diseño son
 * subjetivos y nunca deben rechazar una web automáticamente (spec §4).
 * Se usa la API de módulo (no CLI spawn) para tests limpios y sin I/O extra.
 *
 * @param htmlFilePath  Ruta absoluta al archivo .html en disco
 * @param workDir       Directorio de trabajo del run (para guardar el informe)
 */
export async function checkSlop(
  htmlFilePath: string,
  workDir: string
): Promise<Finding[]> {
  const findings: Finding[] = [];
  mkdirSync(workDir, { recursive: true });

  try {
    // Importación dinámica para que el módulo .mjs de impeccable no bloquee
    // el resto del módulo si falla (ej. dependencia no disponible).
    const impeccableDetectorPath = resolve(
      import.meta.dirname,
      "..",
      "..",
      ".claude",
      "skills",
      "impeccable",
      "scripts",
      "detector",
      "detect-antipatterns.mjs"
    );
    const { detectHtml } = await import(
      pathToFileURL(impeccableDetectorPath).href
    );

    const slopFindings: unknown[] = detectHtml(htmlFilePath) ?? [];

    if (slopFindings.length > 0) {
      // Guarda el informe JSON como evidencia
      const reportPath = join(workDir, "slop-report.json");
      writeFileSync(reportPath, JSON.stringify(slopFindings, null, 2), "utf8");

      findings.push({
        check: "slop",
        severity: "warning",
        detail: `${slopFindings.length} anti-patrón(es) detectado(s) por impeccable`,
        evidence: reportPath,
      });
    }
  } catch (err) {
    // impeccable no disponible o falla → WARNING informativo (no bloquea el pase)
    // Motivo: la herramienta es externa; no podemos asumir que siempre está
    // operativa en el entorno de CI/producción. Spec §4: degradar a WARNING.
    findings.push({
      check: "slop",
      severity: "warning",
      detail: `impeccable no disponible: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  return findings;
}

// ---------------------------------------------------------------------------
// 4. checkLighthouse — performance móvil (WARNING)
// ---------------------------------------------------------------------------

/**
 * Corre Lighthouse performance (móvil) sobre pageUrl.
 * SIEMPRE devuelve WARNING como máximo, nunca GRAVE (spec §2 §4).
 * En local los números no son representativos.
 *
 * Si lighthouse falla (timeout, Chromium no disponible, etc.) degrada a un
 * único WARNING informativo — nunca bloquea el pase.
 *
 * Decisión de no testar unitariamente: los scores de Lighthouse varían entre
 * ejecuciones en localhost (sin CDN, red, compresión real) y producen falsos
 * negativos. Cubierto en E2E (Fase F).
 */
export async function checkLighthouse(pageUrl: string): Promise<Finding[]> {
  try {
    // Usamos el Chromium de playwright — sin Chrome del SO
    const browser = await chromium.launch({
      headless: true,
      args: ["--remote-debugging-port=0"],
    });

    let wsEndpoint: string;
    try {
      // Playwright expone el WS de Chrome DevTools
      wsEndpoint = browser.contexts()[0]
        ? ""
        : (browser as unknown as { wsEndpoint(): string }).wsEndpoint();
    } catch {
      wsEndpoint = "";
    }

    // Intentamos obtener el puerto CDP via el wsEndpoint
    // Lighthouse necesita el puerto; si no podemos extraerlo, usamos chromium.launch directo
    let score: number | null = null;

    try {
      const lighthouse = (await import("lighthouse")).default;
      const chromeLauncher = await import("chrome-launcher").catch(() => null);

      if (chromeLauncher) {
        // chrome-launcher disponible → flujo estándar Lighthouse
        const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
        const result = await lighthouse(pageUrl, {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: ["performance"],
          formFactor: "mobile",
          screenEmulation: { mobile: true, width: 375, height: 667, deviceScaleFactor: 2, disabled: false },
        });
        await chrome.kill();
        score = result?.lhr?.categories?.performance?.score ?? null;
      }
    } catch {
      // chrome-launcher no disponible o Lighthouse falla → score=null
    } finally {
      await browser.close().catch(() => {});
    }

    if (score === null) {
      return [
        {
          check: "lighthouse",
          severity: "warning",
          detail: "Lighthouse no pudo completar el análisis en este entorno local (degradado a informativo)",
        },
      ];
    }

    const pct = Math.round(score * 100);
    // En local: siempre WARNING, nunca GRAVE (spec §2: GRAVE activado en v2 con URL pública)
    return [
      {
        check: "lighthouse",
        severity: "warning",
        detail: `Lighthouse performance (móvil): ${pct}/100 (informativo; en local no representativo)`,
      },
    ];
  } catch (err) {
    // Fallo técnico total → WARNING informativo
    return [
      {
        check: "lighthouse",
        severity: "warning",
        detail: `Lighthouse no disponible: ${err instanceof Error ? err.message : String(err)}`,
      },
    ];
  }
}
