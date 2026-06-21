# Bloque 3 — Generador web

**Estado:** ACTIVO (rediseño artístico). Spec v2 aprobada. Siguiente tras esta ORDEN: `writing-plans`.
**Rol en el tejido:** Creación. Fórmula: **fabricar → evaluar → entregar**.

## Qué hace
De la auditoría (bloque 2) + datos del cliente → 12 previews premium para elegir → web Next funcional, rápida, con marca y que NO parezca plantilla. Vía volumen/cuota, no arte a medida.

## Spec
`docs/superpowers/specs/2026-06-14-generador-diseño-v2.md` (única fuente del diseño cerrado).

## Flujo interno (4 fases — detalle en `referencias/flujo-previews.md`)
- **0 · Despensa (una vez):** skillUI extrae ADN de webs premium → ingredientes reutilizables.
- **1 · Brief y encaje:** auditoría → impeccable fija marca → elige ingredientes que encajan.
- **2 · 12 previews:** 6 diseño (3 propias impeccable+taste+despensa · 3 lapa.ninja) + 6 GSAP (2 frontend-design · 2 gpt-tasteskill · 2 Three.js), HTML estático.
- **3 · Elección:** elegir / mezclar / pedir variantes.
- **4 · Ascenso + QA + entrega:** elegida → Next+Tailwind → playwright-cli → OK → resto de bloques.

## Skills/herramientas (índice completo en `referencias/skills.md`)
| Paso | Skill/herramienta |
|------|-------------------|
| Cerebro (criterio + anti-slop) | `impeccable` |
| Diales (variación, motion, densidad) | `design-taste-frontend` |
| Despensa (ADN de webs premium) | `skillui` (vía npx) → `referencias-visuales/` |
| Tipografías (pares premium por perfil) | `referencias/tipografias.md` |
| Previews 7-8 (GSAP editorial) | `frontend-design` + impeccable + skills GSAP (core/scrolltrigger/timeline/plugins/utils/performance) |
| Previews 9-10 (GSAP kinético) | `gpt-tasteskill` + impeccable + skills GSAP (ídem) |
| Previews 11-12 (GSAP + 3D) | `frontend-design` + impeccable + skills GSAP + Three.js (skill comunitaria CloudAI-X + CDN r184; ver `referencias/threejs.md`) |
| Evaluar / QA | `playwright-cli` + `verification-before-completion` |
| Ascenso | Next + Tailwind + Vercel (solo la elegida) |

**Descartadas:** `UI-UX Pro Max`, `ui-animation` (redundantes con impeccable + taste).

## Rúbrica
Resumen en `rubrica.md`. Lo medible lo comprueba script (`playwright-cli`); el gusto, la coherencia y el "no parece plantilla" los juzga el modelo.

## Despensa
Qué es y cómo se amplía: `referencias/despensa.md`.

## Pendientes del bloque
- [ ] `writing-plans` del agente de producción (orquesta las 4 fases).
- [ ] Curar la despensa completa (webs de referencia, decisión humana).
