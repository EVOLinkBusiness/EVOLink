# EVOLink

Agencia web **automatizada**: detecta negocios sin presencia online, les genera una auditoría y una web profesional, y los mantiene con una suscripción mensual. El sistema se apoya en agentes de IA autónomos sobre Supabase, operado por un equipo de 2.

> **Estado:** Fase F1 (Agente Auditor) — **COMPLETADA**: backend + entrada de datos en producción sobre Supabase, validados end-to-end (scoring, narrativa Opus 4.8, supervisión Haiku 4.5, extracción por visión). Próximo: **ETAPA 2 — Agente Generador (bloque 3)**.
> Repositorio: https://github.com/EVOLinkBusiness/EVOLink

## Visión

Convertir negocios sin web (detectados en Google Maps) en clientes con web profesional y pago recurrente, automatizando el flujo de punta a punta: **captación → auditoría → diseño/build → entrega → cobro → mantenimiento**. El apalancamiento es la automatización, no contratar.

Monetización híbrida: setup inicial (pago único) + cuota mensual (hosting, mantenimiento y mejoras). La recurrencia (MRR) es el activo del negocio.

## Arquitectura — tejido de agentes

El sistema es un **mapa de 4 agentes** organizado físicamente en **7 bloques autocontenidos** bajo [`docs/bloques/`](docs/bloques/). Cada bloque tiene contrato idéntico: `BLOQUE.md` (qué hace, contrato E/S, skills que usa) · `CHANGELOG.md` (qué cambió y qué error lo motivó) · `ESTADO.md` (solo si está en trabajo activo).

| # | Bloque | Rol |
|---|--------|-----|
| 1 | [captacion](docs/bloques/1-captacion/BLOQUE.md) | Creación — leads y outreach; los socios cierran la venta |
| 2 | [auditor](docs/bloques/2-auditor/BLOQUE.md) | Creación — auditoría de presencia digital *(✅ completado, F1)* |
| 3 | [generador](docs/bloques/3-generador/BLOQUE.md) | Creación — fabricar → evaluar → entregar la web *(activo, ETAPA 2)* |
| 4 | [revisor](docs/bloques/4-revisor/BLOQUE.md) | Supervisión — QA con `playwright-cli` (depende del 3) |
| 5 | [pagos](docs/bloques/5-pagos/BLOQUE.md) | Ops — Stripe + facturación ES + impagos |
| 6 | [mantenimiento](docs/bloques/6-mantenimiento/BLOQUE.md) | Ops — webs vivas (futuro) |
| 7 | [mejora](docs/bloques/7-mejora/BLOQUE.md) | Mejora — mina `agent_runs` → propone diffs (futuro) |

Regla transversal: *lógica determinista primero, LLM solo para juicio.*

```
1-CAPTACIÓN → 2-AUDITOR → 3-GENERADOR → 4-REVISOR → entrega + Stripe → mantenimiento
      └────────── Supabase (multi-tenant + RLS) · agent_runs → 7-mejora ──────────┘
```

## Stack

| Capa | Tecnología |
|------|------------|
| App / dashboard | Next + Tailwind (Astro para marketing) |
| Backend y datos | Supabase: Postgres + RLS multi-tenant, Auth, Storage, Edge Functions, pgvector (vía MCP) |
| IA | Claude (API de Anthropic) |
| Diseño | `ui-ux-pro-max` + `frontend-design` (oficial Anthropic) · motion (`gpt-tasteskill`, `ui-animation`) · QA (`web-design-guidelines` + `playwright-cli`) |
| Lead-gen / Billing / Deploy | Google Places API · Stripe (setup + suscripción) · Vercel + Cloudflare Pages + Supabase |

## Estructura del repositorio

```
.claude/                comandos (/inicio, /cierre), hooks y skills locales
docs/bloques/           el MAPA del producto: un bloque por agente/área (1-captacion ... 7-mejora)
docs/                   BUSINESS.md, ROADMAP.md, contexto/ (inventario de skills), superpowers/ (specs), archivo-skills/
CLAUDE.md               manual operativo permanente (se lee al arrancar)
HANDOVER.md             estado de la última sesión y próximo paso
GUIA-COLABORADOR.txt    guía de instalación y trabajo, paso a paso desde cero
.mcp.json               conexión MCP a Supabase
```

## Metodología de trabajo

Sesiones reproducibles y token-económicas:

- `/inicio` carga el contexto mínimo (HANDOVER + CLAUDE + git).
- Diseño antes de código: **brainstorming → spec → writing-plans → implementación** (HARD-GATE: nada de producto sin diseño aprobado).
- `/cierre` vuelca el estado a `HANDOVER.md` y propone el commit.
- Regla del equipo: nunca trabajáis los dos a la vez; `git pull` al empezar, `git push` al terminar.

## Empezar

¿Nuevo en el proyecto? Sigue **[GUIA-COLABORADOR.txt](GUIA-COLABORADOR.txt)**: de cero (instalar VS Code, Git, Node y Claude Code), clonar el repo y la mecánica diaria.

## Estado y próximos pasos

- **F0 Infraestructura** — completada (incluye la reorganización por bloques, 2026-06-10).
- **F1 Agente Auditor + backbone Supabase** — ✅ **completada** (bloque `2-auditor`). Backend + entrada de datos validados end-to-end; dos Edge Functions desplegadas y activas (`generate-audit` v5, `extract-presence` v1); suite 35/35 en verde. Revisado y endurecido antes de la ETAPA 2. Detalle: [`docs/bloques/2-auditor/ESTADO.md`](docs/bloques/2-auditor/ESTADO.md).
- **ETAPA 2 — Agente Generador** (bloque 3) — en curso. Spec aprobada: [`docs/superpowers/specs/2026-06-12-generador-v1-design.md`](docs/superpowers/specs/2026-06-12-generador-v1-design.md).
- **Siguientes:** Captación/Seguimiento (bloque 1, co-prioritario) · Revisor/QA (bloque 4) · Entrega + billing (bloques 5-6) — planificadas; ver [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Documentación

- [`docs/BUSINESS.md`](docs/BUSINESS.md) — el negocio: qué, a quién, cómo se gana dinero.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fases del proyecto.
- [`docs/bloques/2-auditor/ESTADO.md`](docs/bloques/2-auditor/ESTADO.md) — punto exacto del bloque activo (cada bloque activo tiene su ESTADO.md).
- [`HANDOVER.md`](HANDOVER.md) — estado vivo de la última sesión.

---

Equipo: Kravitzz + 1 socio. Comunicación en español; código y commits en inglés.
