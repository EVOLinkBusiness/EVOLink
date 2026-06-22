# ESTADO — Bloque 3 (Generador) · flujo superpowers

Fase global: **F2 — Agente Generador web**. Spec aprobada → plan aprobado → **IMPLEMENTADO v1 (2026-06-13)**.
Spec: `docs/superpowers/specs/2026-06-12-generador-v1-design.md` · Plan: `docs/superpowers/plans/2026-06-13-generador-v1.md`.

> **✅ v1 COMPLETADO 2026-06-13.** Motor completo en `generador/` (Node + Astro). Suite TDD **20/20 en verde**. E2E verificado con cliente ficticio `demo`: ensamblado determinista → build Astro OK → evaluación con **Lighthouse móvil 98**, 0 enlaces rotos, 0 placeholders, formulario presente, contraste AA. Migración `agent_runs` (stage/output/flags) aplicada al remoto. Deploy y registro construidos y verificados offline (ejecución viva = run piloto).
>
> **✅ DIAGNÓSTICO v1 SUPERADO 2026-06-13 — listo para piloto.** Robustez (suite adversaria + build hostil: 0 fugas, escapado completo, sin XSS), skills sin contradicciones (orden explícito en el orquestador), calidad con 3 muestras distintas (todas PASAN, variedad real). 1 bug corregido (`Footer.nombre_negocio` derivado) + 4 tests nuevos → suite **24/24**. 2 hallazgos de calidad documentados en CHANGELOG (los caza el gate ≥90). Detalle en `CHANGELOG.md` (entrada cabecera DIAGNÓSTICO v1).

## Checklist de ejecución del plan
| Task | Qué | Estado |
|------|-----|--------|
| FASE 2 | Skill `estilo-evolink` (consolida taste, coexiste con frontend-design) | ✅ `c66bab0` |
| B1 | Bootstrap proyecto `generador/` (node:test, tsx) | ✅ `2057eb5` |
| B2 | `schema.ts` + validadores (TDD) | ✅ `dbb8a31` |
| B3 | Catálogo Astro (8 familias ×2-3 variantes + Layout) + plantilla base | ✅ `ed459b7` |
| B4 | Ensamblador determinista (TDD) | ✅ `9f9e263` |
| B5 | Build real del sitio demo (Astro compila) | ✅ (verificado, sin ajustes) |
| C1 | Deps de evaluación (playwright + lighthouse + chromium) | ✅ `ac1de0f` |
| C2 | Checkers deterministas: placeholders/contraste/enlaces (TDD) | ✅ `007d9cf` |
| C3 | Orquestador `evaluate.cli.ts` + `report.ts` | ✅ `af178ec` |
| D1 | Migración aditiva `agent_runs` (stage/output/flags) — aplicada al remoto | ✅ `052e81f` |
| D2 | `run-record.ts` (buildRunRow) + `record.cli.ts` (TDD) | ✅ `0c1ad4a` |
| D3 | `deploy.cli.ts` Cloudflare Pages preview (guarded) | ✅ `8295ed5` |
| FASE 6 | Skill `generador-web` (orquestación 6 etapas) | ✅ `bf48010` |
| FASE 7 | Documentación del bloque | ✅ (este commit) |

Suite: `cd generador && npm test` → **20/20**.

## Dónde retomar
**✅ PILOTO REAL SUPERADO (2026-06-14):** cadena Auditor→Generador con mudanzasroy en local — auditoría real (`fa6d78c5`) → brief/marca/plan/build → **Lighthouse móvil 100** → 5 etapas en `agent_runs`. Sistema de previews probado a mano (5 diseños `ui-ux-pro-max` + 5 motions `ui-animation` + 5 GSAP `gpt-tasteskill`, con logo+fotos reales). Elección: **F5 (Editorial Bold kinético)**. Veredicto del socio: la cadena funciona; **la estética del catálogo es lo mejorable**.

**▶ EN CURSO — REDISEÑO ARTÍSTICO v2.** Spec aprobada: `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`. Ejecutada la ORDEN de rediseño (Fases 0-6) + planificación ampliada:
- **Cerebro nuevo:** `impeccable` (anti-slop) + `design-taste-frontend` (diales). Skills instaladas y aplanadas (0 symlinks).
- **Despensa dual (2026-06-16):** `referencias/despensa.md` (5 refs ADN: stripe/linear/vercel/framer/superlist) + `referencias/estilos-lapa-ninja.md` (géneros de layout/paleta mapeados a perfiles EVOLink, sin clonar lapa.ninja).
- **6 previews de diseño generadas y validadas (2026-06-16):** 1-3 propias (stripe/linear/framer; reveal v2 en las 3), 4-6 lapa.ninja (Magazine-Editorial/Real Estate/Retro-Pattern). Detector impeccable `[]` · 0 mojibake en las 6 + index.html.
- **Decisión 2026-06-16:** Google Stitch descartado (dependencia frágil). Grupo de animación → GSAP + `frontend-design` + Three.js CDN.

**▶ PLAN APROBADO 2026-06-17 — reestructuración a 12 previews.** `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`. Reparto nuevo: **12 = 6 diseño (existentes, se conservan) + 6 GSAP (nuevas, 2+2+2)**:
- 7-8: `frontend-design` + impeccable + skills GSAP · 9-10: `gpt-tasteskill` + impeccable + skills GSAP · 11-12: `frontend-design` + impeccable + GSAP + **Three.js** (skill comunitaria CloudAI-X + CDN r184, fallback solo-CDN).
- **Regla obligatoria del bloque:** toda web (1-12 y final) usa la **estructura de prompt de 4 partes** del blog (`/*1*/` qué+cliente+dirección · `/*2*/` skills · `/*3*/` qué incluir · `/*4*/` requisitos, "Interacciones fluidas y reales" siempre). A documentar como permanente en `flujo-previews.md`.
- **Regla obligatoria — trazabilidad:** cada preview lleva su `<nombre>.prompt.txt` (prompt exacto) junto al HTML en `clientes/<id>/previews/` (también retroactivo para 1-6).

**✅ PASOS 1-5 COMPLETADOS (2026-06-21/22):**
- **Paso 1 (skills):** 8 skills GSAP oficiales + 10 Three.js comunitarias (CloudAI-X) instaladas y aplanadas en `.claude/skills/` — carpetas reales, sin symlinks, sin `.agents/`. Incidencia resuelta: threejs creaba junctions rotas; solución: `[System.IO.Directory]::Delete()` + reinstalar.
- **Paso 2 (referencias):** `estilos-lapa-ninja.md` ampliada (Business/Agency/paletas/plataformas). `despensa.md` con placeholder servicios locales pendiente curación humana.
- **Paso 3 (docs):** `flujo-previews.md` reescrito (12=6+6 + 2 reglas permanentes: `.prompt.txt` y esquema 4 partes). `gsap-skills.md` actualizado (instalado, sin duplicado, sección impeccable + enlace threejs.md). Nueva `referencias/threejs.md` (CDN r184, escena básica, recetas, GSAP scrub, caps móvil). `BLOQUE.md` corregido (12 previews, tabla skills completa).
- **Paso 4 (trazabilidad parcial):** 6 `.prompt.txt` retroactivos creados en `clientes/<id>/previews/` para fab-1…fab-5 + anim-5, marcados `[reconstruido]`.
- **Paso 5 (previews GSAP 2026-06-22):** 6 previews GSAP generadas + 6 `.prompt.txt` en `clientes/cb1dfbea.../previews/`:
  - `gsap-7`: `frontend-design` + SplitText (palabras) + CountUp + stagger reveals — paleta azul/blanco
  - `gsap-8`: `frontend-design` + Flip filter de servicios + DrawSVGPlugin (proceso) + parallax scrub hero — paleta navy/dorado
  - `gsap-9`: `gpt-tasteskill` + SplitText chars brutal + ScrollTrigger pin (services bento) + counter — paleta negro/rojo Bebas Neue
  - `gsap-10`: `gpt-tasteskill` + scroll horizontal (6 paneles pin+scrub) + hero reveal scrub-driven + CustomEase — paleta negro/azul eléctrico
  - `gsap-11`: `frontend-design` + Three.js partículas fondo (canvas fixed, z-index:-1, 2000/500 pts) + SplitText hero — paleta azul muy oscuro
  - `gsap-12`: `frontend-design` + Three.js mesh scroll-driven (hero 250vh sticky, BoxGeometry rota con scrub) + texto sincronizado con progreso — paleta blanco roto/azul

**▶ PRÓXIMO — PASO 6 (QA):**
1. `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/gsap-*.html` → objetivo 0 hallazgos graves
2. Chequeo mojibake en las 6 nuevas + index
3. `python -m http.server` sobre la carpeta de previews → revisar las 12 en local
4. Validar las **12** con el socio → elegir dirección → `writing-plans` del agente de producción

## Notas técnicas de la ejecución
- Sitios de cliente: Astro 5 + Tailwind 3, proyecto self-contained por cliente (`npm install` por cliente; optimización a workspace compartido diferida).
- Test runner `node:test` vía `tsx` (sin dependencias extra de testing).
- Lighthouse en este entorno necesitó `userDataDir` local (el temp global da EPERM). Reusa el chromium de Playwright vía `chromePath`.
- `clientes/` está gitignored (datos de cliente fuera del repo; el registro durable es `agent_runs`).
- Migración aplicada vía MCP `apply_migration` (sin Docker local).
