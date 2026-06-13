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
El bloque está implementado y verificado E2E con datos ficticios. **Próximo: run piloto real** (web nueva de cliente del nicho) — ver Pendientes del HANDOVER. Para ese run hacen falta credenciales (Cloudflare, Supabase service role, endpoint Resend).

## Notas técnicas de la ejecución
- Sitios de cliente: Astro 5 + Tailwind 3, proyecto self-contained por cliente (`npm install` por cliente; optimización a workspace compartido diferida).
- Test runner `node:test` vía `tsx` (sin dependencias extra de testing).
- Lighthouse en este entorno necesitó `userDataDir` local (el temp global da EPERM). Reusa el chromium de Playwright vía `chromePath`.
- `clientes/` está gitignored (datos de cliente fuera del repo; el registro durable es `agent_runs`).
- Migración aplicada vía MCP `apply_migration` (sin Docker local).
