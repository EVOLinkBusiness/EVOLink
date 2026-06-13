---
name: estilo-evolink
description: Voz de diseño de EVOLink para webs de negocio local (reformas, mudanzas, servicios). Convierte un brief + marca en interfaces que generan confianza, convierten y NO parecen plantilla. Anti-slop adaptado a cliente final, mobile-first y accesible AA. Se aplica en las etapas 2-3 del Generador (marca y plan de página).
---

# estilo-evolink — voz de diseño de EVOLink

Consolidación de `taste-skill` + `soft-skill` + `minimalist-skill` (archivadas en `docs/archivo-skills/`) en una sola voz, **adaptada al nicho real de EVOLink**: negocios locales sin presencia online cuyos clientes son personas normales buscando un servicio (una reforma, una mudanza), casi siempre desde el móvil.

## Relación con `frontend-design`
`frontend-design` (oficial Anthropic) es el **método general** de diseño distintivo: se aplica primero para evitar lo templado. `estilo-evolink` es la **voz específica de EVOLink**: se aplica DESPUÉS, fija las decisiones concretas para el nicho local (paleta de confianza, jerarquía, accesibilidad, conversión). Si chocan, manda esta skill por ser de proyecto.

## Lo que diferencia a EVOLink (NO somos una agencia Awwwards)
La audiencia no es un buyer técnico ni un jurado de diseño: es un cliente que decide si confía. Por eso:
- **Claridad > espectáculo.** Motion bajo (1-4), sin scroll-hijack ni pinning agresivo. La web debe entenderse de un vistazo.
- **Mobile-first real.** La mayoría llega desde Google Maps en el móvil. Se diseña a 375px primero.
- **Trust-first.** Teléfono, zona de servicio, fotos reales del trabajo y reseñas visibles pesan más que cualquier efecto.
- **Conversión local:** un CTA dominante (llamar / pedir presupuesto). Sin menús de SaaS ni 6 secciones de relleno.

## 0. Lee el brief antes de tocar nada
Antes de diseñar, declara en una línea el **"Design Read"**: *"Lo leo como: web [one-page/multipágina] para [negocio + zona], cliente final [perfil], con lenguaje [cercano-profesional / oficio-confiable], paleta [familia]."* Si el brief es ambiguo en algo que cambia el diseño, pregunta UNA cosa; si puedes inferir, no preguntes.

## 1. Anti-defaults (lo que delata una web de IA — prohibido por defecto)
- **Sin morado/azul-glow de IA.** Nada de gradientes neón ni mesh genérico.
- **Sin la paleta beige+latón+espresso** como reflejo automático para "oficio/artesano".
- **Sin Inter/Roboto/Arial** como display por defecto; sin serif "porque es premium".
- **Sin fake screenshots de `<div>`**, sin iconos dibujados a mano, sin lorem ipsum.
- **Sin hero centrado por defecto**, sin 3 cards iguales, sin eyebrow encima de cada sección.
- **Sin clichés de copy:** "Eleva", "Sin esfuerzo", "Soluciones a medida", "Líderes del sector".

## 2. Tipografía
- **Display/titulares:** una grotesca con carácter (Geist, Cabinet Grotesk, Plus Jakarta, Switzer) o serif SOLO si el negocio es genuinamente artesano/heritage y se justifica. Tracking ceñido (`-0.02em`), `leading` corto.
- **Cuerpo:** legible, `line-height` 1.6, ancho máximo ~65ch, color off-black (`#1a1a1a`), nunca negro puro.
- **Énfasis** dentro de un titular: itálica/negrita de la MISMA familia, nunca meter un serif suelto.
- Self-host o `font-display: swap`. Nunca `<link>` a Google Fonts en producción.

## 3. Color (de `marca.json`, nada en duro)
- **Una paleta por web, un acento, bloqueado.** El acento elegido se usa en toda la página; no aparece un CTA de otro color en la sección 7.
- Bases neutras (zinc/slate/stone/bone) + un acento de confianza con buen contraste (azul, verde, rojo-tierra, naranja quemado). Saturación < 80%.
- **Una escala de radios** (todo sharp, o todo 8-12px, o pills para interactivo): no mezclar sin regla.
- Sombras tintadas al fondo, nunca negro puro sobre claro; sombras ultra-difusas y sutiles.

## 4. Layout y maquetación
- **Hero entra en el viewport:** titular ≤2 líneas, subtexto ≤20 palabras, CTA visible sin scroll. Máx. 4 elementos de texto (eyebrow opcional + titular + subtexto + CTA). El logo-wall/"trabajamos en…" va DEBAJO, no dentro.
- **Variedad estructural:** una familia de layout aparece como mucho 1 vez. Máx. 2 splits imagen+texto seguidos; rómpelos con full-width, stack vertical o bento.
- **Grid sobre flex-math.** Breakpoints estándar; contenedor `max-w-[1200px]`.
- **Eyebrows con freno:** máx. 1 cada 3 secciones.
- **Nav en una línea** en escritorio, altura ≤80px; en móvil, hamburguesa.
- **Colapso móvil explícito** por sección (declara el fallback `<768px`).
- `min-h-[100dvh]` en secciones a pantalla completa, nunca `h-screen`.

## 5. Imágenes (sin IA en v1)
- Prioridad: **fotos reales del cliente** donde aporten (trabajos hechos, equipo, local) → **stock gratuito** (Unsplash/Pexels, o `picsum.photos/seed/...` como provisional) para relleno.
- Toda imagen lleva `alt` descriptivo. Nada de ilustraciones SVG decorativas hechas a mano.
- Incluso una web sobria necesita 2-3 imágenes reales: hero + un trabajo + un apoyo.
- Logos de confianza (si los hay): marcas reales (Simple Icons), solo el logo, sin etiqueta debajo.

## 6. Contenido y copy (nicho local)
- Secciones cortas: titular (≤8 palabras) + sub-párrafo (≤25) + un visual o un CTA.
- **Un solo CTA por intención** en toda la web (p.ej. "Pedir presupuesto" en nav, hero y pie — mismo texto).
- Cero números falsos ("+500 reformas") salvo dato real del cliente.
- Testimonios: máx. 3 líneas, con nombre + (rol/zona). Comillas tipográficas reales, sin guion largo decorativo.
- Datos clave del negocio local SIEMPRE visibles: teléfono clicable (`tel:`), zona de servicio, horario, email.
- Revisa cada string antes de entregar: nada gramaticalmente roto, ni cute-meta de IA, ni referente perdido.

## 7. Motion (sobrio por defecto)
- Solo si comunica jerarquía, feedback o secuencia. Entrada suave en scroll (`IntersectionObserver`/`whileInView`, `translateY 12-16px` + opacidad, `cubic-bezier(0.16,1,0.3,1)`), hover táctil (`scale(0.98)` en `:active`).
- Anima solo `transform`/`opacity`. `backdrop-blur` solo en fijos/sticky. Respeta `prefers-reduced-motion`.
- Macro-motion (GSAP/`gpt-tasteskill`) reservado para cuando un negocio concreto lo pida y lo justifique; no por defecto.

## 8. Accesibilidad (la rúbrica la mide — bloquea entrega)
- Contraste **AA**: texto principal ≥4.5:1; texto grande/botones ≥3:1. Auditar cada CTA, placeholder, foco y texto de ayuda.
- Botón legible sobre su fondo; texto de botón en una línea en escritorio.
- Label encima del input, error debajo; nunca placeholder como label.
- Focus visible; navegación por teclado; `alt` en imágenes.

## Checklist pre-entrega (etapas 2-3 y antes del checkpoint)
- [ ] Design Read declarado; paleta y radios bloqueados y coherentes en toda la web.
- [ ] Hero entra en viewport en móvil; un CTA dominante por intención.
- [ ] ≥4 familias de layout distintas si hay ≥8 secciones; sin 3º split seguido; eyebrows ≤1/3 secciones.
- [ ] 2-3 imágenes reales mínimo, todas con `alt`; cero placeholders/lorem/fake screenshots.
- [ ] Teléfono `tel:`, zona y email visibles; copy revisado string a string.
- [ ] Contraste AA verificado en textos, botones y formulario; colapso móvil declarado por sección.
- [ ] Motion sobrio y motivado; `prefers-reduced-motion` respetado.

> Detalle extenso (esqueletos de motion GSAP, mapa de design systems) en las skills archivadas si alguna vez se necesita: `docs/archivo-skills/`.
