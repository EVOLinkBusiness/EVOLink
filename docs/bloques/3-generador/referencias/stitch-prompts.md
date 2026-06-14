# Referencia — Prompts de Google Stitch (previews 7-8)

Stitch se usa **manual** (stitch.withgoogle.com, login Google en el navegador, exportar HTML). Coste 0 de API de Claude. Aquí viven los prompts para que las 2 previews aporten **otra voz** y mantengan pertinencia + datos reales.

## Reglas comunes (van en los 2 prompts)
- One-page responsive, mobile-first. Idioma del contenido: el del cliente (ES por defecto).
- **Un solo CTA por intención** (p. ej. "Pedir presupuesto") + teléfono clicable.
- **Sin fotos de stock fingiendo ser del cliente. Sin testimonios inventados.** Prueba social = solo hechos reales del brief.
- Acento de marca bloqueado en toda la página. Contraste WCAG AA. Label sobre input, sin placeholder-as-label.
- Nada de "lorem ipsum". Copys naturales orientados a captar.

## Plantilla (rellenar desde el brief del auditor)
```
Design a one-page responsive website for {NEGOCIO}, a {SECTOR} based in {ZONA}.
Audience: {PÚBLICO}; they decide on {CRITERIO (confianza / precio claro)}.
Tone: {TONO}. Primary action: "{CTA ÚNICO}" plus a clickable phone number.
Sections (in order): sticky header with logo + CTA; hero (clear promise, NO stock photos);
services ({N} real services: {LISTA}); trust band ({PRUEBA REAL}); contact form
(name, phone, service, message); footer (brand, contact, address).
Brand color {HEX} as the single locked accent. WCAG AA contrast. No fake testimonials, no lorem.
Motion: {NIVEL Y FAMILIA DE ANIMACIÓN}.
```

## Las 2 voces (para que NO se parezcan entre sí ni a las nuestras)
- **Stitch-7 — confianza cálida / humana.** Motion sutil: scroll-reveals suaves + micro-hover en botones/tarjetas; jerarquía tranquila; mucho aire. *Motion line:* "subtle fade-up reveals on scroll, gentle hover lift on cards and CTA, no aggressive parallax".
- **Stitch-8 — editorial bold kinético.** Hero tipográfico grande, acento fuerte, una animación protagonista. *Motion line:* "bold typographic hero with a staggered headline entrance, one scroll-driven moment (e.g. horizontal pan of services or a pinned section), restrained elsewhere".

## Ejemplo relleno — Mudanzas Roy (cliente `cb1dfbea`)
**Stitch-7 (confianza cálida):**
```
Design a one-page responsive website for "Mudanzas Roy", a moving & storage company based in
Leganés (Madrid), operating across Madrid and nationwide. Audience: families and small offices
moving home, deciding on trust and clear pricing. Tone: close, professional, reliable craft —
no empty claims. Primary action: "Pedir presupuesto" plus a clickable phone number.
Sections: sticky header (logo "Mudanzas Roy" + CTA); hero with the promise "Tu mudanza en Madrid,
sin sorpresas" (NO stock photos); services (6: mudanzas en Madrid, mudanzas nacionales,
guardamuebles, mudanzas de oficina, embalaje y montaje, vaciado de pisos); trust band
(recommended by the newspaper La Razón, 5/5 rating, 15+ years); contact form (name, phone,
service, message); footer (brand, phone, address: Pol. Ind. Prado Overa, Leganés).
Brand color #1e50c8 as the single locked accent. WCAG AA contrast. No fake testimonials, no lorem.
Motion: subtle fade-up reveals on scroll, gentle hover lift on cards and CTA, no parallax.
```
**Stitch-8 (editorial bold kinético):** mismo brief, cambiar la última línea por:
```
Motion: bold typographic hero with a staggered headline entrance and one scroll-driven moment
(horizontal pan of the services), restrained motion elsewhere.
```

## Tras exportar
Guardar el HTML como `preview-7.html` / `preview-8.html` en la carpeta de previews del cliente, pasar el detector de impeccable y servir junto a las otras 6.
