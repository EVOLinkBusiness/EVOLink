# Referencia — Flujo de las 9 previews

## Reparto (9 = 3 + 3 + 3) — vigente desde 2026-06-16
- **Previews 1-3 (propias):** impeccable (criterio) + design-taste-frontend (diales distintos en cada una) + ADN de `despensa.md` que encaje con el brief. Cada preview = un arquetipo + una familia de animación diferente. HTML/CSS estático + (si hace falta) GSAP por CDN. Sin build. Fuentes del pool curado (`tipografias.md`).
- **Previews 4-6 (lapa.ninja):** mismo motor que las propias (impeccable + design-taste-frontend), pero el género/composición/paleta-base sale del pool `estilos-lapa-ninja.md` (no de `despensa.md`), para cubrir lenguajes que la despensa actual no tiene. No clonar HTML/copy de lapa.ninja, solo "idioma" visual.
- **Previews 7-9 (GSAP + Three.js):** HTML estático con animación premium. Motor: `frontend-design` (dirección visual) + skills GSAP (`gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`) + Three.js vía CDN para efectos 3D. Sin build, mismo formato que 1-6. Detalle en `referencias/gsap-skills.md`.

> Histórico: hasta el 2026-06-15 el reparto era 8 = 5 (propias) + 1 (referencia URL manual) + 2 (Stitch manual). Ampliado a 9 = 3+3+3 (2026-06-16). Grupo 7-9 pasó de Google Stitch a GSAP+Three.js (2026-06-16) por decisión de los socios.

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
