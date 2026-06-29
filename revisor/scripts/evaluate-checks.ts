// revisor/scripts/evaluate-checks.ts
// Checkers deterministas del pase QA (bloque 4). Funciones puras sobre HTML
// → testeables sin navegador. El orquestador las aplica sobre el HTML
// renderizado de la preview; los enlaces externos y Lighthouse se validan
// en runtime con navegador (wave 2).
//
// findPlaceholders / findContrastFailures / findBrokenLinks:
//   portado de generador/scripts/evaluate-checks.ts (linaje compartido bloque 3)
// findDomainIssues: nuevo en bloque 4.

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type Severity = "grave" | "warning";

export type CheckName =
  | "links"
  | "domains"
  | "contrast"
  | "placeholders"
  | "responsive"
  | "slop"
  | "lighthouse";

export interface Finding {
  check: CheckName;
  severity: Severity;
  detail: string;
  evidence?: string;
}

export type Verdict = "pass" | "pass_with_warnings" | "rejected";

// ---------------------------------------------------------------------------
// 1. Regla de veredicto (función pura)
// ---------------------------------------------------------------------------

/**
 * Dada una lista de hallazgos, devuelve el veredicto global.
 * ≥1 grave → rejected; 0 grave + ≥1 warning → pass_with_warnings; 0/0 → pass.
 */
export function computeVerdict(findings: Finding[]): Verdict {
  if (findings.some((f) => f.severity === "grave")) return "rejected";
  if (findings.some((f) => f.severity === "warning")) return "pass_with_warnings";
  return "pass";
}

// ---------------------------------------------------------------------------
// 2. Placeholders (GRAVE)
// portado de generador/scripts/evaluate-checks.ts (linaje compartido bloque 3)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 3. Contraste AA (GRAVE)
// portado de generador/scripts/evaluate-checks.ts (linaje compartido bloque 3)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 4. Enlaces internos rotos (GRAVE)
// portado de generador/scripts/evaluate-checks.ts (linaje compartido bloque 3)
// ---------------------------------------------------------------------------

export function findBrokenLinks(html: string, validRoutes: string[]): string[] {
  const broken: string[] = [];
  const hrefs = [...html.matchAll(/<a\b[^>]*?\shref\s*=\s*["']([^"']*)["']/gi)].map((m) => m[1]);
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

// ---------------------------------------------------------------------------
// 5. Mezcla de dominios / URL malformada (GRAVE — nuevo en bloque 4)
// ---------------------------------------------------------------------------

/**
 * Detecta como GRAVE:
 * (a) mismo sitio referenciado con dominios distintos
 *     (mezcla de dominio canónico, ej. mudanzasroy.com + mudanzasroy.es)
 * (b) URL malformada: doble esquema (https://http://...), espacios en host,
 *     host vacío (http://)
 *
 * Solo examina href absolutos (<a href="https?://...">).
 * Devuelve Finding[] de severidad 'grave'.
 */
export function findDomainIssues(html: string): Finding[] {
  const findings: Finding[] = [];

  // Extrae todos los href absolutos de <a>
  const absoluteHrefs = [
    ...html.matchAll(/<a\b[^>]*?\shref\s*=\s*["'](https?:[^"']*)["']/gi),
  ].map((m) => m[1]);

  if (absoluteHrefs.length === 0) return findings;

  // --- (b) URLs malformadas ---
  for (const href of absoluteHrefs) {
    // Doble esquema: https://http:// o http://https://
    if (/^https?:\/\/https?:\/\//i.test(href)) {
      findings.push({
        check: "domains",
        severity: "grave",
        detail: `URL malformada (doble esquema): ${href}`,
      });
      continue;
    }

    // Espacios en el href (después del esquema)
    const withoutScheme = href.replace(/^https?:\/\//i, "");
    if (/\s/.test(withoutScheme)) {
      findings.push({
        check: "domains",
        severity: "grave",
        detail: `URL malformada (espacios en host/path): ${href}`,
      });
      continue;
    }

    // Host vacío: http:// o https:// sin nada después (o solo /)
    const hostMatch = href.match(/^https?:\/\/([^/?#]*)/i);
    if (!hostMatch || hostMatch[1].trim() === "") {
      findings.push({
        check: "domains",
        severity: "grave",
        detail: `URL malformada (host vacío): ${href}`,
      });
      continue;
    }
  }

  // --- (a) Mezcla de dominio canónico ---
  // Extrae dominios únicos de los href válidos (sin los ya marcados como malformados)
  const validHrefs = absoluteHrefs.filter((href) => {
    if (/^https?:\/\/https?:\/\//i.test(href)) return false;
    const withoutScheme = href.replace(/^https?:\/\//i, "");
    if (/\s/.test(withoutScheme)) return false;
    const hostMatch = href.match(/^https?:\/\/([^/?#]*)/i);
    return hostMatch && hostMatch[1].trim() !== "";
  });

  // Agrupa por "nombre base de dominio" (quitando el TLD): p.ej. "mudanzasroy"
  // Si el mismo nombre base aparece con TLDs distintos → mezcla de canónico
  const domainMap = new Map<string, Set<string>>(); // baseName → Set<fullDomain>
  for (const href of validHrefs) {
    const hostMatch = href.match(/^https?:\/\/([^/?#]+)/i);
    if (!hostMatch) continue;
    const host = hostMatch[1].toLowerCase();
    // Quita subdominio www
    const domain = host.replace(/^www\./, "");
    // Separa en partes: "mudanzasroy.com" → baseName="mudanzasroy", tld=".com"
    const lastDot = domain.lastIndexOf(".");
    if (lastDot <= 0) continue;
    const baseName = domain.slice(0, lastDot);
    const existing = domainMap.get(baseName) ?? new Set<string>();
    existing.add(domain);
    domainMap.set(baseName, existing);
  }

  for (const [baseName, domains] of domainMap) {
    if (domains.size > 1) {
      const list = [...domains].join(", ");
      findings.push({
        check: "domains",
        severity: "grave",
        detail: `Mezcla de dominio canónico en '${baseName}': ${list}`,
      });
    }
  }

  return findings;
}

// ---------------------------------------------------------------------------
// Helpers privados de color (portado de generador/scripts/evaluate-checks.ts)
// ---------------------------------------------------------------------------

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
