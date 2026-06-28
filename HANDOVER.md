# HANDOVER — EVOLink

**Última sesión:** 2026-06-28
**Branch:** main
**Último commit:** `896326c docs: ORDEN ejecutable bloque 4 revisor v1 (sesion 4B)`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte" ejecutado. **Bloque 4 (Revisor/QA): diseño v1 cerrado y aprobado** (HARD-GATE superado) — es el PILOTO oficial del esqueleto de 3 agentes: primera vez que planificador→programador→verificador construyen un bloque de cero y se estrena el CONTRATO Generador→Revisor en caliente. Pendiente: implementación (sesión 4B).

## Bloque activo
**4-revisor** (diseño cerrado; pendiente build sesión 4B) — detalle en `docs/bloques/4-revisor/ESTADO.md`.

## Hecho en la sesión actual (28/06/2026 — diseño bloque 4, sesión 4A)
- **Paso 0 (andamiaje):** el `planificador` creó `CONTRATO.md` + `GUIA-DESARROLLO-BLOQUE.md` del bloque 4 desde plantilla, rellenando «Consume» desde la §Produce del bloque 3.
- **Brainstorming (HARD-GATE):** 4 decisiones cerradas por el socio — (1) alcance v1 = solo QA de preview local del bloque 3; (2) suite núcleo determinista (enlaces, dominios, contraste AA, placeholders, responsive, anti-slop, Lighthouse=WARNING); (3) umbral GRAVE determinista, LLM solo para ambiguo/redacción; (4) persistencia en `agent_runs.output`, sin tabla ni migración nueva. Diferido a v2: formulario+Resend, check de motion, upsell de rediseño.
- **Resuelto en sesión:** preview v4 de Mudanzas Roy confirmada en disco (UUID `cb1dfbea-…`, `previews/v4/v4-1..8.html`); `impeccable` disponible y aplanado (detector anti-slop) → entra en v1.
- **Paso 2:** spec permanente `docs/superpowers/specs/2026-06-28-revisor-v1-design.md` + `BLOQUE.md`/`CONTRATO.md`/`GUIA`/`ESTADO.md`/`CHANGELOG.md` a v1 real + ORDEN `2026-06-28-ORDEN-bloque-revisor-v1.md` en raíz (lista para 4B).
- 3 commits: `35abd2a` andamiaje · `e2340d3` diseño · `896326c` ORDEN.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (16 activas). Sin nuevas esta sesión (las 4 de arriba son de alcance del bloque 4, viven en su spec/CHANGELOG, no en BUSINESS.md).

## Riesgos y avisos vivos
- **Sesión 4B = implementación:** el HARD-GATE ya está superado; se PUEDE escribir código. Ejecutar la ORDEN de raíz; el Revisor solo INSPECCIONA (frontera dura con el bloque 3).
- **Determinista primero:** ningún GRAVE (checks 1-4) depende del LLM; mockear el LLM en los tests.
- **Numeración de checks:** la ORDEN renumera localmente (regla de veredicto = paso 1); la spec numera enlaces = check 1. Los nombres son explícitos, sin ambigüedad real.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- **Test de coincidencia del CONTRATO** = pendiente del bloque 3 (no del piloto del 4); el piloto del 4 sí incluye un test de que `agent='revisor'`+`output`+`flags` existen en `agent_runs`.
- **Curación de referencias = palanca nº 1.** `monarch` queda como deuda menor.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- **Single-font en previews v1 es esperado** (par tipográfico real en el ascenso con self-host).
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` gitignored (previews y capturas del Revisor no se commitean). MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto).

## Próximo paso concreto
**Implementar el Revisor v1 (sesión 4B) ejecutando `2026-06-28-ORDEN-bloque-revisor-v1.md`.**
1. Abrir sesión nueva con `/clear` + `/inicio` (confirmar bloque activo = 4).
2. Seguir la ORDEN: test de contrato → checkers con TDD (programador ↔ verificador) → entrada local autocontenida → `output` jsonb + `agent_runs` → E2E sobre preview v4 de Mudanzas Roy → doble revisión.
3. Al terminar: marcar checklist en `ESTADO.md`, anotar ajustes de contrato en `CHANGELOG.md`, borrar la ORDEN (la spec permanece).

## Pendientes
- [ ] **Implementación bloque 4 (sesión 4B)** según la ORDEN.
- [ ] **Test de coincidencia del CONTRATO** (tarea propia del bloque 3).
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Preparar puesto de Javier (regenerar su ORDEN de onboarding alineada al esqueleto).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
