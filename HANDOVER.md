# HANDOVER — EVOLink

**Última sesión:** 28/06/2026
**Branch:** main
**Último commit:** `ee70f9a docs: register Spanish date policy as closed decision`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte Autónomo" ejecutado. Esta sesión: **auditoría documental completa** (PASOS 1-4) — repo consistente, sin desfases entre documentos y estado real.

## Bloque activo
**3-generador (v4 ejecutado; pendiente revisión socio del set v4 + ascenso)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (28/06/2026 — auditoría documental)
- **PASO 1:** inventario y diagnóstico (solo lectura) de 20+ archivos. Informe A-E aprobado.
- **PASO 2.1:** `GUIA-DESARROLLO-BLOQUE.md` del bloque 3 actualizada a v4 (antes decía v3 vigente). `BLOQUE.md` y `ESTADO.md`: eliminado ítem retrofit (deuda saldada).
- **PASO 2.2:** `CLAUDE.md` y `README.md` consistentes con estado real del bloque 3 (v4 ejecutado, curación completada).
- **PASO 2.3:** 18 archivos convertidos a fechas dd/mm/aaaa en contenido (cubos A y B). Exentos: CHANGELOG, specs/ORDENs, TRANSICION-PLANIFICACION.
- **PASO 3:** Política de fechas documentada en `CLAUDE.md` (metodología) y `docs/BUSINESS.md` (decisión #16).
- **PASO 4:** Verificación — 0 fechas YYYY-MM-DD fuera de exentos; todos los archivos ≤ 200 líneas; git limpio.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (16 activas). Nueva esta sesión: **#16 Política de fechas** (dd/mm/aaaa en contenido; YYYY-MM-DD en nombres de specs/ORDENs).

## Riesgos y avisos vivos
- **Los subagentes no leen `CLAUDE.md` solos:** la sesión principal les pasa el contexto del bloque (CONTRATO/GUIA/spec).
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

1. Abrir sesión nueva con `/clear` (contexto limpio para el piloto).
2. Cargar contexto con `/inicio` → leerá GUIA del bloque 3 (activo) o del 4 cuando se cree.
3. Invocar `planificador` con CONTRATO Generador→Revisor como contexto de entrada.

## Pendientes
- [ ] **Piloto Revisor (bloque 4)** con los 3 agentes; crea el test de coincidencia del CONTRATO Generador↔esquema.
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Preparar puesto de Javier (regenerar su ORDEN de onboarding alineada al esqueleto).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
