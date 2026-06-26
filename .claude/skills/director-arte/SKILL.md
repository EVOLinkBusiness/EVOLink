---
name: director-arte
description: Cerebro de dirección de arte del Generador EVOLink (bloque 3). Decide con criterio, por cliente, la dirección visual de una web de negocio local — fija 7 diales, selecciona referencias por roles sobre tokens reales, elige el vocabulario de motion (primitivas P1-P6) y RECHAZA con motivo lo impertinente. Sustituye el reparto de previews por slot fijo. Úsala al inicio de la generación de previews (etapa 3 del Generador), tras la auditoría y antes de generar los HTML. Triggers: "dirección de arte", "decidir el estilo de la web", "qué previews genero", "qué referencia uso para este cliente", "nivel de motion", "plan de previews".
---

# director-arte — el cerebro de dirección de arte

Reemplaza la receta de slots fijos (el origen del "cubo en una mudanza") por un **proceso de decisión**: lee el brief + memoria, fija los diales del cliente, mezcla roles entre referencias, define el vocabulario de motion y **rechaza con motivo** lo que no pertinece. Determinista primero (pre-filtros, tablas, pesos); el juicio del modelo solo donde de verdad hace falta (scoring sobre tokens reales, redacción de la dirección).

> Lección fundacional (no repetir): un `BoxGeometry` que rota como hero de una mudanza es animación **impertinente forzada por slot fijo**. El motor no se elige por posición en una lista; se elige porque el sector y el brief lo justifican. Ver `auditoria-diseno-v4.md`.

## 1. Cuándo usarla + entrada

**Cuándo:** al arrancar la fase de previews del Generador, después de la auditoría (Auditor) y la marca, **antes** de escribir un solo `.prompt.txt`. Es la pieza que decide qué se va a generar.

**Entrada:**
- **Brief del auditor** (`clientes/<id>/brief.md`): sector, público, tono, objetivo, estructura propuesta, gaps/decisiones (p.ej. "sin fotos reales en v1").
- **`memoria-director-arte.md`** (`docs/bloques/3-generador/referencias/`): preferencias del socio, reglas por sector, conceptos ganadores, antipatrones. **Se lee SIEMPRE primero** — es el aprendizaje barato acumulado.
- **`indice-referencias.md`**: la única fuente de referencias (no se navegan galerías en vivo).
- **`marca.json`** si existe (paleta/acento bloqueado).

**Salida:** `clientes/<id>/direccion-arte.md` (formato en §9).

## 2. Design Read (reutiliza el formato de `estilo-evolink §0`)

Antes de tocar diales, declara el Design Read en una línea, como en `estilo-evolink §0`:

> *"Lo leo como: web [one-page/multipágina] para [negocio + zona], cliente final [perfil], dispositivo [móvil-primero/...], con lenguaje [cercano-profesional / oficio-confiable / ...], tono [confianza pura / con carácter / premium], paleta [familia/acento]."*

Cuatro lentes obligatorias: **sector** (¿qué perfil EVOLink?) · **público** (¿quién decide y desde dónde?) · **tono** (¿confianza pura o admite espectáculo?) · **dispositivo** (móvil 375px casi siempre). Si algo ambiguo cambia el diseño, pregunta UNA cosa; si puedes inferir, no preguntes.

## 3. Los 7 diales + presets por nicho (spec §3)

El director no elige una familia cerrada: **ajusta 7 diales por cliente**. **Regla de oro (mata el slot fijo): los diales se mezclan entre perfiles** — una mudanza puede llevar estructura corporativa con un acento de motion del polo kinético si el brief lo pide.

| Dial | Opciones | Lo cubre |
|---|---|---|
| 1. Estructura | grid ordenado · bento · editorial asimétrico · narrativa 1 columna · split · hero full-bleed | `impeccable /layout` + `frontend-design` |
| 2. Color/mood | claro-confianza · oscuro-premium · cálido-local · mono+1 acento | `impeccable /colorize` + `brandkit` |
| 3. Tipografía | par del pool por perfil | `tipografias.md` + `/typeset` |
| 4. Nivel de motion (1-5) | sobrio → espectáculo | `estilo-evolink §7` + este director (§4) |
| 5. Vocabulario de motion | primitivas P1-P6 (§6) | suite GSAP + Three.js |
| 6. Referencia ancla (por roles) | despensa · Awwwards · lapa · Dribbble | mecánica §5 |
| 7. Voz de copy | directa-fiable · narrativa · punchy | `copywriting` |

**Presets por nicho** (punto de partida, ajustable — los nichos son negocio local SIN web):

| Perfil → nichos | Estructura | Mood | Motion | Referencia prioritaria | Copy |
|---|---|---|---|---|---|
| **Confianza-servicio** — mudanzas, reformas, fontaneros, cerrajeros, limpieza, asesorías | grid + prueba social + CTA grande | claro-confianza | 2-3 | Stripe · Awwwards corporativo limpio · **+1 negocio local real** | directa, concreta |
| **Servicio-local premium / Bento** — peluquerías, barberías, clínicas, talleres, gimnasios | bento + foto protagonista | cálido o mono+acento | 3 | Superlist · Awwwards bento · lapa "Bento" | cercana-premium |
| **Editorial / con historia** — artesanos, estudios, interiorismo medio, restaurantes con relato, hoteles rurales | editorial asimétrico | cálido/refinado | 3-4 | Framer/Vercel · Awwwards editorial · lapa "Magazine" | narrativa |
| **Minimal-lujo** — joyería, interiorismo alto, inmobiliaria premium, arquitectura | minimal, mucho aire | oscuro-premium o ultra-claro | 2 | Linear · Awwwards minimal · lapa "Minimal" | escueta |
| **Kinético / Agency-bold** — marcas con carácter, fitness, estudios creativos, restaurantes de diseño, eventos | hero full-bleed, display enorme | oscuro o alto contraste | 4-5 | **Awwwards bold (prioritario)** · lapa "Agency" · `gpt-tasteskill` | punchy |
| **Inmersivo 3D (solo cuando suma)** — producto físico premium, experiencias, tech-local | hero/fondo 3D sutil | según marca | 4-5 con tope rendimiento | Awwwards WebGL (solo idioma, no peso) | mínima |

El preset es **el punto de partida, no la jaula**: si el brief lo pide, se mezclan diales de perfiles distintos. El director **descarta el perfil 6 cuando es decorativo** (aquí muere el cubo) y documenta cada rechazo con motivo.

## 4. Nivel de motion (1-5) + justificación

El dial 4 lo fija el director y lo delega a `estilo-evolink §7` (espectro 1-5). Regla: **sobrio para confianza pura; espectáculo solo cuando el sector lo permite y el brief lo pide.** El nivel se justifica SIEMPRE por escrito en la dirección.

| Nivel | Lectura | Cuándo |
|---|---|---|
| 1 | casi quieto, solo feedback | trámite/urgencia (cerrajero 24h), accesibilidad crítica |
| 2 | entradas suaves + microinteracciones | confianza pura: mudanzas, reformas, asesorías |
| 3 | reveals coordinados, algún scrub | servicio-local premium, editorial sobrio |
| 4 | scrub protagonista, pin puntual | editorial con historia, kinético contenido |
| 5 | espectáculo (display enorme, pin agresivo, 3D) | agency-bold, experiencias — **nunca** a costa de claridad/conversión móvil |

**Invariantes trust-first intactos en todo el espectro** (de `estilo-evolink`): móvil 375px, AA, datos del negocio visibles, **un CTA dominante**, `prefers-reduced-motion`. El polo espectáculo nunca rompe estos.

Tabla de criterio repetible (determinista) — **sector → motion sugerido**:

| Sector | Motion sugerido | Nota |
|---|---|---|
| mudanzas, reformas, fontanería, cerrajería, limpieza | 2-3 | pertinente; **nada de 3D decorativo** (lección cubo) |
| asesorías, gestorías, seguros | 1-2 | confianza/seriedad, mínimo motion |
| peluquerías, clínicas, gimnasios, talleres | 3 | foto protagonista, energía media |
| restaurantes con relato, hoteles rurales, artesanos | 3-4 | storytelling editorial |
| joyería, interiorismo alto, arquitectura | 2 | lujo = contención |
| marcas con carácter, fitness, estudios creativos, eventos | 4-5 | el sector pide energía |

## 5. Mecánica de referencias por roles (spec §4)

Dos decisiones distintas: **admisión** (¿guardar esta referencia?) vive en `indice-referencias.md`; aquí mandan la **selección** y la **verificación**.

**Clave de oficio — roles:** cada referencia enseña algo distinto: **estructura · color-mood · motion · tipografía**. Una preview **mezcla roles de varias** (estructura de una, motion de otra), nunca clona un ancla monolítica. *Premiado ≠ profesor:* **Awwwards aporta motion/pulido/tipografía, NO estructura** para un negocio local; el **negocio local real** enseña estructura.

**Jerarquía de fuentes:** `despensa` (sistemas extraídos limpios) **>** `Awwwards` (motion/pulido) **>** `lapa.ninja` (géneros de layout) **>** `Dribbble` (solo idea suelta, jamás estructura). Ante empate de encaje, gana la fuente más alta.

**Selección en 2 tiempos:**
1. **Pre-filtro automático** (sin modelo, barato): descarta por perfil/sector, por **forma de contenido** (la ref asume 30 fotos y el cliente tiene 5 → fuera — el caso `fab-4`), y por bandera de rendimiento.
2. **Scoring del modelo** sobre las finalistas, **leyendo los tokens reales** (`tokens.json`/`DESIGN.md`), no la etiqueta:

| Criterio | Peso |
|---|---|
| encaje de intención (perfil/objetivo) | ×3 |
| encaje de contenido real (fotos/datos disponibles) | ×3 |
| tono/mood | ×2 |
| pertinencia del motion | ×2 |
| aporta variedad al set | ×1 |

Desempate por la **memoria** (`memoria-director-arte.md`).

**Verificación:** tras generar, `playwright-cli` captura preview vs referencia ancla, lado a lado, para confirmar que se capturó el "idioma" (no el píxel). Reglas duras: humano elige URLs (cero crawling), mezclar ≥2 referencias o abstraer a tokens (nunca clon reconocible), ficha de 1 línea para triar todas; tokens completos solo de las 2-4 finalistas.

## 6. Sistema de animación (primitivas P1-P6, spec §5)

Cada preview combina una **selección coherente** de primitivas; la variedad del set nace de selecciones distintas, no de repetir la misma.

| Primitiva | Qué es | Skill |
|---|---|---|
| **P1 · Entrada** | aparición suave al scroll (`translateY`+opacidad), **reversible** (vuelve al subir) | `gsap-scrolltrigger` |
| **P2 · Ligada al scroll** | avanza/retrocede con la rueda (parallax, malla 3D, progreso: `scrub`/`pin`) | `gsap-scrolltrigger` + Three.js |
| **P3 · Texto** | titulares que se montan por líneas/letras (SplitText) | `gsap-plugins` |
| **P4 · Interacción** | botones con respuesta (`:active` escala, magnético, hover) | `gsap-core` + CSS |
| **P5 · Transición** | reordenar con animación al filtrar (Flip) | `gsap-plugins` |
| **P6 · Ambiente** | fondo 3D sutil (partículas/degradado), con tope en móvil | suite Three.js |

**Scroll reversible OBLIGATORIO:** "visible al subir y bajar" = **P1 reversible + P2 ligada al scroll**, nunca un reveal de un disparo. Todo anima **solo `transform`/`opacity`**, respeta `prefers-reduced-motion`, y mantiene **Lighthouse ≥ 90** (la rúbrica lo bloquea, no es un deseo). P4 (microinteracciones en botones) es preferencia fija del socio: presente en toda preview.

## 7. Plan de previews dinámico (8-12)

El director compone **8-12 previews** (mínimo 8, hasta 12 según riqueza del brief), NO por slots. **Restricción dura: nunca dos previews comparten referencia, género de layout ni par tipográfico.** Cada preview = una combinación coherente de los 7 diales con su selección de primitivas y sus roles de referencia anclados. El set debe cubrir el **suelo de pertinencia** (1-2 conservadoras de confianza de marca, tipo `fab-1`/`gsap-7`) y el **techo de calidad** (motion elegante motivado, tipo `fab-3`/`gsap-8`/`gsap-10`), con variedad real entre medias.

## 8. Rechazos explícitos (aquí muere el cubo)

El director **debe** listar lo que descarta y por qué. Es tan importante como lo que propone. Tabla de criterio repetible — **cuándo el 3D suma vs decora**:

| Situación | 3D | Motivo |
|---|---|---|
| Producto físico premium que se gana mostrándose (joya, mueble, coche) | **Suma** | el 3D ES el contenido |
| Experiencia/tech-local donde la marca pide inmersión | **Suma (con tope móvil)** | el idioma encaja con la promesa |
| Mudanza, reforma, fontanero, asesoría | **Decora → RECHAZAR** | confianza no se comunica con un mesh; coste de rendimiento sin función |
| Partículas/ambiente "porque queda premium" | **Decora → RECHAZAR** | sustituir por degradado/textura CSS (caso `gsap-11`) |

Regla general de rechazo: si una primitiva/motor no sirve a la **intención** (confianza, conversión, claridad) y solo "queda bien", fuera. Cada rechazo se escribe con motivo en la dirección y, si es estructural, se eleva a `memoria-director-arte.md §4`.

## 9. Salida estructurada — `clientes/<id>/direccion-arte.md`

Formato (spec §3):

```markdown
# Dirección de arte — <negocio> (<id>)
**Fecha · Perfil EVOLink · Motion fijado (1-5) + por qué**

## Design Read
(la línea de §2)

## Diales del cliente
| Dial | Valor elegido | Razón |
(los 7)

## Conceptos (2-4)
### Concepto N — <nombre>
- Diales: ...
- Referencias por roles: estructura ← X · motion ← Y · tipografía ← Z
- Primitivas: P1, P2, ... (y por qué)
- Por qué encaja con este cliente

## Plan de previews dinámico (8-12)
| # | Concepto base | Referencia (roles) | Par tipográfico | Motion | Primitivas |
(sin dos filas con misma referencia/género/par tipográfico)

## Rechazos explícitos
- <qué> → <motivo> (p.ej. cubo 3D → impertinente en mudanza)

## Recomendación preliminar
(top 2-3 con encaje a la referencia objetivo + fuerza relativa)
```

## 10. Tablas de criterio repetible (resumen — determinista primero)

Las tablas de juicio repetible viven arriba en su sección: **sector → motion sugerido** (§4), **scoring por roles / pesos** (§5), **cuándo el 3D suma vs decora** (§8), **sector → arquetipo/perfil** (presets §3). Úsalas como reglas deterministas; reserva el juicio del modelo para el scoring sobre tokens reales y la redacción de la dirección. Lo determinista decide el 80%; el modelo afina el 20% que requiere gusto.

> Cross-links: `estilo-evolink` (voz/§7 motion), `indice-referencias.md` (admisión + inventario), `memoria-director-arte.md` (aprendizaje), `flujo-previews.md` (cómo se ejecuta el set), `ascenso-produccion.md` (la elegida → Astro).
