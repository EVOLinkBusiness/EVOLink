# Auditoría de diseño v4 — las 12 previews de mudanzasroy + arquitectura del pipeline

**Fecha:** 2026-06-26 · **Auditor:** Claude Code (criterio de diseñador) · **Run:** manual
**Material:** `clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/` (12 HTML + `.prompt.txt`).
**Encargo:** clasificar cada preview (conservar / arreglar / descartar) con razón de diseño, marcar el listón "elegante y fluido", y documentar el fallo arquitectónico de raíz.

Criterios de juicio: (1) **pertinencia al sector** mudanzas (confianza-servicio, trust-first); (2) **calidad de motion** (fluido, reversible, motivado, sin lag); (3) **no-plantilla**; (4) **encaje con el brief** (one-page, móvil primero, sin fotos reales en v1, un CTA "Pedir presupuesto").

---

## 1. Veredicto por preview

Mapa real de archivos → reparto histórico por slot fijo:

| # | Archivo | Motor / referencia | Slot histórico | Veredicto |
|---|---|---|---|---|
| 1 | `fab-1` | stripe — corporativo claro, parallax sutil | propias 1-3 | **Conservar** |
| 2 | `fab-2` | linear — dark premium, galería horizontal pin | propias 1-3 | **Arreglar** |
| 3 | `fab-3` | framer — editorial, word-scrub | propias 1-3 | **Conservar** ⭐ (listón) |
| 4 | `fab-4` | lapa Magazine — imágenes que escalan/desvanecen | lapa 4-6 | **Arreglar** |
| 5 | `fab-5` | lapa Real Estate — contadores, pops kinéticos | lapa 4-6 | **Conservar** |
| 6 | `anim-5` | lapa Retro/Pattern — bloques sólidos, CSS puro | lapa 4-6 | **Arreglar** |
| 7 | `gsap-7` | frontend-design — blanco+azul marca, SplitText | frontend 7-8 | **Conservar** |
| 8 | `gsap-8` | dark navy+oro, Flip + DrawSVG | frontend 7-8 | **Conservar** ⭐ (listón) |
| 9 | `gsap-9` | gpt-tasteskill — Bebas gigante, bento pin | tasteskill 9-10 | **Arreglar** |
| 10 | `gsap-10` | dark, scroll horizontal scrub | tasteskill 9-10 | **Conservar** ⭐ (listón, con reserva móvil) |
| 11 | `gsap-11` | Three.js partículas de fondo (ambiente) | Three.js 11-12 | **Arreglar** |
| 12 | `gsap-12` | Three.js **cubo 3D protagonista** scrub | Three.js 11-12 | **Descartar (concepto)** |

### Detalle

**Conservar — marcan el listón "elegante y fluido":**
- **`fab-3` (framer / word-scrub).** El reveal del titular palabra a palabra ligado al scroll (P3 + P2) es elegante, motivado y reversible. Editorial sobrio que no traiciona la confianza. Es el modelo de "motion que suma sin gritar".
- **`gsap-8` (dark navy + oro, Flip + DrawSVG).** Premium "empresa establecida"; el **Flip** al filtrar servicios (P5) y la línea SVG que se dibuja en el proceso (P2) aportan variedad real de motion sin decorar. Oro = acento de confianza, no purpurina.
- **`gsap-10` (dark, scrub contundente).** "No grita, apabulla": el scrub de char y el scroll horizontal de servicios son fluidos y silenciosos. **Reserva:** el scroll horizontal con `pin` necesita validación en móvil 375px (riesgo de atrapar el gesto). Conservar como concepto, vigilar en producción.

**Conservar — sólidos para confianza-servicio:**
- **`fab-1` (stripe).** Corporativo claro, parallax sutil, ritmo de tarjetas/stats. Bajo riesgo, alta pertinencia. El "suelo seguro" del sector.
- **`fab-5` (lapa Real Estate / kinético).** Contadores (15 años, mudanzas, ciudades) + pops con stagger: energía de conversión legítima para un negocio local, CTA siempre visible.
- **`gsap-7` (frontend-design, azul de marca #1e50c8).** El más fiel a la marca generada: blanco + azul confianza, SplitText sobrio, contadores reales. Encaje de marca perfecto.

**Arreglar (buena base, defecto concreto):**
- **`fab-2` (linear dark premium).** Dark premium tira hacia "minimal-lujo", perfil distinto al de una mudanza; **la galería horizontal asume fotos reales** que el cliente no tiene en v1 (brief). Arreglo: o aclarar a claro-confianza, o reservar para cuando haya fotos.
- **`fab-4` (lapa Magazine).** Concepto entero **depende de imágenes** ("imágenes que escalan y se desvanecen", hero full-bleed con foto). Con 0 fotos reales en v1 queda hueco. Arreglo: degradar a tipográfico o esperar fotos. Caso de libro de *desajuste de contenido* (la referencia asume 30 fotos, el cliente tiene 0).
- **`anim-5` (retro/pattern).** Mucha personalidad (bloques rojo/negro/blanco, patrón). Robusta (CSS puro, sin JS) pero el carácter retro puede **restar confianza** en un servicio donde la fiabilidad manda. Arreglo: bajar el ruido o reservar para nichos con carácter (no mudanzas).
- **`gsap-9` (Bebas gigante, bento pin).** Kinético/agency-bold; "solidez de oficio" lo justifica a medias, pero el volumen tipográfico roza lo impertinente para confianza pura. Arreglo: bajar el polo de motion (4-5 → 3) o reservar para nichos kinéticos.
- **`gsap-11` (partículas Three.js de fondo).** Menos grave que el cubo (las partículas son ambiente, P6, no protagonistas), pero **siguen siendo 3D decorativo** en una mudanza: coste de rendimiento móvil sin función. Arreglo: sustituir por un degradado/textura CSS equivalente, o reservar el 3D para sectores donde sume.

**Descartar (concepto, no ejecución):**
- **`gsap-12` (cubo 3D protagonista).** La animación está bien hecha; el **concepto es impertinente**: un `BoxGeometry` que rota como hero de una empresa de mudanzas no comunica confianza ni oficio, decora. Es el caso testigo del fallo arquitectónico (abajo). **No repetir 3D protagonista sin que el sector lo justifique** (perfil "Inmersivo 3D" solo cuando suma).

---

## 2. Hallazgo arquitectónico: slot fijo → motor forzado → animación gratuita

El reparto de las 12 previews estaba **predeterminado por slot**, no por cliente:

```
1-3  → propias (stripe/linear/framer)
4-6  → lapa.ninja (Magazine/Real-Estate/Retro)
7-8  → frontend-design
9-10 → gpt-tasteskill (bold)
11-12 → Three.js  ←── aquí nace el cubo
```

**La cadena del fallo:** el slot 11-12 *obliga* a usar Three.js. Para una mudanza no hay un uso de 3D que sume, así que el motor se rellena con lo único que cabe — un cubo decorativo. **No fue un fallo de ejecución (el cubo está bien programado), sino de arquitectura:** la regla de "pertinencia" estaba escrita pero **no operacionalizada** — nada decidía, con criterio y por cliente, qué motor/estilo/animación tiene sentido y qué hay que rechazar.

Síntomas hermanos del mismo origen:
- **Desajuste de contenido** (`fab-4`, `fab-2`): el slot trae una referencia que asume muchas fotos; el cliente no tiene → secciones huecas.
- **Motion impertinente** (`gsap-9`, `anim-5`): el polo del slot impone un nivel de espectáculo que el sector no pide.

**Corrección de raíz (v4):** sustituir el reparto por slot por un **director de arte** que (a) lee el brief + memoria, (b) fija 7 diales por cliente, (c) selecciona referencias **por roles** sobre tokens reales, (d) compone un set dinámico de 8-12 previews sin dos iguales, y (e) **rechaza con motivo** lo impertinente (aquí muere el cubo). Detalle en `director-arte` (skill) y en la spec `2026-06-23-generador-director-arte-v4-design.md`.

---

## 3. Listón de referencia para v4

El "elegante y fluido" que el socio validó = **`fab-3`, `gsap-8`, `gsap-10`**: motion motivado, reversible, variado entre primitivas (word-scrub, Flip, DrawSVG, scrub), nunca decoración. El nuevo director debe producir sets cuyo techo de calidad sea ese, con el suelo de pertinencia de `fab-1`/`gsap-7` (confianza de marca) — y sin volver a forzar un motor por slot.
