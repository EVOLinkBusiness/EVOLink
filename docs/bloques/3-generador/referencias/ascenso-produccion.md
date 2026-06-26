# Referencia — Ascenso a producción (la web final)

> Decisión cerrada (`BUSINESS.md`): webs de cliente en **Astro sobre Cloudflare Pages** (gratis, comercial). Next sobre Cloudflare necesita adaptador → se reserva al panel interno. El v1 ya está en **Astro 5 + Tailwind 3**.

La web final = **Astro + Tailwind + componentes React (islas)** donde haga falta interactividad/animación. Da React + animaciones + Cloudflare frictionless, y es óptimo en rendimiento (Astro envía 0 JS por defecto; solo hidrata las islas → ayuda a Lighthouse ≥ 90).

## Procedimiento (solo la preview elegida)
1. Preview HTML elegida → Astro + Tailwind (reutiliza el motor v1). Animaciones portadas a **islas React con `gsap-react`** (`useGSAP`). 3D (si aplica) en isla con `@react-three/fiber` o script, con tope de rendimiento móvil. **No recalcular el estilo**: reutilizar tokens/DESIGN.md ya generados (ahorra tokens).
2. Self-host de las fuentes elegidas (quitar CDN; `@font-face` + `font-display: swap`).
3. QA con `playwright-cli` (enlaces, formularios, responsive, contraste) + Lighthouse ≥ 90 móvil.
4. Render local + **OK de Kravitzz** → la web pasa al resto de bloques.
5. Hosting: **Cloudflare Pages** (CLI Wrangler gratis; plan gratuito, uso comercial). Build estático Astro = sin adaptador.

## Modelos (coste)
Ascenso = Opus (es la pieza cara). QA/mecánico = Haiku. Previews previas = Sonnet.
