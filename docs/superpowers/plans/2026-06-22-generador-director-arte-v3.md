# Plan — Generador v3: director de arte autónomo

> **Estado:** aprobado por Kravitzz (2026-06-22). **Pendiente de ejecución** (otra prioridad antes). Alcance confirmado: cerebro + pipeline + auditoría, **SIN código orquestador** (sigue siendo generación asistida con skills; automatizar en código sería un plan posterior, encaja con bloque 7/Mejora).

## Context

El Generador (bloque 3) genera hoy **12 previews por receta de slots fijos** (1-3 propias · 4-6 lapa.ninja · 7-8 frontend-design · 9-10 gpt-tasteskill · 11-12 Three.js). El motor de cada preview está predeterminado, **independiente del cliente**.

La preview-12 (cubo 3D para una mudanza) no es un fallo de ejecución sino **de arquitectura**: el slot 11-12 *obliga* a meter Three.js, así que se forzó un `BoxGeometry` y se racionalizó como "una caja". La regla de "pertinencia" existe escrita en `flujo-previews.md` pero **no está operacionalizada** como un paso de decisión: nadie *decide* con criterio qué estilo, qué animación y qué referencias tocan a cada cliente, ni qué hay que **rechazar**.

Falta el **"GUSTO" subjetivo operacionalizado**: una capa de director de arte que, leyendo el brief, fije la dirección visual, el nivel de motion, los conceptos y las referencias a comparar — y luego recomiende la mejor con argumentos. Además, `estilo-evolink` ordena hoy *"motion bajo por defecto"*, lo que contradice la nueva voluntad de más GSAP/Three.js vistoso.

**Decisiones tomadas (sesión 2026-06-22):**
1. **Motion = gusto por cliente.** El cerebro decide el nivel; `estilo-evolink` se revisa para admitir ambos polos (sobrio ↔ espectáculo) sin perder trust-first.
2. **Alcance = cerebro + pipeline + auditoría.** Skill/doc de dirección de arte + rehacer el flujo + auditar lo actual. **Sin código orquestador todavía** (generación asistida con skills).
3. **Mezcla dinámica.** El cerebro decide cuántas previews y de qué tipo según el cliente, priorizando GSAP/Three.js cuando encaja.
4. **Recomendación.** Tras generar, el agente puntúa contra rúbrica + referencias y propone el top 2-3 con razón de diseño; el humano decide.

**Resultado buscado:** el bloque funciona como un director de arte autónomo — decide con criterio, descarta lo impertinente (cubo), produce más animación *cuando suma*, y recomienda.

Convención del proyecto: antes de editar se formaliza como **spec v3** (`docs/superpowers/specs/2026-06-22-generador-director-arte-v3.md`) vía `writing-plans`; este plan es la base. HARD-GATE: cambios de criterio aprobados por el socio.

---

## Fase A — Auditoría profesional de lo actual

Auditoría de diseñador sobre las **12 previews vigentes** (`clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/`) + la arquitectura del pipeline.

- Clasificar cada preview: **conservar / arreglar / descartar**, con razón de diseño (pertinencia al sector mudanzas, calidad de motion, no-plantilla). Marcar explícitamente por qué gsap-12 (cubo) se descarta como concepto y qué previews "elegantes y fluidas" marcan el listón a replicar.
- Documentar el hallazgo arquitectónico (slot fijo → motor forzado → animación gratuita).
- **Salida:** `docs/bloques/3-generador/referencias/auditoria-diseno-v3.md` + entrada en `docs/bloques/3-generador/CHANGELOG.md` (qué cambió y qué fallo lo motivó: la preview-12).

## Fase B — El cerebro: skill `director-arte`

Nueva skill `.claude/skills/director-arte/SKILL.md`: el **proceso de decisión de dirección de arte**. Entrada: brief del auditor + datos del cliente. Salida: artefacto estructurado por cliente `clientes/<id>/direccion-arte.md` con:

- **Design Read** (sector, público, tono, dispositivo dominante) — reutiliza el formato ya definido en `estilo-evolink` §0.
- **Nivel de motion (1-5) + justificación** — sobrio para confianza pura, espectacular cuando el negocio lo permite.
- **2-4 conceptos distintos** elegidos *para este cliente* (no slots fijos). Por concepto: familia de estilo, paleta, par tipográfico (de `tipografias.md`), **lenguaje de animación** (qué técnicas GSAP/Three.js y *por qué* encajan, o "sin 3D porque…"), y **referencia(s) a comparar** (despensa / `estilos-lapa-ninja.md`).
- **Rechazos explícitos** con motivo (aquí muere el cubo y el "editorial-moda para una reforma").
- **Plan de previews dinámico:** cuántas y qué es cada una (motor + concepto), con sesgo a animación cuando el sector lo justifica.

Incluye **tablas de criterio** (sector → nivel de motion sugerido · sector → arquetipos candidatos · cuándo el 3D suma vs decora) para que la decisión sea repetible. Determinista primero, juicio del modelo solo donde hace falta (regla del tejido en `CLAUDE.md`).

## Fase C — Revisar `estilo-evolink` (espectro de motion)

En `.claude/skills/estilo-evolink/SKILL.md` §7 (Motion): sustituir *"motion bajo por defecto / macro-motion reservado"* por un **espectro de motion (1-5) con regla de "cuándo subir"**, delegando el nivel al `director-arte`. **Conservar invariantes trust-first** (mobile-first 375px, AA, datos del negocio visibles, un CTA dominante, `prefers-reduced-motion`): el polo espectáculo nunca a costa de claridad/conversión en móvil. Cross-link a `director-arte`.

## Fase D — Rehacer el flujo de previews (dinámico)

Reescribir `docs/bloques/3-generador/referencias/flujo-previews.md`:
- Las previews salen de la **decisión del `director-arte`**, no de slots fijos.
- **Conservar las 2 reglas permanentes** ya vigentes: `.prompt.txt` 1:1 por preview + esquema de prompt de 4 partes.
- Definir la lógica de **mezcla dinámica** y el sesgo a GSAP/Three.js cuando encaja.
- Actualizar la tabla de `docs/bloques/3-generador/BLOQUE.md` (flujo y skills) para reflejar el cerebro y la mezcla dinámica. Mover el histórico de "12 = 6+6" a nota histórica.

## Fase E — Evaluación + recomendación

Paso de cierre tras generar (formaliza el "compara y elige"):
1. **Script (determinista):** `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/*.html` → 0 hallazgos graves + chequeo mojibake.
2. **Juicio del modelo:** puntuar cada preview contra `rubrica.md` + ajuste a la referencia objetivo del concepto → **ranking + top 2-3 recomendadas con razón de diseño**.
3. **Salida:** `clientes/<id>/recomendacion.md`.

Ampliar `docs/bloques/3-generador/rubrica.md` con el criterio de recomendación (encaje concepto↔referencia, pertinencia del motion, fuerza relativa).

## Fase F — Referencias y herramientas

- **Despensa:** cubrir el hueco reconocido en `despensa.md` (ninguna referencia es negocio local real; todas son SaaS premium). Curar 1-2 referencias reales de negocio local vía `npx skillui` — **decisión humana del socio** (qué URLs).
- **Comparación visual:** usar `playwright-cli` (ya instalado) para capturas de previews vs referencia y apoyar el ranking de la Fase E.
- **Inspiración en vivo (opcional):** `WebFetch` para consultar categorías de lapa.ninja durante la dirección de arte (solo "idioma" visual, sin clonar — regla ya vigente).
- **Sin instalaciones nuevas obligatorias.** Si en la prueba E2E el cerebro necesita comparar más referencias, se evalúa añadir un MCP de búsqueda/scraping; se decide entonces, no por especulación (YAGNI).

## Fase G — Validación E2E (prueba real)

Sobre el cliente existente **mudanzasroy** (`cb1dfbea-7306-4c1e-bdde-b5d606243083`):
1. Correr `director-arte` sobre su brief → `direccion-arte.md` (debe **rechazar el cubo** y motivar el nivel de motion).
2. Generar el set dinámico de previews resultante (con sus `.prompt.txt`).
3. Fase E completa → `recomendacion.md`.
4. Comparar contra las 12 antiguas: las nuevas deben ser **pertinentes, variadas, sin animación gratuita**, y la recomendación debe sostenerse con criterio.

---

## Archivos a tocar

| Archivo | Acción |
|---|---|
| `docs/superpowers/specs/2026-06-22-generador-director-arte-v3.md` | **nuevo** — spec v3 (formaliza estas decisiones) |
| `.claude/skills/director-arte/SKILL.md` | **nuevo** — el cerebro de dirección de arte |
| `.claude/skills/estilo-evolink/SKILL.md` | editar §7 (espectro de motion) + cross-link |
| `docs/bloques/3-generador/referencias/flujo-previews.md` | reescribir (dinámico, conserva 2 reglas) |
| `docs/bloques/3-generador/referencias/auditoria-diseno-v3.md` | **nuevo** — auditoría de las 12 |
| `docs/bloques/3-generador/referencias/despensa.md` | ampliar (refs negocio local) |
| `docs/bloques/3-generador/rubrica.md` | añadir criterio de recomendación |
| `docs/bloques/3-generador/BLOQUE.md` | tabla flujo/skills al día |
| `docs/bloques/3-generador/CHANGELOG.md` | entrada (qué cambió, fallo motivador) |
| `docs/bloques/3-generador/ESTADO.md` | nuevo punto de retoma |
| `clientes/cb1dfbea.../direccion-arte.md` · `recomendacion.md` | **nuevos** (prueba E2E; gitignored) |

## Verificación (end-to-end)

- `director-arte` sobre el brief de mudanzasroy produce un `direccion-arte.md` que **descarta explícitamente el cubo 3D** y justifica el nivel de motion elegido.
- Se generan las previews del plan dinámico, cada una con su `.prompt.txt`.
- `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/cb1dfbea.../previews/*.html` → **0 hallazgos graves**; 0 mojibake.
- `recomendacion.md` propone top 2-3 con razón de diseño defendible y encaje con la referencia objetivo.
- Render local (`python -m http.server` sobre la carpeta de previews) → revisión visual del socio: previews pertinentes y variadas, animación siempre motivada.
- Las suites existentes siguen verdes (`cd generador && npm test`) — no se toca el código del motor en este alcance.
