# Bloque 3 — Generador web

**Estado:** **implementado v1 (2026-06-13) + diagnóstico superado (2026-06-14) → listo para piloto.** Co-prioritario con el bloque 1.
**Rol en el tejido:** Creación. Fórmula: **fabricar → evaluar → entregar**.
**Spec (fuente de diseño):** `docs/superpowers/specs/2026-06-12-generador-v1-design.md`.
**Plan de implementación:** `docs/superpowers/plans/2026-06-13-generador-v1.md`.

## Qué hace
De la auditoría (bloque 2, JSON `result`) + datos del cliente → web Astro funcional con marca, rápida y que no parece plantilla. Vía volumen/cuota, no arte a medida. **Determinista primero, LLM solo para juicio:** el modelo escribe el plan; un ensamblador determinista monta el sitio.

## Pipeline de 6 etapas (artefactos en `clientes/<id>/`, gitignored)
| # | Etapa | Quién | Artefacto |
|---|-------|-------|-----------|
| 1 | Brief | modelo | `brief.md` |
| 2 | Marca | modelo + `brandkit` | `marca.json` |
| 3 | Plan de página | modelo (catálogo + textos) | `plan-pagina.json` |
| 4 | Construcción | script `npm run assemble` | `site/` Astro compilable |
| 5 | Evaluación | script `npm run evaluate` + modelo | `informe-evaluacion.md` |
| 6 | Entrega | script `npm run deploy` + humanos | URL preview Cloudflare |

**2 checkpoints humanos (HARD-GATE):** 🔵 tras etapas 1+3 (brief+plan); 🔵 tras etapa 5 (preview pre-cliente). Evaluación: máx. 2 iteraciones automáticas. Orquestación detallada en la skill `generador-web`.

## Contrato del bloque (spec §6)
- **Entrada:** JSON `result` de la auditoría (incluye datos del formulario de entrada) + campos propios de web (preferencias de estilo, fotos).
- **Salida:** web en Cloudflare Pages (preview) + artefactos de las 6 etapas + registro en `agent_runs` (un run por etapa: `agent='generador'`, `stage`, inputs/outputs/flags, coste 0 en v1).

## Motor (`generador/`)
- `catalogo/` — componentes Astro (Header, Hero, Services, Testimonials, Gallery, Cta, ContactForm, Footer × 2-3 variantes + Layout); estilos vía CSS vars de marca.
- `plantilla-astro/` — esqueleto base (Astro 5 + Tailwind 3).
- `scripts/` — `schema.ts` (validadores), `assemble.ts` (ensamblador determinista), `evaluate.cli.ts` + `evaluate-checks.ts` + `report.ts` (evaluación), `run-record.ts` + `record.cli.ts` (registro), `deploy.cli.ts` (entrega).
- `tests/` — suite `node:test` (TDD): schema, assemble, evaluate-checks, report, run-record.
- Comandos: `npm test` · `npm run assemble|evaluate|deploy|record -- <args>`.

## Índice de skills (qué se usa en cada paso)
| Paso | Skill |
|------|-------|
| Voz de diseño (etapas 2-3) | **`estilo-evolink`** (consolida el grupo taste; coexiste con `frontend-design`) |
| Orquestación de las 6 etapas | **`generador-web`** (skill del bloque) |
| Identidad de marca (etapa 2) | `brandkit` |
| Motor de diseño (etapa 3) | `ui-ux-pro-max` *(activa, en evaluación)* |
| Textos (etapa 3) | `copywriting` |
| Macro-motion / micro | `gpt-tasteskill` *(en evaluación)* · `ui-animation` |
| Evaluar (etapa 5) | `playwright-cli` + `web-design-guidelines` + `verification-before-completion` |
| Rediseños (reserva, v1.1) | `redesign-skill` · `extract-design-system` |
| Imágenes IA (reserva, no v1) | `image-to-code-skill` · `imagegen-frontend-web` |

Detalle de accesos: `referencias/generador-agente-accesos.md`. Rúbrica (compartida con bloque 4): `rubrica.md`.

## Dependencias para el run real (no bloquean el motor; sí el piloto)
- Cloudflare: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (deploy preview).
- Supabase: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (registro `agent_runs`).
- Resend: endpoint del formulario (`form_action`) — envío real validado en el piloto.

## Pendientes del bloque
- [ ] Run piloto: web nueva de cliente real del nicho (ver Pendientes del HANDOVER).
- [ ] Evaluar `ui-ux-pro-max` y `gpt-tasteskill` tras las primeras webs → anotar veredicto en CHANGELOG.
- [x] Brainstorming → spec propia. · [x] Grupo taste consolidado en `estilo-evolink`.
