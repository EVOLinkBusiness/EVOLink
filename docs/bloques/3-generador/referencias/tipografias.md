# Referencia — Despensa tipográfica (pares premium por perfil)

Pool curado de fuentes para el Generador. **impeccable elige del pool según el brief** (no auto-selección por popularidad: eso es slop). Curación humana, como la despensa visual. Self-host en el build final (Lighthouse); CDN solo en previews.

## Lista negra (NO usar como default)
Marcadas por impeccable / design-taste / el detector por sobreuso: **Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Nunito, Oswald, Space Grotesk, Geist, Plus Jakarta Sans, Fraunces, Instrument Serif.** (Aceptable solo si el brief de marca las nombra explícitamente, o accesibilidad/sector público.)

## Reglas de emparejado
- Emparejar por **eje de contraste** (serif + sans, geométrica + humanista) o **una familia en varios pesos**. Nunca dos sans casi-idénticas.
- Display: `letter-spacing` ≥ -0.04em (no apelotonar). Body: 65-75ch.
- Énfasis dentro de un titular: itálica/negrita de **la misma** familia (no meter una serif suelta en un titular sans).

## Pares por perfil
| Perfil | Display | Texto | Fuente |
|--------|---------|-------|--------|
| **corporativo-confianza** (mudanzas, reformas, asesorías) | Bricolage Grotesque | Hanken Grotesk | Google |
| **corporativo-confianza** (alt) | Archivo | Hanken Grotesk | Google |
| **servicios-local premium** | Schibsted Grotesk | Onest | Google |
| **minimal-lujo** | Newsreader (serif) | Hanken Grotesk | Google |
| **minimal-lujo** (alt, todo sans) | Clash Display | General Sans | Fontshare |
| **editorial** | Spectral (serif) | Hanken Grotesk | Google |
| **kinético / agency bold** | Clash Display | Manrope | Fontshare + Google |
| **kinético** (alt, muy display) | Unbounded | Manrope | Google |

## Cómo se usa
1. El brief del auditor da sector/tono → impeccable mapea a 1-2 perfiles.
2. Elige un par del pool de ese perfil (evita repetir el mismo par en clientes consecutivos, igual que la regla de rotación de paletas).
3. Previews: cargar por CDN (Google Fonts / Fontshare). Build final: self-host con `@font-face` + `font-display: swap`.

## Cómo ampliar
Añadir un par = una fila nueva tras validar que (a) no está en la lista negra, (b) es legible en cuerpo pequeño, (c) tiene los pesos necesarios (400/500/600/700/800). Curación humana de los socios. Verificar candidatas nuevas en `fonts.google.com` (categoría serif/sans/display) o Fontshare.
