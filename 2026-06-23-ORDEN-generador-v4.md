# ORDEN DE SESIÓN — Generador v4: Director de Arte Autónomo (EVOLink)

**Fecha de redacción:** 2026-06-23
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Decisiones discutidas y aprobadas por Kravitzz.
**Spec (fuente del diseño, NO se toca):** `docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md`
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin. El diseño está en la spec; aquí están los pasos. Donde un archivo aparece entre `<<<ARCHIVO ... >>>FIN`, su contenido es LITERAL y completo. Donde se pide "autorar según spec §X", lee esa sección de la spec y escríbelo. No improvises fuera de la spec; si algo falla, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en commit atómico.
2. Responde en español, conciso. Inglés solo en código y mensajes de commit.
3. No toques nada fuera de lo indicado (motor `generador/`, specs anteriores, otras skills).
4. **Evidencia antes de afirmar** en cada fase.
5. Al terminar, ejecuta la Fase 9 (verificación) y la Fase 10 (auto-borrado) tal cual.

---

## FASE 0 — Precondiciones y secuenciación

1. `git status --short` → si hay cambios sin commit, ciérralos (`chore: wip antes de generador v4`) o pide confirmación. Branch `main`; `git pull`.
2. **Comprobación de secuencia (importante):** esta ORDEN asume que el **esqueleto** (chat "ESTRUCTURA NUEVA": agentes `planificador`/`programador`/`verificador` en `.claude/agents/`, `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md` del bloque 3) **ya está montado**.
   ```bash
   test -d .claude/agents && echo "OK: esqueleto montado" || echo "AVISO: esqueleto ausente — ver nota"
   ```
   - Si está montado → ejecuta esta ORDEN usando los agentes (planificador planifica vía writing-plans, programador implementa, verificador comprueba).
   - Si NO está montado → puedes ejecutar igualmente (esta v4 es generación asistida con skills, sin código orquestador), pero deja constancia en el HANDOVER de que el `CONTRATO.md`/`GUIA` del bloque 3 quedan pendientes de retrofit cuando el esqueleto aterrice. **Nunca ejecutes esta ORDEN y la de ESTRUCTURA NUEVA en la misma sesión** (sin mezclar concerns).

---

## FASE 1 — Auditoría profesional de las 12 previews vigentes

Auditoría de diseñador sobre las 12 previews (`clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/`) + la arquitectura del pipeline.
- Clasifica cada preview **conservar / arreglar / descartar** con razón de diseño (pertinencia al sector mudanzas, calidad de motion, no-plantilla). Marca por qué `gsap-12` (cubo) se descarta como concepto y qué previews "elegantes y fluidas" marcan el listón.
- Documenta el hallazgo arquitectónico: **slot fijo → motor forzado → animación gratuita**.
- **Salida:** crea `docs/bloques/3-generador/referencias/auditoria-diseno-v4.md` + añade entrada cabecera en `docs/bloques/3-generador/CHANGELOG.md` (qué cambió, fallo motivador = la preview-12, run = manual).

**Commit:** `docs: auditoria diseno v4 (12 previews + fallo de slot fijo)`

---

## FASE 2 — El cerebro: skill `director-arte`

Crea `.claude/skills/director-arte/SKILL.md`. Es el **proceso de decisión de dirección de arte**. Autóralo **según spec §3, §4, §5** con estas secciones obligatorias (verifícalas al final):

1. **Cuándo usarla + entrada** (brief del auditor + `memoria-director-arte.md`).
2. **Design Read** (sector, público, tono, dispositivo) — reutiliza el formato de `estilo-evolink §0`.
3. **Los 7 diales + tabla de presets por nicho** (spec §3). Regla de oro: los diales se mezclan entre perfiles.
4. **Nivel de motion (1-5) + justificación** (sobrio para confianza pura; espectáculo cuando el sector lo permite).
5. **Mecánica de referencias por roles** (spec §4): admisión → pre-filtro → scoring por roles **sobre tokens reales** → verificación. Incluye la tabla de pesos del scoring y la jerarquía de fuentes (despensa > Awwwards > lapa > Dribbble). "Premiado ≠ profesor": Awwwards = motion/pulido; negocio local = estructura.
6. **Sistema de animación (primitivas P1-P6)** (spec §5), con scroll reversible obligatorio.
7. **Plan de previews dinámico** (8-12; nunca dos compartiendo referencia/género/par tipográfico).
8. **Rechazos explícitos** con motivo (aquí muere el cubo).
9. **Salida estructurada:** `clientes/<id>/direccion-arte.md` (formato en spec §3).
10. **Tablas de criterio repetible** (sector→motion sugerido · sector→arquetipos · cuándo el 3D suma vs decora). Determinista primero, juicio del modelo solo donde hace falta.

Verifica: `test -f .claude/skills/director-arte/SKILL.md && grep -c "scoring\|roles\|primitivas\|rechazo" .claude/skills/director-arte/SKILL.md` (≥1 cada concepto).

**Commit:** `feat: add director-arte skill (cerebro de direccion de arte v4)`

---

## FASE 3 — Andamiaje: índice de referencias + memoria del director

Crea los dos archivos con este contenido literal:

<<<ARCHIVO: docs/bloques/3-generador/referencias/indice-referencias.md
# Referencia — Índice de referencias (fuente de verdad)

El director NO navega galerías en vivo: selecciona leyendo este índice. Curación humana de los socios.

## Esquema de ficha (vector-ready; migrable a pgvector en el bloque 7)
`nombre · fuente · perfil(es) · roles que aporta · mood · motion (1-5) · "estructura" | "solo idioma" · nota de rendimiento · ruta de tokens/DESIGN.md`

**Roles posibles:** `estructura` · `color-mood` · `motion` · `tipografia`. Una preview mezcla roles de varias referencias (estructura de una, motion de otra). *Premiado ≠ profesor:* Awwwards aporta motion/pulido/tipografía, no estructura para negocio local.

## Gate de admisión (sí/no — humano + detector impeccable)
Entra solo si: (a) web real en producción · (b) sistema coherente (escala tipográfica, ritmo, paleta 3-5 colores; si `skillui` la extrae limpia, es sistemática) · (c) pasa el detector anti-slop · (d) ≥1 idea portable a sitio rápido (si su valor es WebGL pesado → "solo idioma") · (e) mapea a un perfil EVOLink. Awwwards nominada = buen candidato, por defecto "idioma, no peso".

## Extractores (por capa, complementarios)
- Tokens: `npx extract-design-system <url>` → `tokens.json` (color/espaciado/radio).
- Motion/feel: `npx skillui@latest --url <url> --mode ultra --out .claude/skills/referencias-visuales/<nombre>` → `DESIGN.md`.
Aplanar igual que cualquier skill (sin symlinks; borrar `.agents/`/`skills-lock.json`).

## Inventario admitido
| Nombre | Fuente | Perfil(es) | Roles | Mood | Motion | Tipo | Rendimiento | Tokens |
|---|---|---|---|---|---|---|---|---|
| stripe | despensa | confianza-servicio | estructura, color | claro | 1 | estructura | OK | referencias-visuales/stripe |
| linear | despensa | minimal-lujo | estructura, motion | oscuro | 3 | estructura | OK | referencias-visuales/linear |
| vercel | despensa | minimal/editorial | estructura, tipografia | claro | 3 | estructura | OK | referencias-visuales/vercel |
| framer | despensa | editorial | motion, color | claro | 4 | estructura | OK | referencias-visuales/framer |
| superlist | despensa | servicios-local | color, motion | claro | 2 | estructura | OK | referencias-visuales/superlist |

## Cola de candidatos (curación por demanda)
Cualquiera pega aquí una URL buena que vea; la extracción se hace en lote después. NUNCA curación especulativa: el disparador es "un cliente cae en un sector sin buena referencia".
- [ ] (pendiente) 1-2 negocios locales reales (mudanzas/reformas con web cuidada) → enseñan ESTRUCTURA. Palanca nº 1.
- [ ] (pendiente) Awwwards nominadas limpias → enseñan MOTION/pulido.

## Reglas duras
No clonar HTML/copy/imágenes · mezclar ≥2 referencias o abstraer a tokens (nunca clon reconocible) · humano elige URLs (cero crawling) · ficha de 1 línea para triar todas, DESIGN.md/tokens completos solo de las 2-4 finalistas.
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/referencias/memoria-director-arte.md
# Memoria del Director de Arte (aprendizaje ligero)

Cuaderno versionado. El director lo lee ANTES de cada cliente y lo amplía DESPUÉS. Cada entrada la aprueba el socio (como el CHANGELOG). Coste ~0 tokens. El minado automático de `agent_runs` es el bloque 7 (este cuaderno es la versión manual y barata).

## 1 · Preferencias globales del socio
- Animaciones fluidas, sin lag, **visibles al subir y bajar** (P1 reversible + P2 ligada al scroll).
- Microinteracciones en botones (P4). Variedad real entre previews.
- Premium con sentido; nunca animación por decorar.

## 2 · Reglas por sector
- mudanzas / reformas / servicios de confianza → motion 2-3, pertinente; **nada de 3D decorativo** (lección cubo).
*(se amplía con la experiencia)*

## 3 · Conceptos ganadores
| Fecha | Sector | Concepto elegido | Qué modificó el socio | Lección |
|---|---|---|---|---|
*(sin entradas — se rellena al elegir previews)*

## 4 · Antipatrones (rechazado y por qué)
- Cubo 3D (`BoxGeometry`) en una mudanza → animación impertinente forzada por slot fijo. NO repetir 3D sin que el sector lo justifique.

Reglas: nunca borrar entradas · una corrección revertida se explica en entrada nueva.
>>>FIN

**Commit:** `feat: indice de referencias (por roles) + memoria del director`

---

## FASE 4 — Espectro de motion en `estilo-evolink`

Edita `.claude/skills/estilo-evolink/SKILL.md` §7 (Motion): sustituye *"motion bajo por defecto / macro-motion reservado"* por un **espectro de motion 1-5 con regla de "cuándo subir"**, delegando el nivel al `director-arte`. **Conserva los invariantes trust-first** (móvil 375px, AA, datos del negocio visibles, un CTA dominante, `prefers-reduced-motion`): el polo espectáculo nunca a costa de claridad/conversión en móvil. Cross-link a `director-arte` y a las primitivas P1-P6 (spec §5).

**Commit:** `feat: estilo-evolink motion espectro 1-5 (delega en director-arte)`

---

## FASE 5 — Flujo de previews dinámico

Reescribe `docs/bloques/3-generador/referencias/flujo-previews.md`:
- Las previews salen de la **decisión del `director-arte`** (8-12, mínimo 8), NO de slots fijos.
- **Conserva las 2 reglas permanentes:** `.prompt.txt` 1:1 + esquema de prompt de 4 partes (cópialas tal cual del archivo actual).
- Integra el **sistema de animación (primitivas P1-P6)** y la **mecánica de referencias por roles** (remite a `indice-referencias.md` y `director-arte`).
- Añade la **etapa de ascenso a producción** (remite a `ascenso-produccion.md`, Fase 6).
- Mueve el reparto histórico "12 = 6+6 / slots fijos" a una nota histórica al final.

**Commit:** `docs: flujo-previews dinamico (8-12, primitivas, referencias por roles)`

---

## FASE 6 — Etapa de producción + rúbrica + BLOQUE

1. Crea el procedimiento de ascenso con este contenido literal:

<<<ARCHIVO: docs/bloques/3-generador/referencias/ascenso-produccion.md
# Referencia — Ascenso a producción (la web final)

> Decisión cerrada (`BUSINESS.md`): webs de cliente en **Astro sobre Cloudflare Pages** (gratis, comercial). Next sobre Cloudflare necesita adaptador → se reserva al panel interno. El v1 ya está en **Astro 5 + Tailwind 3**.

La web final = **Astro + Tailwind + componentes React (islas)** donde haga falta interactividad/animación. Da React + animaciones + Cloudflare frictionless, y es óptimo en rendimiento (Astro envía 0 JS por defecto; solo hidrata las islas → ayuda a Lighthouse ≥ 90).

## Procedimiento (solo la preview elegida)
1. Preview HTML elegida → Astro + Tailwind (reutiliza el motor v1). Animaciones portadas a **islas React con `gsap-react`** (`useGSAP`). 3D (si aplica) en isla con `@react-three/fiber` o script, con tope de rendimiento móvil. **No recalcular el estilo**: reutilizar tokens/DESIGN.md ya generados (ahorra tokens).
2. Self-host de las fuentes elegidas (quitar CDN; `@font-face` + `font-display: swap`).
3. QA con `playwright-cli` (enlaces, formularios, responsive, contraste) + Lighthouse ≥ 90 móvil.
4. Render local + **OK de Kravitzz** → la web pasa al resto de bloques.
5. Hosting: **Cloudflare Pages** (CLI Wrangler gratis; plan gratuito, uso comercial). Build estático Astro = sin adaptador.

## Modelos (coste)
Ascenso = Opus (es la pieza cara). QA/mecánico = Haiku. Previews previas = Sonnet.
>>>FIN

2. Actualiza `docs/bloques/3-generador/rubrica.md`: añade encaje concepto↔referencia (por roles), pertinencia del motion (lección cubo), **primitivas presentes + scroll reversible**, y el criterio de recomendación (top 2-3 con encaje a la referencia objetivo + fuerza relativa).

3. Actualiza `docs/bloques/3-generador/BLOQUE.md`: refleja **director de arte + mezcla dinámica 8-12 + etapa de producción Astro + hosting Cloudflare**. Mueve la tabla "12 = 6+6 / slots fijos" a nota histórica. Mantén ≤ 200 líneas.

**Commit:** `docs: ascenso a produccion (Astro+islas React) + rubrica y BLOQUE al dia`

---

## FASE 7 — Validación E2E (prueba real sobre mudanzasroy)

Cliente `cb1dfbea-7306-4c1e-bdde-b5d606243083` (`clientes/` está gitignored):
1. Corre `director-arte` sobre su brief → `clientes/<id>/direccion-arte.md`. **Debe descartar el cubo** y justificar el nivel de motion.
2. Genera el set dinámico (≥8), cada preview con su `.prompt.txt`, anclado por **roles** a referencias del índice.
3. `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/*.html` → 0 hallazgos graves; 0 mojibake.
4. Produce `clientes/<id>/recomendacion.md` (top 2-3 con razón de diseño).
5. Añade **una entrada nueva** a `memoria-director-arte.md`.
6. Render local (`python -m http.server` sobre la carpeta de previews) para revisión del socio.
7. `cd generador && npm test` → suites existentes en verde (no se toca el motor).

Como `clientes/` es gitignored, **no hay commit de cliente**; documenta el resultado de la prueba en la Fase 8 (ESTADO).

---

## FASE 8 — Cierre de sesión

1. Actualiza `docs/bloques/3-generador/ESTADO.md` con el nuevo punto de retoma (v4 ejecutado; resultado de la prueba E2E) y `docs/bloques/3-generador/CHANGELOG.md` si hubo correcciones.
2. Sobrescribe `HANDOVER.md` (formato `/cierre`, ≤ 200 líneas): estado, bloque activo (3-generador), hecho en la sesión, riesgos vivos (copiar + añadir: curación de referencias = palanca nº 1), próximo paso, pendientes.
3. `git add -A && git commit -m "docs: handover + estado generador v4"` y **`git push`**.

---

## FASE 9 — Verificación final (OBLIGATORIA — evidencia antes de afirmar)

```bash
test -f docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md && echo "OK: spec permanente"
test -f .claude/skills/director-arte/SKILL.md && echo "OK: cerebro"
ls docs/bloques/3-generador/referencias/indice-referencias.md docs/bloques/3-generador/referencias/memoria-director-arte.md docs/bloques/3-generador/referencias/ascenso-produccion.md docs/bloques/3-generador/referencias/auditoria-diseno-v4.md
grep -c "espectro\|1-5" .claude/skills/estilo-evolink/SKILL.md   # >= 1
grep -c "8-12\|dinámic\|primitiv" docs/bloques/3-generador/referencias/flujo-previews.md   # >= 1
grep -c "\.prompt\.txt\|4 partes\|esquema" docs/bloques/3-generador/referencias/flujo-previews.md   # >= 1 (reglas permanentes intactas)
wc -l docs/bloques/3-generador/BLOQUE.md   # <= 200
git status   # limpio y pusheado
```

Si TODO pasa, termina con este mensaje (rellena los datos):

```
✅ Generador v4 (Director de Arte Autónomo) ejecutado y subido a GitHub.

- Spec permanente: docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md
- Cerebro: .claude/skills/director-arte/SKILL.md (diales + referencias por roles + primitivas)
- Referencias por roles + memoria del director + auditoria de las 12
- estilo-evolink motion 1-5; flujo dinámico 8-12; ascenso a produccion (Astro + islas React) en Cloudflare
- Validación mudanzasroy: el director DESCARTÓ el cubo; [N] previews pertinentes; recomendación + entrada en memoria
- Verificaciones: todas en verde (spec intacta, archivos ≤200, reglas permanentes preservadas, repo limpio)

SIGUIENTE PASO acordado:
→ [curar 1-2 referencias de negocio local real + Awwwards limpias] y/o [bloque 4 Revisor].

Cuando quieras, dímelo en sesión nueva con /inicio.
```

Si algo falla, repórtalo con ❌ (fase, comando, error) y NO hagas push ni borres la ORDEN hasta resolverlo.

---

## FASE 10 — Auto-borrado de la ORDEN

Solo si la Fase 9 está en verde:
```bash
rm 2026-06-23-ORDEN-generador-v4.md
git add -A && git commit -m "chore: cierre ORDEN generador v4 (autoborrado)"
git push
```
La spec permanece; git guarda el historial.

>>>FIN DE LA ORDEN
