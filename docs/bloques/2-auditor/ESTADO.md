# ESTADO — Bloque 2 (Auditor) · flujo superpowers

Fase global: **F1 — Agente Auditor + backbone Supabase**. Spec aprobada → plan aprobado → **código ejecutado al ~90%**. Plan: `docs/superpowers/plans/2026-06-11-auditor-v1-backend.md`.

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
| 11 | Deploy + smoke test real | 🔶 función DESPLEGADA y ACTIVA; falta secret + smoke test |

## Dónde retomar (Task 11, pasos restantes)
1. **Usuario**: añadir crédito en https://console.anthropic.com/settings/billing (org "EVOLink" creada, saldo 0 $) → crear API key en https://console.anthropic.com/settings/keys → guardarla como secret `ANTHROPIC_API_KEY` en https://supabase.com/dashboard/project/kdernwxajzzrriolnnmq/functions/secrets (vía dashboard; la clave nunca pasa por el repo).
2. Insertar negocio real en `clients` (presence_data completo) vía MCP `execute_sql`.
3. Invocar la función (POST `/functions/v1/generate-audit`, Bearer = anon key) y verificar `audits` + `agent_runs` (tokens, coste, flags).
4. Revisión humana de la primera narrativa → cualquier corrección a prompt/rúbrica va al CHANGELOG citando el run.
5. Commit de cierre `chore: auditor v1 backend deployed and smoke-tested`.

## Notas técnicas de la ejecución
- No hay Docker ni Deno instalados en la máquina: usar `npx deno test supabase/functions/` (Deno 2.8.3 vía npm) y verificación RLS por SQL remoto.
- El proyecto Supabase tiene default privileges recortados (template con `rls_auto_enable`): toda tabla nueva necesita GRANTs explícitos (ver migración `20260611000004_grants.sql`).
- MCP supabase requiere re-OAuth por sesión (el usuario autoriza en navegador).

## Después del smoke test
Plan B (dashboard Next + informe público `/r/[slug]`) — se escribirá con `writing-plans` cuando el backend esté validado.

En paralelo (validación sin promo): piloto `mudanzasroy.es` + auditorías manuales de reformas.
