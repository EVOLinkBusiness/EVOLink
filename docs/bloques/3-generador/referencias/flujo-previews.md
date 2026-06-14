# Referencia — Flujo de las 7 previews

## Reparto
- **Previews 1-5:** impeccable (criterio) + design-taste-frontend (diales distintos en cada una) + ingredientes de la despensa que encajen con el brief. Cada preview = un arquetipo + una familia de animación diferente. HTML/CSS estático + (si hace falta) GSAP por CDN. Sin build.
- **Previews 6-7:** Google Stitch (MCP). Mismo brief, motor distinto = variedad real. Se importa su HTML al flujo.

## Pertinencia (regla dura)
Las 7 deben tener sentido para el sector del cliente. El brief del auditor manda: una mudanzas → confianza, claridad, prueba social; nunca layouts pensados para mil fotos de moda.

## Render y revisión
Servir en local (gratis): `python -m http.server` o Vite estático sobre la carpeta de previews. Revisión por URL local. Cero coste de despliegue.

## Variantes mixtas
Como es HTML, mezclar es trivial: se pasa al agente el HTML de la base elegida + el bloque concreto (p. ej. la animación) de otra preview. Ej.: "preview 2 con las animaciones de la preview 5".

## Ascenso (solo la elegida)
1. Convertir la preview HTML a Next + Tailwind reutilizando tokens/DESIGN.md ya generados (no recalcular estilo).
2. QA con `playwright-cli` (enlaces, formularios, responsive, contraste).
3. OK final de Kravitzz → la web pasa al resto de bloques.
4. Hosting final: Vercel (de pago si es comercial) u hosting estático.

## Modelos por paso (coste)
- Previews: Sonnet. · Web final: Opus. · QA/mecánico: Haiku. · Prompt caching del system + brief + skills.
