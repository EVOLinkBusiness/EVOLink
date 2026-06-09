# EVOLink

Agencia web **automatizada**: detecta negocios sin presencia online, les genera una auditoría y una web profesional, y los mantiene con una suscripción mensual. El sistema se apoya en agentes de IA autónomos sobre Supabase, operado por un equipo de 2.

> **Estado:** Fase F1 (Agente Auditor) — diseño aprobado, plan de implementación pendiente. Todavía sin código de producto.
> Repositorio privado: https://github.com/Kravitzz/EVOLink

## Visión

Convertir negocios sin web (detectados en Google Maps) en clientes con web profesional y pago recurrente, automatizando el flujo de punta a punta: **captación → auditoría → diseño/build → entrega → cobro → mantenimiento**. El apalancamiento es la automatización, no contratar.

Monetización híbrida: setup inicial (pago único) + cuota mensual (hosting, mantenimiento y mejoras). La recurrencia (MRR) es el activo del negocio.

## Arquitectura — tejido de agentes

El sistema se compone de bloques autocontenidos (skills/agentes), cada uno testeable y arreglable por separado, organizados en cuatro roles:

- **Creación** — producen el artefacto: Agente **Auditor**, Agente **Generador web**.
- **Supervisión** — QA automático del output antes de la revisión humana.
- **Ops / Registro** — gestionan y registran cada sesión y ejecución.
- **Mejora** — minan los registros para mejorar las skills (diferido).

Regla transversal: *lógica determinista primero, LLM solo para juicio.*

```
Captación (Maps / outreach) → datos → AUDITOR → GENERADOR WEB → deploy + Stripe → soporte
                                         └──────── Supabase (multi-tenant + RLS + pgvector) ────────┘
```

## Stack

| Capa | Tecnología |
|------|------------|
| App / dashboard | Next + Tailwind (Astro para marketing) |
| Backend y datos | Supabase: Postgres + RLS multi-tenant, Auth, Storage, Edge Functions, pgvector (vía MCP) |
| IA | Claude (API de Anthropic) |
| Diseño | `ui-ux-pro-max` + taste · motion (`gpt-tasteskill`, `ui-animation`) · QA (`web-design-guidelines`) |
| Lead-gen / Billing / Deploy | Google Places API · Stripe (setup + suscripción) · Vercel + Supabase |

## Estructura del repositorio

```
.claude/                comandos (/inicio, /cierre), hooks y skills locales
docs/                   BUSINESS.md, ROADMAP.md, superpowers/ (flujo + specs)
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

- **F0 Infraestructura** — completada.
- **F1 Agente Auditor + backbone Supabase** — en curso. Diseño aprobado: [`docs/superpowers/specs/2026-06-08-auditor-v1-design.md`](docs/superpowers/specs/2026-06-08-auditor-v1-design.md). **Próximo: `writing-plans`** (plan de implementación por tareas).
- **F2** Generador web · **F3** Funnel (Maps + outreach) · **F4** Entrega + billing · **F5** Aprendizaje + upsell · **F6** Marketing — planificadas.

## Documentación

- [`docs/BUSINESS.md`](docs/BUSINESS.md) — el negocio: qué, a quién, cómo se gana dinero.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fases del proyecto.
- [`docs/superpowers/ESTADO-FLUJO.md`](docs/superpowers/ESTADO-FLUJO.md) — punto exacto del flujo por subsistema.
- [`HANDOVER.md`](HANDOVER.md) — estado vivo de la última sesión.

---

Equipo: Kravitzz + 1 socio. Comunicación en español; código y commits en inglés.
