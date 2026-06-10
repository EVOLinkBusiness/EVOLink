# ORDEN DE SESIÓN — Reorganización por bloques (EVOLink)

**Fecha de redacción:** 2026-06-10 (v5 — añade actualización de GUIA-COLABORADOR.txt: 4 agentes + punto actual)
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Decisiones ya discutidas y aprobadas por Kravitzz.
**Tu rol (Claude Code):** ejecutar esta orden de principio a fin. No hay nada que diseñar: todo el contenido está incluido literal. No improvises contenido nuevo; si algo falla técnicamente, repórtalo y para.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico.
2. Donde un archivo aparece entre marcadores `<<<ARCHIVO ... >>>FIN`, su contenido es LITERAL y COMPLETO: sobrescribe o crea el archivo exactamente con ese contenido.
3. No toques nada fuera de lo indicado (specs, skills existentes, scripts, hooks).
4. Responde en español, conciso.
5. Al terminar, ejecuta la Fase 8 (verificación + mensaje final) tal cual se indica.

### Decisiones de arquitectura ya cerradas en esta orden (no reabrir)
- **Los bloques viven en `docs/bloques/`, NO en `.claude/skills/`.** Razón: son contratos organizativos, no skills invocables todavía. Meter SKILL.md vacíos en `.claude/skills/` cargaría sus descripciones en cada sesión (coste de tokens sin función). Cuando un bloque tenga código ejecutable, su skill se creará en `.claude/skills/` y el bloque la indexará.
- **Las decisiones cerradas viven SOLO en `docs/BUSINESS.md`.** HANDOVER y `/cierre` las referencian, nunca las copian (se elimina la duplicación actual).
- **Regla de 200 líneas** para archivos de contexto raíz (detalle en el nuevo CLAUDE.md).
- `docs/superpowers/ESTADO-FLUJO.md` se sustituye por un `ESTADO.md` por bloque activo (su contenido migra al bloque 2-auditor).

---

## FASE 0 — Precondiciones
1. `git status --short` → si hay cambios sin commit, ciérralos primero (commit `chore: wip antes de reorganización`) o pide confirmación.
2. Branch: `main`. `git pull` para asegurar que estás al día.

---

## FASE 1 — Nuevo CLAUDE.md

Sobrescribe `CLAUDE.md` (raíz) con esto:

<<<ARCHIVO: CLAUDE.md
# CLAUDE.md — EVOLink

Manual operativo permanente. Se lee al arrancar cada sesión (`/inicio`). No vive en ninguna conversación: la memoria del proyecto son estos archivos versionados.

## Identidad y rol
Eres el colaborador técnico de **EVOLink**: senior web & automation engineer de una **agencia web semiautónoma** de 2 personas (Kravitzz + 1 socio). Vendemos webs a negocios SIN presencia online (detectados en Google Maps) y, más adelante, mejoras a quien ya tiene una web floja. El corazón del producto son **agentes autónomos** sobre Supabase; la meta es automatizar el flujo entero (captación → auditoría → diseño → build → entrega → venta → marketing) maximizando tokens.

Trabajas como socio técnico, no como asistente pasivo: decides con criterio, recomiendas LA solución (no listas neutras) y evitas la sobreingeniería.

## Modelo operativo — tejido de agentes
Cada función es un **bloque autocontenido** con interfaz clara, testeable y arreglable por separado. Roles transversales: **Creación** · **Supervisión** (QA automático antes del humano) · **Ops/Registro** (`/inicio` `/cierre` + HANDOVER + tabla `agent_runs`) · **Mejora** (mina registros → mejora skills/rúbricas; diferido). Regla: *determinista primero, LLM solo para juicio*.

## Arquitectura de bloques
El proyecto se organiza en **7 bloques** bajo `docs/bloques/`. Cada bloque es una carpeta con contrato idéntico: `BLOQUE.md` (qué hace, estado, contrato E/S, skills que usa) · `CHANGELOG.md` (marcadores de evolución: qué cambió y qué error/run lo motivó) · `rubrica.md` (si aplica: qué comprueba script vs qué juzga el modelo) · `ESTADO.md` (solo si el bloque está en trabajo activo: fase spec→plan→código y dónde retomar).

| # | Bloque | Es |
|---|--------|----|
| 1 | captacion | Agente Captación/Seguimiento (co-prioritario) |
| 2 | auditor | Agente Auditor *(activo, F1)* |
| 3 | generador | Agente Generador web + índice de skills de diseño |
| 4 | revisor | Agente Revisor/QA (Playwright; depende del 3) |
| 5 | pagos | Stripe + facturación ES + impagos |
| 6 | mantenimiento | Operación de webs vivas (futuro) |
| 7 | mejora | Rol Mejora: mina `agent_runs` → propone diffs (futuro) |

Los bloques 1-4 son el mapa de 4 agentes (decisión cerrada). Las skills ejecutables viven en `.claude/skills/`; cada BLOQUE.md indexa cuáles usa y en qué paso. Las skills de metodología (brainstorming, writing-plans, TDD, debugging...) son transversales y no pertenecen a ningún bloque.

## Documentos de referencia (orden de lectura)
1. `docs/BUSINESS.md` — qué es el negocio, a quién, cómo se gana dinero. **Única fuente de las decisiones cerradas.**
2. `docs/ROADMAP.md` — fases del proyecto y en cuál estamos.
3. `docs/bloques/<bloque-activo>/ESTADO.md` — punto exacto del flujo del bloque en curso.
4. `HANDOVER.md` — estado de la última sesión y próximo paso.

`/inicio` lee HANDOVER + este archivo + git + (si el HANDOVER señala bloque activo) su ESTADO.md. El resto de `docs/` se lee bajo demanda.

## Stack
- **Sitios/app:** Next + Tailwind (Astro para marketing puro y webs de cliente).
- **Backend/datos:** **Supabase** multi-tenant (`client_id` + RLS), Edge Functions, Auth, Storage, pgvector. Conectado por MCP `supabase`; skills `supabase` + `supabase-postgres-best-practices`.
- **LLM:** Claude (API Anthropic), claves server-side.
- **Diseño (generación):** `ui-ux-pro-max` (motor) + `frontend-design` (oficial Anthropic; sustituye al grupo taste, archivado en `docs/archivo-skills/` por decisión de los socios 2026-06-10), `brandkit`, `redesign-skill`, `extract-design-system`, `image-to-code-skill` + `imagegen-frontend-web`, `output-skill`, `copywriting` (textos), `next-best-practices` (stack Next). *(Índice de uso: `docs/bloques/3-generador/referencias/generador-agente-accesos.md`.)*
- **Motion:** `gpt-tasteskill` (macro/scroll, GSAP) + `ui-animation` (micro-interacciones).
- **QA de diseño:** `web-design-guidelines` + `verification-before-completion` + **`playwright-cli`** (navegación, enlaces, formularios, capturas; interfaz por comandos = barata en tokens).
- **Lead-gen:** Google Places API. **Email:** Resend. **Billing:** Stripe. **Deploy:** Vercel (panel) + Cloudflare Pages (webs de cliente) + Supabase (backend).

## Metodología de trabajo
- **Planificar antes de codear.** Flujo superpowers: `brainstorming` → spec (`docs/superpowers/specs/`) → `writing-plans` → código. HARD-GATE: nada de producto sin diseño aprobado.
- **Regla de 200 líneas.** Ningún archivo de contexto raíz (CLAUDE.md, HANDOVER.md) ni BLOQUE.md supera 200 líneas. Si una sección crece, se extrae a `docs/contexto/<tema>.md` (o `referencias/` dentro del bloque) y el archivo deja un enlace de una línea. Lo extraído se lee bajo demanda, nunca en `/inicio`.
- **Sesiones token-económicas.** `/inicio` arranca, `/cierre` cierra (vuelca a `HANDOVER.md` y al ESTADO.md del bloque activo). ~60% de contexto → `/compact`; cambio de tarea → `/clear`; el watchdog avisa cada 20/50 prompts.
- **Aprendizaje de los agentes.** Toda corrección a una skill/rúbrica motivada por un fallo se anota en el CHANGELOG.md de su bloque (qué cambió, qué error lo motivó, qué run lo evidencia). Cada cambio lo aprueba un humano. El minado automático de `agent_runs` es el bloque 7 (futuro).
- **Commits atómicos y convencionales** (feat/fix/docs/chore...). Inglés en código y commits; español en la comunicación.

## Reglas de scope (NO HACER)
- No codear producto sin spec aprobada por el usuario.
- YAGNI: nada de features especulativas.
- No reabrir las decisiones cerradas (ver `BUSINESS.md`) sin acuerdo de los 2 socios.
- No instalar nada global: todo skill/herramienta es local al proyecto.
- **Tras `npx skills add`:** el CLI crea `.agents/` + un symlink de ruta absoluta (se rompe al clonar). **Aplanar** la skill a carpeta real en `.claude/skills/` y borrar `.agents/` + `skills-lock.json` (ya gitignored).

## Cómo responder
- Directo y conciso, en español.
- Fix + diagnóstico juntos: di qué pasaba y qué hiciste.
- Recomienda una solución, no un menú. Si hay trade-off real, dilo en una línea.
>>>FIN

**Commit:** `docs: CLAUDE.md v2 (arquitectura de bloques + regla 200 lineas)`

---

## FASE 2 — Estructura de bloques

Crea `docs/bloques/` con las 7 carpetas y archivos siguientes.

<<<ARCHIVO: docs/bloques/1-captacion/BLOQUE.md
# Bloque 1 — Captación/Seguimiento

**Estado:** pendiente (co-prioritario con el bloque 3; NO se deja para el final).
**Rol en el tejido:** Creación (leads y outreach) — asistente; **los socios cierran la venta**.

## Qué hace
Rastrea negocios (Google Places API cuando se active; manual/semi al principio), cualifica y puntúa leads, genera la auditoría como gancho (usa el bloque 2), redacta contacto personalizado, secuencia seguimientos y genera contenido.

## Qué NO hace
- No convierte desconocidos en clientes que pagan (eso es confianza humana).
- No hace contacto en frío masivo. Límites legales UE: RGPD + ePrivacy + LSSI.

## Contrato (borrador, se cierra en su brainstorming)
- **Entrada:** zona geográfica + nicho (reformas Móstoles/Madrid) | lead manual.
- **Salida:** lead cualificado con puntuación + borrador de contacto + secuencia → tablas Supabase + registro en `agent_runs`.

## Skills/herramientas que usará
Google Places API · Resend · bloque 2 (auditoría-gancho) · Supabase · skill `copywriting`.
Detalle completo: `referencias/captacion-agente-accesos.md` (esta carpeta).

## Próximo hito
Brainstorming → spec propia (tras el writing-plans del Auditor o en paralelo si hay capacidad).
>>>FIN

<<<ARCHIVO: docs/bloques/1-captacion/CHANGELOG.md
# CHANGELOG — Bloque 1 (Captación/Seguimiento)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El cualificador puntuaba alto negocios que YA tenían web propia (el filtro no detectaba webs en subdominios) → añadida comprobación de subdominios al filtro de cualificación → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/1-captacion/referencias/captacion-agente-accesos.md
# Accesos — Bloque 1 (Captación/Seguimiento)

Ficha técnica de accesos del agente Captación. Borrador informado: el contrato definitivo
se cierra en su brainstorming → spec. Co-prioritario con el bloque 3 (decisión cerrada).

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Cualifica y puntúa leads; redacta borradores de contacto y secuencias | Producción | Secreto de Edge Function; NUNCA en cliente |
| Supabase Postgres | Lee/escribe `clients` (status=prospect, source) + futuras tablas de leads/secuencias; registra en `agent_runs` | Producción | Service role + RLS |
| Edge Function `generate-audit` (bloque 2) | La invoca para producir la auditoría-gancho de cada lead cualificado | Producción | Llamada interna entre funciones |
| Resend | SOLO genera borradores de email en v1; **un socio revisa y envía**. Envío automático = fase posterior, con baja/opt-out implementado | Producción (asistido) | API key server-side |
| Google Places API | Rastreo de negocios por zona/nicho | ❌ Diferido (v1 = manual/semi). Activar implica coste por petición | Pendiente de spec |
| Skill `copywriting` (coreyhaines31/marketingskills) | Referencia para redactar outreach y secuencias que no suenen a spam | Desarrollo | `.claude/skills/` (nueva, aprobada en planificación 2026-06-10) |

## Límites legales (no negociables, UE)
RGPD + ePrivacy + LSSI: nada de contacto en frío masivo automatizado. El agente investiga,
cualifica y redacta; **los socios envían y cierran**. Interés legítimo documentado para B2B,
identificación clara del remitente y mecanismo de baja desde el primer email.

## Qué NO hace
- No envía emails sin revisión humana (v1).
- No cierra ventas (confianza humana).
- No usa datos de particulares: solo negocios (B2B).

## Aprendizaje y realimentación
- `agent_runs`: cada cualificación/borrador con coste y resultado.
- Señal clave: tasa de respuesta por plantilla/secuencia → qué outreach funciona.
- Borrador del agente vs email final enviado por el socio = señal de mejora (mismo patrón `llm_draft` del Auditor).
- Correcciones → `CHANGELOG.md` de este bloque, aprobadas por un socio.

## Conexión con el resto de agentes
```
1-CAPTACIÓN ──invoca──> 2-Auditor (gancho) ──si convierte──> 3-Generador
     │                                                            │
     └────────── agent_runs ──> 7-Mejora (futuro) <───────────────┘
```

## Decisiones
- [x] Skill `copywriting` aprobada e instalada (2026-06-10).
- [ ] En su spec (cuando toque): criterios de puntuación de leads y estructura de tablas.
>>>FIN

<<<ARCHIVO: docs/bloques/2-auditor/BLOQUE.md
# Bloque 2 — Auditor

**Estado:** ACTIVO (F1). Spec aprobada; siguiente paso: `writing-plans`.
**Rol en el tejido:** Creación (audita la presencia digital de un negocio).

## Qué hace
Dado un negocio sin web (o con web floja), produce una auditoría profesional de presencia digital. Doble función: **gancho de venta + brief** para el bloque 3 (Generador).

## Contrato (de la spec aprobada)
- **Entrada:** datos del negocio (manuales en v1).
- **Salida:** auditoría (motor híbrido: reglas deterministas + Claude para juicio/redacción) + informe web + registro completo en `agent_runs` (inputs, tokens, coste, duración, estado, flags de supervisión).
- **Supervisión:** pase de revisión (reglas + check Claude) antes del humano.

## Documentos
- Spec: `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`
- Estado del flujo: `ESTADO.md` (esta carpeta)
- Mapa de accesos (skills, APIs, MCPs): `referencias/auditor-agente-accesos.md` (esta carpeta)

## Skills/herramientas que usa
Supabase (Edge Functions, RLS multi-tenant) · skills `supabase` + `supabase-postgres-best-practices` · API Claude server-side · dashboard Next.
>>>FIN

<<<ARCHIVO: docs/bloques/2-auditor/ESTADO.md
# ESTADO — Bloque 2 (Auditor) · flujo superpowers

Fase global: **F1 — Agente Auditor + backbone Supabase**. Diseño cerrado (spec escrita y aprobada). **Siguiente: `writing-plans`.**

## Checklist de brainstorming — Auditor v1
| # | Paso | Estado |
|---|------|--------|
| 1 | Explorar contexto | Hecho |
| 2 | Companion visual | N/A (preguntas conceptuales) |
| 3 | Preguntas de aclaración | Hecho |
| 4 | Proponer enfoques | Hecho |
| 5 | Presentar diseño y aprobar | Hecho |
| 6 | Escribir spec | Hecho (`docs/superpowers/specs/2026-06-08-auditor-v1-design.md`) |
| 7 | Auto-revisión de la spec | Hecho |
| 8 | Revisión del usuario | Hecho (aprobada) |
| 9 | Pasar a writing-plans | **Siguiente** |

## Dónde retomar
Invocar `writing-plans` sobre la spec del Auditor v1. Orden sugerido del plan: backbone Supabase (tablas + RLS) → rúbrica de scoring (TDD) → Edge Function `generate-audit` → supervisión → dashboard Next → informe público.

En paralelo (validación sin promo): piloto `mudanzasroy.es` + auditorías manuales de reformas.
>>>FIN

<<<ARCHIVO: docs/bloques/2-auditor/CHANGELOG.md
# CHANGELOG — Bloque 2 (Auditor)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El scoring daba 0 a negocios con ficha de Google Maps válida (falso negativo en el motor de reglas) → añadida regla "ficha de Maps verificada ⇒ score base ≥ 20" a la rúbrica de scoring → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/2-auditor/referencias/auditor-agente-accesos.md
# Accesos — Bloque 2 (Auditor)

Ficha técnica de accesos del agente Auditor v1. Complementa la spec aprobada
(`docs/superpowers/specs/2026-06-08-auditor-v1-design.md`); no la sustituye ni la reabre.
Insumo directo para el `writing-plans` del bloque.

## Los dos Claudes (no confundir)
| Claude | Quién paga | Para qué |
|--------|-----------|----------|
| **Claude Code** (Pro, ~20 €/mes) | Suscripción de los socios | CONSTRUIR el agente: escribir tablas, Edge Function, dashboard |
| **API de Anthropic** (por tokens) | Coste de producto (~céntimos/auditoría) | SER el cerebro del agente en producción: narrativa + supervisión |

El agente en producción solo necesita 2 accesos: la base de datos y la API de Claude.
Todo lo demás de la tabla siguiente es herramienta de construcción.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Genera narrativa/recomendaciones (paso 3) y check de supervisión (paso 4) | Producción | Secreto de la Edge Function (`ANTHROPIC_API_KEY`); NUNCA en el cliente |
| Supabase Postgres | Lee `clients`; escribe `audits` + `agent_runs` | Producción | Service role en la Edge Function; RLS estricta |
| Supabase Storage | Logos/imágenes del informe público | Producción | Mismo proyecto (`kdernwxajzzrriolnnmq`) |
| MCP `supabase` | Crear tablas, políticas RLS, desplegar funciones | Solo desarrollo | `.mcp.json` del repo (ya conectado) |
| Skills `supabase` + `supabase-postgres-best-practices` | Buenas prácticas al escribir RLS/funciones | Solo desarrollo | `.claude/skills/` |
| Skills de diseño (`ui-ux-pro-max` + taste + `web-design-guidelines`) | Construir la plantilla del informe `/r/{slug}` (una vez) | Solo desarrollo | `.claude/skills/` |
| Skill `seo-audit` (coreyhaines31/marketingskills) | Referencia de rúbrica para la dimensión SEO local y para auditorías de upsell | Desarrollo | **PENDIENTE de aprobar por los 2 socios** (ver abajo) |

## Accesos que NO tiene (v1, YAGNI)
- Google Places API — datos a mano en v1; la entrada automática llegará por el bloque 1.
- Resend, Stripe — pertenecen a los bloques 1 y 5.
- `playwright-cli` — pertenece a los bloques 3 y 4.

## Flujo de ejecución (5 pasos por run)
1. **Carga**: la Edge Function `generate-audit` recibe `client_id` y lee `presence_data`.
2. **Scoring determinista**: código puro calcula 7 subscores + global. Cero LLM en los números.
3. **Claude redacta**: datos + subscores + rúbrica → JSON (resumen, hallazgos, recomendaciones). Explica los números, no los inventa.
4. **Supervisión**: reglas + check breve de Claude → `supervisor_flags`.
5. **Registro**: `audit` en borrador + fila en `agent_runs` (tokens, coste, duración, error).

## Aprendizaje y realimentación (v1 = captura de señales)
- **`llm_draft` vs `result`**: lo que Claude escribió vs lo que el humano dejó tras editar. La diferencia ES la señal.
- **`supervisor_flags`**: qué fallos marca la supervisión con más frecuencia.
- **`agent_runs`**: coste, errores y duración por ejecución.
- Cierre del bucle (manual): fallo → cambio en rúbrica/prompt → entrada en `CHANGELOG.md` de este bloque con el run que lo evidencia → aprueba un socio. El bloque 7 (Mejora) automatizará el minado en el futuro.

## Conexión con el resto de agentes
```
1-Captación ──invoca la misma Edge Function──> 2-AUDITOR ──`result` = brief──> 3-Generador
                                                   │
                                                   └── agent_runs ──> 7-Mejora (futuro)
```
- El bloque 1 reutiliza `generate-audit` como gancho de venta (por eso la función no está acoplada al dashboard).
- El `result` (JSON de hallazgos) es la entrada del Generador: la auditoría se convierte en brief.
- El 4-Revisor comparte el patrón de supervisión (rúbrica en `../3-generador/rubrica.md`).

## Decisiones
- [x] Skill `seo-audit` aprobada e instalada (2026-06-10). Auditorías de seguridad: Trust Hub ✅ · Socket ✅ · Snyk en "Warn" (solo markdown, riesgo bajo).
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/BLOQUE.md
# Bloque 3 — Generador web

**Estado:** pendiente (F2). Co-prioritario con el bloque 1.
**Rol en el tejido:** Creación. Fórmula: **fabricar → evaluar → entregar**.

## Qué hace
De la auditoría (bloque 2) + datos del cliente → web funcional con marca, rápida y que no parezca plantilla. Vía volumen/cuota, no arte a medida.

## Rúbrica (resumen; detalle en `rubrica.md`)
Responsive móvil · Lighthouse/velocidad · contraste/accesibilidad · coherencia de marca · enlaces que funcionan · formulario que envía · cero textos de relleno. **Lo medible lo comprueba script (`playwright-cli`); el gusto y la coherencia los juzga el modelo.**

## Índice de skills de diseño (qué se usa en cada paso)
| Paso | Skill |
|------|-------|
| Motor de diseño | `ui-ux-pro-max` |
| Gusto/estilo | `taste-skill` / `soft-skill` / `minimalist-skill` *(pendiente consolidar en una — ver Pendientes)* |
| Identidad de marca | `brandkit` |
| Rediseños (upsell, piloto mudanzasroy.es) | `redesign-skill` |
| De referencia visual a código | `image-to-code-skill` + `imagegen-frontend-web` |
| Macro-motion (scroll, GSAP) | `gpt-tasteskill` |
| Micro-interacciones | `ui-animation` |
| Salida/entrega | `output-skill` |
| Evaluar (script) | `playwright-cli` + `web-design-guidelines` + `verification-before-completion` |

Detalle de accesos y skills por paso: `referencias/generador-agente-accesos.md` (esta carpeta).

## Pendientes del bloque
- [ ] Brainstorming → spec propia (tras Auditor v1).
- [x] Grupo taste archivado → sustituido por `frontend-design` (aprobado por los socios 2026-06-10).
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/referencias/generador-agente-accesos.md
# Accesos — Bloque 3 (Generador web)

Ficha técnica de accesos del agente Generador. Borrador informado (evaluación 2026-06-10):
el contrato definitivo se cierra en su brainstorming → spec, tras el Auditor v1.
Fórmula cerrada: **fabricar → evaluar → entregar**.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Genera la web (estructura, código, textos) y juzga la parte subjetiva de la rúbrica | Producción | Secreto server-side |
| Supabase Postgres | Lee `audits.result` (el brief) + datos del cliente; escribe `agent_runs` | Producción | Service role + RLS |
| Supabase Storage | Fotos/logo/brandkit del cliente | Producción | Mismo proyecto |
| Cloudflare Pages | Despliegue de la web del cliente (coste 0, derechos comerciales) | Producción | API token de despliegue |
| Resend | Endpoint del formulario de contacto de cada web generada | Producción | API key server-side |
| `playwright-cli` | Paso "evaluar": render móvil/escritorio, enlaces, formulario, capturas | QA (script) | `.claude/skills/playwright-cli/` |

## Skills de diseño (paso "fabricar")

| Paso | Skill | Estado |
|------|-------|--------|
| Motor de diseño | `ui-ux-pro-max` | Instalada |
| Gusto/estilo anti-plantilla | `frontend-design` (anthropics, **oficial**) | Nueva — sustituye al grupo taste (ver inventario) |
| Identidad de marca | `brandkit` | Instalada |
| Framework correcto (stack Next) | `next-best-practices` (vercel-labs) | Nueva |
| Rediseños/upsell | `redesign-skill` + `extract-design-system` | Instalada + nueva |
| Referencia visual → código | `image-to-code-skill` + `imagegen-frontend-web` | Instaladas |
| Textos orientados a captar clientes | `copywriting` | Nueva (compartida con bloque 1) |
| Macro-motion (scroll, GSAP) | `gpt-tasteskill` | Instalada |
| Micro-interacciones | `ui-animation` | Instalada |
| Salida completa sin truncar | `output-skill` | Instalada |
| QA de diseño (paso "evaluar") | `web-design-guidelines` + `verification-before-completion` + `playwright-cli` | Instaladas |

## Claude Design (herramienta de los socios, NO del agente)
Producto beta de Anthropic (claude.ai/design, incluido en Pro, cupos semanales, **sin API**).
No puede ser el Generador: no es invocable por el pipeline, no registra en `agent_runs`, no pasa la rúbrica automáticamente.
**Uso aprobado:** fase de validación manual (primeros clientes a mano), maqueta del piloto
mudanzasroy.es, y exploración visual antes de fijar brandkits. Su exportación entrega un
paquete a Claude Code, compatible con nuestro flujo. Tabla comparativa completa: sesión de planificación 2026-06-10.

## Rúbrica
Detalle en `../rubrica.md` (única, compartida con el bloque 4): lo medible lo comprueba
script (`playwright-cli` + Lighthouse); el gusto y la coherencia los juzga el modelo.

## Aprendizaje y realimentación
- `agent_runs`: tokens/coste por web generada (~1-5 € objetivo), veredictos de la rúbrica.
- Web generada vs web tras pulido humano = señal de mejora.
- Las webs hechas a mano en validación (con Claude Design) sirven de ejemplos de referencia para afinar rúbrica y prompts ANTES de escribir la spec.
- Correcciones → `CHANGELOG.md` de este bloque.

## Conexión con el resto de agentes
```
2-Auditor ──`result` = brief──> 3-GENERADOR ──web desplegada──> 4-Revisor (QA continuo)
                                     │
                                     └── agent_runs ──> 7-Mejora (futuro)
```

## Decisiones de skills (cerradas 2026-06-10 por ambos socios)
- [x] Instaladas `frontend-design`, `next-best-practices`, `extract-design-system`.
- [x] Grupo taste archivado en `docs/archivo-skills/`.
- [ ] ÚNICO punto abierto: `shadcn` (componentes accesibles) — se decide en la spec de este bloque (riesgo: "look plantilla").
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/rubrica.md
# Rúbrica — Generador web (borrador, se cierra en su spec)

## Comprueba SCRIPT (playwright-cli + Lighthouse)
- [ ] Render correcto en móvil (375px) y escritorio.
- [ ] Lighthouse performance ≥ 90 (móvil).
- [ ] Cero enlaces rotos internos/externos; cero mezcla de dominios.
- [ ] Formulario de contacto envía y confirma (Resend).
- [ ] Contraste AA en textos principales.
- [ ] Cero "lorem ipsum" / placeholders.

## Juzga MODELO
- Coherencia de marca (colores, tono, tipografía vs brandkit).
- Jerarquía visual y legibilidad.
- Que no "parezca plantilla": variedad de maquetación, detalles propios del negocio.
- Textos: naturales, orientados a captar clientes del nicho.
>>>FIN

<<<ARCHIVO: docs/bloques/3-generador/CHANGELOG.md
# CHANGELOG — Bloque 3 (Generador web)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** Los formularios generados enviaban sin validar el email (el paso "evaluar" no lo cubría) → añadido check de validación de formulario a `rubrica.md` y al script de playwright-cli → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/4-revisor/BLOQUE.md
# Bloque 4 — Revisor/QA de webs

**Estado:** futuro. **Depende del bloque 3** (no se revisa antes de generar).
**Rol en el tejido:** Supervisión.

## Qué hace
Busca fallos en webs generadas y en webs de clientes potenciales de upsell (vía rediseño): enlaces rotos, formularios muertos, velocidad, render móvil. Aquí encaja el mantenimiento preventivo y el gancho de upsell ("tu web tiene N fallos").

## Herramienta principal
`playwright-cli` (skill aplanada en `.claude/skills/playwright-cli/`): navegación, clic, formularios, capturas, inspección de red, sesiones con nombre. Comparte rúbrica con el bloque 3 (`../3-generador/rubrica.md`) — una sola rúbrica, dos consumidores.

## Caso de prueba identificado
`mudanzasroy.es`: enlaces internos rotos mezclando .com/.es, URL malformada, diseño anticuado — detectable con un pase de comprobación de enlaces.

Detalle completo: `referencias/revisor-agente-accesos.md` (esta carpeta).
>>>FIN

<<<ARCHIVO: docs/bloques/4-revisor/referencias/revisor-agente-accesos.md
# Accesos — Bloque 4 (Revisor/QA)

Ficha técnica de accesos del agente Revisor. Bloque futuro: **depende del bloque 3**
(no se revisa antes de generar). Borrador informado; spec propia cuando le toque.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| `playwright-cli` | Herramienta principal: navegación real, clic en enlaces, envío de formularios, capturas, inspección de red | QA (script) | `.claude/skills/playwright-cli/` |
| Lighthouse | Velocidad/performance móvil (umbral de la rúbrica: ≥ 90) | QA (script) | Vía playwright/CLI |
| API de Anthropic | Juicio subjetivo sobre los hallazgos del script (¿es grave? ¿cómo comunicarlo al cliente?) | Producción | Secreto server-side |
| Supabase Postgres | Escribe resultados de revisión + `agent_runs`; lee inventario de webs vivas | Producción | Service role + RLS |
| Skill `seo-audit` (coreyhaines31) | Checklist de auditoría técnica/SEO para webs EXISTENTES de upsell | Desarrollo | `.claude/skills/` (compartida con bloque 2) |
| Rúbrica compartida | `../3-generador/rubrica.md` — una sola rúbrica, dos consumidores (3 evalúa lo que fabrica; 4 vigila lo que vive) | Ambas | docs/bloques/3-generador/ |

## Doble función
1. **QA continuo** de webs generadas y en producción (parte del valor de la cuota mensual; conecta con el bloque 6-mantenimiento).
2. **Gancho de upsell**: auditar webs flojas existentes ("tu web tiene N fallos") → alimenta al bloque 1.

## Caso de prueba identificado
`mudanzasroy.es`: enlaces internos rotos mezclando .com/.es, URL malformada, diseño
anticuado. Detectable con un pase de comprobación de enlaces + dominio canónico.

## Aprendizaje y realimentación
- `agent_runs`: cada pase de revisión con hallazgos y coste.
- Falsos positivos/negativos del script → ajuste de la rúbrica → `CHANGELOG.md` (suyo o del bloque 3, según dónde viva el check).
- Sus hallazgos sobre webs generadas son la señal de mejora más directa para el bloque 3.

## Conexión con el resto de agentes
```
3-Generador ──web──> 4-REVISOR ──hallazgos──> 3 (corrige) · 1 (upsell) · 6 (mantenimiento)
                          │
                          └── agent_runs ──> 7-Mejora (futuro)
```

## Pendiente de decisión (socios)
- [ ] Nada propio: sus dos skills (`playwright-cli`, `seo-audit`) ya están decididas en los bloques 2 y 3. Spec propia cuando el Generador exista.
>>>FIN

<<<ARCHIVO: docs/bloques/4-revisor/CHANGELOG.md
# CHANGELOG — Bloque 4 (Revisor/QA)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El pase de enlaces solo detectaba 404 y no la mezcla de dominios .com/.es (caso mudanzasroy.es) → añadida comprobación de dominio canónico al pase de enlaces → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/5-pagos/BLOQUE.md
# Bloque 5 — Pagos y facturación

**Estado:** pendiente de spec. **Debe tener spec aprobada ANTES del primer cliente de pago.**
**Rol en el tejido:** Ops.

## Qué cubre
- Alta de cliente: cobro de setup (250-300 € fundadores) + suscripción 30 €/mes (Stripe Checkout/Billing).
- **Factura española obligatoria** por cada cobro (datos fiscales, IVA, numeración correlativa). Decidir en la spec: Stripe Invoicing vs herramienta de facturación ES.
- Impagos: recordatorio automático (Resend) → reintento → corte de servicio (pausar web en Cloudflare Pages) → reactivación.
- Registro en Supabase (tabla de suscripciones por `client_id`) + webhooks de Stripe vía Edge Function.

## Por qué es un bloque y no "un detalle del final"
El MRR es el activo del negocio (decisión cerrada). El flujo cobro→factura→impago→corte es tan core como generar la web.

## Próximo hito
Brainstorming → spec cuando el primer cliente esté cerca (no antes: YAGNI).
>>>FIN

<<<ARCHIVO: docs/bloques/5-pagos/CHANGELOG.md
# CHANGELOG — Bloque 5 (Pagos)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El webhook de impago no pausaba la web del cliente (evento de Stripe mal mapeado en la Edge Function) → corregido el mapeo de `invoice.payment_failed` → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/6-mantenimiento/BLOQUE.md
# Bloque 6 — Mantenimiento

**Estado:** futuro (espera a tener webs en producción). Casillero reservado.
**Rol en el tejido:** Ops.

## Qué cubrirá
- Uptime y monitorización de las webs de cliente (Cloudflare Pages).
- Renovación de dominios (~10 €/año, repercutido al cliente).
- Peticiones de cambio del cliente (flujo de tickets ligero, sin herramientas nuevas: email + Supabase).
- Backups de contenido y configuración.
- Es parte del valor de la cuota mensual: lo que justifica los 30 €/mes frente a "una web y adiós".
>>>FIN

<<<ARCHIVO: docs/bloques/6-mantenimiento/CHANGELOG.md
# CHANGELOG — Bloque 6 (Mantenimiento)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El monitor marcaba caída con timeouts de 2 s (umbral demasiado agresivo, falsas alertas) → umbral subido a 10 s con 2 reintentos → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

<<<ARCHIVO: docs/bloques/7-mejora/BLOQUE.md
# Bloque 7 — Mejora continua

**Estado:** futuro (diferido por decisión de la spec del Auditor: en v1 solo se capturan señales).
**Rol en el tejido:** Mejora.

## Qué hará
Mina la tabla `agent_runs` (inputs, salidas, coste en tokens, veredictos de QA, correcciones humanas, flags) para detectar patrones de fallo y **proponer diffs** a las skills/rúbricas afectadas. **Un humano aprueba cada cambio** — nunca auto-modificación.

## Principios (adoptados de la evaluación de skills externas, 2026-06-10)
- **Marcadores de evolución:** todo cambio aprobado se anota en el CHANGELOG.md del bloque afectado con el error/run que lo motivó. *(Ya en vigor para todos los bloques, sin esperar a este.)*
- **Validación periódica:** cada N runs, revisar que las correcciones pasadas siguen siendo válidas — evita sobre-generalizar de un caso aislado.
- Se descartó importar `charon-fan/self-improving-agent` (auditorías de seguridad en "Warn", memoria en markdown auto-reescrito). Nuestra versión usa datos estructurados en Supabase + aprobación humana.

## Dependencias
Requiere que los bloques 2-4 estén instrumentados con `agent_runs` (lo están por contrato desde la spec del Auditor).
>>>FIN

<<<ARCHIVO: docs/bloques/7-mejora/CHANGELOG.md
# CHANGELOG — Bloque 7 (Mejora)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** Una corrección propuesta generalizaba a partir de 1 solo run (sobre-generalización) → añadido umbral mínimo de 3 runs coincidentes antes de proponer un diff → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
>>>FIN

Después:
1. **Borra** `docs/superpowers/ESTADO-FLUJO.md` (su contenido vive ahora en `docs/bloques/2-auditor/ESTADO.md`; la "regla de continuidad" está en CLAUDE.md). La carpeta `docs/superpowers/specs/` NO se toca.
2. **Commit:** `feat: estructura docs/bloques (7 bloques, ESTADO por bloque activo)`

---

## FASE 3 — Comandos /inicio y /cierre v2

<<<ARCHIVO: .claude/commands/inicio.md
---
description: Arranca la sesión. Lee el contexto mínimo y reporta dónde estamos.
allowed-tools: Read, Bash(git status*), Bash(git log*), Bash(git branch*)
---

# /inicio — Arranque de sesión (EVOLink)

Ejecuta SIN pedir confirmación entre pasos. Máximo 5 tool calls.

1. Lee `HANDOVER.md` (raíz). Fuente principal del estado actual.
2. Lee `CLAUDE.md` (raíz). Reglas operativas permanentes.
3. Una sola llamada Bash: `git status --short && echo --- && git log --oneline -5 && echo --- && git branch --show-current`
4. Si el HANDOVER indica un **bloque activo**, lee `docs/bloques/<bloque>/ESTADO.md`.
5. (Opcional, solo si el HANDOVER apunta a un archivo concreto del próximo paso) léelo.

Reporta en este formato exacto:

```
Contexto cargado — EVOLink

Última sesión: [fecha del HANDOVER]
Branch: [actual]
Último commit: [hash + mensaje corto]
Cambios sin commit: [conteo + 1 línea, o "ninguno"]

Fase actual: [del HANDOVER]
Bloque activo: [del HANDOVER, o "ninguno"]
Próximo paso: [del HANDOVER, una frase]

Decisiones cerradas: ver docs/BUSINESS.md §Decisiones ([N] activas)
Bloqueos: [del HANDOVER, o "ninguno"]

¿Procedo con el próximo paso o tienes otra prioridad?
```

Reglas:
- NO leas `docs/` enteros. Solo HANDOVER + CLAUDE + git + ESTADO.md del bloque activo.
- NO ejecutes el próximo paso todavía: espera confirmación.
- Si no existe `HANDOVER.md`, dilo y pide usar `/cierre` al terminar.
- Responde en español, conciso.
>>>FIN

<<<ARCHIVO: .claude/commands/cierre.md
---
description: Cierra la sesión. Reescribe HANDOVER.md (y el ESTADO.md del bloque activo) y propone commit.
allowed-tools: Read, Write, Bash(git status*), Bash(git log*), Bash(git diff*), Bash(git add *), Bash(git commit -m *)
---

# /cierre — Cierre de sesión (EVOLink)

Ejecuta en orden SIN pedir confirmación entre pasos. Máximo 7 tool calls.

1. Una sola llamada Bash: `git status --short && echo --- && git log --oneline -5`
2. Si en la sesión se avanzó un bloque, actualiza `docs/bloques/<bloque>/ESTADO.md` (checklist + "dónde retomar"). Si un cambio fue una corrección motivada por un fallo, añade una línea a su `CHANGELOG.md`.
3. Sobrescribe `HANDOVER.md` (raíz) con este formato EXACTO (límite duro: 200 líneas; objetivo: <80):

```
# HANDOVER — EVOLink

**Última sesión:** [YYYY-MM-DD]
**Branch:** [git branch --show-current]
**Último commit:** `[hash corto] [mensaje]`

---

## Estado del proyecto
[2-3 frases sobre la fase actual y qué funciona]

## Bloque activo
[N-nombre, o "ninguno"] — detalle en docs/bloques/<bloque>/ESTADO.md

## Hecho en la sesión actual ([fecha])
- [bullet por cada cambio significativo]

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones ([N] activas). [Solo si hubo NUEVAS en esta sesión: listarlas aquí y AVISAR de añadirlas a BUSINESS.md.]

## Riesgos y avisos vivos
- [copiar del anterior + añadir nuevos; NUNCA vaciar]

## Próximo paso concreto
**[Una frase con archivo y acción]**
1. [Sub-paso 1]
2. [Sub-paso 2]

## Pendientes
- [ ] [tareas]

## Comando para reanudar
/inicio
```

4. Muestra `git diff HANDOVER.md` (primeras 40 líneas).
5. Pregunta: "¿Hago commit de esta sesión? Dime el tipo (feat/fix/docs/chore)."
6. Si confirma: propón mensaje convencional y `git add -A && git commit -m "..."`. Recuerda hacer `git push`.
7. Termina con: "Sesión cerrada. Próxima vez: /inicio".

Reglas:
- Las decisiones cerradas viven SOLO en `docs/BUSINESS.md`: el HANDOVER las referencia, NUNCA las copia.
- "Riesgos vivos" siempre se copia del anterior y se añade lo nuevo; nunca se vacía.
- NO leas `docs/` enteros: infiere de la sesión y del HANDOVER anterior.
- Responde en español, conciso.
>>>FIN

**Commit:** `chore: /inicio y /cierre v2 (bloque activo, decisiones por referencia)`

---

## FASE 4 — Instalar skill playwright-cli + verificación completa

### 4.1 Instalación
1. Ejecuta: `npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli`
2. Aplica la regla del repo: **aplanar** la skill a carpeta real `.claude/skills/playwright-cli/` (copiar contenido real, eliminar symlink) y borrar `.agents/` + `skills-lock.json` si aparecen.
3. Plan B: si `npx skills` falla por red/entorno, clona `https://github.com/microsoft/playwright-cli` en /tmp y copia a mano la carpeta de la skill. Si tampoco es posible, deja constancia en el HANDOVER como pendiente y continúa con la Fase 5.

### 4.2 Verificación de instalación (estructura) — ejecutar y mostrar salida
```bash
# a) Carpeta real con SKILL.md dentro
ls -la .claude/skills/playwright-cli/
test -f .claude/skills/playwright-cli/SKILL.md && echo "OK: SKILL.md existe" || echo "ERROR: falta SKILL.md"

# b) CERO symlinks dentro de la skill (regla de aplanado)
find .claude/skills/playwright-cli -type l | wc -l   # debe imprimir 0

# c) Restos del CLI de skills eliminados
test -d .agents && echo "ERROR: .agents sigue existiendo" || echo "OK: sin .agents"
test -f skills-lock.json && echo "ERROR: skills-lock.json existe" || echo "OK: sin skills-lock"

# d) La skill quedará versionada (no ignorada por git)
git check-ignore .claude/skills/playwright-cli/SKILL.md && echo "ERROR: gitignored" || echo "OK: se versiona"
```

### 4.3 Verificación funcional (la herramienta arranca de verdad)
1. Lee `.claude/skills/playwright-cli/SKILL.md` y localiza el comando de instalación/uso oficial del CLI que indique (la skill documenta el binario `playwright-cli`).
2. Prueba mínima de humo, sin escribir nada en el repo:
```bash
npx playwright-cli --version || npx playwright-cli --help | head -5
```
   - Si el nombre del paquete npm difiere, usa EXACTAMENTE el que indique el SKILL.md instalado (es la fuente de verdad, no esta orden).
   - Si descarga navegadores o pide instalación adicional, NO la hagas ahora: basta con que el CLI responda a `--version`/`--help`. La instalación de navegadores se hará en el writing-plans del bloque que la use.
3. Resultado esperado: el comando responde con versión o ayuda → anota "playwright-cli: CLI verificado ✅". Si no responde, anota "instalada la skill; CLI pendiente de verificar" en el HANDOVER (Pendientes) y continúa.

### 4.4 Verificación de colocación en sus bloques (referencias cruzadas)
La skill pertenece a los bloques **3-generador** (paso "evaluar") y **4-revisor** (herramienta principal), y debe constar en CLAUDE.md (QA de diseño). Comprueba las tres referencias:
```bash
grep -c "playwright-cli" docs/bloques/3-generador/BLOQUE.md   # debe ser >= 1
grep -c "playwright-cli" docs/bloques/4-revisor/BLOQUE.md     # debe ser >= 1
grep -c "playwright-cli" CLAUDE.md                              # debe ser >= 1
```
Si alguna referencia falta (las Fases 1-2 ya las incluyen; esto es red de seguridad), añádela en la tabla/sección correspondiente del archivo afectado antes del commit.

### 4.5 Cierre de instalación playwright-cli
Solo si 4.2 y 4.4 están en verde (4.3 puede quedar como pendiente documentado):
**Commit:** `feat: add playwright-cli skill (flattened, verified)`

### 4.6 Skills adicionales (aprobadas en planificación 2026-06-10)
Instala estas 5 skills, UNA POR UNA, aplicando tras cada una la misma regla de aplanado (carpeta real en `.claude/skills/`, 0 symlinks, borrar `.agents/` + `skills-lock.json`):

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/next-skills --skill next-best-practices
npx skills add https://github.com/arvindrk/extract-design-system --skill extract-design-system
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting
```

Verificación (tras las 5):
```bash
for s in frontend-design next-best-practices extract-design-system seo-audit copywriting; do
  test -f .claude/skills/$s/SKILL.md && echo "OK: $s" || echo "ERROR: falta $s"
done
find .claude/skills -type l | wc -l   # debe imprimir 0
```
Si alguna falla por red, anótala como pendiente en el HANDOVER y continúa (no bloquea).

**Commit:** `feat: add 5 skills aprobadas (frontend-design, next, extract-design-system, seo-audit, copywriting)`

### 4.7 Archivar el grupo taste (APROBADO por ambos socios 2026-06-10)
Mueve las 3 skills fuera de `.claude/skills/` (dejan de cargar tokens; recuperables desde git):
```bash
mkdir -p docs/archivo-skills
git mv .claude/skills/taste-skill docs/archivo-skills/taste-skill
git mv .claude/skills/soft-skill docs/archivo-skills/soft-skill
git mv .claude/skills/minimalist-skill docs/archivo-skills/minimalist-skill
```
Verificación:
```bash
for s in taste-skill soft-skill minimalist-skill; do
  test -d .claude/skills/$s && echo "ERROR: $s sigue activa" || echo "OK: $s archivada"
  test -d docs/archivo-skills/$s && echo "OK: $s recuperable" || echo "ERROR: $s perdida"
done
```
IMPORTANTE: si `frontend-design` NO se instaló en 4.6 (fallo de red), NO archives el grupo taste todavía (el bloque 3 se quedaría sin skill de gusto): anótalo en el HANDOVER y continúa.

**Commit:** `chore: archivar grupo taste (sustituido por frontend-design, aprobado socios)`

---

## FASE 5 — Inventario de skills (criba completa, sin borrar nada)

La criba ya está hecha en planificación (informada por las fichas de accesos de los 4 agentes). Crea el archivo con este contenido LITERAL:

<<<ARCHIVO: docs/contexto/inventario-skills.md
# Inventario de skills — mapa por bloque y criba (aprobada 2026-06-10)

**Fecha:** 2026-06-10 · **Base:** 28 skills instaladas (~8.700 líneas) + 6 nuevas evaluadas.
Criba informada por las fichas de accesos de los 4 agentes (`docs/bloques/*/referencias/`).
**Criba APROBADA por ambos socios el 2026-06-10.**
"Archivar" = mover a `docs/archivo-skills/` (fuera de `.claude/skills/`, deja de cargar tokens; recuperable desde git en cualquier momento).

## Metodología (transversales — se quedan todas)
| Skill | Veredicto |
|-------|-----------|
| brainstorming · writing-plans · executing-plans · test-driven-development · systematic-debugging · verification-before-completion · using-superpowers · requesting-code-review · receiving-code-review · finishing-a-development-branch · writing-skills | Mantener |
| dispatching-parallel-agents · subagent-driven-development · using-git-worktrees | Mantener (uso bajo con 2 socios secuenciales; revisar en 3 meses) |

## Backend (bloques 1, 2, 3, 5)
| Skill | Bloques | Veredicto |
|-------|---------|-----------|
| supabase | 1-2-3-5 | Mantener |
| supabase-postgres-best-practices | 1-2-3-5 | Mantener |

## Diseño (bloque 3, comparte con 2 y 4)
| Skill | Bloques | Veredicto |
|-------|---------|-----------|
| ui-ux-pro-max | 3 (motor) · 2 (informe) | Mantener |
| brandkit | 3 | Mantener |
| redesign-skill | 3-4 (upsell) | Mantener |
| image-to-code-skill | 3 | Mantener |
| imagegen-frontend-web | 3 | Mantener |
| gpt-tasteskill | 3 (macro-motion GSAP) | Mantener |
| ui-animation | 3 (micro-interacciones) | Mantener |
| output-skill | 3 (salida completa) | Mantener |
| web-design-guidelines | 3-4 (QA) · 2 | Mantener |
| **taste-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — sustituida por `frontend-design` oficial |
| **soft-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — solapaba con frontend-design |
| **minimalist-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — solapaba con frontend-design |

## Nuevas (instaladas por la orden de setup; aprobadas en planificación 2026-06-10)
| Skill | Bloques | Por qué entra | Instalación |
|-------|---------|----------------|-------------|
| playwright-cli (microsoft) | 3-4 | QA con navegador real; barata en tokens (CLI) | Ya en FASE 4 |
| frontend-design (anthropics, oficial) | 3 · 2 | Diseño con intención propia, anti-plantilla; mantenida por Anthropic; sustituye 3 skills por 1 | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| next-best-practices (vercel-labs) | 2-3 | El stack es Next y se despliega en Vercel; skill del propio Vercel | `npx skills add https://github.com/vercel-labs/next-skills --skill next-best-practices` |
| extract-design-system (arvindrk) | 3-4 | Extrae el sistema de diseño de webs existentes → pieza exacta del upsell/rediseño (piloto mudanzasroy.es) | `npx skills add https://github.com/arvindrk/extract-design-system --skill extract-design-system` |
| seo-audit (coreyhaines31) | 2-4 | Checklist SEO local para la dimensión 7 del Auditor y auditorías de upsell. Snyk en "Warn" (solo markdown, riesgo bajo; leída antes de usar) | `npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit` |
| copywriting (coreyhaines31) | 1-3 | Outreach que no suena a spam + textos de webs orientados a captar clientes del nicho | `npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting` |

## Evaluadas y descartadas (no instalar)
| Skill | Razón |
|-------|-------|
| Suite impeccable (audit/polish/critique...) | Solapa con web-design-guidelines + rúbrica propia; +7 skills de carga sin ganancia |
| hyperframes / gsap (heygen) | Ya cubierto por gpt-tasteskill + ui-animation |
| shadcn | Opcional; riesgo de "look plantilla". Se decide en la spec del bloque 3 |
| marketing-psychology, content-strategy y resto de marketingskills | YAGNI: copywriting cubre la necesidad actual del bloque 1 |
| self-improving-agent (charon-fan) | Descartada en sesión 2026-06-10 (seguridad en Warn con código; sus 2 buenas ideas ya adoptadas en bloque 7) |

## Balance
28 instaladas → 25 tras archivar el grupo taste (ejecutado) + 6 nuevas = **31 skills activas, todas con bloque asignado**. Las 3 archivadas quedan en `docs/archivo-skills/`.
Carga real por sesión: solo descripciones; el contenido se lee bajo demanda. La ganancia de la criba
es de claridad (cero skills huérfanas) más que de tokens.
>>>FIN

El archivado del grupo taste ya se ejecutó en la FASE 4.7 (decisión aprobada). Este archivo lo documenta.

**Commit:** `docs: inventario de skills con criba aprobada y ejecutada`

---

## FASE 6 — Actualizar ROADMAP.md

En `docs/ROADMAP.md`, sin reescribirlo entero, añade al final de la línea de cada fase/agente la referencia a su bloque, y añade esta línea nueva tras "Entrega + billing":

```
> Estructura física: cada agente/área = un bloque en `docs/bloques/` (1-captacion · 2-auditor · 3-generador · 4-revisor · 5-pagos · 6-mantenimiento · 7-mejora).
```

**Commit:** `docs: ROADMAP referencia bloques`

### 6.2 — Actualizar GUIA-COLABORADOR.txt
Sobrescribe `GUIA-COLABORADOR.txt` (raíz) con el contenido LITERAL siguiente (es la guía completa; solo cambian la Parte 3 y la Parte 6 respecto a la anterior):

<<<ARCHIVO: GUIA-COLABORADOR.txt
==========================================================
  GUÍA DEL COLABORADOR — EVOLink
  De cero (sin tener nada instalado) hasta trabajar en el proyecto.
  Escrita paso a paso, sin dar nada por sabido.
==========================================================

El proyecto y el repositorio en GitHub se llaman EVOLink. Usa la dirección
que aparece más abajo TAL CUAL.

Vas a necesitar 4 programas (VS Code, Git, Node.js y la extensión Claude Code)
y una cuenta de GitHub con acceso al repositorio. Sigue las PARTES EN ORDEN.
Tómatelo con calma; cada paso es un clic o una línea.


##########################################################
PARTE 0 — CUENTA DE GITHUB Y ACCESO  (haz esto primero)
##########################################################
GitHub es la "nube" donde vive el proyecto.

1) Crea una cuenta gratis en  https://github.com  (botón "Sign up").
   Apunta tu usuario y contraseña.
2) Dile a Kravitzz tu nombre de usuario de GitHub.
3) Él te invitará al repositorio (es PRIVADO). Te llegará un email con un botón
   "Accept invitation": púlsalo (o entra en https://github.com/notifications).
   ⚠ Sin aceptar la invitación NO podrás descargar el proyecto.


##########################################################
PARTE 1 — INSTALAR LOS 4 PROGRAMAS  (solo una vez en tu PC)
##########################################################
Instálalos EN ESTE ORDEN. En todos, deja las opciones por defecto
(Siguiente -> Siguiente -> Instalar) salvo donde se indique.

--- 1.1) Visual Studio Code  (el editor donde harás TODO) ---
   Web:  https://code.visualstudio.com
   - Pulsa el botón azul "Download for Windows" y ejecuta el archivo descargado
     (estará en tu carpeta "Descargas").
   - En la pantalla "Tareas adicionales", deja marcada "Add to PATH"
     (viene marcada por defecto).
   - Al terminar, abre VS Code una vez para comprobar que arranca.

--- 1.2) Git  (control de versiones; instala también "Git Bash") ---
   Web:  https://git-scm.com/download/win   (la descarga empieza sola)
   - Ejecuta el instalador y pulsa "Next" en todas las pantallas (por defecto
     está bien). No necesitas cambiar nada.

--- 1.3) Node.js  (motor que ejecuta las herramientas del proyecto) ---
   Web:  https://nodejs.org
   - Descarga el botón que dice "LTS" (versión estable). Instala por defecto.

--- 1.4) Reinicia VS Code ---
   Ciérralo del todo y vuelve a abrirlo, para que detecte Git y Node.

--- 1.5) Comprobar que está todo (recomendado) ---
   - En VS Code: menú superior "Terminal" -> "New Terminal".
   - Escribe estos 3 comandos, uno a uno + Enter. Cada uno debe responder con
     un número de versión (NO un error):
         git --version
         node --version
         npm --version
   - Si alguno falla, reinicia el PC y prueba otra vez.

--- 1.6) Extensión Claude Code  (la IA con la que trabajarás) ---
   - En VS Code, barra izquierda: icono de Extensiones (4 cuadraditos).
   - Busca "Claude Code" (de Anthropic) y pulsa "Install".
   - Cuando lo pida, inicia sesión con la cuenta de Claude que te indique
     Kravitzz.


##########################################################
PARTE 2 — DESCARGAR EL PROYECTO  (clonar; solo la PRIMERA vez)
##########################################################
"Clonar" = traer una copia del proyecto a tu PC, conectada a GitHub.

1) Abre VS Code.
2) Abre la terminal:  "Terminal" -> "New Terminal"  (o pulsa  Ctrl + ñ ).
3) Elige DÓNDE guardarlo. Recomendado: una carpeta "Proyectos" en C:.
   Escribe (Enter tras cada línea):
         cd C:\
         mkdir Proyectos
         cd Proyectos
   (Si "mkdir Proyectos" dice que ya existe, da igual, sigue.)
4) Descarga el proyecto (copia y pega esta línea tal cual):
         git clone https://github.com/Kravitzz/EVOLink.git
   - Si pide iniciar sesión en GitHub, hazlo en la ventana que se abre.
     Queda guardado para siempre.
5) Entra en la carpeta descargada:
         cd EVOLink
6) Ábrela como proyecto en VS Code:
         code .
   VS Code se recarga ya "dentro" del proyecto; a la izquierda verás los
   archivos (README, docs, etc.).

Ya tienes EVOLink en tu PC. Esto se hace UNA sola vez. A partir de aquí, cada
día se usa "git pull" (Parte 4), no se vuelve a clonar.


##########################################################
PARTE 3 — PRIMERA VEZ DENTRO DEL PROYECTO  (cosas que conviene saber)
##########################################################
- Las "skills" (capacidades de la IA) están OCULTAS en el explorador a
  propósito, para no saturar la vista. Claude las usa igualmente. No toques nada.
- El proyecto usa Supabase (base de datos en la nube) mediante algo llamado
  "MCP". La configuración ya viene incluida (archivo .mcp.json). La PRIMERA vez
  que Claude use Supabase puede abrir el navegador para que autorices el acceso
  (login con la cuenta de Supabase que te diga Kravitzz): acepta.
- El MAPA del proyecto está en  docs/bloques/ : una carpeta por cada agente
  o área del negocio. Es el mejor sitio para orientarse.
- Regla con los archivos: NO muevas ni borres carpetas que no entiendas
  (.claude, .git, docs). Si dudas, pregunta antes.


##########################################################
PARTE 4 — LA MECÁNICA DEL DÍA A DÍA  (¡LO MÁS IMPORTANTE!)
##########################################################
REGLA DE ORO:
  >> NUNCA trabajáis los dos a la vez en el proyecto. <<
  >> SIEMPRE: descargar antes de empezar (pull) y subir al terminar (push). <<
Así el proyecto está siempre actualizado para los dos y nada se pisa.

>>> AL EMPEZAR (cada sesión):
  1) Abre VS Code en el proyecto. Si lo cerraste:
     "File" -> "Open Folder" -> C:\Proyectos\EVOLink
  2) Abre la terminal ( Ctrl + ñ ).
  3) Descarga lo último del compañero:
         git pull
     ("Already up to date" = no había novedades, perfecto).
  4) En el chat de Claude Code escribe:   /inicio
     Claude lee el estado y te dice por dónde vamos y el siguiente paso.

>>> MIENTRAS trabajas:
  - Habla con Claude con normalidad y pídele lo que toque.
  - Si Claude avisa de contexto alto o de muchos prompts, hazle caso:
       /compact  (resume y libera memoria)      /clear  (si cambias de tema)

>>> AL TERMINAR (cada sesión):
  1) En el chat de Claude escribe:   /cierre
     Actualiza el estado (HANDOVER.md) y te propone "guardar" (commit): acepta.
  2) Sube tu trabajo a la nube:
         git push
  3) Avisa al compañero: "Ya he subido, te toca."


##########################################################
PARTE 5 — CHULETA  (pégala en la pared)
##########################################################
EMPEZAR:   git pull   ->   /inicio
TRABAJAR:  (hablar con Claude)      [ /compact  si avisa ]
TERMINAR:  /cierre   ->   git push   ->   avisar al compañero


##########################################################
PARTE 6 — QUÉ ES EVOLINK Y DÓNDE ESTAMOS AHORA
##########################################################
EVOLink es un negocio: una agencia que crea y mantiene webs para negocios sin
presencia online, de forma muy automatizada. Se cobra un setup inicial + una
cuota mensual. El sistema se apoya en CUATRO "agentes" (herramientas de IA);
los socios solo revisamos y cerramos las ventas:

  1. CAPTACIÓN: busca negocios sin web, los puntúa y redacta los emails de
     contacto (nosotros los revisamos y enviamos).
  2. AUDITOR: analiza un negocio y genera una auditoría profesional. Sirve
     para venderle (gancho) y como guía para hacerle la web.
  3. GENERADOR WEB: con esa auditoría, crea la web (con marca, rápida, que
     no parezca plantilla) y la deja publicada.
  4. REVISOR: vigila que las webs funcionen (enlaces, formularios, velocidad)
     y detecta fallos en webs ajenas para ofrecer rediseños.

Cada agente tiene su CARPETA dentro de  docs/bloques/  (1-captacion,
2-auditor, 3-generador, 4-revisor... hasta 7). Dentro de cada carpeta está
escrito qué hace, qué herramientas usa y en qué estado está. Si quieres
saber qué hace un agente, entra en su carpeta y lee BLOQUE.md.

PUNTO ACTUAL: la PLANIFICACIÓN está terminada. El diseño del Auditor está
cerrado y aprobado (documento en docs/superpowers/specs/), y toda la
estructura de bloques, herramientas y skills ya está instalada y decidida
por los dos socios. Lo siguiente, en orden:
  1) Migrar el proyecto a un repositorio compartido por los dos (Parte 9).
  2) EMPEZAR A PROGRAMAR: convertir el diseño del Auditor en un plan de
     tareas y picar código.

Para entender el negocio a fondo, lee en este orden:
  docs/BUSINESS.md  ->  docs/ROADMAP.md  ->  HANDOVER.md  ->  docs/bloques/


##########################################################
PARTE 7 — SI ALGO SALE MAL
##########################################################
- "git pull" da error o habla de "conflict": alguien trabajó sin avisar.
  NO fuerces nada. Haz una captura y avisa a Kravitzz; se arregla hablándolo.
- Te pide usuario/contraseña de GitHub: inicia sesión en la ventana que abre.
- No ves las skills en el explorador: es a propósito (están ocultas). Normal.
- VS Code no encuentra "git" o "node": cierra y reabre VS Code; si sigue,
  reinicia el PC (a veces hace falta tras instalar).


##########################################################
PARTE 8 — GLOSARIO MÍNIMO
##########################################################
- Repositorio (repo): el proyecto guardado en GitHub (la nube).
- Clonar: descargar el repo a tu PC la primera vez.
- pull:  traer los últimos cambios de la nube a tu PC.
- push:  subir tus cambios de tu PC a la nube.
- commit: "guardar un punto" con tus cambios (lo hace /cierre por ti).
- terminal: la ventana donde escribes comandos (dentro de VS Code).
- branch (rama): la línea de trabajo; nosotros usamos "main".


##########################################################
PARTE 9 — FUTURO  (cuando toque)
##########################################################
- El repositorio ya se llama EVOLink (hecho).
- Migraremos a una cuenta de GitHub compartida por los dos. Cuando pase, solo
  cambiará la dirección del repo con UN comando que os pasaremos ya escrito.
  No se pierde nada: todo el historial viaja con el proyecto.

==========================================================
  ¿Dudas? Pregunta a Kravitzz ANTES de tocar algo que no entiendas.
==========================================================
>>>FIN

**Commit:** `docs: guia colaborador actualizada (4 agentes, bloques, punto actual)`

---

## FASE 7 — HANDOVER final de esta sesión

Sobrescribe `HANDOVER.md` con:

<<<ARCHIVO: HANDOVER.md
# HANDOVER — EVOLink

**Última sesión:** [FECHA DE HOY]
**Branch:** main
**Último commit:** [rellenar con el último hash + mensaje]

---

## Estado del proyecto
EVOLink = agencia web semiautónoma (mapa de 4 agentes sobre Supabase; los humanos cierran la venta). **Reorganización por bloques completada:** 7 bloques en `docs/bloques/`, CLAUDE.md v2 (regla 200 líneas), /inicio y /cierre v2, skill `playwright-cli` instalada, inventario de skills creado. Aún NO hay código de producto.

## Bloque activo
2-auditor — detalle en `docs/bloques/2-auditor/ESTADO.md` (spec aprobada; siguiente: writing-plans)

## Hecho en la sesión actual ([FECHA DE HOY])
- CLAUDE.md v2: arquitectura de bloques + regla de 200 líneas + aprendizaje vía CHANGELOG por bloque.
- Creados los 7 bloques en `docs/bloques/` (contratos, rúbrica del Generador, ESTADO del Auditor, CHANGELOG con formato de registro de errores + ejemplo en cada bloque).
- /inicio y /cierre v2: bloque activo + decisiones por referencia (fin de la duplicación con BUSINESS.md).
- Instalada y aplanada la skill `playwright-cli` (Microsoft; QA del Generador y base del Revisor).
- `docs/contexto/inventario-skills.md`: mapa skill→bloque con criba aprobada y ejecutada (grupo taste archivado).
- ROADMAP referenciando bloques. Eliminado ESTADO-FLUJO.md (migrado al bloque 2).
- Descartada la skill externa `self-improving-agent` (seguridad en Warn); sus 2 buenas ideas adoptadas en el bloque 7.
- Creadas las fichas de accesos de los 4 agentes (`docs/bloques/{1,2,3,4}-*/referencias/*-agente-accesos.md`): mapa de skills/APIs/MCPs, flujo, señales de aprendizaje y conexiones. Insumo de cada writing-plans.
- Criba de skills APROBADA por ambos socios y ejecutada: grupo taste archivado en `docs/archivo-skills/`; 31 skills activas mapeadas a bloque en `docs/contexto/inventario-skills.md`.
- Instaladas 5 skills nuevas aprobadas: `frontend-design` (oficial), `next-best-practices`, `extract-design-system`, `seo-audit`, `copywriting`.
- Evaluado Claude Design (beta Anthropic): NO sustituye al Generador (sin API, no automatizable); aprobado como herramienta de los socios para la fase de validación manual y el piloto mudanzasroy.es.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Nueva de esta sesión (añadida a BUSINESS.md si no está): los bloques viven en `docs/bloques/`; skills ejecutables en `.claude/skills/`.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente (ver inventario).

## Próximo paso concreto
**Migrar el proyecto al repositorio conjunto de GitHub con el socio.**
1. Crear cuenta/organización u obtener acceso conjunto.
2. Nuevo remoto + push de main (historial completo).
3. Actualizar `origin`, README/GUIA-COLABORADOR si cambia la URL, y renombrar la carpeta local (pendiente antiguo).
4. **Después de la migración: empezar la programación** → `writing-plans` sobre la spec del Auditor v1 (bloque 2).

## Pendientes
- [ ] Migración a repo conjunto.
- [ ] `writing-plans` del Auditor v1 (tras migrar).
- [ ] Sesión: canales de promoción (punto abierto en BUSINESS.md).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
>>>FIN

Notas: sustituye `[FECHA DE HOY]` por la fecha real y rellena el hash. Si la nueva decisión (bloques en docs/bloques/) no está en BUSINESS.md §Decisiones, añádela ahí como punto 8/9 según numeración.

**Commit:** `docs: handover reorganizacion por bloques` · después **`git push`**.

---

## FASE 8 — Verificación y mensaje final (OBLIGATORIA)

Verifica con comandos (evidencia antes de afirmar):
1. `find docs/bloques -name "*.md" | sort` → deben salir los 20 archivos de bloques (16 + 4 fichas `*-agente-accesos.md` en las carpetas `referencias/` de los bloques 1-4).
2. `wc -l CLAUDE.md HANDOVER.md docs/bloques/*/BLOQUE.md` → TODOS ≤ 200 líneas.
3. `ls -la .claude/skills/playwright-cli/ && find .claude/skills/playwright-cli -type l | wc -l` → carpeta real con SKILL.md, y el conteo de symlinks = **0**.
4. `grep -l "playwright-cli" docs/bloques/3-generador/BLOQUE.md docs/bloques/4-revisor/BLOQUE.md CLAUDE.md` → deben listarse los 3 archivos (skill colocada en sus bloques).
4b. `grep -c "referencias/auditor-agente-accesos.md" docs/bloques/2-auditor/BLOQUE.md` → debe ser >= 1 (ficha de accesos enlazada).
5. `npx playwright-cli --version || echo "CLI pendiente (documentado en HANDOVER)"` → versión, o el pendiente documentado.
6. `test -f docs/superpowers/ESTADO-FLUJO.md && echo "ERROR: aún existe" || echo OK`
7. `git log --oneline -8` → los commits de las fases.
8. `git status` → limpio y pusheado.

Si TODO pasa, termina con este mensaje (literal en estructura, rellena los datos):

```
✅ Reorganización por bloques completada y subida a GitHub.

- [N] commits: [lista hash + mensaje]
- 7 bloques creados en docs/bloques/
- CLAUDE.md v2, /inicio y /cierre v2, inventario de skills listo
- playwright-cli: instalada (aplanada, 0 symlinks), CLI [verificado ✅ / pendiente], referenciada en bloques 3 y 4
- Ficha de accesos del Auditor creada y enlazada (referencias/auditor-agente-accesos.md)
- Verificaciones: todas en verde (archivos ≤200 líneas, sin symlinks, repo limpio)

Confirmado todo correctamente. SIGUIENTE PASO acordado:
1. Migrar el proyecto al repositorio conjunto de GitHub con tu socio.
2. Una vez migrado → empezamos la programación: writing-plans sobre la spec del Auditor v1.

ESPERA la confirmación del usuario (revisará estas verificaciones). Cuando confirme con un OK, pregúntale EXACTAMENTE:

"¿Arrancamos ya el writing-plans del Auditor v1 (bloque 2) en esta misma sesión, o prefieres hacer antes la migración al repo conjunto? Recomendado: /clear primero para empezar el plan con contexto limpio."

Y actúa según su respuesta.
```

### Paso final — Autoeliminación de este archivo de setup
Si todas las verificaciones anteriores han pasado (sin ❌):
```bash
git rm 2026-06-10-SETUP-estructura-bloques-EVOLink.md
git commit -m "chore: eliminar archivo de setup tras ejecucion verificada"
```
Confirma con: `"Archivo de setup eliminado. Árbol limpio."`

Si algo falla, repórtalo con ❌ indicando fase, comando y error, y NO hagas push hasta resolverlo.
>>>FIN DE LA ORDEN
