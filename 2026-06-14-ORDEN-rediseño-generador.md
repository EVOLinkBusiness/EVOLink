# ORDEN DE SESIÓN — Rediseño artístico del Bloque Generador (EVOLink)

**Fecha de redacción:** 2026-06-14
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Decisiones discutidas y aprobadas por Kravitzz.
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin. No hay nada que diseñar: el contenido está incluido literal. No improvises contenido nuevo; si algo falla técnicamente, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. Donde un archivo aparece entre marcadores `<<<ARCHIVO ... >>>FIN`, su contenido es LITERAL y COMPLETO: sobrescribe o crea el archivo exactamente con ese contenido.
3. No toques nada fuera de lo indicado (otras specs, skills, scripts, hooks).
4. Responde en español, conciso.
5. **GATE de la regla EVOLink:** esta ORDEN solo se ejecuta si el agente anterior según planificación (Bloque 2 — Auditor) está 100% terminado. La Fase 0 lo verifica; si no lo está, PARA.
6. Al terminar, ejecuta la Fase 8: limpieza de basura de prueba + autoborrado de esta ORDEN (la spec permanece; git conserva el historial).

### Decisiones de arquitectura ya cerradas en esta orden (no reabrir)
- **El "cerebro" del generador = `impeccable` (criterio/dirección de diseño) + `design-taste-frontend` (diales de variación y motion).** `UI-UX Pro Max` y `ui-animation` quedan DESCARTADAS por redundantes (impeccable + taste ya cubren criterio, anti-slop y micro-interacciones).
- **`skillUI` no es un plan B, es la DESPENSA.** Se construye UNA vez (no por cliente): extrae el ADN visual (colores, tipos, ritmo, animaciones) de webs premium de referencia y lo guarda como ingredientes reutilizables. Es análisis estático local → **cero tokens de Claude**. En cada cliente, impeccable SIEMPRE manda y elige qué ingredientes encajan.
- **7 previews por cliente = 5 (impeccable + taste + despensa skillUI, HTML estático) + 2 (Google Stitch vía MCP).** Stitch es gratis y NO gasta la API de Claude; solo hay coste mínimo al importar su HTML al flujo.
- **Previews en HTML/CSS estático local (gratis).** Vercel entra SOLO al ascender la web elegida a Next + Tailwind, al final.
- **Flujo interno del bloque (4 fases):** Despensa (0, una vez) → Brief y encaje (1) → 7 previews (2) → Elección y variantes mixtas (3) → Ascenso + QA Playwright + entrega (4).
- **No instalar nada global** (regla del repo): `skillui` se invoca vía `npx`, nunca `npm install -g`.
- **HARD-GATE de metodología:** esta ORDEN deja el bloque DOCUMENTADO, con herramientas instaladas y VALIDADO con una prueba pequeña. El código del agente generador de producción se construye después con `writing-plans` sobre la spec creada aquí.

---

## FASE 0 — Precondiciones

1. `git status --short` → si hay cambios sin commit, ciérralos primero (commit `chore: wip antes de rediseno generador`) o pide confirmación.
2. Branch: `main`. `git pull` para estar al día.
3. **GATE Auditor:** verifica que el Bloque 2 está terminado:
   ```bash
   cat docs/bloques/2-auditor/ESTADO.md | grep -i "writing-plans\|terminado\|completo\|código\|codigo"
   ```
   - Si el Auditor NO está 100% terminado (sigue en spec/writing-plans sin código funcional), **PARA** y reporta: "El Auditor (Bloque 2) no está terminado. Esta ORDEN no se ejecuta hasta entonces (regla EVOLink de no mezclar conceptos)."
   - El piloto auditor→generador funciona, así que lo normal es que pase. Si hay duda, pide confirmación a Kravitzz antes de seguir.

---

## FASE 1 — Spec permanente del Generador v2

Crea `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`:

<<<ARCHIVO: docs/superpowers/specs/2026-06-14-generador-diseño-v2.md
# Spec — Bloque Generador v2 (rediseño artístico)

**Fecha:** 2026-06-14 · **Estado:** aprobada (Kravitzz) · **Bloque:** 3-generador
**Sustituye al enfoque del piloto** (diseños planos tipo plantilla). No reabre el flujo autónomo auditor→generador, que ya funciona.

## 1. Problema
El piloto genera webs planas, parecidas a la web base del cliente. El fallo NO es el motor ni el flujo autónomo (correctos): es el **criterio artístico**. Los modelos tienden al "centro estadístico" (fuente Inter, gradientes morados, 3 tarjetas en fila). Esta spec inyecta criterio y variedad reales.

## 2. Decisiones cerradas
- **Cerebro de diseño:** `impeccable` (dirección + detector de "AI slop" = lo que parece hecho por IA) + `design-taste-frontend` (diales DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY).
- **Descartadas:** `UI-UX Pro Max` y `ui-animation` (redundantes con lo anterior).
- **Despensa:** `skillUI` (paquete npm `skillui`, vía `npx`) extrae el ADN visual de webs premium de referencia → ingredientes reutilizables, **coste 0 tokens**. Se construye una vez; se amplía a mano.
- **7 previews/cliente:** 5 (impeccable+taste+despensa, HTML estático) + 2 (Google Stitch vía MCP, gratis).
- **Render:** HTML/CSS estático local (gratis). Ascenso a Next + Tailwind + Vercel solo para la elegida.
- **Coste:** previews con Sonnet; web final con Opus; tareas mecánicas/QA con Haiku. Prompt caching del system + brief + skills.

## 3. Arquitectura interna (4 fases)
- **Fase 0 — Despensa (una vez):** `skillui` extrae ADN de 6-10 webs premium por perfiles (corporativo-confianza, servicios-local, minimal-lujo, editorial...). Vive en `.claude/skills/referencias-visuales/`. Ampliable.
- **Fase 1 — Brief y encaje (por cliente):** entra la auditoría del Bloque 2 → impeccable fija el contexto de marca (sector, público, tono) → elige qué ingredientes de la despensa encajan y descarta los que no (aquí muere "plantilla de moda para una empresa de reformas"). El criterio de pertinencia lo da el brief del auditor, no un paso aparte.
- **Fase 2 — 7 previews:** 5 vía impeccable+taste+despensa (cada una con animación y arquetipo distinto, HTML estático) + 2 vía Stitch. Sirven en local para revisión.
- **Fase 3 — Elección:** Kravitzz y socio eligen, mezclan ("preview 2 con animaciones de preview 5") o piden ajustes. Iterar es barato (es HTML).
- **Fase 4 — Ascenso + QA + entrega:** la elegida → Next + Tailwind reutilizando tokens/DESIGN.md ya generados (no se recalcula el estilo → ahorra tokens) → QA con `playwright-cli` → OK final de Kravitzz → pasa al resto de bloques.

## 4. Contrato E/S
- **Entrada:** brief de la auditoría (sector, público, tono, anti-referencias) + datos del cliente.
- **Salida:** 7 previews HTML + (tras elección) web Next desplegable + registro en `agent_runs` (inputs, tokens, coste, duración, estado, QA).

## 5. Coste y presupuesto (límite ~10 €/mes API)
- 5 previews HTML ≈ céntimos a pocos euros (Sonnet). Las 2 de Stitch no tocan la API de Claude.
- Lo que dispara el gasto: generar React real e iterar mucho. Mitigación: HTML estático en previews, Haiku para QA/mecánico, prompt caching, `/clear` entre tareas, limitar iteraciones.
- Vercel: previews en local = 0 €. Web final comercial → plan de pago de Vercel u hosting estático.

## 6. QA (Playwright)
`playwright-cli` (ya instalado): capturas, enlaces, formularios, responsive, comparación con la referencia. Comparte rúbrica con el bloque (`../rubrica.md`).

## 7. Validación de esta spec (criterio de éxito)
La prueba de renovación de `mudanzasroy.es` debe producir previews claramente distintas entre sí, premium y que NO "parezcan hechas por IA" (pasar el detector de slop de impeccable). Si siguen planas: subir DESIGN_VARIANCE y ampliar la despensa.

## 8. Pendientes (no en esta spec)
- `writing-plans` del agente generador de producción (código que orquesta las 4 fases).
- Curar la despensa completa (elección humana de las webs de referencia).
- Decidir hosting final (Vercel Pro vs estático) cuando haya cliente de pago.
>>>FIN

**Commit:** `docs: spec generador v2 (rediseno artistico, cerebro impeccable+taste)`

---

## FASE 2 — Actualizar BLOQUE.md + crear referencias/

### 2.1 Sobrescribe `docs/bloques/3-generador/BLOQUE.md`:

<<<ARCHIVO: docs/bloques/3-generador/BLOQUE.md
# Bloque 3 — Generador web

**Estado:** ACTIVO (rediseño artístico). Spec v2 aprobada. Siguiente tras esta ORDEN: `writing-plans`.
**Rol en el tejido:** Creación. Fórmula: **fabricar → evaluar → entregar**.

## Qué hace
De la auditoría (bloque 2) + datos del cliente → 7 previews premium para elegir → web Next funcional, rápida, con marca y que NO parezca plantilla. Vía volumen/cuota, no arte a medida.

## Spec
`docs/superpowers/specs/2026-06-14-generador-diseño-v2.md` (única fuente del diseño cerrado).

## Flujo interno (4 fases — detalle en `referencias/flujo-previews.md`)
- **0 · Despensa (una vez):** skillUI extrae ADN de webs premium → ingredientes reutilizables.
- **1 · Brief y encaje:** auditoría → impeccable fija marca → elige ingredientes que encajan.
- **2 · 7 previews:** 5 (impeccable+taste+despensa, HTML) + 2 (Google Stitch).
- **3 · Elección:** elegir / mezclar / pedir variantes.
- **4 · Ascenso + QA + entrega:** elegida → Next+Tailwind → playwright-cli → OK → resto de bloques.

## Skills/herramientas (índice completo en `referencias/skills.md`)
| Paso | Skill/herramienta |
|------|-------------------|
| Cerebro (criterio + anti-slop) | `impeccable` |
| Diales (variación, motion, densidad) | `design-taste-frontend` |
| Despensa (ADN de webs premium) | `skillui` (vía npx) → `referencias-visuales/` |
| 2 previews extra | Google Stitch (MCP) |
| Evaluar / QA | `playwright-cli` + `verification-before-completion` |
| Ascenso | Next + Tailwind + Vercel (solo la elegida) |

**Descartadas:** `UI-UX Pro Max`, `ui-animation` (redundantes con impeccable + taste).

## Rúbrica
Resumen en `rubrica.md`. Lo medible lo comprueba script (`playwright-cli`); el gusto, la coherencia y el "no parece plantilla" los juzga el modelo.

## Despensa
Qué es y cómo se amplía: `referencias/despensa.md`.

## Pendientes del bloque
- [ ] `writing-plans` del agente de producción (orquesta las 4 fases).
- [ ] Curar la despensa completa (webs de referencia, decisión humana).
>>>FIN

### 2.2 Crea `docs/bloques/3-generador/referencias/skills.md`:

<<<ARCHIVO: docs/bloques/3-generador/referencias/skills.md
# Referencia — Skills del Generador (qué se usa en cada paso)

## Cerebro de diseño
- **`impeccable`** (pbakaus). Dirección artística + detector determinista de "AI slop" (lo que parece hecho por IA). Exige contexto de marca antes de diseñar (`/impeccable init` → PRODUCT.md). Comandos útiles: `craft`, `critique`, `polish`, `animate`, `bolder`, `detect`.
- **`design-taste-frontend`** (leonxlnx). Diales globales: DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY. Prohíbe genéricos (Inter, negro puro, glows); impone tipos premium y esqueletos de animación. Se ajusta según el brief del auditor.

> No usar impeccable y la `frontend-design` de Anthropic a la vez: colisionan en vocabulario.

## Despensa
- **`skillui`** (amaancoderx, paquete npm). Vía `npx skillui@latest` (NUNCA global). Extrae el ADN visual de una web/repo (colores, tipos, espaciado, animaciones, capturas) → carpeta de skill reutilizable. Cero IA, cero tokens de Claude. Modo `--mode ultra` captura animaciones con Playwright.

## Previews extra
- **Google Stitch** (Google Labs, MCP). Genera UI/HTML desde prompt; gratis (cuota diaria). Aporta 2 previews con "voz" distinta = más variedad. Requiere OAuth Google. No gasta API de Claude.

## QA
- **`playwright-cli`** (ya instalado). Navegación, enlaces, formularios, capturas, responsive. Interfaz por comandos = barata en tokens (~4× menos que el MCP).

## Descartadas (no instalar)
- `UI-UX Pro Max`: base de datos de estilos; redundante con impeccable+taste y más "de catálogo".
- `ui-animation`: cubierto por `impeccable /animate` y el dial MOTION de taste.
- `21st.dev Magic`: de pago, orientado a React, mantenimiento dudoso. Solo opcional para piezas React puntuales en la web final.
>>>FIN

### 2.3 Crea `docs/bloques/3-generador/referencias/despensa.md`:

<<<ARCHIVO: docs/bloques/3-generador/referencias/despensa.md
# Referencia — La Despensa (ADN visual reutilizable)

## Qué es
Una biblioteca de "ingredientes" de diseño extraídos de webs premium reales. NO son plantillas: son sistemas de diseño (paleta, tipos, ritmo, animaciones) que impeccable elige y combina según el cliente. Vive en `.claude/skills/referencias-visuales/`.

## Cómo se construye (una vez, coste 0 tokens)
Por cada web de referencia:
```bash
npx skillui@latest --url https://ejemplo-premium.com --mode ultra --out .claude/skills/referencias-visuales/<nombre>
```
Aplanar igual que cualquier skill (carpeta real, sin symlinks; borrar `.agents/` y `skills-lock.json` si aparecen).

## Categorías sugeridas (perfiles, no marcas)
- **corporativo-confianza** — servicios serios, fiables (mudanzas, reformas, asesorías).
- **servicios-local** — negocio de barrio con buena presencia.
- **minimal-lujo** — premium, espaciado generoso.
- **editorial** — mucho texto/imagen ordenada.

Mantén 1-2 referencias por categoría. Empieza con pocas (YAGNI) y amplía cuando un cliente lo pida.

## Cómo la usa el generador
En la Fase 1, impeccable lee el brief del auditor y selecciona la(s) categoría(s) que encajan con el sector. Descarta las que no pegan (p. ej. nunca "editorial-moda" para una reforma).

## Cómo ampliar
Añadir webs es solo repetir el comando `npx skillui` con otra URL. La curación (qué webs entran) es decisión humana de los socios.
>>>FIN

### 2.4 Crea `docs/bloques/3-generador/referencias/flujo-previews.md`:

<<<ARCHIVO: docs/bloques/3-generador/referencias/flujo-previews.md
# Referencia — Flujo de las 7 previews

## Reparto
- **Previews 1-5:** impeccable (criterio) + design-taste-frontend (diales distintos en cada una) + ingredientes de la despensa que encajen con el brief. Cada preview = un arquetipo + una familia de animación diferente. HTML/CSS estático + (si hace falta) GSAP por CDN. Sin build.
- **Previews 6-7:** Google Stitch (MCP). Mismo brief, motor distinto = variedad real. Se importa su HTML al flujo.

## Pertinencia (regla dura)
Las 7 deben tener sentido para el sector del cliente. El brief del auditor manda: una mudanzas → confianza, claridad, prueba social; nunca layouts pensados para mil fotos de moda.

## Render y revisión
Servir en local (gratis): `python -m http.server` o Vite estático sobre la carpeta de previews. Revisión por URL local. Cero coste de despliegue.

## Variantes mixtas
Como es HTML, mezclar es trivial: se pasa al agente el HTML de la base elegida + el bloque concreto (p. ej. la animación) de otra preview. Ej.: "preview 2 con las animaciones de la preview 5".

## Ascenso (solo la elegida)
1. Convertir la preview HTML a Next + Tailwind reutilizando tokens/DESIGN.md ya generados (no recalcular estilo).
2. QA con `playwright-cli` (enlaces, formularios, responsive, contraste).
3. OK final de Kravitzz → la web pasa al resto de bloques.
4. Hosting final: Vercel (de pago si es comercial) u hosting estático.

## Modelos por paso (coste)
- Previews: Sonnet. · Web final: Opus. · QA/mecánico: Haiku. · Prompt caching del system + brief + skills.
>>>FIN

**Commit:** `docs: BLOQUE.md generador v2 + referencias (skills, despensa, flujo)`

---

## FASE 3 — Actualizar rubrica.md

Sobrescribe `docs/bloques/3-generador/rubrica.md`:

<<<ARCHIVO: docs/bloques/3-generador/rubrica.md
# Rúbrica — Generador web (v2; se afina en writing-plans)

## Comprueba SCRIPT (playwright-cli + Lighthouse)
- [ ] Render correcto en móvil (375px) y escritorio.
- [ ] Lighthouse performance ≥ 90 (móvil).
- [ ] Cero enlaces rotos internos/externos; cero mezcla de dominios.
- [ ] Formulario de contacto envía y confirma (Resend).
- [ ] Contraste AA en textos principales.
- [ ] Cero "lorem ipsum" / placeholders.
- [ ] `npx impeccable detect` sin banderas de "AI slop".

## Juzga MODELO
- **No parece plantilla** (criterio nuevo y prioritario): maquetación variada, detalles propios del negocio, NO el "centro estadístico" (Inter, gradiente morado, 3 tarjetas en fila).
- **Sensación premium** acorde al sector: jerarquía clara, espaciado intencional, una animación con sentido (no por decorar).
- **Pertinencia al brief:** el estilo encaja con el sector del auditor (confianza para mudanzas/reformas, no moda).
- Coherencia de marca (colores, tono, tipografía vs despensa elegida).
- Textos naturales, orientados a captar clientes del nicho.
>>>FIN

**Commit:** `docs: rubrica generador v2 (criterio premium + no-plantilla)`

---

## FASE 4 — Instalar skills + configurar Stitch MCP

### 4.1 impeccable
```bash
npx skills add pbakaus/impeccable --skill impeccable
```
Aplanar a `.claude/skills/impeccable/` (carpeta real, sin symlinks; borrar `.agents/` + `skills-lock.json` si aparecen).

### 4.2 design-taste-frontend
```bash
npx skills add leonxlnx/taste-skill --skill design-taste-frontend
```
Aplanar a `.claude/skills/design-taste-frontend/`.

### 4.3 skillui — NO se instala (se usa vía npx)
No instalar global. Verificar solo que responde:
```bash
npx skillui@latest --help | head -5 || echo "skillui: pendiente de verificar"
```

### 4.4 Google Stitch (MCP)
Configura el MCP de Stitch en Claude Code (requiere cuenta Google / OAuth).
- **Plan A:** añade el servidor MCP de Stitch a la config de Claude Code y autentica.
- **Plan B:** si el OAuth/entorno falla ahora, NO bloquees la ORDEN: deja Stitch como pendiente en el HANDOVER y en la validación (Fase 6) genera solo las previews 1-5 (impeccable+taste). Las 2 de Stitch quedan documentadas como pendiente.

### 4.5 Verificación de estructura
```bash
for s in impeccable design-taste-frontend; do
  test -f .claude/skills/$s/SKILL.md && echo "OK: $s" || echo "ERROR: falta $s"
  find .claude/skills/$s -type l | wc -l   # debe ser 0
done
test -d .agents && echo "ERROR: .agents existe" || echo "OK: sin .agents"
test -f skills-lock.json && echo "ERROR: skills-lock existe" || echo "OK: sin skills-lock"
```

**Commit (solo si 4.1, 4.2 y 4.5 en verde; Stitch puede quedar pendiente):**
`feat: add impeccable + design-taste-frontend skills (flattened)`

---

## FASE 5 — Construir estructura de despensa + smoke-test de skillui

1. Crea la carpeta `.claude/skills/referencias-visuales/` (la despensa).
2. **Smoke-test** de skillui con UNA web premium canónica (para probar que la herramienta funciona, no para curar la despensa real):
   ```bash
   npx skillui@latest --url https://stripe.com --mode ultra --out .claude/skills/referencias-visuales/stripe || echo "skillui ultra falló; probar sin --mode ultra"
   ```
   Aplanar la salida; borrar `.agents/` + `skills-lock.json` si aparecen.
3. Verifica que generó tokens/DESIGN:
   ```bash
   ls -la .claude/skills/referencias-visuales/stripe/ && find .claude/skills/referencias-visuales/stripe -name "*.md" | head
   ```
4. Si skillui falla por red/entorno: déjalo documentado como pendiente en el HANDOVER y continúa (la despensa real la cura Kravitzz después).

**Commit:** `feat: estructura despensa referencias-visuales + smoke-test skillui`

---

## FASE 6 — Validación: renovación + diagnóstico + evaluación (mudanzasroy.es)

Objetivo: probar que el cerebro nuevo produce diseño premium, NO construir el producto. Genera POCAS previews de prueba (no las 7 de producción).

1. Crea carpeta temporal de pruebas: `docs/bloques/3-generador/_pruebas/` y añádela a `.gitignore` (será borrada en Fase 7; no debe entrar en git).
2. **Brief de prueba** (mudanzasroy.es): sector mudanzas, público familiar, tono fiable y cuidadoso, anti-referencia = la web base actual (plana). Si existe la salida del auditor del piloto, úsala como brief.
3. **Genera 3 previews de prueba** en `_pruebas/` usando impeccable + design-taste-frontend + (si está) la referencia stripe de la despensa, con diales distintos:
   - `preview-A.html` — VARIANCE alto, MOTION medio.
   - `preview-B.html` — VARIANCE alto, MOTION alto, otra familia de animación.
   - `preview-C.html` — vía Google Stitch (si 4.4 quedó OK; si no, una tercera con taste y otro arquetipo).
   HTML/CSS estático + GSAP por CDN si hace falta. Sin build.
4. **Diagnóstico automático:**
   ```bash
   npx impeccable detect docs/bloques/3-generador/_pruebas/ || echo "detect no disponible; revisar a mano"
   ```
5. **Sirve en local para evaluación humana:**
   ```bash
   python -m http.server 8080 --directory docs/bloques/3-generador/_pruebas/
   ```
   Reporta a Kravitzz: las 3 URLs locales + el resultado del detector. **PREGUNTA:** "¿Las previews son premium y distintas entre sí (no planas)? ¿Validamos el rediseño o ajusto diales/despensa?"
6. NO hagas commit de `_pruebas/` (está gitignored). Espera el OK de Kravitzz antes de pasar a la Fase 7.

> Criterio de éxito: las 3 son claramente distintas, premium, y el detector no marca slop grave. Si fallan: subir DESIGN_VARIANCE / ampliar despensa y repetir el punto 3.

---

## FASE 7 — Limpieza de basura de prueba + CHANGELOG + HANDOVER

Solo tras el OK de Kravitzz en Fase 6.

1. **Borra la basura de prueba** (no la documentación):
   ```bash
   rm -rf docs/bloques/3-generador/_pruebas/
   # quita la línea de _pruebas/ del .gitignore si la añadiste
   ```
2. Añade entrada al `docs/bloques/3-generador/CHANGELOG.md` (la más reciente arriba):
   `- **[2026-06-14]** Diseños del piloto planos/tipo plantilla → rediseño artístico v2: cerebro impeccable+taste, despensa skillUI, 7 previews (5+2 Stitch), HTML estático → aprobado por Kravitzz. Run manual (validación mudanzasroy.es).`
3. Sobrescribe `HANDOVER.md` con el estado (formato del `/cierre`): bloque activo 3-generador, hecho en la sesión (spec v2, BLOQUE+referencias, skills instaladas, despensa, validación OK), próximo paso = `writing-plans` sobre la spec v2. Riesgos vivos: copiar los del anterior + "Stitch MCP pendiente de OAuth" y "despensa real por curar" si quedaron pendientes.

**Commit:** `docs: changelog + handover rediseno generador v2 (validado)`

---

## FASE 8 — Autoborrado de la ORDEN + verificación final + push

1. **Verificación (evidencia antes de afirmar):**
   ```bash
   test -f docs/superpowers/specs/2026-06-14-generador-diseño-v2.md && echo "OK: spec permanente"
   wc -l docs/bloques/3-generador/BLOQUE.md   # ≤ 200
   find docs/bloques/3-generador/referencias -name "*.md" | sort   # skills, despensa, flujo
   ls .claude/skills/impeccable .claude/skills/design-taste-frontend
   test -d docs/bloques/3-generador/_pruebas && echo "ERROR: basura sin borrar" || echo "OK: _pruebas borrada"
   ```
2. **Borra esta ORDEN del repo** (la spec permanece; git guarda el historial):
   ```bash
   rm 2026-06-14-ORDEN-rediseño-generador.md
   ```
3. `git add -A && git commit -m "chore: cierre ORDEN rediseno generador (autoborrado)"` y luego **`git push`**.

Si TODO pasa, termina con este mensaje (rellena los datos):

```
✅ Rediseño del bloque generador completado y subido a GitHub.

- Spec v2 permanente: docs/superpowers/specs/2026-06-14-generador-diseño-v2.md
- BLOQUE.md v2 + 3 referencias (skills, despensa, flujo)
- Skills instaladas: impeccable + design-taste-frontend (aplanadas, 0 symlinks)
- Despensa creada; skillui [verificado / pendiente]; Stitch MCP [OK / pendiente]
- Validación mudanzasroy.es: [N] previews de prueba evaluadas y APROBADAS, luego borradas
- Basura eliminada (_pruebas + esta ORDEN). Spec y docs intactos.

SIGUIENTE PASO acordado:
→ writing-plans sobre la spec v2 para construir el agente generador de producción (las 4 fases).

Cuando quieras arrancar, dímelo en sesión nueva con /inicio.
```

Si algo falla, repórtalo con ❌ (fase, comando, error) y NO hagas push ni borres la ORDEN hasta resolverlo.
>>>FIN DE LA ORDEN
