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
