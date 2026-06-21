# Referencia — GSAP Skills (webreactiva.com)

Fuente: https://www.webreactiva.com/blog/gsap-skills

> **Nota (abril 2025):** Todos los plugins de GSAP son ahora gratuitos tras la adquisición por Webflow. SplitText, MorphSVG, DrawSVG, Flip, CustomEase, etc. — sin licencia de pago.

## Instalación

```bash
npx skills add https://github.com/greensock/gsap-skills
```

**Después de instalar (regla EVOLink):** aplanar la skill a `.claude/skills/gsap*/` y borrar `.agents/` + `skills-lock.json`. Los symlinks de ruta absoluta se rompen al clonar.

Estado actual: **instaladas** — 8 skills aplanadas en `.claude/skills/gsap-*/` (sin symlinks, sin `.agents/`).

---

## Las 8 skills

| Skill | Qué cubre |
|-------|-----------|
| `gsap-core` | API base: `gsap.to()`, `from()`, `fromTo()`, easing, stagger, `matchMedia()` responsive/accesibilidad |
| `gsap-timeline` | Secuenciación: `gsap.timeline()`, parámetro de posición, labels, anidamiento |
| `gsap-scrolltrigger` | Animaciones vinculadas al scroll: pinning, scrub, `containerAnimation` |
| `gsap-plugins` | Flip, Draggable, SplitText, DrawSVG, MorphSVG, CustomEase, Observer y más |
| `gsap-utils` | Utilidades: `clamp`, `mapRange`, `snap`, `wrap`, `pipe`, `random` |
| `gsap-performance` | 60fps: transforms, `will-change`, `quickTo()` |
| `gsap-react` | Hook `useGSAP`, refs, `contextSafe`, limpieza en React/Next.js |
| `gsap-frameworks` | Vue, Svelte, Nuxt, SvelteKit con ciclos de vida y limpieza |

---

## Estructura de prompt — patrón exacto de webreactiva.com

**Regla dura:** siempre empezar con `frontend-design` para definir la dirección visual ANTES de listar las skills de GSAP.

```
Crea [tipo de web].
Antes de empezar, usa la skill "frontend-design" para definir [dirección visual específica].
Usa también estas skills:
"gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils" y "gsap-performance".
La web debe incluir:
- [sección 1 con animación concreta]
- [sección 2]
...
Requisitos:
- Todo en una sola página
- [estética específica]
- Interacciones fluidas y reales
- Código comentado indicando el uso de técnicas importantes de GSAP
- Documentación breve explicando qué se ha usado y por qué
```

Para React (añadir `gsap-react` y `@gsap/react`):

```
Antes de escribir código, usa la skill "frontend-design" y pide una dirección visual [estilo].
...
"gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils", "gsap-performance"
GSAP con useGSAP, scope, contextSafe y dependencias
gsap-react
```

---

## Ejemplos de prompt completo (al pie de la letra de webreactiva.com)

### Proyecto 1 — PRISM Gallery (HTML estático, galería de arte)

```
Crea una web de una sola página para una galería de arte ficticia llamada "PRISM Gallery".
Antes de empezar, usa la skill "frontend-design" para definir una propuesta visual diferente a una landing oscura: esta vez quiero una estética clara, cálida y con aire de galería.
Usa también estas skills:
"gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils" y "gsap-performance".
La web debe incluir:
- Intro animada del nombre
- Galería horizontal animada con scroll
- Grid filtrable de obras
- Carrusel draggable
- Vista detalle al abrir una obra
- Footer con efecto parallax
Requisitos:
- Todo en una sola página
- Diseño elegante, claro y cálido
- Interacciones fluidas y reales
- Código comentado indicando el uso de técnicas importantes de GSAP
- Documentación breve del proyecto explicando qué se ha usado y por qué
```

### Proyecto 2 — PULSE Analytics (dashboard interactivo)

```
Crea una web de una sola página para un dashboard interactivo llamado "PULSE Analytics".
Antes de empezar, usa la skill "frontend-design" para definir un diseño de dashboard premium, distinto de una landing o una galería.
Usa también estas skills:
"gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils" y "gsap-performance".
La web debe incluir:
- Sidebar animada
- Cursor personalizado
- Gráficos SVG animados
- Tarjetas KPI con contadores
- Tabla de datos interactiva
- Feed de actividad
- Cambio de tema claro/oscuro
- Notificación tipo toast
Requisitos:
- Todo en una sola página
- Estética de producto de analítica, moderna y profesional
- Interacciones fluidas y funcionales
- Código comentado indicando técnicas importantes de GSAP
- Documentación breve explicando qué se ha usado y por qué
```

### Proyecto 3 — The History of AI (Vite + React, scroll storytelling)

```
Quiero que construyas un proyecto completo con Vite + React para una experiencia interactiva de scroll sobre "La historia de la IA".
Antes de escribir código, usa la skill "frontend-design" y pide una dirección visual de estilo brutalista. A partir de eso, crea una estética cruda, contundente y muy visual.
Lo que quiero es una sola página con una línea temporal vertical. A medida que el usuario hace scroll, deben aparecer y animarse distintos hitos importantes de la historia de la IA usando GSAP, ScrollTrigger y el hook useGSAP de @gsap/react.
Incluye estos hitos:
- 1950 · Turing Test
- 1956 · Dartmouth
- 1966 · ELIZA
- 1969 · Shakey
- 1979 · Stanford Cart
- 1997 · Deep Blue
- 2011 · Watson
- 2012 · AlexNet
- 2014 · GANs
- 2016 · AlphaGo
- 2017 · Transformers
- 2020 · GPT-3
- 2022 · ChatGPT
- 2023 · GPT-4 / Claude
- 2025 · Agentes de IA
Usa esta estructura de componentes:
- App.jsx
- Hero.jsx
- Timeline.jsx
- Milestone.jsx
- Footer.jsx
Tecnologías y habilidades a utilizar:
- React 18 con Vite
- gsap
- @gsap/react
- GSAP con useGSAP, scope, contextSafe y dependencias
- gsap-core
- gsap-scrolltrigger
- gsap-timeline
- gsap-plugins
- gsap-utils
- gsap-performance
Dirección visual:
- Estilo brutalista
- Fondo claro roto
- Negro y rojo como colores principales
- Tipografía tipo Space Mono y Space Grotesk
- Texto muy grande
- Sin esquinas redondeadas
- Sombras duras
- Bordes gruesos
- Formas cuadradas, no circulares
Quiero que el resultado se sienta como una experiencia editorial interactiva, potente y nada genérica.
```

---

## Aplicación a EVOLink (previews 7-12)

Reparto 6 GSAP (2+2+2). Skills instaladas. Todas son HTML estático + CDN, sin build.

| Previews | Motor de dirección | Skills GSAP | Extra |
|----------|-------------------|-------------|-------|
| 7-8 | `frontend-design` + impeccable | core, scrolltrigger, timeline, plugins, utils, performance | SplitText reveal, Flip/Draggable |
| 9-10 | `gpt-tasteskill` + impeccable | ídem | editorial bold, pinning/stacking/scrub |
| 11-12 | `frontend-design` + impeccable | ídem | Three.js CDN r184 (ver `referencias/threejs.md`) |

Patrón de prompt: estructura de 4 partes obligatoria (ver `flujo-previews.md`). El prompt completo de cada preview va en su `<nombre>.prompt.txt` junto al HTML.

## Maximizar con impeccable

Tras generar con las skills GSAP, pasar impeccable como capa de pulido anti-slop:

```
Usa la skill "impeccable" para revisar el resultado:
- detect: ¿hay gradient-text, AI-purple, glass genérico, eyebrows en cada sección?
- intensity: si pide más carácter, subir a "bold" o "editorial"
- delight: añadir un momento de sorpresa visual (micro-interacción, hover inesperado)
```

Como dice el blog: "las skills de Impeccable añaden una capa de pulido visual" — impeccable es el cerebro del bloque y el último filtro antes de la revisión humana. El detector automático `detect.mjs` corre en QA (Paso 6).

## Three.js (CDN r184)

Detalle completo en `referencias/threejs.md`. Resumen para las previews 11-12:
- Importmap: `{ "three": "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js" }`
- Skills: `threejs-fundamentals` (escena mínima) + `threejs-animation` (loop) + el que sea pertinente (geometry/lighting/materials)
- Integración con GSAP: `ScrollTrigger.create({ scrub: true, onUpdate: ({ progress }) => scene.rotation.y = progress * Math.PI * 2 })`
- Caps móvil obligatorios: `setPixelRatio(Math.min(devicePixelRatio, 2))`, antialias off en móvil, 1-2 luces máx.
