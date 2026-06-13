# HANDOVER — EVOLink

**Última sesión:** 2026-06-13
**Branch:** main
**Último commit:** `53eab2d docs: mark auditor block v1 COMPLETADO (smoke test passed)`

---

## Estado del proyecto
**Agente Auditor v1 COMPLETADO al 100%** (ETAPA 1 del plan maestro). Backend + entrada de datos funcionando end-to-end: el smoke test real generó una auditoría completa (score 47, 7 hallazgos, recomendaciones, `supervisor_flags: []`, coste $0,062). Ambas Edge Functions (`generate-audit` v3, `extract-presence` v1) desplegadas y ACTIVAS. Suite 33/33 en verde.

## Bloque activo
ninguno (2-auditor cerrado) — detalle en `docs/bloques/2-auditor/ESTADO.md`. Próximo: bloque 3 (Generador), ETAPA 2.

## Hecho en la sesión actual (2026-06-13)
- ETAPA 1 (anexo de entrada): formulario formal `IntakeForm` + `validateForm`/`formToClient` (`_shared/intake/form.ts`), extracción por visión Haiku desde captura de Maps (`_shared/intake/extract.ts`), y Edge Function `extract-presence` (devuelve borrador para confirmación humana, registra run). 16 tests nuevos, TDD.
- Smoke test real de `generate-audit` con un negocio sintético: pasó tras corregir 2 bugs que destapó.
- **Fix 1 (bloqueante):** `audits.share_slug` usaba `encode(..,'base64url')` (no existe en Postgres) → todo INSERT reventaba. Migración `20260613000001` + esquema corregido.
- **Fix 2:** el modelo devolvía `dimension` como etiqueta, no clave → 7 flags de supervisión espurios → `enum` en `NARRATIVE_SCHEMA` + prompt. Verificado limpio.
- Confirmación humana = bucle manual en v1 (UI a Plan B). Camino de visión con captura real se valida en el piloto (ETAPA 4).

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Sin decisiones nuevas de negocio esta sesión (modelo de visión Haiku 4.5 es decisión técnica, ya en CHANGELOG/BLOQUE).

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente.
- `ANTHROPIC_API_KEY` NUNCA se commitea: solo como secret de Edge Function. **Ya está puesto** (smoke test funcionó).
- El MCP de Supabase pide re-OAuth cada sesión (el usuario autoriza en navegador).
- No hay Docker ni Deno en la máquina: tests con `npx deno test supabase/functions/`; RLS por SQL remoto.
- Deploy de Edge Functions vía MCP `deploy_edge_function`: hay que pasar TODOS los archivos `_shared/` que importa el entrypoint (no bundlea solo).
- En Supabase, un `DELETE` dentro de un CTE no ve el `INSERT` de un CTE hermano (snapshot). Limpiar datos en sentencias separadas.

## Próximo paso concreto
**ETAPA 2 — Crear el Generador (bloque 3). Leer y ejecutar `2026-06-12-ORDEN-Programacion-Agente-Generador_v1.md` de principio a fin.**
1. Verificar primero que el Auditor sigue al 100% (lo está).
2. La ORDEN incluye su propia fase final de autoborrado.

## Pendientes
- [ ] Datos de prueba del smoke test en Supabase (cliente sintético "Mudanzas Roy" `39932a68…` + 2 audits + runs): limpiar antes del piloto real de ETAPA 4 si molestan.
- [ ] Smoke real del camino de visión (`extract-presence` con captura real de Maps) → ETAPA 4.
- [ ] Supabase/Anthropic bajo perfil conjunto: renombrar org + invitar al socio como Owner.
- [ ] Anthropic Console: datos fiscales cuando exista CIF/NIF.
- [ ] Plan B del Auditor (dashboard Next + informe público `/r/[slug]`) — diferido tras los 3 agentes.
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
