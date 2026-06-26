# Bloque 3 — Generador web

**Estado:** ACTIVO (v4 — director de arte autónomo). Spec v4 aprobada y ejecutada.
**Rol en el tejido:** Creación. Fórmula: **fabricar → evaluar → entregar**.

## Qué hace
De la auditoría (bloque 2) + datos del cliente → un **director de arte** decide la dirección visual por cliente → **8-12 previews dinámicas** para elegir → web **Astro + Tailwind + islas React** funcional, rápida, con marca y que NO parezca plantilla, en **Cloudflare Pages**. Vía volumen/cuota, no arte a medida.

## Spec
`docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md` (única fuente del diseño cerrado v4; absorbe y sustituye el plan v3). La v2 (`2026-06-14-generador-diseño-v2.md`) queda como base implementada.

## Flujo interno (detalle en `referencias/flujo-previews.md`)
- **0 · Despensa / índice (curación humana):** referencias admitidas por roles en `referencias/indice-referencias.md`; ADN extraído con skillUI/extract-design-system. Curación **por demanda**, nunca especulativa.
- **1 · Brief y encaje:** auditoría → marca → el `director-arte` lee brief + `memoria-director-arte.md` + índice.
- **2 · Dirección de arte:** la skill `director-arte` fija 7 diales, nivel de motion (1-5), referencias por roles y **rechazos explícitos** → `clientes/<id>/direccion-arte.md`.
- **3 · 8-12 previews dinámicas:** set compuesto por el director (sin dos iguales en referencia/género/par tipográfico), cada una con su `.prompt.txt` y primitivas P1-P6 (scroll reversible). HTML estático.
- **4 · Elección + recomendación:** `recomendacion.md` (top 2-3 con encaje + fuerza relativa); elegir / mezclar por roles / pedir variantes.
- **5 · Ascenso + QA + entrega:** elegida → Astro + Tailwind + islas React → playwright-cli + Lighthouse ≥ 90 → OK Kravitzz → Cloudflare Pages → resto de bloques (`referencias/ascenso-produccion.md`).

## Skills/herramientas (índice completo en `referencias/skills.md`)
| Paso | Skill/herramienta |
|------|-------------------|
| **Cerebro de dirección de arte** | **`director-arte`** (7 diales + referencias por roles + primitivas + rechazos) |
| Criterio + anti-slop | `impeccable` |
| Voz de diseño EVOLink (motion 1-5) | `estilo-evolink` (§7 espectro, lo fija el director) |
| Diales (variación, motion, densidad) | `design-taste-frontend` / `frontend-design` |
| Índice de referencias (por roles) | `referencias/indice-referencias.md` + skillui / extract-design-system |
| Aprendizaje del socio | `referencias/memoria-director-arte.md` |
| Tipografías (pares premium por perfil) | `referencias/tipografias.md` |
| Motion GSAP (primitivas P1-P5) | skills GSAP (core/scrolltrigger/timeline/plugins/utils/performance) |
| Ambiente 3D (P6, solo cuando suma) | suite Three.js (CDN r184; ver `referencias/threejs.md`) |
| Editorial/kinético (motion alto) | `gpt-tasteskill` |
| Evaluar / QA | `playwright-cli` + `verification-before-completion` |
| Ascenso | Astro + Tailwind + islas React + Cloudflare Pages (solo la elegida) |

**Descartadas:** `UI-UX Pro Max`, `ui-animation` (redundantes con impeccable + taste).

## Rúbrica
Resumen en `rubrica.md`. Lo medible lo comprueba script (`playwright-cli` + Lighthouse); el gusto, la coherencia, el "no parece plantilla", el encaje concepto↔referencia, la pertinencia del motion y el criterio de recomendación los juzga el modelo.

## Despensa
Qué es y cómo se amplía: `referencias/despensa.md` + `referencias/indice-referencias.md`.

## Pendientes del bloque
- [ ] **Curar 1-2 negocios locales reales + Awwwards limpias** en el índice (palanca nº 1; sin esto una mudanza sale pareciendo startup).
- [ ] Self-host de fuentes en el ascenso (Google Fonts hunde Lighthouse móvil).
- [ ] Retrofit del `CONTRATO.md`/`GUIA-DESARROLLO-BLOQUE.md` cuando aterrice el esqueleto de agentes (`.claude/agents/`).
- [ ] Código orquestador (generación de punta a punta) = diferido al bloque 7.

---

## Nota histórica (reparto por slot, eliminado en v4)
Hasta v4 las previews se repartían **por slot fijo** y el motor quedaba predeterminado por posición, no por cliente — origen del "cubo 3D en una mudanza":

| Slot | Motor (histórico) |
|---|---|
| 1-3 | propias (despensa: stripe/linear/framer) |
| 4-6 | lapa.ninja (Magazine/Real-Estate/Retro) |
| 7-8 | frontend-design |
| 9-10 | gpt-tasteskill |
| 11-12 | Three.js ← forzaba el 3D |

v4 lo sustituye por el `director-arte` (decisión por cliente). Detalle del fallo y corrección en `referencias/auditoria-diseno-v4.md`.
