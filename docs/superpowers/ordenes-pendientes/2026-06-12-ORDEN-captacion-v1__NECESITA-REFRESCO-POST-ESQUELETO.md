# ORDEN DE SESIÓN — Programación Agente Captación v1 (EVOLink)

**Fecha de redacción:** 2026-06-12
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Diseño aprobado por Kravitzz.
**Spec de referencia (OBLIGATORIA):** `docs/superpowers/specs/2026-06-12-captacion-v1-design.md`
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin siguiendo la metodología superpowers. La spec define el QUÉ; esta orden define el ORDEN y los controles. No improvises fuera de la spec; si algo falla técnicamente, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. La spec es la única fuente de diseño. Ante ambigüedad, pregunta al usuario; no decidas solo.
3. HARD-GATE de la metodología: plan aprobado antes de código (writing-plans sobre la spec en la Fase 1); TDD en todo script determinista; verificación con evidencia antes de afirmar.
4. Responde en español, conciso. Código y commits en inglés; tablas/campos de datos en español (regla del proyecto).
5. Esta orden termina con su PROPIO BORRADO (Fase 9). No la omitas.

---

## FASE 0 — Precondiciones (ABORTA si alguna falla)

1. **Bloque 2 (Auditor) al 100%.** `cat docs/bloques/2-auditor/ESTADO.md` → implementación COMPLETADA (código + tests + verificación en verde), incluida la entrada del anexo (`2026-06-12-auditor-v1-anexo-entrada.md`).
2. **Bloque 3 (Generador) al 100%.** `cat docs/bloques/3-generador/ESTADO.md` → COMPLETADO. Además: `test -f 2026-06-12-ORDEN-Programacion-Agente-Generador_v1.md && echo "ERROR: el ORDEN del Generador sigue en el repo (no terminó)" || echo OK` (su autoborrado es la evidencia de cierre).
3. `cat HANDOVER.md` → sin órdenes, tests ni prioridades pendientes por delante de esta.
4. Pregunta al usuario: "¿Confirmas que Auditor y Generador están al 100% y no hay prioridades pendientes?" Si la respuesta es no, o los ESTADO no lo reflejan: **PARA AQUÍ** y registra el motivo en HANDOVER.
5. `git status --short` limpio (o commit `chore: wip antes de captacion v1`) y `git pull` en `main`.

---

## FASE 1 — Plan de implementación (writing-plans)
1. Lee la spec completa. Invoca la skill `writing-plans` sobre ella.
2. Presenta el plan al usuario y espera aprobación. SIN aprobación no hay código.
3. Crea `docs/bloques/1-captacion/ESTADO.md` (bloque pasa a ACTIVO) con el checklist del plan.

**Commit:** `docs: captacion v1 implementation plan`

## FASE 2 — Datos: tablas y RLS
Tablas `leads`, `contactos`, `bajas` según spec §8 + máquina de estados §4 (restricción de transiciones a nivel de aplicación; estados como enum). RLS multi-tenant como el resto del proyecto. Migraciones versionadas.

**Commit:** `feat(captacion): leads, contactos, bajas tables with RLS`

## FASE 3 — Rúbrica de puntuación (TDD)
1. Escribe `docs/bloques/1-captacion/rubrica.md` (detalle de spec §7, casos límite incluidos).
2. TDD: tests primero (casos: sin web, web floja, sin ficha, sin teléfono, fuera de zona, empate en umbral) → implementación del scoring determinista.
3. La nota de contexto del modelo se genera aparte y NUNCA modifica la cifra.

**Commit:** `feat(captacion): deterministic lead scoring with tests`

## FASE 4 — Etapas 1-3 (buscar, enriquecer, puntuar)
1. Integración Google Places (zona + nicho; 5-10 leads por tanda; deduplicación contra `leads`; marca sí/no web). La clave de Places va server-side (variable de entorno), NUNCA en el repo.
2. Enriquecimiento: email público si existe; heurística SL/autónomo; `null` si no hay dato — prohibido inventar.
3. Conexión con scoring (Fase 3) → estados `confirmado`/`descartado`. Registro en `agent_runs` por etapa.

**Commit:** `feat(captacion): search, enrich and scoring pipeline`

## FASE 5 — Etapa 4: panel de confirmación
Vistas de leads por estado + pantalla de confirmación: corrección de datos, validación del **formulario del Auditor pre-rellenado** (contrato del anexo de entrada; el Auditor NO se modifica), elección de canal. Sin OK del socio nadie pasa de `confirmado`.

**Commit:** `feat(captacion): confirmation panel with auditor form handoff`

## FASE 6 — Etapas 5-6: contacto y seguimiento
1. Mini-auditoría gancho: reutiliza el motor del Auditor en modo salida corta (spec §10). No crear un segundo motor.
2. Plantillas de toque 1 y 2: redactarlas, **presentarlas al usuario para aprobación única** y guardarlas versionadas. Email obligatorio con: identificación EVOLink, motivo, **baja en un clic** (escribe en `bajas`).
3. Envío toque 1 vía Resend (solo si hay email y no está en `bajas`); si solo hay teléfono → guion de llamada en el panel.
4. Temporizador toque 2: Edge Function programada (cron) a +5 días, determinista, comprueba respuesta/baja antes de enviar.
5. Respuestas al buzón de los socios ("responder a"); traspaso manual en panel.

**Commit:** `feat(captacion): outreach, templates, unsubscribe and follow-up timer`

## FASE 7 — Supervisión
Pase previo a todo envío (spec §11): reglas bloqueantes (bajas, plantilla aprobada, enlace de baja, datos inventados) + chequeo del modelo (tono, personalización, sin promesas falsas). Fallo → flag en `agent_runs` + retención en panel.

**Commit:** `feat(captacion): supervision pass before any send`

## FASE 8 — Piloto transversal mudanzasroy.es
Ejecuta spec §13 completo: búsqueda real → puntuación (caso web floja) → confirmación del formulario → toque 1 y 2 a un email propio/del familiar → prueba de baja en un clic y del temporizador. Evidencia: estados recorridos en `leads`, runs en `agent_runs`, emails recibidos.
**Pide al usuario captura/confirmación de los emails recibidos antes de dar la fase por buena.**

**Commit:** `test(captacion): mudanzasroy end-to-end pilot`

## FASE 9 — Cierre y AUTOBORRADO (OBLIGATORIA)
1. Verificación con evidencia: tests en verde · `wc -l` de BLOQUE.md/ESTADO.md ≤200 · `bajas` bloqueante probado · referencias cruzadas (BLOQUE.md del bloque 1 actualizado con skills/tablas reales).
2. Actualiza: `docs/bloques/1-captacion/BLOQUE.md` (estado: COMPLETADO v1), `ESTADO.md`, `CHANGELOG.md` (entrada de creación), `HANDOVER.md` (próximo paso: piloto completo Auditor→Generador con mudanzasroy, según planificación).
3. Si alguna decisión de spec §15 falta en `docs/BUSINESS.md` §Decisiones, añádela.
4. **Borra este archivo:** `git rm 2026-06-12-ORDEN-Programacion-Agente-Captacion_v1.md`
5. **Commit:** `feat(captacion): v1 complete; remove ORDEN (self-delete)` → `git push`.
6. Mensaje final con: commits de la sesión, verificaciones en verde, y el próximo paso del HANDOVER.

Si algo falla en cualquier fase: repórtalo con ❌ (fase, comando, error) y NO hagas push hasta resolverlo.
