// generador/scripts/evaluate-checks.ts
// Checkers deterministas del pase de script (etapa 5). Funciones puras sobre HTML
// -> testeables sin navegador. El orquestador (evaluate.cli.ts) las aplica sobre
// el HTML renderizado del sitio; los enlaces externos y Lighthouse se validan en
// runtime con navegador.

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /lorem ipsum/i,
  /\bplaceholder\b/i,
  /\bTODO\b/,
  /\bFIXME\b/,
  /john doe/i,
  /acme (corp|inc)\b/i,
  /tu texto aqui/i,
  /texto de relleno/i,
];

export function findPlaceholders(html: string): string[] {
  const found: string[] = [];
  for (const re of PLACEHOLDER_PATTERNS) {
    const m = html.match(re);
    if (m) found.push(m[0]);
  }
  if (/href\s*=\s*["']#["']/.test(html)) found.push('href="#" (enlace vacio)');
  return found;
}

export interface ContrastFailure {
  fg: string;
  bg: string;
  ratio: number;
}

export function findContrastFailures(html: string, min = 4.5): ContrastFailure[] {
  const failures: ContrastFailure[] = [];
  const styleAttrs = html.match(/style\s*=\s*["'][^"']*["']/gi) ?? [];
  for (const attr of styleAttrs) {
    const fg = extractColor(attr, "color");
    const bg = extractColor(attr, "background-color") ?? extractColor(attr, "background");
    if (fg && bg) {
      const ratio = contrastRatio(fg, bg);
      if (ratio < min) failures.push({ fg, bg, ratio: round2(ratio) });
    }
  }
  return failures;
}

// Enlaces internos que no resuelven. Externos (http/tel/mailto) se ignoran aqui.
export function findBrokenLinks(html: string, validRoutes: string[]): string[] {
  const broken: string[] = [];
  const hrefs = [...html.matchAll(/href\s*=\s*["']([^"']*)["']/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|tel:|mailto:)/i.test(href)) continue;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (id === "") {
        broken.push(href);
        continue;
      }
      const idRe = new RegExp(`id\\s*=\\s*["']${escapeRegExp(id)}["']`);
      if (!idRe.test(html)) broken.push(href);
      continue;
    }
    const path = href.split("#")[0].split("?")[0];
    if (path === "") continue;
    if (!validRoutes.includes(path)) broken.push(href);
  }
  return broken;
}

// --- helpers de color ---

function extractColor(style: string, prop: "color" | "background-color" | "background"): string | null {
  const value = "(#[0-9a-fA-F]{3,8}|rgba?\\([^)]*\\))";
  const re =
    prop === "color"
      ? new RegExp(`(?<![-\\w])color\\s*:\\s*${value}`, "i")
      : new RegExp(`${prop}\\s*:\\s*${value}`, "i");
  const m = style.match(re);
  return m ? m[1] : null;
}

function toRgb(c: string): [number, number, number] {
  if (c.startsWith("#")) {
    let h = c.slice(1);
    if (h.length === 3) h = h.split("").map((x) => x + x).join("");
    const n = parseInt(h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const nums = (c.match(/[\d.]+/g) ?? []).map(Number);
  return [nums[0] ?? 0, nums[1] ?? 0, nums[2] ?? 0];
}

function relLum([r, g, b]: [number, number, number]): number {
  const f = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
}

function contrastRatio(fg: string, bg: string): number {
  const L1 = relLum(toRgb(fg));
  const L2 = relLum(toRgb(bg));
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
