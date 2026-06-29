// revisor/scripts/review-output.ts
// Compositor puro de output jsonb (spec §5, bloque 4 Revisor/QA).
// Función pura — sin efectos laterales, unit-testeable sin red ni browser.
//
// El summarize es inyectable:
//   - En producción: función que llama al LLM (Claude API).
//   - En tests: mock determinista.
//   - Por defecto (sin inyectar): plantilla determinista breve, sin API.
// Ningún GRAVE depende del LLM (regla §18 de la spec, "determinista primero").

import {
  computeVerdict,
  type Finding,
  type Verdict,
} from "./evaluate-checks.ts";

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface ReviewTarget {
  /** "local" en v1; "public" en v2 con URL desplegada */
  form: "local" | "public";
  /** Ruta relativa a la preview en disco */
  path: string;
  /** URL que sirvió el servidor temporal, ej. http://localhost:51234/v4-1.html */
  served_url: string;
}

export interface ReviewOutput {
  verdict: Verdict;
  target: ReviewTarget;
  findings: Finding[];
  screenshots: string[];
  summary: string;
}

export interface ComposeOutputParams {
  findings: Finding[];
  target: ReviewTarget;
  screenshots: string[];
  /**
   * Función para generar el summary legible.
   * Default: plantilla determinista breve (sin API).
   * En producción: función que llama al LLM.
   * En tests: mock.
   */
  summarize?: (verdict: Verdict, findings: Finding[]) => string;
}

// ---------------------------------------------------------------------------
// Default summarize — plantilla determinista sin LLM
// ---------------------------------------------------------------------------

function defaultSummarize(verdict: Verdict, findings: Finding[]): string {
  const graves = findings.filter((f) => f.severity === "grave");
  const warnings = findings.filter((f) => f.severity === "warning");

  if (verdict === "pass") {
    return "La web ha superado todos los checks QA sin hallazgos.";
  }
  if (verdict === "pass_with_warnings") {
    const checks = [...new Set(warnings.map((f) => f.check))].join(", ");
    return `La web pasa QA con ${warnings.length} advertencia(s) en: ${checks}. Revisión humana recomendada.`;
  }
  // rejected
  const gravChecks = [...new Set(graves.map((f) => f.check))].join(", ");
  return (
    `La web ha sido RECHAZADA con ${graves.length} hallazgo(s) GRAVE(s) en: ${gravChecks}.` +
    (warnings.length > 0
      ? ` Además hay ${warnings.length} advertencia(s).`
      : "")
  );
}

// ---------------------------------------------------------------------------
// Función principal — pura
// ---------------------------------------------------------------------------

/**
 * Dado el resultado de la suite QA (findings, target, screenshots),
 * compone el objeto output con la forma exacta de la spec §5.
 *
 * La función es PURA: sólo depende de sus parámetros; no llama al LLM
 * directamente. La costura con el LLM se hace a través de `summarize`.
 */
export function composeOutput(params: ComposeOutputParams): ReviewOutput {
  const { findings, target, screenshots, summarize } = params;
  const verdict = computeVerdict(findings);
  const summarizeFn = summarize ?? defaultSummarize;
  const summary = summarizeFn(verdict, findings);

  return {
    verdict,
    target,
    findings: [...findings], // copia defensiva
    screenshots: [...screenshots],
    summary,
  };
}
