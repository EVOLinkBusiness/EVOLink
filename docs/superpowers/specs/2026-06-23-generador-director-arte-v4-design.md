# Spec — Generador v4: Director de Arte Autónomo

**Fecha:** 2026-06-23 · **Estado:** aprobada (Kravitzz) · **Bloque:** 3-generador
**Construye sobre:** v2 (rediseño artístico, IMPLEMENTADO). **Absorbe y sustituye** el plan v3 (`docs/superpowers/plans/2026-06-22-generador-director-arte-v3.md`, aprobado pero no ejecutado). No reabre el flujo autónomo auditor→generador (funciona).

---

## 1. Problema

El reparto de 12 previews por **slot fijo** (1-3 propias · 4-6 lapa · 7-8 frontend-design · 9-10 gpt-tasteskill · 11-12 Three.js) predeterminaba el motor de cada preview **independientemente del cliente**. La preview-12 (cubo 3D en una mudanza) no fue un fallo de ejecución sino de **arquitectura**: el slot *obligaba* a meter Three.js. La regla de "pertinencia" estaba escrita pero **no operacionalizada**.

Cinco carencias a resolver:
1. El **"gusto" no estaba operacionalizado**: nadie decidía con criterio estilo/animación/referencia por cliente, ni qué rechazar.
2. `estilo-evolink` §7 ordenaba *"motion bajo por defecto"*, en contra de la voluntad de más animación vistosa **cuando suma**.
3. Las referencias se elegían como un **"ancla" monolítica**, sin distinguir qué enseña cada una.
4. **No había aprendizaje** de las decisiones del socio.
5. La **web final** figuraba como "futuro", sin etapa de cierre antes de pasar al siguiente bloque.

---

## 2. Decisiones cerradas (sesión 2026-06-23)

- **Director de arte autónomo** (una skill nueva, `director-arte`) que DECIDE con criterio y RECHAZA lo impertinente, en lugar de una receta de slots.
- **De "menú" a "diales":** el director no elige una familia cerrada; ajusta 7 diales por cliente y mezcla roles entre perfiles (ver §3).
- **8-12 previews dinámicas:** mínimo 8, hasta 12 según el brief. Nunca dos previews comparten referencia, género ni par tipográfico.
- **Motion = gusto por cliente:** espectro 1-5 en `estilo-evolink` §7, decidido por el director. **Invariantes trust-first intactos** (móvil 375px, AA, datos del negocio visibles, un CTA dominante, `prefers-reduced-motion`).
- **Sistema de animación por primitivas** (P1-P6, ver §5), con scroll reversible (visible al subir y bajar). Solo `transform`/`opacity`; Lighthouse ≥ 90 lo bloquea.
- **Mecánica de referencias por roles** (ver §4): admisión → pre-filtro → scoring por roles sobre tokens reales → verificación visual.
- **Memoria del director** (`memoria-director-arte.md`, ver §6): aprende de las modificaciones del socio. Coste ~0 tokens. El minado automático es el bloque 7.
- **`copywriting`** entra como palanca de "parecer caro" (la voz del texto es un dial).
- **Etapa final = ascenso a producción** (ver §7): Astro + Tailwind + componentes React (islas) sobre Cloudflare Pages. Render local + OK humano antes del siguiente bloque.
- **Token split:** previews en HTML estático (Sonnet); solo la elegida sube a producción (Opus); QA/mecánico (Haiku); prompt caching de system+brief+skills.
- **Alcance:** cerebro + pipeline + auditoría + etapa final. **SIN código orquestador** (generación asistida con skills). Automatizar en código = plan posterior (bloque 7).

---

## 3. El director de arte: de "menú" a "diales"

El director lee el brief del auditor **+ la memoria (§6)** y fija 7 diales. Cada preview es una combinación coherente. La regla de oro (mata el slot fijo): **los diales se mezclan entre perfiles** — una mudanza puede llevar estructura corporativa con un acento de motion del polo kinético si el brief lo pide.

| Dial | Opciones | Lo cubre |
|---|---|---|
| 1. Estructura | grid ordenado · bento · editorial asimétrico · narrativa 1 columna · split · hero full-bleed | `impeccable /layout` + `frontend-design` |
| 2. Color/mood | claro-confianza · oscuro-premium · cálido-local · mono+1 acento | `impeccable /colorize` + `brandkit` |
| 3. Tipografía | par del pool por perfil | `tipografias.md` + `/typeset` |
| 4. Nivel de motion (1-5) | sobrio → espectáculo | `estilo-evolink §7` + director |
| 5. Vocabulario de motion | primitivas P1-P6 (§5) | suite GSAP + Three.js |
| 6. Referencia ancla (por roles) | despensa · Awwwards · lapa · Dribbble | mecánica §4 |
| 7. Voz de copy | directa-fiable · narrativa · punchy | `copywriting` |

**Presets por nicho** (punto de partida, ajustable — los nichos son negocio local SIN web):

| Perfil → nichos | Estructura | Mood | Motion | Referencia prioritaria | Copy |
|---|---|---|---|---|---|
| Confianza-servicio — mudanzas, reformas, fontaneros, cerrajeros, limpieza, asesorías | grid + prueba social + CTA grande | claro-confianza | 2-3 | Stripe · Awwwards corporativo limpio · **+1 negocio local real** | directa, concreta |
| Servicio-local premium / Bento — peluquerías, barberías, clínicas, talleres, gimnasios | bento + foto protagonista | cálido o mono+acento | 3 | Superlist · Awwwards bento · lapa "Bento" | cercana-premium |
| Editorial / con historia — artesanos, estudios, interiorismo medio, restaurantes con relato, hoteles rurales | editorial asimétrico | cálido/refinado | 3-4 | Framer/Vercel · Awwwards editorial · lapa "Magazine" | narrativa |
| Minimal-lujo — joyería, interiorismo alto, inmobiliaria premium, arquitectura | minimal, mucho aire | oscuro-premium o ultra-claro | 2 | Linear · Awwwards minimal · lapa "Minimal" | escueta |
| Kinético / Agency-bold — marcas con carácter, fitness, estudios creativos, restaurantes de diseño, eventos | hero full-bleed, display enorme | oscuro o alto contraste | 4-5 | **Awwwards bold (prioritario)** · lapa "Agency" · `gpt-tasteskill` | punchy |
| Inmersivo 3D (solo cuando suma) — producto físico premium, experiencias, tech-local | hero/fondo 3D sutil | según marca | 4-5 con tope rendimiento | Awwwards WebGL (solo idioma, no peso) | mínima |

El director **descarta el perfil 6 cuando es decorativo** (aquí muere el cubo) y documenta cada rechazo con motivo.

**Salida del director (por cliente):** `clientes/<id>/direccion-arte.md` con: Design Read · nivel de motion + justificación · 2-4 conceptos (con diales, roles de referencia, primitivas, y por qué) · rechazos explícitos · plan dinámico de previews (cuántas y qué es cada una).

---

## 4. Mecánica de referencias (admisión → selección por roles → verificación)

Dos decisiones distintas: **admisión** (¿esta referencia es buena para guardarla?) y **selección** (¿cuál encaja con este cliente?).

**Fuente de verdad:** `referencias/indice-referencias.md` — fichas etiquetadas, NO se navega galerías en vivo. Cada ficha: `nombre · fuente · perfil(es) · roles que aporta · mood · motion (1-5) · "estructura" o "solo idioma" · nota de rendimiento`.

**Roles de una referencia** (clave de oficio): cada referencia enseña algo distinto — **estructura · color-mood · motion · tipografía**. Una preview **mezcla roles de varias** (estructura de una, motion de otra), no copia un ancla. *Premiado ≠ buen profesor:* Awwwards es fuente de **motion/pulido/tipografía**, NO de estructura para un negocio local; el **negocio local real** enseña estructura.

**Dos extractores por capa** (complementarios, no redundantes):
- `extract-design-system` → **tokens estructurados** (`tokens.json`: color/espaciado/radio). Legible por máquina, vector-ready.
- `skillui` (`npx`, mode ultra) → **motion + feel** (captura animaciones con Playwright) → `DESIGN.md`.

**Admisión (gate sí/no, humano + detector impeccable):** entra solo si (a) es web real en producción; (b) tiene sistema coherente (escala tipográfica, ritmo, paleta 3-5 colores; si `skillui` la extrae limpia, es sistemática); (c) pasa el detector anti-slop; (d) tiene ≥1 idea portable a sitio rápido (si su valor es WebGL de 40MB → etiqueta "solo idioma"); (e) mapea a un perfil EVOLink. Awwwards nominada = buen candidato, etiquetada por defecto "idioma, no peso".

**Selección (2 tiempos):**
1. **Pre-filtro automático** (sin modelo, barato): descarta por perfil/sector, por forma de contenido (la ref asume 30 fotos y el cliente tiene 5 → fuera), y por bandera de rendimiento.
2. **Scoring del modelo** sobre las finalistas, **leyendo los tokens reales** (no la etiqueta): encaje de intención ×3 · encaje de contenido real ×3 · tono/mood ×2 · pertinencia del motion ×2 · aporta variedad ×1. Desempate por la memoria (§6).

**Verificación:** tras generar, `playwright-cli` captura preview vs referencia ancla, lado a lado, para confirmar que se capturó el "idioma".

**Reglas duras (IP + token):** humano elige URLs (cero crawling de galerías) · mezclar ≥2 referencias o abstraer a tokens (nunca clon reconocible) · ficha de 1 línea para triar todas; `DESIGN.md`/tokens completos solo de las 2-4 finalistas · esquema vector-ready, archivo plano ahora, **pgvector diferido al bloque 7** cuando el volumen lo justifique (~40 refs).

**Curación (gobernanza, equipo de 2):** **por demanda** (disparador: un cliente cae en un sector sin buena referencia) + **cola de candidatos** (cualquiera pega una URL buena en el índice; extracción en lote después). La curación NUNCA es especulativa.

---

## 5. Sistema de animación (6 primitivas)

Cada preview combina una selección coherente; la variedad nace de selecciones distintas.

| Primitiva | Qué es | Skill |
|---|---|---|
| P1 · Entrada | aparición suave al scroll (`translateY`+opacidad), **reversible** (vuelve al subir) | `gsap-scrolltrigger` |
| P2 · Ligada al scroll | avanza/retrocede con la rueda (parallax, malla 3D, progreso: `scrub`/`pin`) | `gsap-scrolltrigger` + Three.js |
| P3 · Texto | titulares que se montan por líneas/letras (SplitText) | `gsap-plugins` |
| P4 · Interacción | botones con respuesta (`:active` escala, magnético, elevación hover) | `gsap-core` + CSS |
| P5 · Transición | reordenar con animación al filtrar (Flip) | `gsap-plugins` |
| P6 · Ambiente | fondo 3D sutil (partículas/degradado), con tope en móvil | suite Three.js |

"Visible al subir y bajar" = **P1 reversible + P2 ligada al scroll**, no un reveal de un disparo. Todo anima `transform`/`opacity`, respeta `prefers-reduced-motion`, mantiene **Lighthouse ≥ 90** (fluidez sin lag = regla que la rúbrica bloquea, no un deseo).

---

## 6. Memoria del director (aprendizaje ligero)

Archivo versionado `referencias/memoria-director-arte.md`. Cuatro secciones:
- **Preferencias globales del socio** (ej.: "animaciones fluidas, reversibles, microinteracciones en botones, variedad, sin lag").
- **Reglas por sector** (ej.: "mudanzas → motion 2-3 pertinente; nada de 3D decorativo — lección cubo").
- **Conceptos ganadores** (tabla: fecha · sector · concepto elegido · qué modificó el socio · lección).
- **Antipatrones** (lo rechazado y por qué).

**Aprende en 3 momentos:** (1) antes — el director lee memoria + brief; (2) durante — las modificaciones del socio son la señal; (3) después — se añade UNA línea (la aprueba el socio, igual que el CHANGELOG). Funciona **desde el cliente nº 1**. **Techo honesto:** NO reentrena el modelo; es un cuaderno consultado y ampliado. La versión automática (minar `agent_runs` y detectar patrones) es el **bloque 7**.

---

## 7. Etapa final — ascenso a producción

> **Decisión cerrada en `BUSINESS.md`:** las webs de cliente van en **Astro sobre Cloudflare Pages** (gratis, comercial); Next se reserva para el panel interno porque *Next sobre Cloudflare necesita adaptador*. El v1 ya está construido en **Astro 5 + Tailwind 3**.

La web final NO es una app Next: es **Astro + Tailwind + componentes React (islas) donde haga falta interactividad/animación**. Así se obtiene React + las animaciones + Cloudflare frictionless, y es **óptimo en rendimiento** (Astro envía 0 JS por defecto, solo hidrata las islas → ayuda a Lighthouse ≥ 90).

Procedimiento (detalle en `referencias/ascenso-produccion.md`):
1. La preview HTML elegida → Astro + Tailwind (reutiliza el motor v1), animaciones portadas a **islas React con `gsap-react`** (no se recalcula el estilo: se reutilizan tokens/DESIGN.md → ahorra tokens).
2. Self-host de las fuentes elegidas (quitar CDN; Lighthouse).
3. QA con `playwright-cli` (enlaces, formularios, responsive, contraste).
4. Render local + **OK de Kravitzz** → la web pasa al resto de bloques.
5. Hosting: **Cloudflare Pages** (CLI Wrangler gratis; plan gratuito, uso comercial).

---

## 8. Contrato E/S

- **Entrada:** brief de la auditoría (sector, público, tono, anti-referencias) + datos del cliente + `memoria-director-arte.md`.
- **Salida:** `direccion-arte.md` + 8-12 previews HTML (cada una con su `.prompt.txt`) + `recomendacion.md` + (tras elección) web Astro desplegable + registro en `agent_runs` (inputs, tokens, coste, duración, estado, QA).

---

## 9. Coste y presupuesto (límite ~10 €/mes API)

Previews en HTML barato (Sonnet); solo la elegida sube a Astro (Opus); QA/mecánico (Haiku); prompt caching. No se paga por 8-12 webs Astro, solo por una. Mitiga el gasto: divulgación progresiva en referencias (§4), `/clear` entre tareas, límite de iteraciones. React/Next/Astro = gratis. Cloudflare Pages = gratis y comercial. Vercel solo para el panel interno (no toca esto).

---

## 10. QA / rúbrica (añadidos a `rubrica.md`)

- Script: render móvil/escritorio · Lighthouse ≥ 90 · 0 enlaces rotos/mezcla de dominios · formulario envía (Resend) · contraste AA · 0 placeholders · `impeccable detect` sin slop.
- Modelo: no-plantilla (prioritario) · sensación premium por sector · pertinencia al brief · coherencia de marca · textos naturales.
- **Nuevos:** encaje concepto↔referencia (por roles) · pertinencia del motion (lección cubo) · primitivas presentes y **scroll reversible** · criterio de recomendación (encaje a la referencia objetivo + fuerza relativa → top 2-3).

---

## 11. Validación (criterio de éxito, E2E sobre mudanzasroy)

Cliente `cb1dfbea-7306-4c1e-bdde-b5d606243083`:
1. `director-arte` sobre su brief → `direccion-arte.md` que **descarta explícitamente el cubo 3D** y justifica el nivel de motion.
2. Set dinámico de previews (≥8) generado, cada una con su `.prompt.txt`, anclado por **roles** a referencias del índice.
3. `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/*.html` → 0 hallazgos graves; 0 mojibake.
4. `recomendacion.md` con top 2-3 defendible.
5. **Una entrada nueva en `memoria-director-arte.md`** tras la elección.
6. Render local (`python -m http.server`) → revisión del socio: previews pertinentes, variadas, animación siempre motivada, scroll reversible.
7. Suites existentes en verde (`cd generador && npm test`) — no se toca el código del motor.

---

## 12. Alcance y fuera de alcance

**Dentro:** skill `director-arte`, índice de referencias, memoria, espectro de motion, flujo dinámico, etapa de ascenso a producción, rúbrica, auditoría de las 12, validación E2E.
**Fuera:** **código orquestador** (programa que corre la generación de punta a punta llamando a la API) — sigue siendo asistido con skills. Automatizarlo = plan posterior (bloque 7). **pgvector** de referencias = diferido al bloque 7.

---

## 13. Reglas permanentes preservadas

- **`.prompt.txt` 1:1** por preview (el mismo texto que la generó, junto al HTML).
- **Esquema de prompt de 4 partes** (qué+cliente+dirección · skills · qué incluir · requisitos, "Interacciones fluidas y reales" siempre).

---

## 14. Pendientes humanos (palanca nº 1)

- Curar **1-2 negocios locales reales** con web cuidada (mudanzas/reformas) vía `npx skillui` — enseñan *estructura*. *Sin esto, una mudanza sale pareciendo una startup.*
- Curar un puñado de **Awwwards nominadas limpias** (no las experimentales-monstruo) → fuente de *motion/pulido*.
- Decidir URLs concretas (curación humana de los socios).
