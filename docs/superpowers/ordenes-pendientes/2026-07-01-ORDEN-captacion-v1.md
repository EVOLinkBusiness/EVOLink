# ORDEN DE SESIÓN — Programación Agente Captación v1 (EVOLink)

**Fecha de redacción:** 01/07/2026 (refresco del ORDEN del 12/06/2026 tras el esqueleto de 3 agentes)
**Spec (el QUÉ, OBLIGATORIA):** `docs/superpowers/specs/2026-06-12-captacion-v1-design.md`
**Interfaz del bloque:** `docs/bloques/1-captacion/CONTRATO.md`
**Procedimiento del equipo:** `docs/bloques/1-captacion/GUIA-DESARROLLO-BLOQUE.md` (fases de implementación, skills, criterios de "hecho", guardarraíles)
**Tu rol (sesión principal):** ORQUESTAR el equipo de 3 agentes de `.claude/agents/` — `planificador` planifica, `programador` codea, `verificador` revisa — como en el piloto del bloque 4. Tú no implementas: delegas (flujo `subagent-driven-development`). Esta orden define la SECUENCIA y los CONTROLES; el QUÉ vive en la spec; el CÓMO en la GUIA. No los dupliques ni improvises fuera de ellos.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. La spec es la única fuente de diseño. Ante ambigüedad, o contradicción entre spec/CONTRATO/GUIA, pregunta al usuario; no decidas solo.
3. HARD-GATEs: plan aprobado antes de código · cero envíos sin confirmación del socio + pase de supervisión (GUIA §Guardarraíles) · verificación con evidencia antes de afirmar.
4. Responde en español, conciso. Código y commits en inglés; tablas/campos de datos en español.
5. Inyecta el contexto a cada subagente en su prompt (GUIA + CONTRATO + spec): un subagente no lee los archivos del proyecto por su cuenta.
6. Esta orden termina con su PROPIO BORRADO (Fase 4). No la omitas.

---

## FASE 0 — Precondiciones (HARD-GATE: ABORTA si alguna falla)

1. **Bloque 2 (Auditor) al 100%.** `docs/bloques/2-auditor/ESTADO.md` → implementación COMPLETADA (código + tests + verificación en verde), incluida la entrada del anexo (`2026-06-12-auditor-v1-anexo-entrada.md`).
2. **Bloque 3 (Generador) al 100%.** `docs/bloques/3-generador/ESTADO.md` → COMPLETADO al 100%. Que la v4 esté "ejecutada" NO basta: elección del socio + ascenso a plantilla hechos.
3. `HANDOVER.md` → sin órdenes, tests ni prioridades pendientes por delante de esta.
4. Pregunta al usuario: "¿Confirmas que Auditor y Generador están al 100% y no hay prioridades pendientes?" Si la respuesta es no, o los ESTADO no lo reflejan: **PARA AQUÍ** y registra el motivo en HANDOVER. [checkpoint humano]
5. `git status --short` limpio (o commit `chore: wip antes de captacion v1`) y `git pull` en `main`.

---

## FASE 1 — Planificación (`planificador`, Opus)

1. **Paso 0 — andamiaje:** el planificador comprueba que `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md` del bloque existen y los lee (existen desde el 01/07/2026: no los recrea). Si detecta un desajuste entre ellos y la spec, lo marca y PARAS.
2. Produce el plan de implementación (`writing-plans`) sobre la spec, estructurado en las fases de la GUIA §Fases de implementación, con criterios de éxito por fase.
3. Presenta el plan al usuario y espera aprobación. SIN aprobación no hay código. [checkpoint humano]
4. Crea `docs/bloques/1-captacion/ESTADO.md` (el bloque pasa a ACTIVO) con el checklist del plan.

**Commit:** `docs: captacion v1 implementation plan`

## FASE 2 — Implementación (`programador` ↔ `verificador`)

Ejecuta las fases 1-7 de la GUIA §Fases de implementación EN ORDEN. En cada una: el `programador` implementa con TDD → el `verificador` revisa (cumple-spec → calidad) y emite veredicto → si pide cambios, vuelven al programador (el verificador NO reescribe código) → con veredicto aprobado, commit y actualización de `ESTADO.md`.

Puntos de commit (uno por fase de la GUIA):
1. Datos + test de coincidencia del CONTRATO → `feat(captacion): leads, contactos, bajas tables with RLS`
2. Scoring determinista + `rubrica.md` → `feat(captacion): deterministic lead scoring with tests`
3. Máquina de estados → `feat(captacion): lead state machine with transition log`
4. Etapas 1-3 (la clave de Places va server-side, NUNCA en el repo) → `feat(captacion): search, enrich and scoring pipeline`
5. Etapa 4, panel de confirmación → `feat(captacion): confirmation panel with auditor form handoff`
6. Etapas 5-6 + supervisión. **Presenta las plantillas de toque 1 y 2 al usuario para su aprobación única** antes de versionarlas. [checkpoint humano] → `feat(captacion): outreach, supervision, unsubscribe and follow-up timer`
7. Piloto transversal mudanzasroy.es (spec §13). **Pide al usuario captura/confirmación de los emails recibidos antes de dar la fase por buena.** [checkpoint humano] → `test(captacion): mudanzasroy end-to-end pilot`

## FASE 3 — Verificación final (`verificador`)

Veredicto global contra los criterios de "hecho" de la GUIA (test del CONTRATO, scoring determinista, máquina de estados, doble gate de envío, `agent_runs` por etapa, piloto completo, coste ≤5 €/mes). Evidencia antes de afirmar; `wc -l` de BLOQUE.md/ESTADO.md ≤200. Sin veredicto aprobado no hay Fase 4.

## FASE 4 — Cierre y AUTOBORRADO (OBLIGATORIA)

1. Actualiza: `docs/bloques/1-captacion/BLOQUE.md` (estado: COMPLETADO v1; skills/tablas reales), `ESTADO.md`, `CHANGELOG.md` (entrada de creación), `HANDOVER.md` (próximo paso: piloto completo Auditor→Generador con mudanzasroy, según planificación).
2. Si alguna decisión de spec §15 falta en `docs/BUSINESS.md` §Decisiones, añádela.
3. **Borra este archivo:** `git rm docs/superpowers/ordenes-pendientes/2026-07-01-ORDEN-captacion-v1.md`
4. **Commit:** `feat(captacion): v1 complete; remove ORDEN (self-delete)` → `git push`.
5. Mensaje final con: commits de la sesión, verificaciones en verde y el próximo paso del HANDOVER.

Si algo falla en cualquier fase: repórtalo con ❌ (fase, comando, error) y NO hagas push hasta resolverlo.
