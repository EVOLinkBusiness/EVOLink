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
| juanmora | awwwards | minimal-lujo · editorial | motion, tipografia | claro · cool | 3-4 | solo idioma | OK (ultra) | referencias-visuales/juanmora/juanmora-design |
| truckn-roll-r | awwwards | servicios-local · bold-industrial | estructura, motion, tipografia | claro · bold | 4 | estructura (sector exacto: mudanzas) | OK (ultra) | referencias-visuales/truckn-roll-r/trucknroll-design |
| california-vending-company | awwwards | servicios-local | estructura, color, motion | claro · warm | 4 | estructura | OK (ultra) | referencias-visuales/california-vending-company/californiavendingcompany-design |

### Ficha extendida — juanmora (extraída 26/06/2026)

**Paleta verificada:**
| Token | Hex | Uso |
|---|---|---|
| fondo | `#ffffff` | base |
| texto | `#222222` | headings + body |
| muted | `#686868` | captions, secundario |
| borde | `#333333` | dividers, cards |
| acento | `#0082f3` | CTAs, links, focus |
| acento-alt | `#2e54fe` | énfasis secundario |
| cálido | `#ffbc95` | highlight warm (sparingly) |
| sup-cálido | `#eeeeee` | superficie warm |
| casi-negro | `#121314` | capas oscuras |

**Tipografía real** *(corrección al análisis estático — `webflow-icons` es icon font, NO la display font):*
- **`Goga-Regular.otf`** (self-hosted) → fuente display custom; tamaños de headline masivos (H1: 365px, H2: 200px, H3: 140px). Identidad tipográfica de la web.
- **Sistema / Arial** → body text, UI (fallback Webflow).
- Lección portable: tipografía display a escala enorme + mucho espacio blanco = elegancia sin decoración.

**Motion tokens (extraídos del CSS):**
- Easing: `cubic-bezier(.292,1.932,.281,.996)` — bounce springy, overshoot suave.
- Easing alt: `cubic-bezier(.275,2.254,.281,.996)` — más pronunciado.
- Duración: 100ms–500ms.
- ✓ Re-extraída en modo ultra (Playwright, 26/06/2026): **GSAP + ScrollTrigger confirmados**, 7 scroll frames, 1 keyframe. Nivel real 3-4 verificado. Tokens en `juanmora/juanmora-design/`.

**Estructura y layout:**
- Grid: 4px base. Max-width: 991px. Mobile-first.
- Secciones: Hero → Features/Portfolio → CTA. Portátil como estructura base de cualquier landing.
- Radio: 8px por defecto; range amplio (de 3px a 100vw para shapes orgánicos).
- Sombras: minimalistas; overlay warm (orangey glow) para diálogos.

**Cómo usar:**
- Rol `motion`: easing bounce + duración media → P1/P4 entries con overshoot sutil.
- Rol `tipografía`: display masiva a escala + cuerpo sistema → par legible + impacto.
- NO copiar estructura de portfolio (hero con "Brand & Web Design Specialist" y grid de proyectos). Solo el idioma.

### Ficha extendida — truckn-roll-r (extraída 26/06/2026, ultra · sitio vivo trucknroll.com)

**Sector exacto: mudanzas.** Awwwards. Extracción sana: 20 colores, 10 componentes, 9 animaciones (Web Animations API), 7 scroll frames.

**Paleta verificada:**
| Token | Hex | Uso |
|---|---|---|
| fondo | `#ffffff` | base (light) |
| texto | `#131313` | headings + body |
| superficie | `#eaeff2` | cards, secciones |
| borde | `#2c2f31` | dividers |
| acento (marca) | `#c44e47` | brick red — CTAs, énfasis de marca |
| acento interactivo | `#4e37ff` | indigo — links/focus rings (secundario) |
| muted | `#98a7b6` | captions |

**Tipografía** *(corrección: el prose del DESIGN.md invierte display/body; los tokens del scale son correctos):*
- **`National 2 Condensed` (Extrabold)** → DISPLAY/headings. Condensada, industrial, impacto — idónea para mudanzas.
- **`Helvetica Now Display`** → body/UI. `SFMono` → datos/código.
- Self-hosted woff2.

**Cómo usar:** rol `estructura` real (sector exacto, layout portátil a negocio local) + rol `motion` (spring, layout animations, staggered reveals → P1/P4/P5) + rol `tipografia` (condensada bold como identidad). Verificar peso JS antes de clonar interacciones pesadas.

### Ficha extendida — california-vending-company (extraída 26/06/2026, ultra · sitio vivo californiavendingcompany.com)

**Servicios-local, sitio Next.js.** Awwwards. Extracción sana: 20 colores, 6 componentes, 6 animaciones, 5 keyframes, 7 scroll frames.

**Paleta verificada:**
| Token | Hex | Uso |
|---|---|---|
| fondo | `#ffffff` | base (light) |
| texto | `#1d293d` | headings + body (navy) |
| superficie | `#f0fdf4` | mint surface, warm |
| borde | `#44403c` | dividers |
| acento | `#e40014` | rojo — CTAs, links, focus |
| muted | `#a8a29e` | captions |
| warning | `#fbbc04` | avisos |

**Tipografía** *(corrección: prose invierte display/body; el scale es correcto):*
- **`generalSans` (Regular/Medium/Semibold/Bold)** → DISPLAY/headings. Identidad de marca.
- **`GeistSans`** → body/UI · **`GeistMono`** → datos. Self-hosted woff2 vía `_next/static`.

**Cómo usar:** rol `estructura` (landing servicios-local limpia) + rol `color-mood` (navy + rojo vivo + mint warm) + rol `motion` (spring/staggered → P1/P4). Buen molde para negocio local moderno sin parecer plantilla.

---

## Cola de candidatos (curación por demanda)
Cualquiera pega aquí una URL buena que vea; la extracción se hace en lote después. NUNCA curación especulativa: el disparador es "un cliente cae en un sector sin buena referencia".

### Sites concretos para extraer
- [⚠] https://www.awwwards.com/sites/monarch-custom-homes (vivo: `monarch.us`) — **BLOQUEADA**: el sitio responde 403 anti-bot; la extracción ultra quedó degradada (3 colores, Times New Roman, 0 componentes/animaciones) y se descartó. Reintentar con user-agent/headers reales o extracción manual antes de admitir.
- [x] ~~https://www.awwwards.com/sites/truckn-roll-r~~ (vivo: `trucknroll.com`) → **admitida** `truckn-roll-r`. Sector exacto mudanzas. Ver Inventario + ficha.
- [x] ~~https://www.awwwards.com/sites/california-vending-company~~ (vivo: `californiavendingcompany.com`) → **admitida** `california-vending-company`. Ver Inventario + ficha.
- [x] ~~https://juanmora.co/~~ → **admitida**, ver fila `juanmora` en Inventario. Tokens en `referencias-visuales/juanmora/juanmora-design/` (re-extraída ultra).

### Vocabulario de motion — fuentes de técnicas (no design-system único)
Estas fuentes no aportan estructura; aportan **idioma de animación** portable. Se usan como referencia de técnicas concretas, no como ancla de layout.

| Fuente | URL | Técnicas extraíbles | Rol | Motion |
|---|---|---|---|---|
| awwwards-moving-co | https://www.awwwards.com/inspiration_search/moving%20company/ | bloques emergentes con scroll · image path reveal (mouse move) · hover dinámico en grids · value cards con mouse interaction · timelines scrub | motion | 3-4 |

**Técnicas documentadas (curadas de la búsqueda):**
- **Bloques emergentes (P1/P2):** elementos que aparecen desde abajo/lado al hacer scroll, con reversibilidad — ver `loandbehold.studio/about/` (value cards) y `exergy3.com/about/` (company timeline scrub).
- **Image path reveal (mouse move):** imagen que se revela siguiendo el cursor — ver `feedagency.co/about`. Pertinente solo si el cliente tiene fotos reales; apartado de v1.
- **Grid con hover dinámico (P4):** estado hover animado en tarjetas de servicios — ver `integratedbiosciences.com/platform/`. Directamente portable (no necesita imágenes pesadas).
- **Card transition (P5/Flip):** cards que se reordenan o transforman con Flip.js — ver `fooror.com/`. Ya implementado en v4-4 y v4-8.

**Sites específicos para extraer si se necesita depth:**
- [ ] https://loandbehold.studio/about/ — value cards hover · motion limpio · estructura portátil
- [ ] https://exergy3.com/about/ — company timeline · P2 scrub · estructura portátil
- [ ] https://feedagency.co/about — image reveal path · solo si el cliente tiene fotos

## Reglas duras
No clonar HTML/copy/imágenes · mezclar ≥2 referencias o abstraer a tokens (nunca clon reconocible) · humano elige URLs (cero crawling) · ficha de 1 línea para triar todas, DESIGN.md/tokens completos solo de las 2-4 finalistas.
