// generador/scripts/report.ts
// Construye informe-evaluacion.md desde el resultado del pase de script y deja
// el checklist del pase de modelo (rubrica "Juzga MODELO") para rellenar.

import type { ContrastFailure } from "./evaluate-checks.ts";

export interface EvalResultado {
  cliente_id: string;
  url: string;
  timestamp: string;
  lighthouse_movil: number | null;
  enlaces_rotos: string[];
  enlaces_externos_fallidos: string[];
  placeholders: string[];
  contraste_fallos: ContrastFailure[];
  formulario_ok: boolean;
  capturas: string[];
}

export function veredictoScript(r: EvalResultado): "PASA" | "FALLA" {
  const lhOk = r.lighthouse_movil === null || r.lighthouse_movil >= 90;
  const ok =
    r.enlaces_rotos.length === 0 &&
    r.enlaces_externos_fallidos.length === 0 &&
    r.placeholders.length === 0 &&
    r.contraste_fallos.length === 0 &&
    r.formulario_ok &&
    lhOk;
  return ok ? "PASA" : "FALLA";
}

export function renderInforme(r: EvalResultado): string {
  const v = veredictoScript(r);
  const mark = (ok: boolean) => (ok ? "✅" : "❌");
  const lh = r.lighthouse_movil;
  const lhLine =
    lh === null
      ? "⚠️ Lighthouse no ejecutado (sin navegador o fallo de arranque)"
      : `${mark(lh >= 90)} Lighthouse performance movil: **${lh}** (umbral 90)`;

  const list = (items: string[]) => (items.length ? items.map((i) => `  - ${i}`).join("\n") : "  - (ninguno)");

  return [
    `# Informe de evaluacion — ${r.cliente_id}`,
    "",
    `**URL evaluada:** ${r.url}`,
    `**Fecha:** ${r.timestamp}`,
    `**Veredicto del pase de script:** ${v === "PASA" ? "✅ PASA" : "❌ FALLA"}`,
    "",
    "## Pase de script (medible)",
    lhLine,
    `${mark(r.enlaces_rotos.length === 0)} Enlaces internos rotos:`,
    list(r.enlaces_rotos),
    `${mark(r.enlaces_externos_fallidos.length === 0)} Enlaces externos fallidos:`,
    list(r.enlaces_externos_fallidos),
    `${mark(r.placeholders.length === 0)} Placeholders / textos de relleno:`,
    list(r.placeholders),
    `${mark(r.contraste_fallos.length === 0)} Contraste insuficiente (AA):`,
    list(r.contraste_fallos.map((c) => `${c.fg} sobre ${c.bg} = ratio ${c.ratio}`)),
    `${mark(r.formulario_ok)} Formulario de contacto presente con accion valida`,
    "",
    "## Capturas",
    r.capturas.length ? r.capturas.map((c) => `- ${c}`).join("\n") : "- (ninguna)",
    "",
    "## Pase de modelo (juicio — rellenar antes del checkpoint)",
    "- [ ] Coherencia de marca (colores, tono, tipografia).",
    "- [ ] Jerarquia visual y legibilidad.",
    "- [ ] No parece plantilla: variedad de maquetacion, detalles del negocio.",
    "- [ ] Textos naturales, orientados a captar clientes del nicho.",
    "",
    "_Maximo 2 iteraciones automaticas. Si tras la 2a sigue fallando, pasa al humano con este informe._",
    "",
  ].join("\n");
}
