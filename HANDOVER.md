# HANDOVER — EVOLink

**Última sesión:** 2026-07-01
**Branch:** main
**Último commit:** `157f1e6 docs(captacion): CONTRATO y GUIA-DESARROLLO-BLOQUE del bloque 1`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte" ejecutado (falta elección del socio + ascenso para el 100%). Revisor (bloque 4) ✅ v1 implementado (piloto del esqueleto, 69 tests verdes). Sesión de hoy: documentación de onboarding y del bloque 1 (Captación) — su diseño queda formalizado (spec 12/06 + CONTRATO + GUIA nuevos), listo para que Javier lo programe cuando el bloque 3 esté al 100%.

## Bloque activo
**4-revisor** (v1 implementado; doble revisión APROBADA) — detalle en `docs/bloques/4-revisor/ESTADO.md`.

## Hecho en la sesión actual (01/07/2026)
- **GUIA-COLABORADOR.txt regenerada** (`de62488`, pusheado): repo PÚBLICO confirmado vía API; Parte 0 simplificada (Javier ya es colaborador con escritura, sin invitación); Parte 6 reescrita con el estado real (bloques 2/3/4 + equipo de 3 agentes en `.claude/agents/` + regla "Captación no arranca hasta bloque 3 al 100%"); Parte 9 (migración de cuenta) eliminada.
- **Bloque 1 formalizado** (`157f1e6`, pusheado): creados `docs/bloques/1-captacion/CONTRATO.md` (entrada zona+nicho/lead manual → tablas `leads`/`contactos`/`bajas` + `agent_runs`; contrato con el bloque 2: formulario del anexo + motor en salida corta) y `GUIA-DESARROLLO-BLOQUE.md` (3 agentes, 7 fases desde la spec, TDD del scoring, HARD-GATE de cero envíos sin socio+supervisión). Plantilla: documentos del bloque 4.
- **Detectado (no corregido):** `docs/bloques/2-auditor/BLOQUE.md` línea 3 desactualizado — dice "ACTIVO (F1), siguiente: writing-plans" cuando el Auditor está en producción.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (16 activas). Sin nuevas esta sesión.

## Riesgos y avisos vivos
- **Insert real en `agent_runs` PENDIENTE (acción del socio):** el piloto del Revisor valida la fila a nivel de estructura (E2E con insert mockeado). Falta 1 insert REAL para validar el contrato "en caliente" — outward-facing sobre BD de producción, no se hace sin aprobación. Credenciales en `generador/.env`; `npm run record`/`review` lo insertan si hay env.
- **Bloque 3 tiene el MISMO falso positivo latente:** `generador/scripts/evaluate-checks.ts` conserva el patrón `placeholder=`/`href="#"`. Candidato a portar el fix (tarea del bloque 3 / rol Mejora).
- **Alcance v1 de enlaces (Revisor):** en preview local solo se comprueban anclas `#id`; rutas de página (`/servicios`) diferidas a v2. Lighthouse/impeccable degradan a WARNING si no corren limpios.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` y `revisor/node_modules`+`previews-qa/` gitignored. MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto).

## Próximo paso concreto
**Elegir entre: (a) validar el Revisor "en caliente" con 1 insert real en `agent_runs`, o (b) revisión del socio del set v4 → ascenso del Generador a producción.**
1. (a) Aprobar el insert real → `cd revisor && npm run review -- ../clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/v4/v4-1.html` con env de Supabase cargado; confirmar la fila `agent='revisor'`.
2. (b) Servir `clientes/cb1dfbea-.../previews/v4/`, elegir concepto, volcar a `memoria-director-arte.md §3` y ascender (Astro+React islands → Cloudflare).

## Pendientes
- [ ] **Refrescar la ORDEN de Captación** (`2026-06-12-ORDEN-Programacion-Agente-Captacion_v1.md`, raíz): alinearla al esqueleto de 3 agentes y a los nuevos `CONTRATO.md` + `GUIA-DESARROLLO-BLOQUE.md` del bloque 1 (paso 4 de la tarea de onboarding; la GUIA-COLABORADOR ya está hecha).
- [ ] **Corregir `docs/bloques/2-auditor/BLOQUE.md` línea 3:** sigue diciendo "ACTIVO (F1), siguiente: writing-plans"; el Auditor está completado y en producción.
- [ ] **Insert real en `agent_runs`** del Revisor (validación en caliente; supeditado a aprobación).
- [ ] Portar el fix de falso-GRAVE a `generador/scripts/evaluate-checks.ts` (bloque 3).
- [ ] **Test de coincidencia del CONTRATO** (tarea propia del bloque 3).
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
