# Referencia — Flujo de las 8 previews

## Reparto (8 = 5 + 1 + 2)
- **Previews 1-5 (nuestras):** impeccable (criterio) + design-taste-frontend (diales distintos en cada una) + ingredientes de la despensa que encajen con el brief. Cada preview = un arquetipo + una familia de animación diferente. HTML/CSS estático + (si hace falta) GSAP por CDN. Sin build. Fuentes elegidas del pool curado (`tipografias.md`).
- **Preview 6 (URL de referencia manual):** el socio aporta UNA web concreta como referencia fuerte; `skillui` extrae su ADN y se construye una preview claramente inspirada en su lenguaje (sin clonar HTML ni textos).
- **Previews 7-8 (Google Stitch manual):** el socio las genera en `stitch.withgoogle.com` con los prompts de `stitch-prompts.md` (incluyen motion/animación), exporta su HTML y se integran al flujo. Motor distinto = variedad real. Sin MCP, sin token, gratis, 0 API de Claude.

## Pertinencia (regla dura)
Las 8 deben tener sentido para el sector del cliente. El brief del auditor manda: una mudanzas → confianza, claridad, prueba social; nunca layouts pensados para mil fotos de moda.

## Diagnóstico automático (anti-slop)
Antes de servir, pasar el detector local de impeccable sobre la carpeta de previews:
`node .claude/skills/impeccable/scripts/detect.mjs --json <previews>/*.html`.
Objetivo: **0 hallazgos graves** (gradient text, AI-purple, glass por defecto, eyebrows en cada sección, fuentes sobreusadas, marcadores 01/02/03 decorativos). Corregir antes de la revisión humana.

## Render y revisión
Servir en local (gratis): `python -m http.server` sobre la carpeta de previews. Revisión por URL local. Cero coste de despliegue.

## Variantes mixtas
Como es HTML, mezclar es trivial: se pasa al agente el HTML de la base elegida + el bloque concreto (p. ej. la animación) de otra preview. Ej.: "preview 2 con las animaciones de la preview 5".

## Ascenso (solo la elegida)
1. Convertir la preview HTML a Next + Tailwind reutilizando tokens/DESIGN.md ya generados (no recalcular estilo).
2. Self-host de las fuentes elegidas (quitar CDN; Lighthouse).
3. QA con `playwright-cli` (enlaces, formularios, responsive, contraste).
4. OK final de Kravitzz → la web pasa al resto de bloques.
5. Hosting final: Vercel (de pago si es comercial) u hosting estático.

## Modelos por paso (coste)
- Previews: Sonnet. · Web final: Opus. · QA/mecánico: Haiku. · Prompt caching del system + brief + skills.
