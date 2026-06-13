# HANDOVER — EVOLink

**Última sesión:** 2026-06-13
**Branch:** main
**Último commit:** `docs: handover generador v1 + remove completed ORDEN`

---

## Estado del proyecto
**Agente Auditor v1 (bloque 2) COMPLETADO** y **Agente Generador v1 (bloque 3) IMPLEMENTADO Y VERIFICADO E2E.** El Generador convierte el `result` de una auditoría + datos de cliente en una web Astro con marca, evaluada (Playwright + Lighthouse) y desplegable en preview de Cloudflare Pages. Pipeline de 6 etapas, 2 checkpoints humanos, registro por etapa en `agent_runs`. Suite del bloque **20/20**. E2E con cliente ficticio `demo`: ensamblado determinista → build Astro OK → evaluación **PASA** (Lighthouse móvil 98, 0 enlaces rotos, 0 placeholders, contraste AA, formulario presente).

## Bloque activo
**3-generador (implementado v1)** — detalle en `docs/bloques/3-generador/ESTADO.md`. El motor vive en `generador/`.

## Hecho en la sesión actual (2026-06-13)
- **ETAPA 2 ejecutada de principio a fin** (ORDEN del Generador, FASE 0→9, metodología superpowers).
- Plan de implementación (`docs/superpowers/plans/2026-06-13-generador-v1.md`), aprobado en HARD-GATE.
- **Skill `estilo-evolink`** (consolida el grupo taste, adaptada al nicho local; coexiste con `frontend-design` por decisión del usuario).
- **Motor `generador/`** (Node + Astro, TDD con `node:test`): `schema.ts` (validadores) · catálogo Astro (8 familias ×2-3 variantes + Layout) + plantilla base (Astro 5 + Tailwind 3) · **ensamblador determinista** · **pipeline de evaluación** (checkers + Playwright + Lighthouse + informe) · `agent_runs` (constructor + insert) · deploy Cloudflare Pages preview (guarded).
- **Skill `generador-web`** (orquestación de las 6 etapas, 2 checkpoints, máx. 2 iteraciones).
- **Migración aditiva `agent_runs`** (stage/output/flags) aplicada al remoto vía MCP.
- Documentación del bloque (BLOQUE/ESTADO/CHANGELOG) + 7 decisiones nuevas en `BUSINESS.md` (§Decisiones, ahora 15).
- 3 correcciones registradas en el CHANGELOG del bloque (checker de anclas, Lighthouse `userDataDir`, auto-install en evaluate).

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (**15 activas**; las 9-15 son del Generador v1).

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada se construye sin el Checkpoint 1; nada al cliente sin el Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **Generador — credenciales para el run piloto real** (no bloquean el motor; sí el run vivo): Cloudflare (`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`), Supabase (`SUPABASE_SERVICE_ROLE_KEY` para insertar runs), endpoint Resend (`form_action`). Nunca commitear: solo env local / secrets.
- **Generador — entorno:** Lighthouse necesitó `userDataDir` local (el temp global da EPERM); reusa el chromium de Playwright. Sitios de cliente = Astro self-contained con `npm install` por cliente (v1). `clientes/` está gitignored.
- `ANTHROPIC_API_KEY` NUNCA se commitea (secret de Edge Function).
- El MCP de Supabase pide re-OAuth cada sesión (el usuario autoriza en navegador).
- No hay Docker ni Deno: tests del Auditor con `npx deno test`; RLS/migraciones por MCP. El Generador usa Node (`cd generador && npm test`).
- Deploy de Edge Functions vía MCP: pasar TODOS los `_shared/` que importa el entrypoint.
- 28 symlinks pre-existentes en las carpetas-grupo de `.claude/skills/` (Superpowers/Taste Skill/UI-UX skill/Backend), ya gitignored → poda pendiente (ajena al Generador).

## Próximo paso concreto
**Run piloto del Generador** (web nueva de cliente real del nicho). Antes, reunir las credenciales del run vivo (Cloudflare, Supabase service role, endpoint Resend). Ver Pendientes.

## Pendientes
- [ ] Datos de prueba del smoke en Supabase (cliente sintético "Mudanzas Roy" `39932a68…` + audits + runs): limpiar antes del piloto real si molestan.
- [ ] Supabase/Anthropic bajo perfil conjunto: renombrar org + invitar al socio como Owner.
- [ ] Anthropic Console: datos fiscales cuando exista CIF/NIF.
- [ ] Plan B del Auditor (dashboard Next + informe público `/r/[slug]`) — diferido tras los 3 agentes; resolver CORS al construirlo.
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.
- [ ] Poda de los junctions de carpetas-grupo en `.claude/skills/` (gitignored; sin urgencia).
- [ ] Run piloto del Generador: "Mudanzas Roy" como CLIENTE NUEVO (no rediseño). Fuente de datos: contenido visible de mudanzasroy.es + ficha de Google Maps, introducido MANUALMENTE en el Auditor → su JSON result alimenta al Generador → web nueva solo en PREVIEW de Cloudflare Pages (sin dominio, sin tocar la web actual, sin redesign-skill, sin copiar estructura/textos de la web vieja). Carácter: prueba empírica de aprendizaje de los 2 agentes encadenados.
- [ ] Evaluar resultados de ui-ux-pro-max y gpt-tasteskill tras las primeras webs (anotar veredicto en CHANGELOG del bloque 3).

## Comando para reanudar
/inicio
