# ESTADO — Bloque 2 (Auditor) · flujo superpowers

Fase global: **F1 — Agente Auditor + backbone Supabase**. Spec aprobada → plan aprobado → **COMPLETADO (backend v1 + entrada de datos)**. Plan: `docs/superpowers/plans/2026-06-11-auditor-v1-backend.md`.

> **✅ COMPLETADO 2026-06-13.** Smoke test real pasado (run `e55cdfe5`: score 47, 7 hallazgos por clave, `supervisor_flags: []`, coste $0,062). Dos bugs detectados y corregidos en el smoke test (share_slug base64url, dimension sin enum) — ver CHANGELOG. Suite: 33/33 en verde. Ambas Edge Functions desplegadas y activas. Pendiente futuro: smoke real del camino de visión (`extract-presence` con captura real) → se cubre en el piloto de ETAPA 4.

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

Suite completa: **32/32 en verde** (`npx deno test supabase/functions/`). Confirmación humana = bucle manual en v1 (UI en Plan B).

## Dónde retomar (Task 16 — smoke test real)
0. **Deploy hecho**: `generate-audit` (v1) y `extract-presence` (v1) DESPLEGADAS y ACTIVAS. Solo falta el secret `ANTHROPIC_API_KEY` para que respondan en tiempo de ejecución.
1. **Usuario**: añadir crédito en https://console.anthropic.com/settings/billing (org "EVOLink" creada, saldo 0 $) → crear API key en https://console.anthropic.com/settings/keys → guardarla como secret `ANTHROPIC_API_KEY` en https://supabase.com/dashboard/project/kdernwxajzzrriolnnmq/functions/secrets (vía dashboard; la clave nunca pasa por el repo).
2. **Camino de entrada nuevo**: aportar captura(s) de la ficha de Maps del piloto → invocar `extract-presence` → revisar el borrador `IntakeForm` → confirmar/corregir (rellenar nicho y zona, que no salen de la captura).
3. Insertar el `clients` confirmado (vía `formToClient`) en `clients` por MCP `execute_sql`.
4. Invocar `generate-audit` (POST `/functions/v1/generate-audit`, Bearer = anon key) y verificar `audits` + `agent_runs` (tokens, coste, flags) + el run `auditor_intake` de la extracción.
5. Revisión humana de la primera narrativa → cualquier corrección a prompt/rúbrica va al CHANGELOG citando el run.
6. Commit de cierre `chore: auditor v1 backend deployed and smoke-tested`.

## Notas técnicas de la ejecución
- No hay Docker ni Deno instalados en la máquina: usar `npx deno test supabase/functions/` (Deno 2.8.3 vía npm) y verificación RLS por SQL remoto.
- El proyecto Supabase tiene default privileges recortados (template con `rls_auto_enable`): toda tabla nueva necesita GRANTs explícitos (ver migración `20260611000004_grants.sql`).
- MCP supabase requiere re-OAuth por sesión (el usuario autoriza en navegador).

## Después del smoke test
Plan B (dashboard Next + informe público `/r/[slug]`) — se escribirá con `writing-plans` cuando el backend esté validado.

En paralelo (validación sin promo): piloto `mudanzasroy.es` + auditorías manuales de reformas.
