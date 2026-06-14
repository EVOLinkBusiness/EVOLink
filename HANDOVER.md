# HANDOVER — EVOLink

**Última sesión:** 2026-06-14
**Branch:** main
**Último commit:** `docs: close mudanzasroy pilot (chain validated, F5 chosen, ORDEN self-delete)`

---

## Estado del proyecto
**Auditor (bloque 2) ✅ y Generador (bloque 3) ✅ v1, ahora VALIDADOS E2E con el piloto real mudanzasroy en local.** La cadena Auditor→Supabase→Generador funciona de punta a punta (auditoría real → web Astro → Lighthouse móvil 100). El veredicto del socio: la mecánica funciona; **lo mejorable es la estética del Generador** (catálogo se ve "simple"), siguiente foco a cargo del socio en sesiones aparte.

## Bloque activo
**3-generador (v1 validado; pendiente mejora estética v1.1)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-14)
- **Piloto Auditor→Generador (mudanzasroy, local), E2E:** auditoría real `fa6d78c5` → brief/marca/plan/build Astro → **Lighthouse móvil 100**; 5 etapas del Generador en `agent_runs`.
- **Bug Auditor corregido + desplegado:** la narrativa afirmaba "no tiene web" teniendo web propia → cargado `website_url` al prompt + regla en el SYSTEM (`_shared/llm.ts`, `generate-audit/index.ts`); +4 tests (suite **39/39**); `generate-audit` **v6 ACTIVE**. (`6af9932`)
- **Regla permanente del pipeline:** el Generador **siempre prepara 5 previews** (diseño Y motion distintos) → elegir 1 → **borrar las otras 4**; **mix-and-match** (diseño N + motion M); **aprendizaje estadístico** vía `agent_runs` (`preview-choice`) para el bloque 7. En `generador-web/SKILL.md` (Etapa 3b + Checkpoint 1). (`55a4425`, `d547b68`)
- **Sistema de previews probado a mano:** 5 diseños (`ui-ux-pro-max`) + 5 motions (`ui-animation`) + 5 GSAP "fabulosas" (`gpt-tasteskill`), con logo + fotos reales de la web del cliente. Elección final: **F5 (Editorial Bold kinético)**, registrada.
- **Limpieza Supabase:** borrados duplicados (cliente smoke `39932a68` + sus audits + audit buggy `c08852f0`); **11 `agent_runs` conservados**; queda 1 cliente (`cb1dfbea`) + 1 audit (`fa6d78c5`).

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (15 activas). **NUEVA esta sesión:** la **regla de 5 previews del Generador** (5 direcciones → 1 elegida → 4 borradas, mix-and-match, aprendizaje estadístico) — vive en `generador-web/SKILL.md` + CHANGELOG b3. *Avisar:* valorar si elevarla a `BUSINESS.md` como decisión cerrada.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada se construye sin Checkpoint 1; nada al cliente sin el Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **Borrados en Supabase:** el clasificador bloquea deletes por patrón inferido ("todos menos X"); para limpiar hay que **nombrar los UUID exactos**.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) ya existe en local, **nunca commitear**. Para deploy vivo faltan Cloudflare (`CLOUDFLARE_*`) y Resend (`form_action`); diferidos a final de proyecto.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local (temp global da EPERM). Sitios de cliente = Astro self-contained (`npm install` por cliente; `assemble` borra `site/` entero, reinstala). `clientes/` gitignored (incl. las previews del piloto en `clientes/cb1dfbea/previews/`).
- `ANTHROPIC_API_KEY` NUNCA se commitea (secret de Edge Function).
- El MCP de Supabase pide re-OAuth cada sesión.
- No hay Docker ni Deno: tests del Auditor con `npx deno test`; el Generador usa Node (`cd generador && npm test`). Deploy de Edge Functions vía MCP: pasar TODOS los `_shared/` que importa el entrypoint.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Mejora estética del Generador (v1.1)** — lo lleva el socio en sesiones aparte; ver `docs/bloques/3-generador/ESTADO.md`.
1. brainstorming→spec: llevar el lenguaje visual ganador (F5 Editorial Bold) al **catálogo** como variantes nuevas.
2. Implementar el **sistema de 5 previews EN CÓDIGO** (motor), hoy solo en la skill.
3. Self-host de fuentes + motion (`ui-animation` micro / `gpt-tasteskill` macro). El socio explorará vía skills/variaciones con varias pruebas.

## Pendientes
- [ ] Generador v1.1 estética (próximo paso, arriba).
- [ ] Siguiente agente del mapa: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4, depende del 3).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar al socio como Owner; datos fiscales Anthropic con CIF (el socio pedirá ayuda cuando toque).
- [ ] Deploy vivo Cloudflare (diferido) + endpoint Resend para la web de un cliente real.
- [ ] Poda de junctions en `.claude/skills/` (gitignored).
- [ ] Evaluar veredicto de `ui-ux-pro-max`/`gpt-tasteskill` tras las primeras webs (anotar en CHANGELOG b3).

## Comando para reanudar
/inicio
