# HANDOVER — EVOLink

**Última sesión:** 2026-06-28
**Branch:** main
**Último commit:** `c925318 feat: CONTRATO y GUIA-DESARROLLO del Generador (referencia del molde)`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte Autónomo" ejecutado. Esta sesión: **esqueleto de equipo de agentes montado** (retrofit que el v4 dejó pendiente, ya resuelto para el bloque 3).

## Bloque activo
**3-generador (esqueleto montado; pendiente revisión socio del set v4 + ascenso)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-28 — esqueleto de agentes)
- **3 agentes de desarrollo** en `.claude/agents/` (compartidos por todos los bloques): `planificador` (Opus), `programador` (Sonnet), `verificador` (Sonnet). Encarnan `subagent-driven-development`.
- **Política de archivos `.md`** (3 cubos: duro / blando+revisión / congelado) → `docs/contexto/politica-archivos.md`. `CLAUDE.md` la enlaza.
- **`CLAUDE.md` ampliado** (69 líneas ≤200): sección "Equipo de desarrollo", molde de bloque con `CONTRATO.md` + `GUIA-DESARROLLO-BLOQUE.md`, enlace a la política.
- **`/inicio`** ahora carga la `GUIA-DESARROLLO-BLOQUE.md` del bloque activo además del `ESTADO.md`.
- **Plantillas** `_PLANTILLA-CONTRATO.md` + `_PLANTILLA-GUIA-DESARROLLO-BLOQUE.md` en `docs/contexto/plantillas/`.
- **Generador (bloque referencia):** `CONTRATO.md` (Auditor→Generador, **verificado campo a campo contra las migraciones reales** `clients`/`audits`/`agent_runs` — cero diferencias) + `GUIA-DESARROLLO-BLOQUE.md`.
- ORDEN del esqueleto autoborrada (ejecutada). Spec permanente conservada en `docs/superpowers/specs/`.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones. Sin nuevas decisiones esta sesión.

## Riesgos y avisos vivos
- **Los subagentes no leen `CLAUDE.md` solos:** la sesión principal (orquestador) les pasa el contexto del bloque (CONTRATO/GUIA/spec) que cada uno necesita.
- **Curación de referencias = palanca nº 1.** Mínimo cubierto (truckn-roll + california-vending = sector real; juanmora + Awwwards = motion). `monarch` queda como deuda menor.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- **CONTRATO del Generador — test de coincidencia pendiente:** el test que comprueba que el esquema cumple el contrato se crea en el piloto del Revisor.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- **Single-font en previews v1 es esperado** (fuentes de sistema; par tipográfico real en el ascenso con self-host).
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` gitignored. MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`: `[System.IO.Directory]::Delete()` para junctions. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto); valorar `.gitattributes` si molesta el ruido.

## Próximo paso concreto
**PILOTO del esqueleto = construir el bloque 4 (Revisor/QA) con los 3 agentes** (planificador → programador → verificador), estrenando el `CONTRATO.md` Generador→Revisor con un caso real.
En paralelo (Generador): revisión del socio del set v4 → elegir concepto → ascenso a producción. Y preparar el puesto de Javier (su ORDEN de onboarding se regenera alineada a este esqueleto).

## Pendientes
- [ ] **Piloto Revisor (bloque 4)** de cero con los 3 agentes; crea el test de coincidencia del CONTRATO Generador↔esquema.
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Preparar puesto de Javier (regenerar su ORDEN de onboarding alineada al esqueleto).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).
- [ ] (Opcional) Re-extraer `monarch-custom-homes` si se necesita más referencia de reformas.

## Comando para reanudar
/inicio
