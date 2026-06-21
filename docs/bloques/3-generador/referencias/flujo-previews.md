# Referencia — Flujo de las 12 previews

## Reglas permanentes del bloque (OBLIGATORIAS)

### 1 · Trazabilidad — `.prompt.txt` por preview
Cada preview lleva su `<nombre>.prompt.txt` con el **prompt exacto** que la generó, junto al HTML en `clientes/<id>/previews/`. El mismo texto del `.txt` es el que se ejecuta para generar el HTML (prompt y HTML emparejados 1:1). Aplica también retroactivamente a las previews 1-6.

### 2 · Estructura de prompt obligatoria — esquema de 4 partes
Toda web generada (previews 1-12 y web final) usa este esqueleto fijo con sus 4 partes. Sumar/quitar detalle = decidir en qué parte entra y por qué, sin romper el esqueleto.

```
/*1 · Qué web + para qué cliente + dirección visual (con skill de estilo)*/
Crea [tipo de web de una sola página] para [negocio real del brief].
Antes de empezar, usa la skill "[frontend-design | gpt-tasteskill]" para definir [dirección visual concreta del sector y tono].

/*2 · Qué skills se van a usar*/
Usa también estas skills:
[lista explícita]

/*3 · Qué debe incluir la web*/
La web debe incluir:
- [sección + su animación concreta]
- ...

/*4 · Requisitos de elaboración correcta*/
Requisitos:
- Todo en una sola página
- [estética específica]
- Interacciones fluidas y reales  ← SIEMPRE OBLIGATORIO
- Código comentado indicando las técnicas importantes
- [estándar EVOLink: mobile-first AA, prefers-reduced-motion, placeholders honestos de logo/foto reales]
```

---

## Reparto (12 = 6 diseño + 6 GSAP) — vigente desde 2026-06-17
- **Previews 1-3 (propias):** impeccable (criterio) + design-taste-frontend (diales distintos en cada una) + ADN de `despensa.md` que encaje con el brief. Cada preview = un arquetipo + una familia de animación diferente. HTML/CSS estático + (si hace falta) GSAP por CDN. Sin build. Fuentes del pool curado (`tipografias.md`).
- **Previews 4-6 (lapa.ninja):** mismo motor que las propias (impeccable + design-taste-frontend), pero el género/composición/paleta-base sale del pool `estilos-lapa-ninja.md` (no de `despensa.md`), para cubrir lenguajes que la despensa actual no tiene. No clonar HTML/copy de lapa.ninja, solo "idioma" visual.
- **Previews 7-8 (GSAP · frontend-design):** HTML estático. Motor: `frontend-design` (dirección visual) + impeccable + `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, `gsap-performance`. Una con reveal/stagger + SplitText en hero; otra con pin + scrub y Flip/Draggable.
- **Previews 9-10 (GSAP · gpt-tasteskill):** mismo formato estático. Motor: `gpt-tasteskill` (randomización de layout, tipografía editorial grande, ScrollTrigger pinning/stacking/scrub) + impeccable + misma base de skills GSAP. Voz editorial/cinética, diferenciada de 7-8.
- **Previews 11-12 (GSAP · Three.js):** HTML estático. Motor: `frontend-design` + impeccable + skills GSAP + Three.js (skill comunitaria CloudAI-X + CDN r184). 3D de fondo (partículas/malla) en una; protagonista scroll-driven (rotar/mover escena con `scrub`) en la otra. Caps de rendimiento móvil obligatorios (ver `referencias/threejs.md`).

> Histórico: hasta 2026-06-15 el reparto era 8 = 5 propias + 1 URL + 2 Stitch. Ampliado a 9 = 3+3+3 (2026-06-16). Google Stitch descartado (dependencia frágil) → pivote a GSAP+Three.js (2026-06-16). Ampliado a 12 = 6+6 (2026-06-17).

## Pertinencia (regla dura)
Las 12 deben tener sentido para el sector del cliente. El brief del auditor manda: una mudanzas → confianza, claridad, prueba social; nunca layouts pensados para mil fotos de moda.

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
