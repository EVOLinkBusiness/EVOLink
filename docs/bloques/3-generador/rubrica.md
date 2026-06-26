# Rúbrica — Generador web (v2; se afina en writing-plans)

## Comprueba SCRIPT (playwright-cli + Lighthouse)
- [ ] Render correcto en móvil (375px) y escritorio.
- [ ] Lighthouse performance ≥ 90 (móvil).
- [ ] Cero enlaces rotos internos/externos; cero mezcla de dominios.
- [ ] Formulario de contacto envía y confirma (Resend).
- [ ] Contraste AA en textos principales.
- [ ] Cero "lorem ipsum" / placeholders.
- [ ] `npx impeccable detect` sin banderas de "AI slop".
- [ ] **Solo `transform`/`opacity` en motion**; `prefers-reduced-motion` respetado; **scroll reversible** presente (P1 + P2, anima al subir y bajar).

## Juzga MODELO
- **No parece plantilla** (criterio nuevo y prioritario): maquetación variada, detalles propios del negocio, NO el "centro estadístico" (Inter, gradiente morado, 3 tarjetas en fila).
- **Sensación premium** acorde al sector: jerarquía clara, espaciado intencional, una animación con sentido (no por decorar).
- **Pertinencia al brief:** el estilo encaja con el sector del auditor (confianza para mudanzas/reformas, no moda).
- Coherencia de marca (colores, tono, tipografía vs despensa elegida).
- Textos naturales, orientados a captar clientes del nicho.

## Juzga MODELO — añadidos v4 (director de arte)
- **Encaje concepto ↔ referencia (por roles):** la preview toma estructura de una fuente y motion/tipografía de otra de forma coherente; **no clona un ancla** ni mezcla idiomas que riñen. *Premiado ≠ profesor:* Awwwards no aporta estructura a un negocio local.
- **Pertinencia del motion (lección cubo):** cada motor/animación sirve a la intención (confianza, conversión, claridad); **0 motion decorativo**. 3D solo cuando el sector lo justifica — un mesh protagonista en una mudanza se rechaza.
- **Primitivas presentes + scroll reversible:** la preview usa una selección coherente de P1-P6 con P1+P2 reversibles (visible al subir y bajar) y P4 (microinteracción en botones); el nivel de motion (1-5) coincide con el fijado en `direccion-arte.md`.
- **Criterio de recomendación:** la recomendación final (top 2-3) se justifica por **encaje con la referencia objetivo + fuerza relativa** entre conceptos, no por gusto suelto. Trazable a `direccion-arte.md`.
