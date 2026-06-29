// revisor/tests/output-record.test.ts
// Tests TDD para:
//   - review-output.ts: composer puro de output jsonb (spec §5)
//   - run-record.ts: buildRunRow con agent='revisor'
//   - mapeo verdict→status→flags (spec §6, CONTRATO)

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  composeOutput,
  type ReviewOutput,
  type ReviewTarget,
} from "../scripts/review-output.ts";
import { buildRunRow } from "../scripts/run-record.ts";
import type { Finding } from "../scripts/evaluate-checks.ts";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const target: ReviewTarget = {
  form: "local",
  path: "clientes/cb1dfbea/previews/v4/v4-1.html",
  served_url: "http://localhost:51234/v4-1.html",
};

const noFindings: Finding[] = [];

const warningFindings: Finding[] = [
  { check: "responsive", severity: "warning", detail: "overflow en 375px" },
  { check: "lighthouse", severity: "warning", detail: "Lighthouse 72/100" },
];

const graveFindings: Finding[] = [
  { check: "links", severity: "grave", detail: "enlace roto: http://x.com (404)" },
];

const mixedFindings: Finding[] = [
  { check: "links", severity: "grave", detail: "enlace roto" },
  { check: "responsive", severity: "warning", detail: "overflow en 375px" },
];

// summarize mock determinista (sin API)
const mockSummarize = (verdict: string, findings: Finding[]) =>
  `veredicto=${verdict} hallazgos=${findings.length}`;

const screenshots = [
  "previews-qa/run1/mobile-375.png",
  "previews-qa/run1/desktop.png",
];

// ---------------------------------------------------------------------------
// 1. composeOutput — forma del objeto output (spec §5)
// ---------------------------------------------------------------------------
describe("composeOutput — forma del output jsonb", () => {
  test("0 hallazgos → verdict='pass', findings=[], screenshots presentes", () => {
    const out = composeOutput({
      findings: noFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    assert.equal(out.verdict, "pass");
    assert.deepEqual(out.findings, []);
    assert.deepEqual(out.screenshots, screenshots);
    assert.ok(typeof out.summary === "string" && out.summary.length > 0);
  });

  test("solo warnings → verdict='pass_with_warnings'", () => {
    const out = composeOutput({
      findings: warningFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    assert.equal(out.verdict, "pass_with_warnings");
    assert.equal(out.findings.length, 2);
  });

  test("≥1 grave → verdict='rejected'", () => {
    const out = composeOutput({
      findings: graveFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    assert.equal(out.verdict, "rejected");
    assert.equal(out.findings.length, 1);
  });

  test("grave + warning → verdict='rejected'", () => {
    const out = composeOutput({
      findings: mixedFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    assert.equal(out.verdict, "rejected");
    assert.equal(out.findings.length, 2);
  });

  test("target tiene todos los campos requeridos (form, path, served_url)", () => {
    const out = composeOutput({
      findings: noFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    assert.equal(out.target.form, "local");
    assert.ok(typeof out.target.path === "string");
    assert.ok(typeof out.target.served_url === "string");
  });

  test("findings del output tienen estructura correcta (check, severity, detail)", () => {
    const out = composeOutput({
      findings: mixedFindings,
      target,
      screenshots,
      summarize: mockSummarize,
    });
    for (const f of out.findings) {
      assert.ok(typeof f.check === "string");
      assert.ok(f.severity === "grave" || f.severity === "warning");
      assert.ok(typeof f.detail === "string");
    }
  });

  test("summarize se inyecta y el summary llega al output", () => {
    const customSummarize = (_v: string, _f: Finding[]) => "resumen-custom";
    const out = composeOutput({
      findings: noFindings,
      target,
      screenshots,
      summarize: customSummarize,
    });
    assert.equal(out.summary, "resumen-custom");
  });

  test("summarize por defecto (sin API) devuelve texto no vacío", () => {
    const out = composeOutput({
      findings: warningFindings,
      target,
      screenshots,
      // sin summarize → se usa el default determinista
    });
    assert.ok(typeof out.summary === "string" && out.summary.length > 0);
  });
});

// ---------------------------------------------------------------------------
// 2. buildRunRow (agent='revisor') — portado de generador
// ---------------------------------------------------------------------------
describe("buildRunRow — agent='revisor'", () => {
  test("agent por defecto es 'revisor'", () => {
    const row = buildRunRow({ stage: "review", status: "ok" });
    assert.equal(row.agent, "revisor");
  });

  test("status='ok' sin error no lanza", () => {
    assert.doesNotThrow(() =>
      buildRunRow({ stage: "review", status: "ok" })
    );
  });

  test("status='error' requiere mensaje en error", () => {
    assert.throws(
      () => buildRunRow({ stage: "review", status: "error" }),
      /requiere un mensaje/
    );
  });

  test("status='error' con mensaje → fila con error string", () => {
    const row = buildRunRow({
      stage: "review",
      status: "error",
      error: "Playwright no arrancó",
    });
    assert.equal(row.status, "error");
    assert.equal(row.error, "Playwright no arrancó");
  });

  test("campos estructurales presentes con valores por defecto", () => {
    const row = buildRunRow({ stage: "review", status: "ok" });
    assert.equal(row.tokens_in, 0);
    assert.equal(row.tokens_out, 0);
    assert.equal(row.cost, 0);
    assert.equal(row.duration_ms, 0);
    assert.equal(row.client_id, null);
    assert.equal(row.audit_id, null);
    assert.deepEqual(row.flags, []);
    assert.deepEqual(row.input, {});
    assert.deepEqual(row.output, {});
  });
});

// ---------------------------------------------------------------------------
// 3. Mapeo verdict→status→flags (spec §6, CONTRATO)
// ---------------------------------------------------------------------------
describe("mapeo verdict→status→flags", () => {
  // Helper: simula lo que hace el orquestador review()
  function deriveStatusAndFlags(
    verdict: "pass" | "pass_with_warnings" | "rejected" | null,
    techError?: string
  ): { status: "ok" | "error"; flags: unknown[] } {
    // Fallo técnico del Revisor (sin verdict): status='error', flags=[techerror]
    if (techError) {
      return { status: "error", flags: [{ reason: "tech_error", detail: techError }] };
    }
    // Web rechazada: status='error', flags=[motivo del rechazo]
    if (verdict === "rejected") {
      return { status: "error", flags: [{ reason: "rejected" }] };
    }
    // Pass o pass_with_warnings: status='ok'
    return { status: "ok", flags: [] };
  }

  test("verdict='pass' → status='ok', flags vacíos", () => {
    const { status, flags } = deriveStatusAndFlags("pass");
    assert.equal(status, "ok");
    assert.deepEqual(flags, []);
  });

  test("verdict='pass_with_warnings' → status='ok'", () => {
    const { status } = deriveStatusAndFlags("pass_with_warnings");
    assert.equal(status, "ok");
  });

  test("verdict='rejected' → status='error', flags con motivo", () => {
    const { status, flags } = deriveStatusAndFlags("rejected");
    assert.equal(status, "error");
    assert.ok(Array.isArray(flags) && flags.length > 0);
  });

  test("fallo técnico (techError) → status='error', SIN verdict en output implícito", () => {
    const { status, flags } = deriveStatusAndFlags(null, "Playwright no arrancó");
    assert.equal(status, "error");
    assert.ok(Array.isArray(flags) && flags.length > 0);
  });
});
