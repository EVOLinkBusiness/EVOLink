# Validación exhaustiva pre-piloto — Bloque 4 (Revisor)

**Fecha:** 28/06/2026 · **Tipo:** auditoría de solo lectura (cubo C, histórico) · **Alcance:** esqueleto de agentes + andamiaje del bloque 4, antes de estrenarlo.
**Método:** 4 partes — revisión archivo a archivo · simulación de un ciclo (caso ficticio) · revisión multicoral (6 perspectivas) · verificación de datos contra el sistema de archivos real.

---

## 1. Resumen ejecutivo

**¿El esqueleto está listo para el piloto? NO (todavía).** El esqueleto de los 3 agentes existe y el molde de bloque es sólido, pero el **arranque del piloto choca con andamiaje ausente** y con **un criterio de éxito de su propia spec sin cumplir**. Son fallos baratos de corregir, pero hay que resolverlos (y decidir 3 cosas) **antes** de invocar al planificador. Veredicto: **RUTA A**.

**Conteo:** 🔴 2 BLOQUEANTES · 🟠 3 IMPORTANTES · 🟡 5 MENORES.

---

## 2. Hallazgos por gravedad

### 🔴 BLOQUEANTE

**B1 — El bloque 4 no tiene andamiaje y no hay un "paso 0" que lo cree.**
- *Archivo:* `docs/bloques/4-revisor/` (faltan `CONTRATO.md` y `GUIA-DESARROLLO-BLOQUE.md`; solo hay BLOQUE/CHANGELOG/referencias).
- *Qué falla:* `planificador.md:22` ordena "antes de diseñar, lee el `CONTRATO.md` y la `GUIA` del bloque"; la plantilla GUIA repite esa precondición. La spec del esqueleto (§9/§11) dice que el piloto "estrena el CONTRATO Generador→Revisor" pero **no define quién crea esos dos archivos ni cuándo**. El HANDOVER manda "invocar planificador con CONTRATO Generador→Revisor como contexto" asumiendo que ya existe. Resultado: el primer movimiento del piloto apunta a archivos que no están.
- *Corrección propuesta:* definir el **Paso 0 del piloto**: la sesión orquestadora copia `_PLANTILLA-CONTRATO.md` → `4-revisor/CONTRATO.md` (rellenando "Consume" desde la sección "Produce" del CONTRATO del bloque 3) y `_PLANTILLA-GUIA-DESARROLLO-BLOQUE.md` → `4-revisor/GUIA-DESARROLLO-BLOQUE.md`, **antes** de invocar al planificador. Anotarlo en el ESTADO.md del bloque 4.

**B2 — `programador` y `verificador` no fijan modelo → incumplen el criterio de éxito #1 de la spec y rompen la economía de tokens.**
- *Archivo:* `.claude/agents/programador.md`, `.claude/agents/verificador.md` (frontmatter sin `model:`; `planificador.md` sí declara `model: opus`).
- *Qué falla:* sin `model:`, el subagente **hereda el modelo de la sesión** (Opus 4.8 ahora). La spec §2/§4 fija **Sonnet** para ambos y §11 lo lista como criterio de éxito ("los 3 agentes con su modelo correcto"). El proyecto se define por "maximizar tokens": estrenar así corre en Opus el bloque que más código genera.
- *Corrección propuesta:* añadir `model: sonnet` al frontmatter de ambos. Fix de 2 líneas, pero **pre-requisito**: con él incumplido el esqueleto no cumple su definición de "terminado".

### 🟠 IMPORTANTE

**I1 — Desajuste de entrada: el CONTRATO 3 promete "URL pública desplegada"; hoy solo hay preview HTML local.**
- *Archivo:* `docs/bloques/3-generador/CONTRATO.md` (§Produce: "web desplegada (URL pública)… el bloque 4 consume la web desplegada").
- *Qué falla:* el ascenso a producción está **pendiente** (revisión del socio). El caso real y el piloto operarían sobre `previews/v4/*.html` servido con `python -m http.server`, que el CONTRATO **no contempla** como entrada. El programador no sabría contra qué URL/ruta corre Playwright.
- *Corrección propuesta:* decidir una de dos — (a) el Revisor acepta entrada local y se amplía el CONTRATO con esa forma; o (b) el piloto espera al ascenso. Dejarlo escrito en el CONTRATO del bloque 4.

**I2 — El test de coincidencia del CONTRATO del bloque 3 está delegado al piloto del 4.**
- *Archivo:* `docs/bloques/3-generador/CONTRATO.md` (§Fuente de verdad: "Test de coincidencia: pendiente de crear, en el piloto del Revisor").
- *Qué falla:* mete el esquema del bloque 3 dentro del alcance del piloto del 4 (acoplamiento) sin criterio de "hecho" propio. Riesgo de que se confunda con el QA del Revisor.
- *Corrección propuesta:* declararlo como sub-tarea explícita del piloto (¿programador o verificador?), con su propio criterio de hecho, o sacarlo a una tarea aparte del bloque 3.

**I3 — "ORDEN" se usa pero no está definida.**
- *Archivo:* `.claude/agents/planificador.md` ("redacta specs y ÓRDENES"); no hay plantilla ni ruta fija.
- *Qué falla:* el bloque 3 ejecutó `2026-06-23-ORDEN-generador-v4.md` (ya autoborrada por cubo C). No queda ejemplo ni se explica en qué se diferencia de una spec. Un ejecutor nuevo no sabe qué producir.
- *Corrección propuesta:* una nota breve (formato + ubicación + cuándo ORDEN vs spec) en la GUIA del bloque o en `politica-archivos.md`. O retirar el término si la spec basta.

### 🟡 MENOR

| # | Archivo | Qué falla | Corrección |
|---|---------|-----------|-----------|
| M1 | `commands/cierre.md:68` | `git commit -m "...\n\n..."` en PowerShell deja `\n` **literales** (no salta línea) | Here-string o múltiples `-m` |
| M2 | `commands/cierre.md:68` | Hardcodea `Co-Authored-By: Claude Sonnet 4.6`; el /cierre lo corre la sesión (hoy Opus) | Co-autor según el modelo de sesión |
| M3 | `commands/inicio.md:8,14` | "Máximo 5 tool calls" pero con bloque activo ya son 5; el paso 5 opcional haría 6 | Subir el tope a 6 o marcar el paso 5 como excepción |
| M4 | `commands/inicio.md:11` | Relee `CLAUDE.md`, que ya se inyecta como project instructions → coste redundante | Valorar omitirlo (o dejar nota de por qué se relee) |
| M5 | `.claude/agents/verificador.md` | Permisos "todas las tools": puede editar código pese al guardarraíl textual "no reescribe" | Acotar `tools:` (mantener Write para tests) — control técnico, no solo textual |

---

## 3. Simulación de un ciclo — caso ficticio "Estilo Norte" (peluquería, Móstoles)

Recorrido del piloto del bloque 4 (QA a una preview generada), paso a paso, marcando dónde se **atasca**:

1. **Planificador arranca** → busca `4-revisor/CONTRATO.md` y `GUIA` (su instrucción) → **no existen → ATASCO (B1).**
2. Aunque se le pase la sección "Produce" del bloque 3 como contexto, define la entrada como "URL pública"; para Estilo Norte solo hay preview local → **ambigüedad de entrada (I1).**
3. **Programador** recibe el plan → ¿corre Playwright contra qué ruta/URL? El CONTRATO no lo dice → por diseño "señala y para" → **ATASCO (I1).** Además correría en **Opus (B2)** = caro.
4. **Verificador** escribe los tests QA → la rúbrica compartida `../3-generador/rubrica.md` **sí existe (✅)** → puede emitir veredicto. Pero también se le pide el test de coincidencia del CONTRATO (I2) → **¿es su tarea o del programador? No definido.**
5. **/cierre** del piloto → commit con `\n\n` literal (M1) y co-autor erróneo (M2).

**Conclusión de la simulación:** el flujo se rompe **en el arranque** (sin CONTRATO/GUIA del 4) y **en la entrada** (preview local vs URL pública). El tramo verificador→rúbrica sí está bien resuelto.

---

## 4. Revisión multicoral (6 perspectivas)

| Perspectiva | Lectura |
|-------------|---------|
| **Frontend senior** | La rúbrica compartida (responsive, Lighthouse ≥90, enlaces, formulario, contraste) cubre lo esencial; falta fijar el umbral **grave vs warning** que el Revisor hereda del detector del Generador ("0 graves"). |
| **Backend/arquitecto** | El molde de contratos aguanta (idéntico, Supabase lo cumple, test). Junta floja única: **3→4** ("URL pública" vs preview local + test de coincidencia colgando). Hacer explícito el acoplamiento rúbrica/test 3↔4. |
| **Gobernanza/proceso** | Huecos: (a) quién crea el andamiaje del 4; (b) el verificador **puede** editar código (permisos); (c) "aprobado por los 2 socios" para cambios de contrato no tiene mecanismo más allá del CHANGELOG. |
| **Economía de tokens** | B2 es la mayor fuga: 2/3 agentes en Opus justo en el bloque que más código produce. Arreglar B2 (2 líneas) es la palanca de ahorro nº 1. M4 suma coste menor por sesión. |
| **Onboarding/Javier** | **No** podría ejecutar el piloto solo hoy: choca con archivos ausentes (B1), no sabe qué es una ORDEN (I3) y el "próximo paso" del HANDOVER asume un CONTRATO que no existe. Falta el Paso 0 escrito. |
| **Escéptico** | Lo que el README llama "listo" es listo **a nivel documental**, no ejecutable. El esqueleto no se ha estrenado ni una vez; el primer estreno destapa estas juntas. |

---

## 5. Verificación de datos (afirmaciones de estado vs realidad)

| Afirmación | Clasif. | Motivo |
|-----------|---------|--------|
| README: "Repo listo para piloto del bloque 4" | 🔶 Exagerada | Esqueleto de agentes sí; andamiaje del 4 no, y 2/3 agentes sin modelo fijado |
| HANDOVER: "repo consistente, sin desfases" | 🟡 Matizable | Cierto en lo documental (fechas/estados); no detectó B2 ni I1 |
| HANDOVER: "invocar planificador con CONTRATO Generador→Revisor" | ⚠️ No verificable | Ese CONTRATO (archivo del bloque 4) no existe; solo la §Produce del bloque 3 |
| CONTRATO 3: "produce URL pública que el 4 consume" | 🔶 No se cumple hoy | Produce previews locales; ascenso pendiente |
| spec esqueleto §11: "3 agentes con su modelo correcto" | ❌ Incumplida | Solo `planificador` declara `model:` |
| README: "[x] retrofit CONTRATO/GUIA bloque 3" | ✅ Correcta | Ambos existen en el bloque 3 |

**No son fallos (para tranquilidad):** HANDOVER muestra `ee70f9a` ≠ HEAD `0334f64` (un HANDOVER no contiene su propio commit) · ORDEN v4 ausente del repo (cubo C, se autoborra) · spec del esqueleto menciona "v3" (histórico congelado; luego fue v4) · bloque 4 sin `rubrica.md` propia (intencional: rúbrica compartida) · bloque 4 sin `ESTADO.md` (se crea al activarlo).

---

## 6. Veredicto final — **RUTA A**

Hay bloqueantes e importantes. **Antes de tocar el bloque 4, decidir/discutir:**

1. **(B1) Paso 0 del piloto:** acordar que la sesión orquestadora crea `CONTRATO.md` + `GUIA` del bloque 4 desde plantilla antes de invocar al planificador. ¿O lo redacta el planificador (y se le cambia la instrucción de "leer" a "crear si falta")?
2. **(B2) Fijar `model: sonnet`** en `programador.md` y `verificador.md`. Decisión binaria, trivial, pero pre-requisito.
3. **(I1) Entrada del Revisor:** ¿QA sobre preview **local** (y se amplía el CONTRATO 3→4 con esa forma) o se **espera al ascenso** a producción? Define contra qué corre Playwright.
4. **(I2)** ¿El test de coincidencia del CONTRATO 3 entra en el piloto del 4 o se trata aparte? Asignar dueño y criterio de hecho.
5. **(I3)** Definir o retirar el concepto "ORDEN".
6. **(Menores M1–M5)** Agrupar en una pasada de pulido de `inicio.md`/`cierre.md`/`verificador.md` (no bloquean, pero M1–M2 ensucian los commits del propio piloto).

**Las correcciones NO se aplican en esta sesión** (solo diagnóstico). Recomendación: una sesión corta de saneamiento (B1+B2+M1–M5 = mecánicos) + una decisión de los socios sobre I1/I2/I3, y entonces vía libre al bloque 4.
