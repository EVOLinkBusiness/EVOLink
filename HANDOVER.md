# HANDOVER — EVOLink

**Última sesión:** 2026-06-14
**Branch:** main
**Último commit:** `docs: generador diagnostic complete, pilot-ready`

---

## Estado del proyecto
**Agente Auditor v1 (bloque 2) COMPLETADO** y **Agente Generador v1 (bloque 3) IMPLEMENTADO, VERIFICADO E2E y DIAGNOSTICADO → listo para piloto.** El Generador convierte el `result` de una auditoría + datos de cliente en una web Astro con marca, evaluada (Playwright + Lighthouse) y desplegable en preview de Cloudflare Pages. Pipeline de 6 etapas, 2 checkpoints humanos, registro por etapa en `agent_runs`. Suite del bloque **24/20→24** (4 tests adversarios nuevos). E2E con cliente ficticio `demo`: PASA (Lighthouse móvil 98). **Diagnóstico v1 superado (2026-06-14):** robustez (build hostil sin XSS ni fugas), skills sin contradicciones, calidad con 3 muestras distintas (todas PASAN, variedad real); 1 bug corregido (`Footer.nombre_negocio` derivado) + 2 hallazgos de calidad documentados (ver CHANGELOG del bloque 3).

## Bloque activo
**3-generador (implementado v1)** — detalle en `docs/bloques/3-generador/ESTADO.md`. El motor vive en `generador/`.

## Hecho en la sesión actual (2026-06-14)
- **Diagnóstico profundo del Generador v1 ejecutado de principio a fin** (ORDEN-Diagnostico, FASE 0→5, metodología superpowers). ORDEN autoborrada al completarse.
- **FASE 1 (robustez):** suite adversaria (`generador/tests/adversarial.test.ts`) + build con datos hostiles → 0 fugas `null`/`undefined`, escapado completo de Astro, sin XSS. **1 bug corregido:** `Footer.nombre_negocio` se exigía al plan aunque se deriva de marca → quitado de `required` (`67b6abb`).
- **FASE 2 (skills):** límites verificados; sin contradicciones duras entre `frontend-design`/`estilo-evolink`/`generador-web`; añadido el orden explícito al orquestador (`d3b1c46`).
- **FASE 3 (calidad):** 3 webs ficticias (garcia/novabano/montanes) con paletas/variantes/secciones distintas → variedad real, no plantilla; las 3 PASAN (Lighthouse 91/94/98). 2 hallazgos: `google_fonts` `<link>` hunde el móvil bajo 90; HeroC con imagen sobredimensionada penaliza LCP (ambos los caza el gate ≥90).
- Suite del bloque: **24/24**. CHANGELOG + ESTADO del bloque 3 actualizados (`2212bce`).

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
**Piloto parcial mudanzasroy.es en LOCAL** (cadena Auditor → Generador, sin deploy; Cloudflare diferido) — ORDEN `2026-06-13-ORDEN-Piloto-Mudanzasroy-Local.md` (sin tocar hasta confirmar). **Bloqueado por credenciales:** falta `generador/.env` con `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (para invocar el Auditor como Edge Function y escribir en `agent_runs`). Para el piloto local NO hacen falta Cloudflare ni Resend.

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
