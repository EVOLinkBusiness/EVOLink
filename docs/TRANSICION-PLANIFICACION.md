# EVOLink — Documento de transición a VS Code

> ⚠️ **Documento histórico (snapshot 2026-06-10). NO se mantiene al día.** Fuentes vivas: `docs/BUSINESS.md` (decisiones) · `docs/ROADMAP.md` (fases) · `docs/bloques/` (agentes). Desfases conocidos: el grupo de skills "taste" (§7) fue archivado y sustituido por `frontend-design`; la arquitectura de 7 bloques es posterior a este documento.
>
> **Propósito.** Poner al día la sesión de Claude Code (VS Code) con todas las decisiones tomadas en la fase de planificación. Recoge **solo conclusiones acordadas**, no el proceso de deliberación.
>
> **Fecha:** 10 de junio de 2026
> **Repositorio:** https://github.com/EVOLinkBusiness/EVOLink
> **Equipo:** 2 socios. **Meta:** agencia web semiautónoma con ingresos recurrentes mensuales.

---

## 1. Diagnóstico de partida (estado acordado)

- **El stack actual del repositorio es correcto y concluyente.** No se sustituye nada del núcleo. Las herramientas de referencia que se estaban valorando (el catálogo de 10 herramientas con Claude Code y el flujo Supabase → Vercel → GitHub) **confirman** las elecciones ya hechas; no aportan motivo para reemplazar nada esencial.
- **El riesgo del proyecto no es técnico, es de demanda/distribución.** Construir el sistema es viable; lo difícil es conseguir que negocios paguen. Consecuencias asumidas: validar en casos reales sin promocionarse todavía, arrancar por un nicho concreto, y reformular el rol de marketing (ver secciones siguientes).

---

## 2. Stack y herramientas

### 2.1 Núcleo (se mantiene)
GitHub (control de versiones) · Supabase (backend: base de datos, autenticación, almacenamiento, funciones) · Stripe (cobro) · Vercel / Cloudflare (despliegue y alojamiento) · Resend (envío de correo).

### 2.2 Adiciones a incorporar (gratis, cuando corresponda — no urgentes)
- **Playwright** (automatización de navegador). Uso: el paso "evaluar" del agente de diseño (renderizar la web generada, capturas, pulsar enlaces, comprobar que el formulario envía, medir velocidad) y el futuro agente Revisor/QA.
- **Cloudflare Pages** para alojar las **webs de cliente** (plan gratuito y permite uso comercial). **Cloudflare Workers** (5€/mes) solo si más adelante hace falta cómputo en el borde; **ahora no** (el cómputo está en Supabase).
- **Cal.com / Calendly** más adelante, para agendar en el embudo de ventas (plan gratuito).

### 2.3 No adoptar
**Notion, Slack, Miro.** Para un equipo de 2 desarrolladores, los documentos `.md` versionados en el repo + el flujo de git son mejores.

### 2.4 Notas técnicas de alojamiento
- **Astro** funciona sin fricción en Cloudflare.
- **Next.js** sobre Cloudflare necesita adaptador (hay fricción). Tenerlo en cuenta al decidir dónde va el panel frente a las webs de cliente.

---

## 3. Costes y presupuesto

### 3.1 Distinción crítica: Claude Pro ≠ API de Claude
- **Claude Pro (~20€/mes)** = la suscripción que usan **los socios para programar** (Claude Code).
- **API de Claude (pago por tokens)** = lo que **el producto** consume cada vez que genera una auditoría o una web. Se factura **aparte**; Claude Pro **no** la cubre. El producto debe llamar a la API con claves del lado del servidor.

### 3.2 Coste por unidad de la API (referencia; modelo Sonnet 4.6 ≈ 3$/15$ por millón de tokens)
- Una auditoría: **~5-10 céntimos**.
- Una web generada: **~1-5€** (baja con *prompt caching*, reutilizar lo que no cambia).
- A pequeña escala es bajo, pero es un **coste de producción** que debe ir **incluido en el precio del setup**.

### 3.3 Presupuesto y etapas
- **Presupuesto conjunto: 40-50€/mes.** Cubre de sobra **construir** y **los primeros clientes**: Pro 20€ + API de pruebas (céntimos) + Supabase gratis + Cloudflare Pages gratis + Resend gratis.
- **Etapa 0 (construir): ~20€/mes.**
- **Etapa 1 (1-5 clientes): ~30-65€/mes.**
- **Etapa 2 (10-30 clientes): ~70-150€/mes** (ya con ingresos que lo paguen).
- **No superar ~50€/mes hasta tener clientes que paguen.** Cuando los haya, ellos financian el salto.

### 3.4 Plazas de Claude Pro
De momento **una plaza (20€)** es suficiente, porque los socios no trabajan a la vez: uno programa por sesión, el otro revisa por git. Añadir la **segunda plaza (→40€)** cuando el segundo socio empiece a construir de forma regular.

### 3.5 Otros costes
- **Supabase:** gratis para construir; pasar a **Pro (~25€/mes)** cuando haya clientes en vivo (el plan gratis pausa la base de datos por inactividad).
- **Google Places API** (captación automática, fase posterior): exige **tarjeta dada de alta** aunque no se gaste; topes gratuitos modestos por tipo de consulta. Solo relevante al activar la captación automática; **ahora no** (datos manuales).
- **Dominios:** ~10€/año por web de cliente → se repercute al cliente o se incluye en el setup.
- **Stripe:** ~1,5% + 0,25€ por transacción, sin cuota mensual.

### 3.6 Objetivo de unidad económica
Fijar precios para que con **2-3 clientes** la suma de sus cuotas mensuales cubra **toda** la infraestructura mensual.

---

## 4. Mapa de agentes (4 roles)

1. **Auditor** — audita la presencia digital de un negocio. Doble función: **gancho de venta + brief** para la web. *(Fase 1, ya diseñado.)*
2. **Generador web** — de la auditoría a la web. *(Fase 2.)*
3. **Captación/Seguimiento** (antes "marketing") — encuentra, cualifica, contacta y hace seguimiento. **Co-prioritario:** debe estar tan bien diseñado como el resto y **no dejarse para el final**. *(Reformulado, ver sección 5.)*
4. **Revisor/QA de webs** — busca fallos en webs (las generadas y las de clientes de upsell) y mantenimiento. *(Futuro. Aquí encaja Playwright. Depende del Generador: no se puede revisar antes de generar.)*

---

## 5. Agente de captación/seguimiento (reformulado)

- **Es un asistente de captación y seguimiento, no un captador autónomo de clientes.**
- **Puede:** rastrear negocios en mapas, cualificar y puntuar leads, generar la auditoría como gancho, redactar contacto personalizado, secuenciar seguimientos, generar contenido.
- **No puede:** convertir desconocidos en clientes que pagan (eso es confianza humana y lo hacen los socios), ni contacto en frío masivo. Límites legales UE: RGPD + ePrivacy + LSSI; además, el correo masivo desde dominio nuevo se marca como spam (entregabilidad).
- **El cierre y la relación de confianza los ponen los socios.**
- **Pendiente (sesión aparte):** definir los **canales de promoción** (presencial, redes, internet). No se aborda aún.

---

## 6. Nicho de arranque: REFORMAS

- **Decisión: arrancar en empresas de reformas** (Móstoles / Madrid).
- **Base:** sus clientes dicen explícitamente que las eligen **buscando online y por reseñas de Google**; ticket alto (trabajos de miles de €) → el retorno de una web es evidente; el gancho de auditoría ("clientes que pierdes por no aparecer") pega fuerte; hay muchas y activas en la zona.
- **Segunda ola:** asesorías/gestorías (pagadores fiables y recurrentes, pero muchas **ya tienen web** → encajan en la vía de rediseño/upsell) y oficios (fontaneros/electricistas que hacen instalaciones).
- **Evitar (para este modelo):** peluquerías. Se descubren por Instagram y boca a boca, reservan por WhatsApp/Booksy; poca disposición a pagar por una web propia.

---

## 7. Agente de diseño: la fórmula

- **Patrón:** es el mismo **Creación → Supervisión → entrega** del tejido de agentes, aplicado al diseño: **fabricar primero, evaluar después, entregar al final.**
- **Rúbrica de evaluación explícita** (como las 7 dimensiones del Auditor). Criterios: responsive en móvil, velocidad (Lighthouse), contraste/accesibilidad, coherencia de marca (colores/tipos/logo del cliente), enlaces que funcionan, formulario que envía, cero textos de relleno. **Lo medible lo comprueba un script (determinista); el gusto y la coherencia los juzga el modelo.** Se apoya en las skills `web-design-guidelines` + `verification-before-completion`.
- **La fórmula se escribe como un flujo documentado y versionado:** qué skill, en qué orden, y el **contrato de entrada/salida** de cada bloque (como ya exige `CLAUDE.md`). No vive en la cabeza de nadie.
- **Lo "exclusivo" sale de 3 sitios:** (a) datos del cliente (marca, fotos, textos, sector) → el generador **compone y elige**, no rellena una sola plantilla; (b) variedad de maquetación + tastes; (c) pulido humano al final, hasta que madure el Revisor.
- **Playwright** se usa en el paso "evaluar".
- **Posicionamiento decidido:** webs **rápidas, con marca y de calidad que no parezcan plantillas gratis** — vía de volumen/cuota recurrente, **no** arte a medida.
- **Realidad asumida:** las primeras webs necesitarán pulido humano; el QA de la fórmula se afina según maduran la rúbrica y el Revisor.

---

## 8. Precios

- **Cuota mensual: 30€/mes — acordada y bien situada** (el tramo de suscripción de mercado en España 2026 es 19-30€/mes). Margen para subir a 35€.
- **Setup de 100€: demasiado bajo.** Referencias de mercado España 2026: el suelo ("web plantilla") es 300-600€; el tramo de "herramienta que capta y se audita por sector" —que es **este** modelo— es 1.500-4.000€+.
- **Recomendación (vía preferida):** subir el setup.
  - Primeros clientes sin historial: **250-300€** (sigue por debajo del suelo de mercado → "sí" fácil; venderlos como "clientes fundadores").
  - Con 2-3 casos hechos: **400-600€** de setup, cuota 30-40€.
- **Alternativa válida (modelo de cuota puro):** setup bajo (150-250€) **pero** cuota a 40-50€. **No** dejar los dos bajos (100€ + 30€).
- **Justificación de cobrar por encima de un Wix:** se vende una herramienta que **capta clientes y está auditada para su sector**, no "una web".

> **DECIDIDO (2026-06-09): vía "subir setup".** Cuota **30 €/mes** + setup: clientes fundadores **250-300 €**, con 2-3 casos hechos **400-600 €**.

---

## 9. Validación sin promocionarse

- **Requisito asumido:** no promocionarse al mercado hasta tener herramientas estables y fiables. **No se promete nada sin prueba previa.**
- **Cómo validar sin exponerse** (la prueba y error necesita casos reales, no promoción):
  1. **Piloto: rediseño de la web del tío** (empresa de mudanzas, ver sección 10). Caso amigable y de bajo riesgo; prueba la vía de rediseño/Generador y deja un **antes/después de portfolio + testimonio**. Sin prometer nada al mercado.
  2. **Auditorías manuales sobre empresas de reformas reales** de Móstoles, de **uso interno**, para afinar el Auditor con datos reales. Riesgo cero.

---

## 10. Piloto de referencia: mudanzasroy.es

Es un **caso de rediseño** (no un "negocio sin web"). Lectura desde el código (contenido/estructura/SEO):

**Mantener (funciona):**
- Existe, HTTPS, preparada para móvil, SEO básico correcto.
- Buena arquitectura de SEO local: muchas páginas por zona (Chamberí, Pozuelo, Getafe, Parla…) y por servicio (portes, oficinas, vaciado, guardamuebles, grupaje).
- Llamada a la acción clara en todas partes ("Solicitar presupuesto") + formulario en portada.
- Confianza: "+15 años", mención en La Razón, pólizas de seguro con número, FAQ con precios reales.

**Arreglar (defectos concretos — sirven para probar el agente Revisor):**
- **Enlaces rotos e inconsistentes:** muchos internos van a `mudanzasroy.com` en una web `.es`; y "Mudanzas low cost" enlaza a `http://low cost` (marcador roto). Un pase de Playwright pulsando enlaces lo detecta al instante.
- **Tecnología y estética de 2021** (WordPress + Elementor, imágenes antiguas, "dividers" decorativos) → aspecto de plantilla vieja y probable problema de velocidad (Core Web Vitals).
- **Prueba social floja:** "Valorado 5 de 5" sin reseñas reales con nombre o de Google embebidas.

**Matiz:** esto se ha leído del código, no de los visuales renderizados ni de la velocidad real. Confirmar ambos requiere renderizar + Lighthouse (el paso de Playwright).

---

## 11. Puntos abiertos (lo único pendiente)

1. ~~Vía de precio final~~ → **DECIDIDO (2026-06-09): subir setup** (fundadores 250-300 €, luego 400-600 €; cuota 30 €). Ver sección 8.
2. **Canales de promoción:** presencial / redes / internet — en una sesión aparte. *(Único punto abierto.)*
