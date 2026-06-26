# EVOLink

Agencia web **automatizada**: detecta negocios sin presencia online, les genera una auditoría y una web profesional, y los mantiene con una suscripción mensual. El sistema se apoya en agentes de IA autónomos sobre Supabase, operado por un equipo de 2.

> 🟢 **Estado (2026-06-26):** Auditor (F1) en producción · Generador (F2) **v4 "Director de Arte Autónomo" ejecutado** — el director decide estilo/motion/referencias por cliente y rechaza lo impertinente (cubo 3D en mudanzas = eliminado). Set v4 de 8 previews dinámicas validado E2E para `mudanzasroy`. **En curso: curación del índice de referencias** (juanmora admitida; 3 candidatos Awwwards pendientes de extracción).
> Repositorio: https://github.com/EVOLinkBusiness/EVOLink

## Visión

Convertir negocios sin web (detectados en Google Maps) en clientes con web profesional y pago recurrente, automatizando el flujo de punta a punta: **captación → auditoría → diseño/build → entrega → cobro → mantenimiento**. El apalancamiento es la automatización, no contratar.

Monetización híbrida: setup inicial (pago único) + cuota mensual (hosting, mantenimiento y mejoras). La recurrencia (MRR) es el activo del negocio.

## 🗺️ Roadmap

Progreso por fases. Cada fase pasa por su ciclo superpowers (spec → plan → código → diagnóstico).

```
[██████████] F0  Infraestructura ............... ✅ completada
[██████████] F1  Agente Auditor ................ ✅ completada · en producción
[██████████] F2  Agente Generador web (v1) ..... ✅ v1 + piloto validado E2E
[██████████] ▶   Piloto mudanzasroy (local) .... ✅ validado · Lighthouse móvil 100
[██████████] F2.4 Generador v4 (director de arte) ✅ ejecutado · 8 previews dinámicas · referencias en curación
[░░░░░░░░░░] A1  Agente Captación (co-prior.) ... ⬜ pendiente
[░░░░░░░░░░] A4  Agente Revisor/QA ............. ⬜ pendiente (depende de F2)
[░░░░░░░░░░] B5  Pagos + facturación ES ........ ⬜ pendiente
[░░░░░░░░░░] B6  Mantenimiento webs vivas ...... ⬜ futuro
[░░░░░░░░░░] B7  Mejora (mina agent_runs) ...... ⬜ futuro
```

### ✅ Hecho

- **F0 · Infraestructura** — repo, metodología (`CLAUDE`/`HANDOVER`/docs), `/inicio` `/cierre`, hooks, Supabase por MCP, skills curadas, reorganización por bloques.
- **F1 · Agente Auditor** *(bloque 2)* — auditoría de presencia digital con motor híbrido (reglas + narrativa Opus 4.8 + supervisión Haiku 4.5) y extracción por visión. Dos Edge Functions **desplegadas y activas**, multi-tenant con RLS, registro en `agent_runs`. Suite **35/35**. Validado end-to-end.
- **F2 · Agente Generador web** *(bloque 3)* — de auditoría + datos → web Astro con marca, **fabricar → evaluar → entregar** (ensamblado determinista + Playwright + Lighthouse + rúbrica). 6 etapas, 2 checkpoints humanos, registro por etapa. Suite **24/24**. **Diagnóstico v1 superado**: robustez (build hostil sin XSS ni fugas), skills sin contradicciones, 3 webs de muestra con variedad real (Lighthouse 91/94/98).

### ⏳ En curso / siguiente

- **Curación de referencias + ascenso a producción** *(bloque 3)*. v4 ejecutado: el director de arte decide por cliente (7 diales, espectro motion 1-5, primitivas P1-P6, rechazos explícitos). Validado E2E con `mudanzasroy` (8 previews dinámicas, detector 0 graves, motor 24/24). Pendiente: (1) instalar Playwright + extraer referencias Awwwards (`truckn-roll-r`, `monarch-custom-homes`, `california-vending-company`), (2) revisión del socio del set v4 → elegir concepto → ascenso Astro+React islands → Cloudflare Pages.

### ⬜ Por hacer

- **Captación/Seguimiento** *(bloque 1, co-prioritario)* — rastrea/cualifica/contacta; los socios cierran. Límites legales (RGPD/ePrivacy/LSSI).
- **Revisor/QA** *(bloque 4)* — QA con `playwright-cli`; depende del Generador. Aquí encaja el upsell de rediseño.
- **Pagos + Mantenimiento** *(bloques 5-6)* — Stripe (setup + cuota) + facturación ES + dominio + Cloudflare Pages + onboarding.
- **Mejora** *(bloque 7)* — mina `agent_runs` → propone diffs a skills/rúbricas.

Detalle vivo: [`docs/ROADMAP.md`](docs/ROADMAP.md) · estado de sesión en [`HANDOVER.md`](HANDOVER.md).

## Arquitectura — tejido de agentes

El sistema es un **mapa de 4 agentes** organizado físicamente en **7 bloques autocontenidos** bajo [`docs/bloques/`](docs/bloques/). Cada bloque tiene contrato idéntico: `BLOQUE.md` (qué hace, contrato E/S, skills que usa) · `CHANGELOG.md` (qué cambió y qué error lo motivó) · `ESTADO.md` (solo si está en trabajo activo).

| # | Bloque | Rol | Estado |
|---|--------|-----|--------|
| 1 | [captacion](docs/bloques/1-captacion/BLOQUE.md) | Creación — leads y outreach; los socios cierran | ⬜ pendiente |
| 2 | [auditor](docs/bloques/2-auditor/BLOQUE.md) | Creación — auditoría de presencia digital | ✅ completado |
| 3 | [generador](docs/bloques/3-generador/BLOQUE.md) | Creación — fabricar → evaluar → entregar la web | ✅ v1 validado · ✅ v4 director de arte ejecutado |
| 4 | [revisor](docs/bloques/4-revisor/BLOQUE.md) | Supervisión — QA con `playwright-cli` (depende del 3) | ⬜ pendiente |
| 5 | [pagos](docs/bloques/5-pagos/BLOQUE.md) | Ops — Stripe + facturación ES + impagos | ⬜ pendiente |
| 6 | [mantenimiento](docs/bloques/6-mantenimiento/BLOQUE.md) | Ops — webs vivas | ⬜ futuro |
| 7 | [mejora](docs/bloques/7-mejora/BLOQUE.md) | Mejora — mina `agent_runs` → propone diffs | ⬜ futuro |

Regla transversal: *lógica determinista primero, LLM solo para juicio.*

```
1-CAPTACIÓN → 2-AUDITOR → 3-GENERADOR → 4-REVISOR → entrega + Stripe → mantenimiento
      └────────── Supabase (multi-tenant + RLS) · agent_runs → 7-mejora ──────────┘
```

## Sub-bloques — pasos dentro de cada bloque

`[x]` terminado · `[~]` en curso · `[ ]` por hacer.

**1 · Captación** `░░░░░░░░░░` 0%
- [ ] brainstorming → spec
- [ ] fuente de datos (manual → Google Places)
- [ ] cualificación + secuencia de contacto
- [ ] cumplimiento legal (RGPD/ePrivacy/LSSI)
- [ ] registro en `agent_runs`

**2 · Auditor** `██████████` 100%
- [x] esquema Supabase + RLS + grants
- [x] rúbrica determinista + narrativa (Opus)
- [x] supervisor (Haiku) + `agent_runs`
- [x] entrada por visión (ficha de Maps)
- [x] 2 Edge Functions desplegadas (suite 35/35)
- [ ] *(diferido)* Plan B: dashboard + informe público `/r/[slug]`

**3 · Generador** `████████░░` ~80%
- [x] motor v1 (catálogo + ensamblador + evaluación + registro)
- [x] piloto E2E (mudanzasroy, Lighthouse móvil 100)
- [x] rediseño v2: spec + cerebro `impeccable`+`design-taste-frontend` + despensa `skillui`
- [x] 18 skills instaladas: 8 GSAP oficiales + 10 Three.js; docs actualizados
- [x] 12 previews v2 generadas con `.prompt.txt`; auditoría + fallo slot fijo documentados
- [x] **v4 director de arte ejecutado**: skill `director-arte` (7 diales, P1-P6, rechazos) · flujo dinámico 8-12 · espectro motion 1-5 · ascenso Astro+React islands → Cloudflare · rúbrica v4
- [x] índice de referencias por roles + memoria director + vocabulario motion Awwwards
- [x] juanmora admitida en inventario (motion + tipografía Goga, motion 3-4, solo idioma)
- [ ] instalar Playwright + re-extraer juanmora ultra + 3 candidatos Awwwards
- [ ] revisión del socio del set v4 → elección → ascenso a producción (Cloudflare Pages)
- [ ] retrofit `CONTRATO.md`/`GUIA` bloque 3 cuando aterrice el esqueleto de agentes

**4 · Revisor / QA** `░░░░░░░░░░` 0% *(depende del 3)*
- [ ] spec
- [ ] suite QA Playwright (enlaces, formularios, responsive, contraste)
- [ ] upsell de rediseño

**5 · Pagos** `░░░░░░░░░░` 0%
- [ ] spec Stripe + facturación ES
- [ ] cuota + gestión de impagos

**6 · Mantenimiento** `░░░░░░░░░░` 0% *(futuro)*
- [ ] spec operación de webs vivas

**7 · Mejora** `░░░░░░░░░░` 0% *(futuro)*
- [ ] minado de `agent_runs` → propuestas de diffs a skills/rúbricas

## Stack

| Capa | Tecnología |
|------|------------|
| App / dashboard | Next + Tailwind (Astro para marketing y webs de cliente) |
| Backend y datos | Supabase: Postgres + RLS multi-tenant, Auth, Storage, Edge Functions, pgvector (vía MCP) |
| IA | Claude (API de Anthropic), claves server-side |
| Diseño | `ui-ux-pro-max` + `frontend-design` (oficial Anthropic) + `estilo-evolink` (voz de proyecto) · motion (`gpt-tasteskill`, `ui-animation`) · QA (`web-design-guidelines` + `playwright-cli`) |
| Lead-gen / Billing / Deploy | Google Places API · Stripe (setup + suscripción) · Vercel + Cloudflare Pages + Supabase |

## Estructura del repositorio

```
.claude/                comandos (/inicio, /cierre), hooks y skills locales
generador/              motor del Agente Generador (Node + Astro): catálogo, ensamblador, evaluación
docs/bloques/           el MAPA del producto: un bloque por agente/área (1-captacion ... 7-mejora)
docs/                   BUSINESS.md, ROADMAP.md, contexto/ (inventario de skills), superpowers/ (specs)
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

## Documentación

- [`docs/BUSINESS.md`](docs/BUSINESS.md) — el negocio: qué, a quién, cómo se gana dinero (decisiones cerradas).
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fases del proyecto.
- [`docs/bloques/`](docs/bloques/) — el mapa del producto; cada bloque activo tiene su `ESTADO.md`.
- [`HANDOVER.md`](HANDOVER.md) — estado vivo de la última sesión.

---

Equipo: Kravitzz + 1 socio. Comunicación en español; código y commits en inglés.
