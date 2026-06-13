# ESTADO — Bloque 2 (Auditor) · flujo superpowers

Fase global: **F1 — Agente Auditor + backbone Supabase**. Spec aprobada → plan aprobado → **COMPLETADO (backend v1 + entrada de datos)**. Plan: `docs/superpowers/plans/2026-06-11-auditor-v1-backend.md`.

> **✅ COMPLETADO 2026-06-13.** Smoke test real pasado (run `e55cdfe5`: score 47, 7 hallazgos por clave, `supervisor_flags: []`, coste $0,062). Dos bugs detectados y corregidos en el smoke test (share_slug base64url, dimension sin enum) — ver CHANGELOG. Ambas Edge Functions desplegadas y activas.
>
> **✅ Revisión profunda + caza de bugs 2026-06-13 (previa a ETAPA 2).** Backend revisado a fondo: sólido y defensivo. 1 bug vivo corregido (coste mal tarifado Opus/Haiku, commit `632424e`) + 1 endurecimiento (`has_maps_listing`, `130b133`) + 3 limitaciones documentadas (sin CORS, cost:0 en runs fallidos, recencia=0) — ver CHANGELOG. **Camino de visión de `extract-presence` validado end-to-end con captura real** (MG Reformas Integrales, coste $0,0027, sin bugs). Suite: **35/35 en verde**.

## Checklist de ejecución del plan (backend, Plan A)
| Task | Qué | Estado |
|------|-----|--------|
| 1 | Init estructura Supabase (`supabase/config.toml`) | ✅ `d84e37c` |
| 2 | Esquema 4 tablas (migración aplicada al remoto) | ✅ `6fbdb1a` |
| 3 | RLS + `get_public_audit` (aplicada) | ✅ `ded2602` + hardening `f598585` |
| 4 | Tests RLS (pgTAP escrito; verificado vía SQL remoto, no hay Docker) | ✅ `2c86e11` |
| 5 | Tipos y pesos scoring | ✅ `09084f6` |
| 6 | Rúbrica determinista (TDD, 8 tests) | ✅ `b203918` |
| 7 | Cliente narrativa Opus 4.8 (2 tests) | ✅ `7bc1702` |
| 8 | Supervisor reglas + Haiku (4 tests) | ✅ `e6a0d76` |
| 9 | Edge Function `generate-audit` (2 tests; 16/16 total en verde) | ✅ `b386b92` |
| 10 | `rubrica.md` del bloque | ✅ `4ece835` |
| 11→16 | Deploy + smoke test real | ✅ ambas funciones desplegadas; smoke test pasado (run `e55cdfe5`) + 2 fixes |

## Entrada de datos (anexo 2026-06-12) — añadido al plan original
| Task | Qué | Estado |
|------|-----|--------|
| 12 | Contrato `IntakeForm` + `validateForm`/`formToClient` (TDD, 9 tests) | ✅ |
| 13 | Extracción por visión desde captura de Maps (Haiku 4.5, TDD, 4 tests) | ✅ |
| 14 | Edge Function `extract-presence` (borrador para confirmación, TDD, 3 tests) | ✅ |
| 15 | CHANGELOG + BLOQUE.md (contrato de entrada) + ESTADO.md | ✅ |

Suite completa: **35/35 en verde** (`npx deno test supabase/functions/`). Confirmación humana = bucle manual en v1 (UI en Plan B).

## Dónde retomar
El bloque está cerrado y validado (incluido el camino de visión). **Próximo: ETAPA 2 — Generador (bloque 3).** El fix de coste ya está en producción (`generate-audit` v5 ACTIVE). Pendiente menor del Auditor:
- Plan B (dashboard Next + informe público `/r/[slug]`) — diferido tras los 3 agentes; al construirlo, resolver CORS de las Edge Functions.

## Notas técnicas de la ejecución
- No hay Docker ni Deno instalados en la máquina: usar `npx deno test supabase/functions/` (Deno 2.8.3 vía npm) y verificación RLS por SQL remoto.
- El proyecto Supabase tiene default privileges recortados (template con `rls_auto_enable`): toda tabla nueva necesita GRANTs explícitos (ver migración `20260611000004_grants.sql`).
- MCP supabase requiere re-OAuth por sesión (el usuario autoriza en navegador).

## Después del smoke test
Plan B (dashboard Next + informe público `/r/[slug]`) — se escribirá con `writing-plans` cuando el backend esté validado.

En paralelo (validación sin promo): piloto `mudanzasroy.es` + auditorías manuales de reformas.
