# HANDOVER — EVOLink

**Última sesión:** 2026-06-13
**Branch:** main
**Último commit:** `f92b647 docs: log successful extract-presence vision smoke test`

---

## Estado del proyecto
**Agente Auditor v1 COMPLETADO y endurecido.** Backend + entrada de datos funcionan end-to-end. Esta sesión hizo una revisión profunda + caza de bugs antes de la ETAPA 2: el backend resultó sólido (1 bug vivo de coste corregido + 1 endurecimiento), y el **camino de visión de `extract-presence` quedó validado con una captura real** (sin bugs, $0,0027). Suite 35/35 en verde. Próximo: construir el Generador (bloque 3).

## Bloque activo
ninguno (2-auditor cerrado y validado) — detalle en `docs/bloques/2-auditor/ESTADO.md`. Próximo: bloque 3 (Generador), ETAPA 2.

## Hecho en la sesión actual (2026-06-13)
- Commit coherente de la planificación pendiente: órdenes + specs v1 de Captación y Generador (`6233340`).
- Revisión profunda del Auditor leyendo todo el código de producción. Veredicto: bien construido y defensivo (varios "bugs" iniciales eran falsos positivos).
- **Fix (bug vivo):** `generate-audit` sumaba tokens Opus+Haiku y los cobraba todos a tarifa Opus → `agent_runs.cost` inflado → tarifado por modelo + test de regresión (`632424e`).
- **Endurecimiento:** `extractFromScreenshot` ya no pisa `has_maps_listing` a ciegas (`130b133`).
- 3 limitaciones documentadas en CHANGELOG (sin CORS, cost:0 en runs fallidos de extract, recencia de reseñas siempre 0 en intake manual). No se tocan (diseño/diferido).
- **Piloto de visión real** de `extract-presence` con captura de Maps ("MG Reformas Integrales"): extracción correcta, `formToClient` correcto, coste $0,0027. Cierra el smoke pendiente de ETAPA 4.
- Suite 35/35 (33 + 2 nuevos). Todo en `docs/bloques/2-auditor/CHANGELOG.md`.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Sin decisiones nuevas de negocio esta sesión.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente.
- `ANTHROPIC_API_KEY` NUNCA se commitea: solo como secret de Edge Function. (El usuario rotó la key tras pegarla en chat para el piloto — mismo título, nuevo valor.)
- El MCP de Supabase pide re-OAuth cada sesión (el usuario autoriza en navegador).
- No hay Docker ni Deno en la máquina: tests con `npx deno test supabase/functions/`; RLS por SQL remoto.
- Deploy de Edge Functions vía MCP `deploy_edge_function`: hay que pasar TODOS los archivos `_shared/` que importa el entrypoint (no bundlea solo).
- En Supabase, un `DELETE` dentro de un CTE no ve el `INSERT` de un CTE hermano (snapshot). Limpiar datos en sentencias separadas.
- **`generate-audit` desplegada tarifa el coste mal (pre-fix `632424e`): requiere redeploy** para que `agent_runs.cost` sea exacto en producción.

## Próximo paso concreto
**ETAPA 2 — Crear el Generador (bloque 3). Leer y ejecutar `2026-06-12-ORDEN-Programacion-Agente-Generador_v1.md` de principio a fin.**
1. Verificar primero que el Auditor sigue al 100% (lo está).
2. La ORDEN incluye su propia fase final de autoborrado.

## Pendientes
- [ ] Redeploy de `generate-audit` para activar el fix de coste en producción.
- [ ] Datos de prueba del smoke en Supabase (cliente sintético "Mudanzas Roy" `39932a68…` + audits + runs): limpiar antes del piloto real si molestan.
- [ ] Supabase/Anthropic bajo perfil conjunto: renombrar org + invitar al socio como Owner.
- [ ] Anthropic Console: datos fiscales cuando exista CIF/NIF.
- [ ] Plan B del Auditor (dashboard Next + informe público `/r/[slug]`) — diferido tras los 3 agentes; resolver CORS al construirlo.
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
