# ORDEN DE SESIÓN — Esqueleto de equipo de agentes y contratos por bloque (EVOLink)

**Fecha:** 2026-06-22
**Origen:** sesión de planificación en Claude. Diseño aprobado (spec `docs/superpowers/specs/2026-06-22-esqueleto-agentes-bloques-design.md`).
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin. No hay nada que diseñar: el contenido está literal. Si algo falla técnicamente, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. Donde un archivo aparece entre marcadores `<<<ARCHIVO ... >>>FIN`, su contenido es LITERAL y COMPLETO: crea o sobrescribe el archivo exactamente con ese contenido.
3. No toques nada fuera de lo indicado (código del Generador, otras skills, otros bloques).
4. Responde en español, conciso.
5. Al terminar, ejecuta la Fase 8 (verificación + autoborrado + mensaje) tal cual.

### Decisiones cerradas en esta orden (no reabrir)
- 3 agentes de desarrollo COMPARTIDOS en `.claude/agents/`: `planificador` (Opus), `programador` (Sonnet), `verificador` (Sonnet). No uno por bloque.
- Agentes GENERALISTAS; el contexto del bloque se inyecta vía su `GUIA-DESARROLLO-BLOQUE.md`.
- Comunicación entre bloques por `CONTRATO.md` (manda el contrato; Supabase lo cumple; un test comprueba). Agent teams descartado.
- El verificador escribe/refina tests y emite veredicto; NO reescribe el código del programador.
- Piloto de validación posterior = **bloque 4 (Revisor)**, no aquí.
- NO se toca: código del Generador (v2 terminado, v3 aprobado pendiente), pagos (5), mantenimiento (6), bloque 7. La inclusión de Javier se prepara, no se ejecuta aquí.

---

## FASE 0 — Precondiciones (solo higiene)

Esta orden **no toca el código del Generador**, así que el rediseño v3 pendiente NO la bloquea. Requisitos:
1. `git status --short` → si hay cambios sin commit, ciérralos (commit `chore: wip antes de esqueleto de agentes`) o pide confirmación.
2. Branch `main`. `git pull` para estar al día.
3. No estás a mitad de una tarea de diseño del Generador en esta misma sesión (sesión limpia para el esqueleto).

---

## FASE 1 — Los 3 agentes (`.claude/agents/`)

Crea la carpeta `.claude/agents/` (nombre fijo: Claude Code la busca con ese nombre exacto) y estos 3 archivos.

<<<ARCHIVO: .claude/agents/planificador.md
---
name: planificador
description: Diseña y planifica el trabajo de un bloque. Úsalo al arrancar una tarea nueva para hacer brainstorming, cerrar el diseño y redactar la spec y la ORDEN antes de tocar código. No implementa.
model: opus
tools: Read, Grep, Glob, Write
---

Eres el PLANIFICADOR de EVOLink. Diseñas antes de construir.

Qué haces:
- Brainstorming guiado: exploras el problema, propones enfoques (recomiendas UNO, no das menús neutros), cierras el diseño con el humano.
- Redactas la spec en `docs/superpowers/specs/AAAA-MM-DD-<tema>-design.md` y, cuando proceda, la ORDEN de ejecución.
- Te apoyas en las skills de metodología: `brainstorming`, `writing-plans`.

Qué NO haces:
- No escribes código de producto ni tests (eso es del programador y del verificador).
- No reabres decisiones ya cerradas (ver `docs/BUSINESS.md`).

Reglas:
- Determinista primero, LLM solo para juicio.
- Nada de producto sin diseño aprobado por el humano (HARD-GATE).
- Antes de diseñar, lee el `CONTRATO.md` y la `GUIA-DESARROLLO-BLOQUE.md` del bloque.
- Español, conciso. Marca las ambigüedades en vez de resolverlas en silencio.
>>>FIN

<<<ARCHIVO: .claude/agents/programador.md
---
name: programador
description: Implementa código siguiendo el plan aprobado y desarrollo guiado por pruebas (TDD). Úsalo para escribir el código de una tarea ya diseñada y planificada.
model: sonnet
---

Eres el PROGRAMADOR de EVOLink. Implementas lo que dice el plan, con TDD.

Cómo trabajas:
- Sigues la skill `test-driven-development`: primero el test que falla, luego el código mínimo que lo hace pasar, luego refactor.
- Respetas el `CONTRATO.md` del bloque: tu código debe cumplir la entrada/salida que define.
- Usas las skills del bloque (índice en su `GUIA-DESARROLLO-BLOQUE.md` y en `referencias/<bloque>-agente-accesos.md`).

Reglas:
- No cambias el plan ni el contrato por tu cuenta: si algo no encaja, lo señalas y paras.
- Commits atómicos y convencionales (feat/fix/...). Inglés en código y commits.
- No instalas nada global.
- Español en la comunicación, conciso.
>>>FIN

<<<ARCHIVO: .claude/agents/verificador.md
---
name: verificador
description: Escribe y refina el banco de tests de un bloque y revisa el trabajo del programador en dos pasadas (cumple-spec y calidad). Emite un veredicto. Úsalo después de implementar, antes de dar una tarea por hecha.
model: sonnet
---

Eres el VERIFICADOR de EVOLink. Eres la capa de verificación: lo más valioso del flujo.

Qué haces:
- Escribes y refinas el BANCO DE TESTS del bloque (puedes crear y ejecutar tests).
- Revisas en DOS pasadas, en este orden:
  1. ¿Cumple la spec? (la implementación hace lo que el diseño pedía)
  2. ¿Es buen código? (calidad, legibilidad, sin atajos peligrosos)
- Emites un VEREDICTO claro: aprobado / cambios necesarios (con la lista).
- Te apoyas en `verification-before-completion` y en la `rubrica.md` del bloque.

Guardarraíl (CRÍTICO):
- NO reescribes el código del programador. Si hay que cambiar el código, lo describes en el veredicto y lo hace el programador.

Reglas:
- Evidencia antes de afirmar: no das nada por "hecho" sin ejecutar la comprobación.
- Español, conciso.
>>>FIN

**Commit:** `feat: 3 agentes de desarrollo (planificador/programador/verificador)`

---

## FASE 2 — Política de archivos `.md`

<<<ARCHIVO: docs/contexto/politica-archivos.md
# Política de archivos `.md` — EVOLink

Se mide en LÍNEAS. El criterio del límite: lo que se lee en cada `/inicio` cuesta tokens en cada sesión; lo que se lee bajo demanda, no. De ahí tres cubos.

## Cubo A — se leen en cada `/inicio` → límite DURO
| Archivo | Límite | Cuándo se revisa |
|---------|--------|------------------|
| `CLAUDE.md` | 200 | al cambiar una regla + chequeo al cerrar cada bloque |
| `HANDOVER.md` | 200 (obj. <80) | se reescribe en cada `/cierre` |
| `ESTADO.md` (bloque activo) | ~80 | se reescribe en cada `/cierre` |
| `BLOQUE.md` (por bloque) | 200 | al cambiar el bloque |
| `CONTRATO.md` (por bloque) | ~120 | al cambiar entrada/salida; un test comprueba que Supabase lo cumple |
| `GUIA-DESARROLLO-BLOQUE.md` (por bloque) | ~150 | al cambiar el procedimiento del bloque |

Desborde → se extrae a `referencias/` (o `docs/contexto/<tema>.md`) dejando un enlace de una línea. Lo extraído se lee bajo demanda. `/cierre` avisa si un archivo del bloque activo supera su límite.

## Cubo B — bajo demanda → límite BLANDO + revisión por hitos
`docs/BUSINESS.md`, `docs/ROADMAP.md`, `README.md`, `referencias/*`. Aquí el riesgo es el desfase, no los tokens. Revisión de desfases en dos momentos que ya existen: cuando un bloque pasa de activo a terminado, y al cambiar de fase del ROADMAP.

## Cubo C — congelados → SIN límite, SIN revisión
specs, plans, ÓRDENES (se autoborran), `CHANGELOG.md` (solo se añade), documentos históricos. Si el contenido cambia, se escribe uno nuevo fechado; no se actualiza el viejo.
>>>FIN

**Commit:** `docs: politica de archivos .md (3 cubos)`

---

## FASE 3 — Ampliar `CLAUDE.md`

Inserciones dirigidas. Localiza cada ancla por su título de sección (si el texto exacto ha cambiado, ubícalo por contexto) y aplica el cambio. Mantén `CLAUDE.md` ≤ 200 líneas.

**3.1** Tras la sección `## Modelo operativo — tejido de agentes` (justo antes de `## Arquitectura de bloques`), inserta esta sección nueva:

```
## Equipo de desarrollo — 3 agentes
Tres agentes en `.claude/agents/` (carpeta de nombre fijo de Claude Code), COMPARTIDOS por todos los bloques. El contexto del bloque se les inyecta vía su `GUIA-DESARROLLO-BLOQUE.md`; un subagente no lee este archivo por su cuenta.
- `planificador` (Opus): diseña, planifica, redacta specs y ÓRDENES. No implementa.
- `programador` (Sonnet): implementa con TDD lo que dice el plan.
- `verificador` (Sonnet): escribe/refina el banco de tests y hace doble revisión (cumple-spec → calidad); emite veredicto. NO reescribe el código del programador.
Encarnan el flujo `subagent-driven-development`: la sesión principal orquesta y delega.
```

**3.2** En `## Arquitectura de bloques`, sustituye la frase que enumera el contrato del bloque (la que empieza por "Cada bloque es una carpeta con contrato idéntico:") por esta, que añade `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md`:

```
Cada bloque es una carpeta con contrato idéntico: `BLOQUE.md` (qué hace, estado, skills) · `CONTRATO.md` (entrada/salida; manda el contrato, Supabase lo cumple, un test lo comprueba) · `GUIA-DESARROLLO-BLOQUE.md` (procedimiento del equipo de desarrollo para ese bloque) · `CHANGELOG.md` (evolución; aquí se anota cada cambio de contrato, aprobado por los 2) · `rubrica.md` (si aplica) · `ESTADO.md` (solo si el bloque está en trabajo activo).
```

**3.3** En `## Metodología de trabajo`, dentro de la **Regla de 200 líneas**, añade al final de ese punto:

```
 Límites por archivo y cadencia de revisión: `docs/contexto/politica-archivos.md`.
```

**3.4** En la línea que describe qué lee `/inicio` ("`/inicio` lee HANDOVER + este archivo + git + (si el HANDOVER señala bloque activo) su ESTADO.md."), añade la GUIA:

```
`/inicio` lee HANDOVER + este archivo + git + (si el HANDOVER señala bloque activo) su ESTADO.md **y su `GUIA-DESARROLLO-BLOQUE.md`**. El resto de `docs/` se lee bajo demanda.
```

Verifica: `wc -l CLAUDE.md` ≤ 200.

**Commit:** `docs: CLAUDE.md — equipo de agentes + molde de bloque + politica .md`

---

## FASE 4 — Actualizar `/inicio`

En `.claude/commands/inicio.md`, paso 4, sustituye:
`4. Si el HANDOVER indica un **bloque activo**, lee `docs/bloques/<bloque>/ESTADO.md`.`
por:
`4. Si el HANDOVER indica un **bloque activo**, lee `docs/bloques/<bloque>/ESTADO.md` **y `docs/bloques/<bloque>/GUIA-DESARROLLO-BLOQUE.md`** (procedimiento del bloque).`

**Commit:** `chore: /inicio carga la GUIA-DESARROLLO-BLOQUE del bloque activo`

---

## FASE 5 — Plantillas de bloque

Crea `docs/contexto/plantillas/` con estos dos moldes (para bloques futuros).

<<<ARCHIVO: docs/contexto/plantillas/_PLANTILLA-CONTRATO.md
# CONTRATO — Bloque <N> (<nombre>)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente (bloque/tabla) | Forma |
|-----|-----------------------|-------|
| <dato> | <bloque origen / tabla.columna> | <tipo / forma JSON> |

Precondición: <qué tiene que ser cierto para poder entrar>.

## Produce (salida)
| Qué | Destino (bloque/tabla) | Forma |
|-----|------------------------|-------|
| <resultado> | <bloque destino / tabla> | <tipo / forma JSON> |

## Error
<qué pasa si falla: qué se registra y dónde>.

## Fuente de verdad en Supabase
Migraciones: <archivos>. Test de coincidencia: <ruta del test que comprueba que los campos existen>.
>>>FIN

<<<ARCHIVO: docs/contexto/plantillas/_PLANTILLA-GUIA-DESARROLLO-BLOQUE.md
# GUÍA DE DESARROLLO — Bloque <N> (<nombre>)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/<bloque>-agente-accesos.md`.)

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño y escribe la spec/plan. Lee este archivo + `CONTRATO.md` + la spec del bloque.
2. `programador` (Sonnet): implementa con TDD según el plan. Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión; emite veredicto.

## Orden de una tarea
brainstorming → spec → writing-plans → (programador implementa con TDD ↔ verificador revisa) → QA → entrega.

## Skills del bloque
<índice / enlace a referencias/<bloque>-agente-accesos.md>.

## Criterios de "hecho"
- <cumple rúbrica / registra en agent_runs / veredicto del verificador = aprobado>.

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
>>>FIN

**Commit:** `docs: plantillas CONTRATO y GUIA-DESARROLLO-BLOQUE`

---

## FASE 6 — `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md` del Generador (bloque referencia)

<<<ARCHIVO: docs/bloques/3-generador/CONTRATO.md
# CONTRATO — Bloque 3 (Generador web)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente | Forma |
|-----|--------|-------|
| Brief de auditoría | `audits.result` (jsonb) con `audits.status = 'approved'` | resultado de la auditoría (bloque 2) |
| Datos del negocio | tabla `clients`: `name`, `category`, `city`, `contact` (jsonb), `presence_data` (jsonb) | columnas |
| Marca y medios | Supabase Storage (logo, fotos, brandkit del cliente) | archivos |

Origen: **bloque 2 (Auditor)**. Precondición: la auditoría debe estar aprobada (`status = 'approved'`).

## Produce (salida)
| Qué | Destino | Forma |
|-----|---------|-------|
| Web del cliente | Cloudflare Pages / Vercel | sitio Next/Astro desplegado (URL pública) |
| Registro de ejecución | tabla `agent_runs` | fila con `agent='generador'`, `client_id`, `audit_id`, `status` ('ok'/'error'), `input` (jsonb), `output` (jsonb: `{url, ...}`), `tokens_in`, `tokens_out`, `cost`, `flags` (jsonb) |

Destino: **bloque 4 (Revisor)** consume la web desplegada; **bloque 7 (Mejora)** consume `agent_runs`.

## Error
Si la web no pasa la rúbrica (`playwright-cli`), NO se publica: se registra `status='error'` en `agent_runs` con el motivo en `flags`.

## Fuente de verdad en Supabase
Migraciones: `supabase/migrations/20260611000001_schema.sql` (tablas `clients`, `audits`, `agent_runs`) y `20260613000002_agent_runs_stage.sql` (`output`, `flags`).
Test de coincidencia: pendiente de crear (en el piloto del Revisor) — comprueba que los campos de este contrato existen en el esquema.
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/GUIA-DESARROLLO-BLOQUE.md
# GUÍA DE DESARROLLO — Bloque 3 (Generador web)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/generador-agente-accesos.md`.)

## Diseño vigente
- Plan VIGENTE: `docs/superpowers/plans/2026-06-22-generador-director-arte-v3.md` (rediseño v3, pendiente de ejecución).
- Diseño v2 (terminado): `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`.
- Spec v3 (a formalizar al ejecutar el v3): `docs/superpowers/specs/2026-06-22-generador-director-arte-v3.md`.

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño de la tarea y escribe la spec/plan. Lee este archivo + `CONTRATO.md` + el plan/spec vigente del bloque.
2. `programador` (Sonnet): implementa con TDD según el plan. Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión; emite veredicto.

## Orden de una tarea
brainstorming → spec → writing-plans → (programador implementa con TDD ↔ verificador revisa) → QA con `playwright-cli` → entrega.

## Skills del bloque
Índice completo en `referencias/generador-agente-accesos.md`. Cerebro: `impeccable`. Diales: `design-taste-frontend`. Stack: `next-best-practices`. QA: `playwright-cli` + `verification-before-completion`.

## Criterios de "hecho"
- Cumple la rúbrica (`rubrica.md`): responsive, Lighthouse, enlaces, formulario, contraste, cero relleno.
- Registra en `agent_runs` (tokens/coste/veredicto).
- Veredicto del verificador = aprobado.

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
>>>FIN

Tras crearlos: comprueba que los campos del `CONTRATO.md` coinciden con las migraciones reales (`clients`, `audits.result`, `agent_runs`); si algún nombre difiere, ajústalo en el contrato y avísalo.

**Commit:** `feat: CONTRATO y GUIA-DESARROLLO del Generador (referencia del molde)`

---

## FASE 7 — Verificación (evidencia antes de afirmar)

Ejecuta y muestra la salida:

```bash
# a) Los 3 agentes existen con su modelo
ls -1 .claude/agents/ && for a in planificador programador verificador; do echo "--- $a ---"; grep -E "^name:|^model:" .claude/agents/$a.md; done

# b) CLAUDE.md no supera 200 líneas y tiene la sección nueva
wc -l CLAUDE.md && grep -c "Equipo de desarrollo — 3 agentes" CLAUDE.md

# c) Política de archivos creada
test -f docs/contexto/politica-archivos.md && echo "OK politica" || echo "ERROR politica"

# d) /inicio carga la GUIA
grep -c "GUIA-DESARROLLO-BLOQUE" .claude/commands/inicio.md

# e) Plantillas y archivos del Generador
ls -1 docs/contexto/plantillas/ && ls -1 docs/bloques/3-generador/CONTRATO.md docs/bloques/3-generador/GUIA-DESARROLLO-BLOQUE.md

# f) wc de los nuevos del Generador (CONTRATO ≤120, GUIA ≤150)
wc -l docs/bloques/3-generador/CONTRATO.md docs/bloques/3-generador/GUIA-DESARROLLO-BLOQUE.md
```

Todos deben pasar. Si alguno falla, repórtalo con ❌ (fase, comando, error) y NO continúes a la Fase 8.

---

## FASE 8 — Cierre: HANDOVER + push + autoborrado

1. Actualiza `HANDOVER.md` (raíz): refleja que el esqueleto está montado. Conserva los "Riesgos vivos" anteriores; añade: "los subagentes no leen CLAUDE.md solos: la sesión principal les pasa el contexto del bloque". Próximo paso: el **piloto = construir el bloque 4 (Revisor) con los 3 agentes**; en paralelo, ejecutar el v3 del Generador con los agentes y preparar el puesto de Javier.
2. `git add -A && git commit -m "docs: handover — esqueleto de agentes montado, siguiente=piloto Revisor"`.
3. `git push`.
4. **Autoborrado:** `git rm 2026-06-22-ORDEN-esqueleto-agentes-bloques.md && git commit -m "chore: autoborrado ORDEN esqueleto (ejecutada)" && git push`. (La spec en `docs/superpowers/specs/` permanece; git guarda el historial.)

Si TODO pasó, termina con este mensaje (rellena los datos):

```
✅ Esqueleto de equipo de agentes montado y subido.

- 3 agentes en .claude/agents/ (planificador=Opus, programador=Sonnet, verificador=Sonnet)
- politica-archivos.md creada · CLAUDE.md ampliado (≤200 líneas) · /inicio carga la GUIA
- Plantillas CONTRATO + GUIA-DESARROLLO-BLOQUE creadas
- Generador con su CONTRATO.md (real, contra el esquema) y su GUIA-DESARROLLO-BLOQUE.md (referencia el plan v3)
- Verificaciones: todas en verde · ORDEN autoborrada

SIGUIENTE PASO: el PILOTO = construir el bloque 4 (Revisor) con los 3 agentes
(planificador → programador → verificador), estrenando el CONTRATO Generador→Revisor.
En paralelo: ejecutar el v3 del Generador con los agentes y preparar el puesto de Javier.
```

Si algo falla, repórtalo con ❌ y NO hagas push hasta resolverlo.

>>>FIN DE LA ORDEN
