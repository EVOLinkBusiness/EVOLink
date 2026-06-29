# HANDOVER — EVOLink

**Última sesión:** 2026-06-29
**Branch:** main
**Último commit:** `ebf4a43 test(revisor): banco de regresion de falsos GRAVE (placeholder=/href=#)`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte" ejecutado. **Bloque 4 (Revisor/QA) v1 IMPLEMENTADO** (sesión 4B): pase de QA reproducible sobre una preview local del bloque 3 → veredicto (`pass`/`pass_with_warnings`/`rejected`) en `agent_runs`. Es el **piloto del esqueleto de 3 agentes**, completado de extremo a extremo por primera vez (planificó 4A → implementó → revisó → halló un fallo real → corrigió). Código en `revisor/`, 69 tests verdes.

## Bloque activo
**4-revisor** (v1 implementado; doble revisión APROBADA) — detalle en `docs/bloques/4-revisor/ESTADO.md`.

## Hecho en la sesión actual (29/06/2026 — build bloque 4, sesión 4B)
- **Esqueleto de 3 agentes estrenado:** orquestador (Opus) delegó en `programador` (TDD, 2 olas + ronda de fix) y `verificador` (doble revisión + banco de regresión). El verificador **RECHAZÓ** la 1ª entrega por un falso GRAVE real; el programador lo corrigió; aprobado.
- **Carpeta `revisor/`** (espeja convenciones de `generador/`: runner `node --import tsx --test`, helpers puros, `buildRunRow`). Commits `eb564f9`→`ebf4a43`.
- **Suite QA v1 núcleo determinista:** regla de veredicto (`computeVerdict`), checks GRAVE (enlaces internos/externos, mezcla de dominios/URL malformada, contraste AA, placeholders), WARNING (responsive 375/desktop + capturas, anti-slop `impeccable`, Lighthouse). Harness `serveDir` (`python -m http.server` en puerto libre + teardown garantizado). `output` jsonb (spec §5) + recorder a `agent_runs` (`agent='revisor'`).
- **Fix de falso GRAVE (corrección por fallo, ver CHANGELOG):** los checkers portados del bloque 3 marcaban GRAVE el atributo legítimo `placeholder=` y el ancla no-op `href="#"`, rechazando las 8 previews limpias de Mudanzas Roy. Corregido en `revisor/scripts/evaluate-checks.ts` (strip de tags → solo texto visible; `href="#"` deja de ser GRAVE). E2E sobre v4-1/v4-2 → `pass_with_warnings`, 0 GRAVE.
- **Test de contrato** estático: `agent='revisor'`+`output`+`flags` admitidos por el esquema de `agent_runs` (sin migración nueva). ORDEN ejecutada y autoborrada; la spec permanece.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (16 activas). Sin nuevas esta sesión (lo del bloque 4 vive en su spec/CHANGELOG).

## Riesgos y avisos vivos
- **Insert real en `agent_runs` PENDIENTE (acción del socio):** el piloto valida la fila a nivel de estructura (E2E con insert mockeado; CLI imprime la fila sin credenciales). Falta 1 insert REAL para validar el contrato "en caliente" — es outward-facing sobre la BD de producción, no se hizo sin aprobación. Credenciales en `generador/.env`; `npm run record`/`review` lo insertan si hay env.
- **Bloque 3 tiene el MISMO falso positivo latente:** `generador/scripts/evaluate-checks.ts` conserva el patrón `placeholder=`/`href="#"`. Candidato a portar el fix (tarea del bloque 3 / rol Mejora); no tocado desde el 4 por frontera dura.
- **Alcance v1 de enlaces:** sobre preview de página única en local solo se comprueban anclas `#id`; las rutas de página (`/servicios`) se difieren a v2 (entrada URL pública). Lighthouse/impeccable degradan a WARNING si no corren limpios.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` y `revisor/node_modules`+`previews-qa/` gitignored (previews y capturas no se commitean). MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto).

## Próximo paso concreto
**Elegir entre: (a) validar el Revisor "en caliente" con 1 insert real en `agent_runs`, o (b) revisión del socio del set v4 → ascenso del Generador a producción.**
1. (a) Aprobar el insert real → `cd revisor && npm run review -- ../clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/v4/v4-1.html` con env de Supabase cargado; confirmar la fila `agent='revisor'`.
2. (b) Servir `clientes/cb1dfbea-.../previews/v4/`, elegir concepto, volcar a `memoria-director-arte.md §3` y ascender (Astro+React islands → Cloudflare).

## Pendientes
- [ ] **Insert real en `agent_runs`** del Revisor (validación en caliente; supeditado a aprobación).
- [ ] Portar el fix de falso-GRAVE a `generador/scripts/evaluate-checks.ts` (bloque 3).
- [ ] **Test de coincidencia del CONTRATO** (tarea propia del bloque 3).
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Preparar puesto de Javier (regenerar su ORDEN de onboarding alineada al esqueleto).
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
