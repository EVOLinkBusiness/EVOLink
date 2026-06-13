# ORDEN DE SESIÓN — Programación Agente Generador v1 (EVOLink)

**Fecha de redacción:** 2026-06-12
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Diseño aprobado por Kravitzz.
**Spec de referencia (OBLIGATORIA):** `docs/superpowers/specs/2026-06-12-generador-v1-design.md`
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin siguiendo la metodología superpowers. La spec define el QUÉ; esta orden define el ORDEN y los controles. No improvises fuera de la spec; si algo falla técnicamente, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. La spec es la única fuente de diseño. Si encuentras una ambigüedad, pregunta al usuario; no decidas solo.
3. Respeta los HARD-GATE de la metodología: plan aprobado antes de código; TDD en todo script determinista; verificación con evidencia antes de afirmar.
4. Responde en español, conciso. Código y commits en inglés.
5. Esta orden termina con su PROPIO BORRADO (Fase 9). No la omitas.

---

## FASE 0 — Precondiciones (ABORTA si alguna falla)

1. **Bloque 2 (Auditor) al 100%.** Verifica:
   ```bash
   cat docs/bloques/2-auditor/ESTADO.md
   cat HANDOVER.md
   ```
   El ESTADO del Auditor debe marcar su implementación COMPLETADA (código + tests + verificación en verde). Pregunta al usuario: "¿Confirmas que el Auditor está terminado al 100% y no hay órdenes o tests prioritarios pendientes?" Si la respuesta es no, o el ESTADO no lo refleja: **PARA AQUÍ**. Esta orden se queda sin ejecutar (regla de proyecto: no mezclar conceptos entre agentes).
2. La spec existe: `test -f docs/superpowers/specs/2026-06-12-generador-v1-design.md`.
3. `git status --short` limpio (o commit `chore: wip` previo) · branch `main` · `git pull`.
4. Skills necesarias presentes en `.claude/skills/`: `brandkit`, `playwright-cli`, `web-design-guidelines`, `verification-before-completion`, `ui-animation`, `ui-ux-pro-max`, `gpt-tasteskill`, y el grupo taste (`taste-skill`, `soft-skill`, `minimalist-skill`). Lista las que falten antes de continuar.

**Sin commit** (fase de verificación).

---

## FASE 1 — Plan de implementación (writing-plans)

1. Lee la spec completa.
2. Invoca la skill `writing-plans` sobre la spec para producir el plan de implementación detallado del bloque (tareas, orden, criterios de verificación por tarea). Guárdalo donde la skill indique (`docs/superpowers/`).
3. Orden sugerido para el plan (la skill puede refinarlo, no contradecirlo):
   a. Skill `estilo-evolink` (fusión taste) → b. Catálogo mínimo de componentes Astro → c. Script de ensamblado (`plan-pagina.json` → sitio Astro) → d. Pipeline de evaluación (script + pase modelo) → e. Script de entrega (deploy preview Cloudflare Pages) → f. Registro `agent_runs` por etapa → g. Skill `generador-web` (orquestación de las 6 etapas).
4. **HARD-GATE:** presenta el plan al usuario y espera aprobación explícita antes de la Fase 2.

**Commit:** `docs: implementation plan generador v1`

---

## FASE 2 — Skill `estilo-evolink` (consolidación taste)

1. Lee `taste-skill`, `soft-skill` y `minimalist-skill` y fusiona sus principios útiles en una sola skill `.claude/skills/estilo-evolink/SKILL.md` (en español, una sola voz de diseño EVOLink, ≤200 líneas; lo que exceda → subarchivos bajo demanda).
2. Mueve las 3 originales a `docs/contexto/skills-archivadas/` (NO se borran; salen de `.claude/skills/` para no cargar tokens).
3. Actualiza `docs/contexto/inventario-skills.md` (taste → consolidada; `ui-ux-pro-max` y `gpt-tasteskill` → "activa, en evaluación").

**Commit:** `feat: estilo-evolink skill (taste consolidation)`

---

## FASE 3 — Catálogo de componentes + ensamblador (ejecución del plan)

Ejecuta las tareas del plan aprobadas para: catálogo mínimo Astro (variantes suficientes para one-page y 3-5 páginas del nicho reformas) y script de ensamblado determinista. Reglas:
- **TDD** en el ensamblador: test primero (un `plan-pagina.json` de ejemplo debe producir un sitio Astro que compila), código después.
- El modelo NUNCA genera HTML directo en producción: solo el plan. Verifica que el ensamblador es 100% reproducible (misma entrada → misma salida).
- Componentes respetan variables de `marca.json` (colores/tipografía), nada en duro.

**Commits:** atómicos por tarea del plan (feat/test según convención).

---

## FASE 4 — Pipeline de evaluación

Según plan y spec §4 (etapa 5): pase de script (`playwright-cli` + Lighthouse contra `docs/bloques/3-generador/rubrica.md`) + pase de juicio del modelo + lógica de máximo 2 iteraciones + generación de `informe-evaluacion.md`.
- TDD en el pase de script (casos: enlace roto, placeholder, contraste insuficiente → deben detectarse).
- Si la instalación de navegadores de Playwright está pendiente del HANDOVER anterior, hazla ahora.

**Commits:** atómicos por tarea.

---

## FASE 5 — Entrega + registro

1. Script de deploy a Cloudflare Pages (preview con URL temporal; NUNCA dominio definitivo sin orden humana).
2. Registro en `agent_runs` (Supabase): un run por etapa con inputs, outputs, coste (0 en v1, campo previsto para API v2), duración, estado, flags. Reutiliza el patrón ya implementado en el Auditor.

**Commits:** atómicos por tarea.

---

## FASE 6 — Skill `generador-web` (orquestación)

Crea `.claude/skills/generador-web/SKILL.md`: instrucciones operativas de las 6 etapas, artefactos por etapa, los 2 checkpoints humanos (🔵 brief+plan · 🔵 final pre-cliente), y qué skills usa en cada paso (spec §7). ≤200 líneas; detalle extenso → subarchivos.

**Commit:** `feat: generador-web orchestration skill`

---

## FASE 7 — Documentación del bloque

1. `docs/bloques/3-generador/BLOQUE.md`: estado → ACTIVO/implementado v1, contrato cerrado (spec §6), índice de skills actualizado (incluye `estilo-evolink` y `generador-web`; reservas anotadas).
2. Crea `docs/bloques/3-generador/ESTADO.md` (checklist de implementación + dónde retomar).
3. `docs/BUSINESS.md` §Decisiones: añade las decisiones cerradas de la spec §10 que no estén ya (numeración correlativa).
4. Si alguna corrección durante la implementación vino motivada por un fallo: entrada en `docs/bloques/3-generador/CHANGELOG.md`.

**Commit:** `docs: bloque 3 generador v1 (estado, contrato, decisiones)`

---

## FASE 8 — Verificación final (OBLIGATORIA, evidencia antes de afirmar)

1. Test de extremo a extremo con datos ficticios: `plan-pagina.json` de ejemplo → ensamblado → build Astro OK → pase de script de evaluación ejecuta y reporta.
2. `wc -l CLAUDE.md HANDOVER.md docs/bloques/*/BLOQUE.md .claude/skills/estilo-evolink/SKILL.md .claude/skills/generador-web/SKILL.md` → TODOS ≤200 líneas.
3. `find .claude/skills -type l | wc -l` → 0 symlinks.
4. Suite de tests del bloque en verde (muestra la salida).
5. `git status` limpio.

Si algo falla: repórtalo con ❌ (fase, comando, error) y NO continúes a la Fase 9.

---

## FASE 9 — HANDOVER + AUTOBORRADO de esta orden

1. Actualiza `HANDOVER.md` (formato de `/cierre`): hecho en la sesión, bloque activo → 3-generador (o el que toque), riesgos vivos copiados + nuevos, y en **Pendientes**, al final de la cola tras cualquier prioridad existente:
   - `[ ] Run piloto del Generador: "Mudanzas Roy" como CLIENTE NUEVO (no rediseño). Fuente de datos: contenido visible de mudanzasroy.es + ficha de Google Maps, introducido MANUALMENTE en el Auditor → su JSON result alimenta al Generador → web nueva solo en PREVIEW de Cloudflare Pages (sin dominio, sin tocar la web actual, sin redesign-skill, sin copiar estructura/textos de la web vieja). Carácter: prueba empírica de aprendizaje de los 2 agentes encadenados.`
   - `[ ] Evaluar resultados de ui-ux-pro-max y gpt-tasteskill tras las primeras webs (anotar veredicto en CHANGELOG del bloque 3).`
2. **Borra este archivo:** `git rm 2026-06-12-ORDEN-Programacion-Agente-Generador_v1.md` (regla de proyecto: el ORDEN se autodestruye al completarse; la spec permanece y git conserva el historial).
3. **Commit:** `docs: handover generador v1 + remove completed ORDEN` · después `git push`.

Mensaje final (estructura literal, rellena datos):

```
✅ Agente Generador v1 programado, verificado y subido a GitHub.

- [N] commits: [lista hash + mensaje]
- Pipeline de 6 etapas operativo (test extremo a extremo en verde)
- Skills: estilo-evolink creada (taste consolidado), generador-web creada
- Catálogo de componentes v1 + ensamblador determinista (TDD)
- Evaluación: script + modelo, máx. 2 iteraciones
- ORDEN autoborrada (regla de proyecto)

SIGUIENTE PASO: ver Pendientes del HANDOVER (prioridades primero; el run piloto Mudanzas Roy va al final de la cola).
```
