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
