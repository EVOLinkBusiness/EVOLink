# BUSINESS.md — EVOLink

Documento vivo del negocio (el "GDD" de la agencia). Fuente de verdad de "qué hacemos y por qué". *(Antes "Webs Javi".)*

## Visión
**EVOLink**: agencia web **semiautónoma** para ganar dinero. Convertimos negocios sin presencia online en clientes con web profesional y pago recurrente, automatizando casi todo el flujo. La parte humana es el **cierre y la confianza** (los socios); el resto lo llevan agentes sobre Supabase. Equipo de 2; el apalancamiento es la automatización, no contratar.

> El riesgo del proyecto no es técnico (construirlo es viable) sino de **demanda/distribución**: lo difícil es que negocios paguen. De ahí: validar sin promocionarse, arrancar por un nicho concreto, y una captación co-prioritaria.

## Modelo operativo — tejido de agentes
Bloques autocontenidos (skills/agentes) en 4 **roles** transversales: **Creación** · **Supervisión** (QA automático) · **Ops/Registro** (sesión + `agent_runs`) · **Mejora** (aprende de registros; diferido). Regla: determinista primero, LLM para juicio; maximizar tokens. *(Detalle operativo en `CLAUDE.md`.)*

## Mapa de agentes (4)
1. **Auditor** — audita la presencia digital de un negocio. Doble función: **gancho de venta + brief** para la web. *(Fase 1, diseñado.)*
2. **Generador web** — de la auditoría a la web (fórmula de diseño, ver abajo). *(Fase 2.)*
3. **Captación/Seguimiento** — **asistente co-prioritario** (NO se deja para el final). Rastrea negocios en mapas, cualifica y puntúa leads, genera la auditoría como gancho, redacta contacto personalizado, secuencia seguimientos y genera contenido. **No** convierte desconocidos en clientes que pagan (eso es confianza humana: lo hacen los socios) **ni** hace contacto en frío masivo (límites legales UE: RGPD + ePrivacy + LSSI; y entregabilidad del correo).
4. **Revisor/QA de webs** — busca fallos (webs generadas y de clientes de upsell) y mantenimiento. *(Futuro; usa Playwright; depende del Generador: no se revisa antes de generar.)*

## Cliente ideal (ICP)
**Nicho de arranque: empresas de REFORMAS** (Móstoles / Madrid). Sus clientes las eligen buscando online y por reseñas de Google; ticket alto (trabajos de miles de €) → el ROI de una web es evidente; el gancho de auditoría ("clientes que pierdes por no aparecer") pega fuerte; hay muchas y activas en la zona.
- **2ª ola:** asesorías/gestorías (pagadores fiables y recurrentes, pero muchas **ya tienen web** → vía rediseño/upsell) y oficios (fontaneros/electricistas que hacen instalaciones).
- **Evitar:** peluquerías (se descubren por Instagram y boca a boca, reservan por WhatsApp/Booksy; poca disposición a pagar por una web propia).

## Monetización (decisión cerrada)
- **Cuota mensual: 30 €/mes** (bien situada en el mercado ES 2026, tramo 19-30 €; margen para subir a 35-40).
- **Setup (vía "subir setup"):** clientes fundadores **250-300 €**; con 2-3 casos hechos **400-600 €**.
- **Por qué por encima de un Wix:** se vende una **herramienta que capta clientes y está auditada para su sector**, no "una web".
- La **API de Claude** (lo que consume el producto al generar) es un **coste de producción incluido en el setup**.
- La recurrencia (**MRR**) es el activo: prioriza retención y volumen.

## Costes y presupuesto
- **Claude Pro (~20 €/mes) ≠ API de Claude.** Pro = los socios programando (Claude Code). API = lo que el producto gasta por token al generar auditorías/webs; se factura aparte, con claves server-side.
- **Tope: 40-50 €/mes hasta tener clientes que paguen.** Etapas: construir ~20 € · 1-5 clientes ~30-65 € · 10-30 clientes ~70-150 € (ya con ingresos que lo paguen).
- **Supabase:** gratis para construir; **Pro (~25 €)** cuando haya clientes en vivo. **Plazas Claude Pro:** 1 ahora; 2ª (→40 €) cuando el segundo socio construya de forma regular.
- **Otros:** Google Places exige tarjeta dada de alta (solo al activar la captación automática; ahora no); dominios ~10 €/año (se repercute al cliente); Stripe ~1,5 % + 0,25 €/transacción.
- **Unidad económica:** fijar precios para que con **2-3 clientes** sus cuotas cubran **toda** la infra mensual.

## Validación sin promocionarse
No se promociona al mercado hasta tener herramientas estables y fiables; **no se promete nada sin prueba previa**. Validación con casos reales:
1. **Piloto: rediseño de `mudanzasroy.es`** (empresa de mudanzas del tío). Caso amigable, bajo riesgo; prueba la vía rediseño/Generador y deja un antes/después de portfolio + testimonio.
2. **Auditorías manuales** sobre empresas de reformas reales de Móstoles, de **uso interno**, para afinar el Auditor con datos reales.

## Fórmula del agente de diseño (resumen)
Mismo patrón del tejido: **fabricar → evaluar → entregar**. Rúbrica explícita (responsive móvil, velocidad/Lighthouse, contraste/accesibilidad, coherencia de marca, enlaces que funcionan, formulario que envía, cero textos de relleno): **lo medible lo comprueba un script (Playwright); el gusto y la coherencia los juzga el modelo**. La fórmula se documenta y versiona con contrato de entrada/salida por bloque. Lo "exclusivo" sale de: datos del cliente + variedad de maquetación/taste + pulido humano. Posicionamiento: **webs rápidas, con marca y que no parezcan plantilla** — vía volumen/cuota, no arte a medida. *(Detalle en `TRANSICION-PLANIFICACION.md` §7.)*

## Decisiones cerradas (no reabrir sin acuerdo de los 2)
1. Producción web = IA a medida (`ui-ux-pro-max` + taste), Next/Astro + Tailwind.
2. Monetización = **cuota 30 €/mes + setup 250-300 €→400-600 €** (vía "subir setup").
3. Captación = **asistente** (los socios cierran); outreach legítimo (RGPD/ePrivacy/LSSI; sin frío masivo); lead-gen = Google Places API.
4. Metodología = re-oni-roll/AllergINC + plugin superpowers.
5. Núcleo = **mapa de 4 agentes** (Auditor, Generador, Captación/Seguimiento, Revisor/QA) sobre el tejido de agentes.
6. Persistencia = Supabase multi-tenant (`client_id` + RLS), proyecto `kdernwxajzzrriolnnmq` (MCP).
7. **Nicho de arranque = reformas** (Móstoles/Madrid).

## Puntos abiertos
- **Canales de promoción** (presencial / redes / internet) → sesión de brainstorming aparte. *(No resuelto.)*

## Stack y herramientas
| Área | Elección |
|------|----------|
| Sitios/app | Next (panel/dashboard) / Astro (marketing y webs de cliente) + Tailwind |
| Backend/datos | Supabase (Postgres + RLS + Auth + Storage + Edge Functions + pgvector) |
| LLM | Claude (API Anthropic) |
| Diseño IA | `ui-ux-pro-max`, taste (`taste`/`soft`/`minimalist`), `brandkit`, `redesign`, `image-to-code`, `imagegen-frontend-web`, `output` |
| Motion | `gpt-tasteskill` (macro) + `ui-animation` (micro) |
| QA diseño | `web-design-guidelines` + `verification-before-completion` + **Playwright** (render, enlaces, formulario, velocidad) |
| Lead-gen / Email | Google Places API · **Resend** |
| Billing | Stripe (setup + suscripción) |
| Deploy | **Vercel** (panel Next) + **Cloudflare Pages** (webs de cliente; gratis, uso comercial) + Supabase (backend) |
| Agenda (futuro) | Cal.com / Calendly (gratis) |
| NO adoptar | Notion, Slack, Miro (para 2 devs, `.md` versionados + git son mejores) |

> Nota de hosting: Astro va sin fricción en Cloudflare; Next sobre Cloudflare necesita adaptador → el panel va en Vercel/Next y las webs de cliente en Astro/Cloudflare Pages.

## Métricas que importarán (cuando arranque la operación)
Leads cualificados/semana, tasa de respuesta del outreach, conversión a setup, **MRR** y churn, coste por web producida (tokens + APIs), tiempo de producción por web.
