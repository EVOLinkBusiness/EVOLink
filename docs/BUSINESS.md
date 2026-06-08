# BUSINESS.md — EVOLink

Documento vivo del negocio (el "GDD" de la agencia). Fuente de verdad de "qué hacemos y por qué". *(Antes "Webs Javi".)*

## Visión
**EVOLink**: agencia web **automatizada** para ganar dinero. Convertimos negocios sin presencia online en clientes con web profesional y pago recurrente, con el mínimo trabajo manual por venta. El apalancamiento es la **automatización con agentes autónomos** sobre Supabase, no contratar. Equipo de 2.

## Modelo operativo — tejido de agentes
El sistema debe ser funcional por sí solo: bloques autocontenidos (skills/agentes) en 4 roles — **Creación** (Auditor, Generador web), **Supervisión** (QA automático), **Ops/Registro** (sesión + `agent_runs`), **Mejora** (aprende de registros; diferido). Regla: determinista primero, LLM para juicio; maximizar tokens.

## Los 2 agentes núcleo
- **Agente Auditor:** dado un negocio, produce una auditoría profesional de presencia digital. Es a la vez **gancho de ventas** y **brief** para el generador. Arranca con datos manuales/controlados; evoluciona a APIs de Google + aprendizaje.
- **Agente Generador web:** dada la auditoría + datos, produce una web funcional con las skills de diseño. Se hospeda, mantiene y cobra.

## Cliente ideal (ICP)
Negocios **sin web** localizables en Google Maps (locales o no): hostelería, comercios, servicios, oficios. Señales: ficha activa sin sitio enlazado, reseñas recientes (negocio vivo). **Upsell** posterior: mejorar webs flojas de quien ya tiene.

## Monetización — híbrida (decisión cerrada)
Setup inicial (pago único por diseño/puesta en marcha) + cuota mensual (hosting, dominio gestionado, mantenimiento, soporte). La recurrencia (**MRR**) es el activo: prioriza retención y volumen sobre el ticket único.

## Funnel (todo a automatizar)
Captación (escaneo automático de Maps / **outreach legítimo** — *no phishing*: datos públicos, RGPD/LOPD, opt-out) → recogida de datos → **auditoría** → **web** → entrega + billing → mantenimiento → **upsell**.

## Decisiones cerradas (no reabrir sin acuerdo de los 2)
1. **Producción web:** IA a medida con skills propias (`ui-ux-pro-max` + taste), Next/Astro + Tailwind.
2. **Monetización:** híbrida (setup + cuota mensual).
3. **Lead-gen:** Google Places API oficial.
4. **Metodología:** réplica re-oni-roll/AllergINC + plugin superpowers.
5. **Núcleo = 2 agentes** (Auditor + Generador) bajo el modelo de tejido de agentes.
6. **Persistencia:** un único proyecto **Supabase multi-tenant** (`client_id` + RLS), no BD por cliente. Proyecto `kdernwxajzzrriolnnmq`, conectado por MCP.

## Stack y herramientas
| Área | Elección |
|------|----------|
| Sitios/app | Next (app/dashboard) / Astro (marketing) + Tailwind |
| Backend/datos | Supabase (Postgres + RLS + Auth + Storage + Edge Functions + pgvector) |
| LLM | Claude (API Anthropic) |
| Diseño IA | `ui-ux-pro-max`, taste (`taste`/`soft`/`minimalist`), `brandkit`, `redesign`, `image-to-code`, `imagegen-frontend-web`, `output` |
| Motion | `gpt-tasteskill` (macro) + `ui-animation` (micro) |
| QA diseño | `web-design-guidelines` + `verification-before-completion` |
| Lead-gen | Google Places API |
| Billing | Stripe (híbrido) |
| Deploy | Vercel (app) + Supabase (backend) |
| Outreach | Resend / Postmark (a evaluar), legítimo |

## Métricas que importarán (cuando arranque la operación)
Leads cualificados/semana, tasa de respuesta del outreach, conversión a setup, **MRR** y churn, coste por web producida (tokens + APIs), tiempo de producción por web.
