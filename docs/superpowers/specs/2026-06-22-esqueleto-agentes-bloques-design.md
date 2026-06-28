# Diseño — Esqueleto de equipo de agentes y contratos por bloque (EVOLink)

**Fecha:** 2026-06-22
**Estado:** diseño aprobado en sesión de planificación (Claude). El siguiente artefacto es la ORDEN del Paso 1, que se genera a partir de esta spec.
**Alcance:** esqueleto **permanente** del proyecto. Todo bloque presente o futuro se adapta a este molde; lo que se añada después debe encajar aquí, no al revés.

---

## 1. Problema y objetivo

Hoy los bloques existen como documentos (`docs/bloques/`) y el método de trabajo vive en skills de superpowers usadas de forma ad-hoc. Faltan dos cosas:

1. Una **capa de equipo de desarrollo** explícita (qué "empleados" construyen cada bloque), idéntica en todos los bloques y fácil de entender para alguien que entra nuevo.
2. Una forma clara de que **los bloques se conecten** cuando dos personas (Mauricio y Javier) lleven bloques distintos cuyos resultados dependen unos de otros.

Objetivo: dejar una base reforzada, intuitiva y cerrada que permita **mantener y editar cada bloque por separado** y **trabajar en asíncrono** entre Mauricio y Javier, antes de preparar el puesto de Javier.

---

## 2. Decisiones cerradas (no reabrir)

- **3 agentes de desarrollo**, compartidos por todos los bloques (no uno por bloque):
  - `planificador` → **Opus 4.8** (diseña, planifica, redacta specs y ÓRDENES).
  - `programador` → **Sonnet** (escribe código con TDD).
  - `verificador` → **Sonnet** (escribe/refina bancos de tests + doble revisión; emite veredicto).
- **Agentes generalistas**, no especializados por bloque. El contexto del bloque se inyecta vía su `GUIA-DESARROLLO-BLOQUE.md`. (Evita 3×7 = 21 archivos y mantiene la base intuitiva para Javier.)
- **Comunicación entre bloques = contratos** (un `CONTRATO.md` por bloque + Supabase). **Equipos de agentes (agent teams) descartado** (experimental, frágil, y los socios no trabajan a la vez).
- **El contrato manda; Supabase lo cumple**; un test comprueba que coinciden. Cambios de contrato **aprobados por los dos** y anotados en el `CHANGELOG.md` del bloque.
- **`GUIA-DESARROLLO-BLOQUE.md` por bloque** = procedimiento del equipo de desarrollo para ese bloque. `/inicio` lo carga junto al `ESTADO.md` del bloque activo.
- **El verificador no reescribe el código del programador.** Su trabajo es escribir/refinar tests y emitir veredicto.
- **Política de archivos `.md`** (3 cubos: duro / blando+revisión / congelado) — sección 7.
- **Piloto de validación = bloque 4 (Revisor/QA)**, primer bloque de ingeniería construido de cero con los 3 agentes. Valida el molde completo y estrena el `CONTRATO.md` entre dos bloques (Generador→Revisor). — sección 9.
- **No se toca ahora:** código del Generador (v2 terminado, v3 aprobado pendiente de ejecución), pagos (5), mantenimiento (6), bloque 7. La inclusión de Javier se prepara, no se ejecuta aquí.

---

## 3. Arquitectura: dos capas

La palabra "agente" tiene dos sentidos en EVOLink y conviene no mezclarlos:

- **Agente-producto:** el Auditor, el Generador… son agentes que corren en Supabase y hacen el trabajo del negocio. **Los bloques son estos agentes.**
- **Agente-desarrollo:** los 3 agentes (`planificador`/`programador`/`verificador`) que **construyen** los agentes-producto.

El punto de unión entre bloques (qué escribe el Auditor que el Generador lee) es a la vez el contrato del producto y el punto de coordinación entre Mauricio y Javier. Es la misma cosa para las dos capas.

---

## 4. Los 3 agentes de desarrollo (`.claude/agents/`)

Carpeta de nombre fijo `.claude/agents/` (Claude Code la busca con ese nombre exacto; no se traduce). Cada agente es un archivo Markdown con cabecera (nombre, descripción, modelo, herramientas) y un cuerpo que es su prompt de rol. Un subagente **solo recibe su propio prompt + el contexto que le pasa el orquestador** (no lee `CLAUDE.md` por su cuenta); por eso la sesión principal le entrega el trozo de CONTRATO/GUIA/spec que necesita.

| Agente | Modelo | Permisos | Rol |
|--------|--------|----------|-----|
| `planificador` | Opus 4.8 | lectura + redacción de specs/planes | Brainstorming, diseño, redacta specs y ÓRDENES. No implementa código. |
| `programador` | Sonnet | todas | Implementa con TDD lo que dice el plan. |
| `verificador` | Sonnet | todas | Escribe/refina el banco de tests, ejecuta y hace la **doble revisión** (1º cumple-spec, 2º calidad de código), emite veredicto. **No reescribe el código del programador.** |

Los 3 agentes **encarnan el flujo de superpowers `subagent-driven-development`** (ya instalado): la sesión principal orquesta, el programador implementa, el verificador hace las dos revisiones.

---

## 5. Molde de bloque (idéntico para los 7)

Cada carpeta `docs/bloques/N-nombre/` tiene siempre la misma forma:

```
docs/bloques/N-nombre/
├── BLOQUE.md                    qué hace, estado, skills que usa
├── CONTRATO.md                  entrada/salida (interface); manda él, Supabase lo cumple
├── GUIA-DESARROLLO-BLOQUE.md    procedimiento del equipo de dev para este bloque
├── CHANGELOG.md                 evolución; aquí se anota cada cambio de contrato (aprobado por los 2)
├── ESTADO.md                    solo si el bloque está activo
└── referencias/                 desbordes + <bloque>-agente-accesos.md (recursos del producto)
```

**Frontera clara entre dos archivos parecidos:**
- `referencias/<bloque>-agente-accesos.md` = recursos del **producto en marcha** (tablas de Supabase, Cloudflare, Resend, skills de diseño). Ya existe; no se duplica.
- `GUIA-DESARROLLO-BLOQUE.md` = procedimiento del **equipo de desarrollo** para construir el bloque. **Enlaza** a `agente-accesos.md`, no copia su contenido.

Esta autosuficiencia por carpeta es lo que permite el mantenimiento por separado y la edición asíncrona: cada socio abre la carpeta de su bloque y tiene todo (qué hace, su contrato, su procedimiento, su estado).

---

## 6. Contratos entre bloques

`CONTRATO.md` por bloque, fácil de interpretar, con: qué consume (forma + bloque de origen), qué produce (forma del JSON + tabla/columnas de Supabase), y el caso de error.

- **El contrato es la fuente de verdad** (es el acuerdo que firman Mauricio y Javier). El **esquema de Supabase es la obra que lo cumple**. Un **test** comprueba que coinciden.
- Un cambio de contrato lo **aprueban los dos** y se anota en el `CHANGELOG.md` del bloque.
- Comunicación **asíncrona** vía git + Supabase. Sin agent teams.

Ejemplo ya casi implementado: el Generador "lee `audits.result` (el brief) y escribe `agent_runs`". El `CONTRATO.md` del Generador formaliza ese interface que ya vive en el esquema.

---

## 7. Política de archivos `.md`

Se mide en **líneas**. El detalle completo vivirá en `docs/contexto/politica-archivos.md` (se lee bajo demanda); `CLAUDE.md` solo enlaza y deja la regla núcleo.

- **Cubo A — se leen en cada `/inicio` → límite DURO.** `CLAUDE.md` 200 · `HANDOVER.md` 200 (obj. <80) · `ESTADO.md` ~80 · `BLOQUE.md` 200 · `CONTRATO.md` ~120 · `GUIA-DESARROLLO-BLOQUE.md` ~150. Desborde → `referencias/`. `/cierre` avisa si el bloque activo supera su límite.
- **Cubo B — bajo demanda → blando + revisión por hitos.** `BUSINESS.md`, `ROADMAP.md`, `README.md`, `referencias/*`. Revisión de desfases cuando un bloque pasa de activo a terminado y al cambiar de fase del ROADMAP.
- **Cubo C — congelados → sin límite, sin revisión.** specs, plans, ÓRDENES (se autoborran), `CHANGELOG.md` (solo se añade), históricos.

---

## 8. Cómo se entra a trabajar un bloque

1. Sesión nueva → `/inicio`. Carga `HANDOVER` + `CLAUDE.md` + git + (si hay bloque activo) su `ESTADO.md` **y su `GUIA-DESARROLLO-BLOQUE.md`**.
2. La sesión principal actúa de **orquestador**: lee el bloque y delega en los 3 agentes (planificador → programador → verificador), entregándoles el contexto que cada uno necesita.
3. Un bloque por sesión, para no mezclar memoria entre el trabajo de Mauricio y el de Javier.

---

## 9. Piloto de validación = bloque 4 (Revisor/QA)

El piloto valida que los 3 agentes y el molde funcionan **sin fallas** en un bloque construido de cero. Se eligió el Revisor tras una audiencia de las alternativas (v3 del Generador y "v3 enfocado a ingeniería"): el v3 es mayormente juicio de diseño y casi no produce código con pruebas, así que validaría flojo al programador y al verificador. El Revisor, en cambio:

- Es **ingeniería pura** (Playwright, checkers deterministas, rúbrica compartida con el Generador) → ejercita a fondo planificador → programador → verificador.
- **Depende del Generador** (ya hecho) → estrena el `CONTRATO.md` entre dos bloques (Generador→Revisor) con un caso real. Es la prueba directa de la edición asíncrona entre bloques.
- Es un **bloque nuevo de cero** → demuestra que el molde sirve para **construir y mantener** un bloque autosuficiente, no solo para documentar uno existente.

El **v3 del Generador** se ejecuta igualmente con los agentes, como **primer uso real** (estrena sobre todo al planificador), pero la prueba de fuego del esqueleto es el Revisor.

---

## 10. Alcance — qué NO se toca

- **Generador:** v2 terminado; v3 ("director de arte") aprobado y **pendiente de ejecución**. El esqueleto **no toca el código del Generador**, así que se monta ahora aunque el v3 esté pendiente. El v3 se ejecuta después, ya con los agentes.
- **Pagos (5), mantenimiento (6):** en pausa; reciben su CONTRATO/GUIA cuando empiecen.
- **Bloque 7:** en pausa. Su diseño se sube y se construye más adelante, a la orden de Mauricio.
- **Inclusión de Javier:** se prepara la base; su ORDEN de onboarding se **regenera** en el Paso 3 (alineada a este esqueleto), no aquí.

---

## 11. Criterios de éxito

- Existen los 3 agentes en `.claude/agents/` con su modelo y permisos correctos.
- `CLAUDE.md` describe la capa de desarrollo y el molde de bloque, y enlaza `politica-archivos.md`. Sigue ≤ 200 líneas.
- `/inicio` carga la `GUIA-DESARROLLO-BLOQUE.md` del bloque activo.
- El Generador tiene su `CONTRATO.md` (Auditor→Generador) y su `GUIA-DESARROLLO-BLOQUE.md` (que referencia el plan v3 vigente).
- Existen las plantillas de `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md` para los bloques futuros.
- **Piloto:** el bloque 4 (Revisor) se construye de cero con los 3 agentes, estrena el `CONTRATO.md` Generador→Revisor y termina con veredicto del verificador.
- Cero archivos creados para los bloques en pausa (5, 6, 7) y cero cambios en el código del Generador.

---

## Auto-revisión

- **Sin placeholders:** nombres, modelos y permisos fijados; el piloto queda definido (Revisor).
- **Consistencia:** "agentes generalistas + GUIA por bloque" es coherente con "contratos, no agent teams", con "un bloque por sesión" y con la meta de autosuficiencia y asincronía.
- **Alcance:** cabe en una sola ORDEN (agentes + política + ampliar CLAUDE.md + plantillas + CONTRATO/GUIA del Generador). El piloto (Revisor), el v3 y los demás bloques son sesiones aparte.
- **Ambigüedad:** "quién manda en el contrato" resuelto (manda el contrato, Supabase lo cumple, test); frontera GUIA-DESARROLLO-BLOQUE vs agente-accesos explícita.
