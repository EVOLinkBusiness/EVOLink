# Plan — GSAP + Three.js en el Generador (previews 7-12)

> Plan aprobado 2026-06-17. Ejecución prevista: sesión siguiente. Cierre de hoy = Paso 0 (este doc + HANDOVER + ESTADO + README + commit/push).

## Contexto
El Generador (bloque 3) tiene 6 previews de diseño v2 ya generadas y validadas (1-3 propias stripe/linear/framer + 4-6 lapa.ninja). El rediseño v2 queda pendiente del grupo de animación premium. Stitch se descartó (dependencia frágil) y el grupo se pivotó a **GSAP + frontend-design + Three.js CDN**.

Este plan replica la metodología del blog `webreactiva.com/blog/gsap-skills` como método propio de EVOLink, instala las skills necesarias de forma autónoma, amplía el repositorio de referencias con lapa.ninja, y define la generación de **6 previews GSAP** (2+2+2) hasta dejar **12 previews totales** para que el socio elija dirección.

**Decisiones del usuario (esta sesión):**
- Estructura final: **12 previews** = 6 diseño (existentes, se conservan) + 6 GSAP (nuevas).
- Par central GSAP usa **gpt-tasteskill** (no design-taste-frontend).
- Three.js: **instalar skill comunitaria + CDN** (con fallback a solo-CDN si la skill estorba).
- **OBLIGATORIO (condición de aprobación):** cada preview —las 6 actuales y las 6 nuevas— tiene un fichero `.txt` con el **prompt exacto** que la generó, guardado junto al HTML en `clientes/<id>/previews/`, accesible por el usuario.
- **REGLA OBLIGATORIA DEL BLOQUE:** toda web generada (previews 1-12 y web final) usa la **estructura de prompt de 4 partes** del blog con sus comentarios `/*1..4*/` (ver sección dedicada). "Interacciones fluidas y reales" = siempre obligatorio. Sumar/quitar detalle = razonar en qué parte y por qué.

## Estructura final de previews (12)
| # | Grupo | Motor |
|---|-------|-------|
| 1-3 | Propias *(existentes)* | impeccable + design-taste-frontend + despensa.md |
| 4-6 | lapa.ninja *(existentes)* | impeccable + design-taste-frontend + estilos-lapa-ninja.md |
| 7-8 | **GSAP · frontend-design** | `frontend-design` + impeccable + skills GSAP completas |
| 9-10 | **GSAP · taste** | `gpt-tasteskill` + impeccable + skills GSAP (ScrollTrigger pinning/scrub) |
| 11-12 | **GSAP · 3D** | `frontend-design` + impeccable + skills GSAP + Three.js (CDN r184 + skill comunitaria) |

Todas: HTML estático + CDN, sin build, mismo formato que 1-6. Mobile-first, AA, `prefers-reduced-motion` (`gsap.matchMedia()`).

---

## Regla OBLIGATORIA del bloque — estructura de prompt de TODA web generada
La regla es el **esquema abstracto de 4 partes** que el blog **repite en sus 3 proyectos** (PRISM Gallery, PULSE Analytics, History of AI) — no un ejemplo concreto. Toda web del Generador (previews 1-12 y web final) y su `.prompt.txt` siguen este esqueleto. Sumar/quitar detalle = decidir **en qué parte** entra y **por qué**, sin romper el esqueleto.

**Esquema (plantilla a rellenar):**
```
/*1 · Qué web + para qué cliente + dirección visual (con skill de estilo)*/
Crea [tipo de web de una sola página] para [negocio real del brief].
Antes de empezar, usa la skill "[frontend-design | gpt-tasteskill]" para definir [dirección visual concreta del sector y tono].

/*2 · Qué skills se van a usar*/
Usa también estas skills:
[lista explícita — p. ej. "gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils", "gsap-performance" (+ impeccable; + Three.js si aplica)].

/*3 · Qué debe incluir la web*/
La web debe incluir:
- [sección + su animación concreta]
- … (ajustado al brief del sector)

/*4 · Requisitos de elaboración correcta*/
Requisitos:
- Todo en una sola página
- [estética específica]
- Interacciones fluidas y reales (SIEMPRE OBLIGATORIO)
- Código comentado indicando las técnicas importantes de GSAP
- Documentación breve explicando qué se usó y por qué
- [estándar EVOLink: mobile-first AA, prefers-reduced-motion, placeholders honestos de logo/foto reales]
```

**Revisión de los 4 puntos (recomendación):** los 4 del blog se cumplen y se mantienen; solo los reformulo levemente para EVOLink — en (1) hago explícito "para qué cliente" además del tipo de web y la skill de dirección; en (4) añado el estándar EVOLink (mobile-first AA + reduced-motion + honestidad de placeholders) sin tocar el esqueleto. (2) y (3) idénticos al blog. Adaptación por grupo: skill de dirección = `frontend-design` (7-8, 11-12) o `gpt-tasteskill` (9-10); en previews de diseño 1-6 la Parte 2 lista `impeccable` + `design-taste-frontend` en vez de las GSAP.

**Ejemplo del blog que materializa el esquema (se repite igual en PULSE e History of AI):**
```
/*1*/ Crea una web de una sola página para una galería de arte ficticia llamada "PRISM Gallery".
Antes de empezar, usa la skill "frontend-design" para definir una propuesta visual diferente a una landing oscura: esta vez quiero una estética clara, cálida y con aire de galería.
/*2*/ Usa también estas skills:
"gsap-core", "gsap-scrolltrigger", "gsap-timeline", "gsap-plugins", "gsap-utils" y "gsap-performance".
/*3*/ La web debe incluir:
- Intro animada del nombre
- Galería horizontal animada con scroll
- Grid filtrable de obras
- Carrusel draggable
- Vista detalle al abrir una obra
- Footer con efecto parallax
/*4*/ Requisitos:
- Todo en una sola página
- Diseño elegante, claro y cálido
- Interacciones fluidas y reales (siempre OBLIGATORIO)
- Código comentado indicando el uso de técnicas importantes de GSAP
- Documentación breve del proyecto explicando qué se ha usado y por qué
```

Esta regla (esquema de 4 partes) se documenta como permanente en `flujo-previews.md`.

---

## Paso 0 — Cierre de ESTA sesión (ejecutar AHORA, antes del plan)
Los Pasos 1-6 son para la sesión de **mañana**. Hoy solo cerramos limpio:
1. Persistir este plan como doc versionado del repo: `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md` (copia del plan aprobado).
2. `/cierre`: reescribir `HANDOVER.md` (próximo paso = ejecutar este plan, con el listado de instalación) + `ESTADO.md` del bloque 3 (reparto 12 = 6+6, condición .txt de prompts) + actualizar `README.md`.
3. Commit `docs(generador): plan GSAP+Three.js previews 7-12 + cierre sesion` y **push** a `main`.
4. No se instala nada ni se generan previews hoy: eso es mañana.

## Alcance de instalación automática (resumen para aprobación)
- **Auto-instalo (2 `npx skills add`, local + aplanado):** GSAP oficial (8 skills) + Three.js comunitaria (CloudAI-X, con fallback a solo-CDN).
- **CDN, sin instalar:** plugins GSAP (SplitText/ScrollTrigger/Flip/Draggable/DrawSVG/MorphSVG/CustomEase/Observer/Inertia/ScrollTo) + Three.js r184 por importmap.
- **Ya instaladas:** frontend-design, impeccable, gpt-tasteskill, design-taste-frontend.
- Nada global; todo local al proyecto.

## Paso 1 — Instalación autónoma de skills (primer paso de MAÑANA)
Acción de sistema, se ejecuta tras aprobación.

1. **GSAP (oficial):**
   ```bash
   npx skills add https://github.com/greensock/gsap-skills
   ```
   Aplana cada skill a carpeta real en `.claude/skills/gsap-*/`; borra `.agents/` + `skills-lock.json` (regla EVOLink). Las 8 skills: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-performance`, `gsap-react`, `gsap-frameworks`. Plugins ya gratuitos tras Webflow (SplitText, ScrollTrigger, Flip, Draggable, DrawSVG, MorphSVG, CustomEase, Observer, InertiaPlugin…).
2. **Three.js (comunitaria):**
   ```bash
   npx skills add https://github.com/CloudAI-X/threejs-skills
   ```
   Aplana igual. **Contingencia:** si el repo/command falla o la skill resulta frágil (riesgo tipo Stitch), se descarta y se sigue solo con CDN + `referencias/threejs.md` (el usuario ya aceptó CDN). No bloquear el resto del plan por esto.
3. Verificar que ninguna skill dejó symlinks rotos (`ls .claude/skills` + comprobar `.agents/` y `skills-lock.json` borrados). Confirmar que la poda no rompe las 28 junctions pre-existentes ya conocidas.

## Paso 2 — Ampliar repositorio de referencias (lapa.ninja)
Sin scraping (galería con derechos de terceros; solo "idioma" visual — regla ya fijada en `despensa.md`/`estilos-lapa-ninja.md`).

- **`docs/bloques/3-generador/referencias/estilos-lapa-ninja.md`:** ampliar la tabla de géneros con categorías reales de la taxonomía de lapa.ninja aún no cubiertas (p. ej. *Agency*, *Gradient*, *Pattern/Retro* ya están; añadir las útiles para negocio local: *Business 2.450 ejs.*, *Agency 961 ejs.*, *Black/White/Blue* por paleta, *Webflow/Framer* por plataforma). Cada fila: perfil EVOLink → género lapa → composición típica → en qué sector encaja.
- **Hueco "negocio local":** la despensa actual es toda SaaS premium. Añadir en `despensa.md` 1-2 entradas de referencia (curación humana, no automática) de landings de servicios locales con buena web, para que mudanzas/reformas no salgan "demasiado tech". Marcarlas como pendientes de curar por el socio si no hay candidata clara.

## Paso 3 — Actualizar la metodología documentada (replicar el blog "igual")
- **`referencias/gsap-skills.md`:**
  - Corregir la línea duplicada de instalación (líneas ~173-174).
  - Añadir sección de cierre **"Maximizar con impeccable"** (lo que pidió el usuario): tras generar con las skills GSAP, pasar impeccable como capa de pulido anti-slop + sus comandos de intensidad/delight; citar el cierre del blog ("las skills de Impeccable añaden una capa de pulido visual"). Encaja con que impeccable ya es el cerebro del bloque.
  - Sección Three.js: importmap CDN **r184**, escena mínima (Scene/Camera/WebGLRenderer/geometría/luz/loop), patrón scroll-driven 3D con `ScrollTrigger` + `scrub`, y caps de rendimiento móvil (`setPixelRatio` ≤2, menos segmentos en móvil, antialias off en móvil, 1-2 luces).
- **Nueva `referencias/threejs.md`** (extraer el detalle Three.js de gsap-skills.md para no pasar la regla de 200 líneas): importmap, escena básica, recetas de fondo decorativo (partículas / malla deformada / ondas), integración con scroll GSAP, perf móvil y `prefers-reduced-motion`. gsap-skills.md deja un enlace de una línea.
- **`referencias/flujo-previews.md`:** cambiar el reparto de `9 = 3+3+3` a `12 = 6 (3 propias + 3 lapa) + 6 GSAP (2+2+2)`; actualizar el bloque histórico. **Añadir 2 reglas durables:** (a) toda preview se acompaña de su `.txt` de prompt exacto (`<nombre>.prompt.txt` junto al `<nombre>.html`); (b) **estructura de prompt obligatoria de 4 partes** (ver sección "Regla OBLIGATORIA del bloque") — esqueleto fijo, sumar/quitar detalle razonando en qué parte y por qué. Ambas, permanentes, no solo de esta tanda.
- **`BLOQUE.md`:** corregir "7 previews"/"9 previews 3+3+3" (líneas 8, 15, 26) al nuevo `12 = 6 + 6`; reflejar gpt-tasteskill y Three.js skill+CDN en la tabla de skills.
- **`ESTADO.md`:** actualizar el reparto y el "▶ PRÓXIMO" al nuevo objetivo de 12.

## Paso 4 — Trazabilidad de prompts (.txt por preview) — OBLIGATORIO
- **Previews 7-12 (nuevas):** antes de generar cada una, redactar el prompt completo con la **estructura obligatoria de 4 partes** (`/*1*/ dirección visual + skill · /*2*/ skills · /*3*/ secciones · /*4*/ requisitos, con "Interacciones fluidas y reales" siempre) y guardarlo como `clientes/<id>/previews/<nombre>.prompt.txt`; ese mismo texto es el que se ejecuta para generar el HTML. Prompt y HTML quedan emparejados 1:1.
- **Previews 1-6 (existentes):** crear el `.txt` retroactivo de cada una reconstruyendo el prompt desde la receta documentada (impeccable + design-taste-frontend + ref de despensa/lapa + par tipográfico + arquetipo). Marcar como "reconstruido" si no se guardó el literal original.
- Naming uniforme: `<nombre>.html` → `<nombre>.prompt.txt` en la misma carpeta.

## Paso 5 — Generar las 6 previews GSAP (2+2+2)
HTML estático + CDN en la carpeta de previews del cliente activo (`clientes/<id>/previews/`, gitignored), continuando numeración 7-12. Brief real del auditor manda (pertinencia por sector — mudanzasroy: confianza/claridad/prueba social). Patrón de prompt del blog: **empezar siempre por la skill de dirección visual, luego declarar las skills GSAP** (ver `.txt` de cada una, Paso 4).

- **7-8 · GSAP + frontend-design:** prompt arranca con `frontend-design` (dirección visual distinta entre las dos) + impeccable; skills `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, `gsap-performance`. Una con reveal/stagger + SplitText en hero; otra con un momento scroll-driven (pin + scrub) y Flip/Draggable en una sección de servicios/galería.
- **9-10 · GSAP + gpt-tasteskill:** prompt arranca con `gpt-tasteskill` (randomización de layout, tipografía editorial grande, ScrollTrigger pinning/stacking/scrub) + impeccable; misma base de skills GSAP. Voz más editorial/kinética, diferenciada de 7-8.
- **11-12 · GSAP + Three.js:** prompt arranca con `frontend-design` + impeccable + skills GSAP + Three.js (skill comunitaria si quedó instalada, si no CDN r184). 3D sutil de fondo (partículas/malla) en una; protagonista scroll-driven (rotar/mover escena con `scrub`) en la otra. Caps de rendimiento móvil obligatorios.

Reglas globales del flujo en las 6: honestidad (placeholders de logo/foto reales del cliente), `.reveal`, fuentes del pool curado (`tipografias.md`), un género/par tipográfico distinto por preview.

## Paso 6 — QA local y entrega
1. Detector anti-slop sobre las 6 nuevas: `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/*.html` → objetivo **0 hallazgos graves**; corregir antes de revisión humana.
2. Chequeo de mojibake (0 en las 6 + index).
3. Servir en local gratis: `python -m http.server` sobre la carpeta de previews; revisar por URL local.
4. Validar las **12** con el socio → elegir/mezclar dirección → `writing-plans` del agente de producción.

## Pendiente de registro (no bloqueante)
- Elevar a `docs/BUSINESS.md` la decisión "Stitch descartado / grupo animación = GSAP + Three.js" (ya marcada pendiente en HANDOVER).

## Verificación end-to-end
- Skills GSAP instaladas y aplanadas: `.claude/skills/gsap-*/` existen, sin `.agents/` ni `skills-lock.json`, sin symlinks rotos.
- Three.js: skill instalada **o** decisión registrada de ir solo-CDN; `referencias/threejs.md` con importmap r184 funcionando en una preview.
- Docs coherentes: ninguna referencia residual a "9 previews 3+3+3" ni a Stitch; todo dice `12 = 6 + 6`.
- 6 previews GSAP en disco, detector impeccable `[]`, 0 mojibake, servidas en local y abribles.
- `gsap-skills.md` con sección de cierre "Maximizar con impeccable" y sin la línea duplicada.
- **Trazabilidad:** las 12 previews tienen su `<nombre>.prompt.txt` emparejado en `clientes/<id>/previews/`; todos siguen la estructura obligatoria de 4 partes; flujo-previews.md recoge como permanentes la regla del `.txt` y la del esqueleto de 4 partes.
