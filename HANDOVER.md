# HANDOVER — EVOLink

**Última sesión:** 2026-06-11
**Branch:** main
**Último commit:** `2c86e11 test: RLS policies via pgTAP (verified remotely via SQL, no local Docker)`

---

## Estado del proyecto
**Primer código de producto del proyecto: backend del Agente Auditor v1 ejecutado al ~90%.** Las 4 tablas + RLS están aplicadas al Supabase remoto (`kdernwxajzzrriolnnmq`), el motor de scoring/narrativa/supervisión tiene 16/16 tests en verde, y la Edge Function `generate-audit` está DESPLEGADA y ACTIVA. Solo falta el secret `ANTHROPIC_API_KEY` y el smoke test real (Task 11 del plan).

## Bloque activo
2-auditor — detalle en `docs/bloques/2-auditor/ESTADO.md` (checklist de las 11 tasks con commits)

## Hecho en la sesión actual (2026-06-11)
- Plan de implementación escrito y aprobado: `docs/superpowers/plans/2026-06-11-auditor-v1-backend.md` (11 tasks).
- Tasks 1-10 completadas con TDD y commits atómicos (11 commits): estructura supabase/, esquema, RLS, scoring, cliente Opus 4.8, supervisor, Edge Function, rubrica.md.
- Migraciones aplicadas al remoto vía MCP: schema, rls, hardening (advisors), grants (el proyecto tiene default privileges recortados — sin GRANTs explícitos la Edge Function no podría escribir).
- RLS verificada por SQL remoto (anon no lee nada; no-admin autenticado 0 filas; `get_public_audit` solo aprueba; datos de prueba limpiados).
- Edge Function `generate-audit` desplegada (versión 1, ACTIVA, verify_jwt on).
- 2 correcciones anotadas en `docs/bloques/2-auditor/CHANGELOG.md` (supervisor defensivo + hardening/grants).
- Usuario creó la organización "EVOLink" en Anthropic Console (platform.claude.com) — saldo aún 0 $.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Nueva de esta sesión (añadir a BUSINESS.md si se considera de negocio): narrativa con **Opus 4.8** + supervisión con **Haiku 4.5** (elección del usuario en el plan aprobado).

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente (ver inventario).
- La clave `ANTHROPIC_API_KEY` NUNCA se commitea: solo como secret de Edge Function (dashboard o CLI).
- El MCP de Supabase pide re-OAuth cada sesión (el usuario autoriza en el navegador).
- No hay Docker ni Deno en la máquina: tests con `npx deno test supabase/functions/`; RLS se verifica por SQL remoto.

## Próximo paso concreto
**Terminar Task 11 (smoke test real) — ver pasos exactos en `docs/bloques/2-auditor/ESTADO.md` §Dónde retomar.**
1. Usuario: añadir crédito (5 $) en console.anthropic.com/settings/billing → crear API key → pegarla como secret `ANTHROPIC_API_KEY` en el dashboard de Supabase (Edge Functions → Secrets).
2. Claude: insertar negocio real en `clients`, invocar `generate-audit`, verificar `audits` + `agent_runs` (coste ~0,05-0,10 €).
3. Usuario: revisar la primera narrativa (calidad/tono) → commit de cierre.

## Pendientes
- [ ] Task 11: secret + smoke test + revisión humana de la 1ª auditoría.
- [ ] Supabase bajo perfil conjunto: renombrar org a "EVOLink" + invitar al socio como Owner (supabase.com/dashboard → org Settings/Team). En Anthropic Console igual: Miembros → invitar socio.
- [ ] Anthropic Console: rellenar datos fiscales cuando exista CIF/NIF (no bloquea; ver nota en próxima sesión).
- [ ] Plan B del Auditor (dashboard Next + informe público `/r/[slug]`) cuando el smoke test pase.
- [ ] Sesión: canales de promoción (punto abierto en BUSINESS.md).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
