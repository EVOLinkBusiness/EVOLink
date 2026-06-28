# HANDOVER — EVOLink

**Última sesión:** 28/06/2026
**Branch:** main
**Último commit:** `4123c10 docs: ajustar estado real post-saneamiento`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte Autónomo" ejecutado. **Esqueleto de los 3 agentes saneado**: los hallazgos de la validación pre-piloto (RUTA A) están resueltos. El bloque 4 queda **listo para diseño** (no arrancado).

## Bloque activo
**3-generador** (v4 ejecutado; pendiente revisión socio del set v4 + ascenso) — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (28/06/2026 — saneamiento pre-bloque 4)
- **B1:** `planificador.md` ahora **crea** el andamiaje del bloque (CONTRATO+GUIA) desde `docs/contexto/plantillas/` si falta, rellenando el «Consume» desde el «Produce» del bloque anterior; si existe, solo lee. (Paso 0 vía planificador, no la sesión orquestadora.)
- **B2:** falso positivo — `programador` y `verificador` ya fijaban `model: sonnet` desde `a1bb024`. Sin cambio.
- **I1:** `CONTRATO.md` bloque 3 acepta **ambas entradas** para el 4: preview HTML local **y** URL pública. El piloto arranca con entrada local.
- **I2:** el **test de coincidencia** del CONTRATO sale del piloto del 4 → pendiente propio del bloque 3 (criterio de hecho: test verde en su suite). Registrado en `ESTADO.md` bloque 3.
- **I3:** definido **ORDEN vs spec** en `politica-archivos.md` (spec = QUÉ permanente en specs/; ORDEN = CÓMO desechable en raíz, la escribe el planificador).
- **M1–M5:** `cierre.md` (commit con `-m` múltiples + co-autor por modelo de sesión, no fijo), `inicio.md` (tope 5→6 tool calls + nota de relectura de CLAUDE.md), `verificador.md` (`tools:` acotado; Write/Edit solo para tests).
- **Estado real:** README pasa de "listo para piloto" a "esqueleto saneado; bloque 4 listo para diseño". Nota de saneamiento añadida al doc de validación.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (16 activas). Sin nuevas esta sesión.

## Riesgos y avisos vivos
- **B1 es ahora responsabilidad del planificador:** al arrancar el bloque 4, el primer movimiento del planificador será crear CONTRATO+GUIA desde plantilla. Verificar que lo hace antes de diseñar.
- **Los subagentes no leen `CLAUDE.md` solos:** la sesión principal les pasa el contexto del bloque (CONTRATO/GUIA/spec).
- **Curación de referencias = palanca nº 1.** Mínimo cubierto (truckn-roll + california-vending = sector real; juanmora + Awwwards = motion). `monarch` queda como deuda menor.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- **Test de coincidencia del CONTRATO** = pendiente del bloque 3 (no del piloto del 4).
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- **Single-font en previews v1 es esperado** (fuentes de sistema; par tipográfico real en el ascenso con self-host).
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` gitignored. MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto); valorar `.gitattributes` si molesta el ruido.

## Próximo paso concreto
**Diseño del bloque 4 (Revisor/QA) — sesión 4A con el `planificador`.**
1. Abrir sesión nueva con `/clear` + `/inicio`.
2. Invocar `planificador` pasándole la §Produce del CONTRATO del bloque 3 como contexto → creará CONTRATO+GUIA del bloque 4 (Paso 0) y cerrará el diseño/spec.
3. Tras spec aprobada: programador (TDD) → verificador. Entrada del piloto = preview local.

## Pendientes
- [ ] **Diseño bloque 4 (sesión 4A)** con el planificador (Paso 0 + spec).
- [ ] **Test de coincidencia del CONTRATO** (tarea propia del bloque 3).
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Preparar puesto de Javier (regenerar su ORDEN de onboarding alineada al esqueleto).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
