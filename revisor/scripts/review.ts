// revisor/scripts/review.ts
// Orquestador principal del bloque 4 (Revisor/QA).
//
// review(previewPath): levanta serveDir sobre la carpeta de la preview,
// corre la suite completa (puros + runtime), compone output, construye
// la fila de agent_runs, y SIEMPRE apaga el server (try/finally).
//
// Capturas → revisor/previews-qa/<run-id>/  (gitignored)
// El insert real a Supabase lo hace review.cli.ts si hay credenciales.

import { dirname, basename, join, resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";

import { serveDir } from "./serve.ts";
import {
  findPlaceholders,
  findContrastFailures,
  findBrokenLinks,
  findDomainIssues,
  computeVerdict,
  type Finding,
} from "./evaluate-checks.ts";
import {
  checkExternalLinks,
  checkResponsive,
  checkSlop,
  checkLighthouse,
} from "./runtime-checks.ts";
import { composeOutput, type ReviewTarget, type ReviewOutput } from "./review-output.ts";
import { buildRunRow, type AgentRunRow } from "./run-record.ts";

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface ReviewResult {
  output: ReviewOutput;
  row: AgentRunRow;
}

// ---------------------------------------------------------------------------
// Checks estáticos (puros, sin navegador)
// ---------------------------------------------------------------------------

function runStaticChecks(html: string): Finding[] {
  const findings: Finding[] = [];

  // Check 4: Placeholders (GRAVE)
  const placeholders = findPlaceholders(html);
  for (const p of placeholders) {
    findings.push({
      check: "placeholders",
      severity: "grave",
      detail: `Placeholder visible: '${p}'`,
    });
  }

  // Check 3: Contraste AA (GRAVE)
  const contrastFailures = findContrastFailures(html);
  for (const cf of contrastFailures) {
    findings.push({
      check: "contrast",
      severity: "grave",
      detail: `Contraste insuficiente AA: ${cf.fg} sobre ${cf.bg} (ratio ${cf.ratio})`,
    });
  }

  // Check 1 (parte estática): sólo anclas rotas (GRAVE).
  // Para una preview de página única, las rutas internas como /servicios, /contacto
  // NO son verificables localmente (el sitio multi-página no está desplegado).
  // En preview local sólo verificamos anclas (#id) y href="#" vacío.
  // Pasamos todas las rutas relativas como válidas para que findBrokenLinks
  // no las marque; sólo las anclas son comprobables en este contexto.
  const allPathHrefs = [...html.matchAll(/<a\b[^>]*?\shref\s*=\s*["']([^"'/][^"']*)["']/gi)].map(m => m[1]);
  const allAbsolutePathHrefs = [...html.matchAll(/<a\b[^>]*?\shref\s*=\s*["'](\/[^"']*)["']/gi)].map(m => m[1]);
  const validRoutes = [...allPathHrefs, ...allAbsolutePathHrefs, "/", "/index.html"];
  const brokenLinks = findBrokenLinks(html, validRoutes);
  for (const bl of brokenLinks) {
    // Solo reportar anclas rotas (#id inexistente) y href="#" vacío
    // Las rutas de páginas no son verificables en local
    if (bl === "#" || bl.startsWith("#")) {
      findings.push({
        check: "links",
        severity: "grave",
        detail: `Ancla rota: ${bl}`,
      });
    }
  }

  // Check 2: Mezcla de dominios / URL malformada (GRAVE)
  const domainIssues = findDomainIssues(html);
  findings.push(...domainIssues);

  return findings;
}

// ---------------------------------------------------------------------------
// Orquestador principal
// ---------------------------------------------------------------------------

/**
 * Revisa la preview HTML en previewPath:
 * 1. Levanta un servidor HTTP local sobre su carpeta
 * 2. Corre checks estáticos (puros) + runtime (Playwright, impeccable, Lighthouse)
 * 3. Compone output jsonb y construye la fila de agent_runs
 * 4. SIEMPRE apaga el servidor (try/finally)
 *
 * En caso de fallo técnico (servidor no levanta, Playwright no arranca):
 * - status='error', flags=[{reason:'tech_error', detail:...}]
 * - output NO tiene verdict (distingue fallo-de-máquina de rechazo-de-web)
 */
export async function review(previewPath: string): Promise<ReviewResult> {
  const absolutePath = resolve(previewPath);
  const previewDir = dirname(absolutePath);
  const previewFile = basename(absolutePath);

  // Carpeta de trabajo para capturas de este run
  const runId = randomUUID().slice(0, 8);
  const workDir = join(
    import.meta.dirname,
    "..",
    "previews-qa",
    runId
  );
  mkdirSync(workDir, { recursive: true });

  const startMs = Date.now();

  // Intenta levantar el servidor; si falla → fallo técnico
  let server: Awaited<ReturnType<typeof serveDir>>;
  try {
    server = await serveDir(previewDir);
  } catch (err) {
    const techError = err instanceof Error ? err.message : String(err);
    const row = buildRunRow({
      agent: "revisor",
      stage: "review",
      status: "error",
      input: { form: "local", path: absolutePath },
      output: {}, // sin verdict — fallo de máquina
      flags: [{ reason: "tech_error", detail: techError }],
      durationMs: Date.now() - startMs,
      error: `Servidor HTTP no pudo arrancar: ${techError}`,
    });
    throw Object.assign(new Error(`Servidor no levantó: ${techError}`), {
      reviewRow: row,
    });
  }

  const pageUrl = `${server.url}/${previewFile}`;

  try {
    // -----------------------------------------------------------------------
    // Lee el HTML para los checks estáticos
    // -----------------------------------------------------------------------
    const { readFileSync } = await import("node:fs");
    const html = readFileSync(absolutePath, "utf8");

    // -----------------------------------------------------------------------
    // Checks estáticos (puros)
    // -----------------------------------------------------------------------
    const staticFindings = runStaticChecks(html);

    // -----------------------------------------------------------------------
    // Checks de runtime (Playwright, impeccable, Lighthouse)
    // -----------------------------------------------------------------------
    const [
      externalLinkFindings,
      responsiveFindings,
      slopFindings,
      lighthouseFindings,
    ] = await Promise.allSettled([
      checkExternalLinks(pageUrl),
      checkResponsive(pageUrl, workDir),
      checkSlop(absolutePath, workDir),
      checkLighthouse(pageUrl),
    ]);

    // Combina hallazgos — los settled pueden haber fallado; en ese caso
    // degrada a un WARNING informativo (nunca bloquea el pase)
    const allFindings: Finding[] = [...staticFindings];

    function extractFindings(
      settled: PromiseSettledResult<Finding[]>,
      checkName: Finding["check"]
    ): void {
      if (settled.status === "fulfilled") {
        allFindings.push(...settled.value);
      } else {
        // Herramienta fallida → WARNING informativo (spec: no bloquear el pase)
        allFindings.push({
          check: checkName,
          severity: "warning",
          detail: `Error en check ${checkName}: ${settled.reason instanceof Error ? settled.reason.message : String(settled.reason)}`,
        });
      }
    }

    extractFindings(externalLinkFindings, "links");
    extractFindings(responsiveFindings, "responsive");
    extractFindings(slopFindings, "slop");
    extractFindings(lighthouseFindings, "lighthouse");

    // -----------------------------------------------------------------------
    // Capturas (ya las hizo checkResponsive; las recoge del workDir)
    // -----------------------------------------------------------------------
    const screenshots = responsiveFindings.status === "fulfilled"
      ? [join(workDir, "mobile-375.png"), join(workDir, "desktop.png")]
      : [];

    // -----------------------------------------------------------------------
    // Compone output jsonb (spec §5)
    // -----------------------------------------------------------------------
    const target: ReviewTarget = {
      form: "local",
      path: previewPath,
      served_url: pageUrl,
    };

    const output = composeOutput({
      findings: allFindings,
      target,
      screenshots,
    });

    // -----------------------------------------------------------------------
    // Mapeo verdict → status/flags (spec §6, CONTRATO)
    // -----------------------------------------------------------------------
    const verdict = output.verdict;
    const status: "ok" | "error" = verdict === "rejected" ? "error" : "ok";
    const flags: unknown[] =
      verdict === "rejected"
        ? allFindings
            .filter((f) => f.severity === "grave")
            .map((f) => ({ reason: "grave_finding", check: f.check, detail: f.detail }))
        : [];

    const row = buildRunRow({
      agent: "revisor",
      stage: "review",
      status,
      input: { form: "local", path: previewPath },
      output: output as unknown as Record<string, unknown>,
      flags,
      durationMs: Date.now() - startMs,
      error: status === "error" ? `Web rechazada: ${verdict}` : null,
    });

    return { output, row };
  } finally {
    // SIEMPRE apaga el servidor — éxito o error
    await server.stop();
  }
}
