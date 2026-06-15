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

**▶ EN CURSO — REDISEÑO ARTÍSTICO v2 (2026-06-14).** Spec aprobada: `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`. Ejecutada la ORDEN de rediseño (Fases 0-6) + planificación ampliada:
- **Cerebro nuevo:** `impeccable` (anti-slop) + `design-taste-frontend` (diales). Descartadas `ui-ux-pro-max` y `ui-animation`. Skills instaladas y aplanadas (0 symlinks).
- **Despensa:** `referencias-visuales/` creada; smoke-test `skillui` OK con stripe. **Ampliada (2026-06-15)** con linear, vercel, framer, superlist (5 referencias). Hueco identificado: falta una referencia tipo "negocio local" (ver `referencias/despensa.md`).
- **Docs del bloque actualizados:** BLOQUE.md + `referencias/` (skills, despensa, flujo-previews, **stitch-prompts**, **tipografias**) + rúbrica v2.
- **Validación a mano (mudanzasroy):** 3 previews de prueba en `_pruebas/` (gitignored) → detector impeccable **0 hallazgos** tras pulir (Space Grotesk→Clash Display, Inter Tight→Hanken Grotesk, números 01/02/03→etiquetas, em-dash→flecha). Veredicto del socio: van bien pero subir variación/motion y ampliar despensa.
- **Decisión:** **8 previews/cliente** = 5 nuestras + 1 de URL de referencia manual + **2 de Google Stitch MANUAL** (sin MCP: solo servidores comunitarios con riesgo+OAuth). Tipografías = doc curado de pares (`tipografias.md`).

**Próximo (sesión nueva):** ✅ 1) despensa ampliada (linear, vercel, framer, superlist + stripe; 5 referencias, ver `referencias/despensa.md`). Pendiente: 2) regenerar **5 previews** con VARIANCE/MOTION altos + 1 de URL manual; 3) el socio genera **2 de Stitch** con `referencias/stitch-prompts.md`; 4) detector sobre las 8 → servir en local → validar; 5) `writing-plans` del agente de producción + self-host de fuentes. La ORDEN original queda EXTENDIDA (no autoborrada): sus Fases 7-8 se ejecutan al cerrar el plan ampliado.

## Notas técnicas de la ejecución
- Sitios de cliente: Astro 5 + Tailwind 3, proyecto self-contained por cliente (`npm install` por cliente; optimización a workspace compartido diferida).
- Test runner `node:test` vía `tsx` (sin dependencias extra de testing).
- Lighthouse en este entorno necesitó `userDataDir` local (el temp global da EPERM). Reusa el chromium de Playwright vía `chromePath`.
- `clientes/` está gitignored (datos de cliente fuera del repo; el registro durable es `agent_runs`).
- Migración aplicada vía MCP `apply_migration` (sin Docker local).
