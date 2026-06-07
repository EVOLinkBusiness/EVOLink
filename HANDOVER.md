# HANDOVER — Webs Javi

**Última sesión:** 2026-06-08
**Branch:** main
**Último commit:** `(commit inicial pendiente)`

---

## Estado del proyecto
Infraestructura de trabajo recién montada (metodología re-oni-roll/AllergINC replicada). El negocio aún NO está diseñado ni implementado: estamos en F0 (infra) a punto de pasar a F1 (brainstorming/descomposición).

## Hecho en la sesión actual (2026-06-08)
- `git init` (branch main) + `.gitignore`.
- `CLAUDE.md` (manual operativo) y este `HANDOVER.md`.
- `docs/BUSINESS.md`, `docs/ROADMAP.md`, `docs/superpowers/ESTADO-FLUJO.md`, `docs/superpowers/specs/`.
- Comandos `/inicio` y `/cierre` (`.claude/commands/`).
- Hooks y scripts (`.claude/scripts/` + `.claude/settings.json`): watchdog de tokens, session-start, dirty-check, statusline.
- Memoria de proyecto guardada (webs-javi-venture).

## Subsistemas / módulos en estado
- Lead-gen (Google Places) — pendiente (diseño en F1).
- Producción web (pipeline IA) — pendiente.
- Ventas / outreach — pendiente.
- Entrega / hosting / billing — pendiente.
- Marketing automation — pendiente.

## Decisiones cerradas (no reabrir)
- Producción web = IA a medida con skills propias (ui-ux-pro-max + taste); código Astro/Next + Tailwind.
- Monetización = híbrida: setup inicial + cuota mensual (recurrencia).
- Lead-gen = Google Places API oficial.
- Metodología = réplica de re-oni-roll/AllergINC + plugin superpowers (brainstorming → spec → plan → código).

## Riesgos y avisos vivos
- Negocio en fase de diseño: nada de producto sin spec aprobada (HARD-GATE de brainstorming).
- Las 4 decisiones cerradas no se reabren sin acuerdo de los 2 socios.

## Próximo paso concreto
**Arrancar el brainstorming del negocio: descomponer en subsistemas y diseñar el primero.**
1. `/inicio` para cargar contexto.
2. Invocar la skill `brainstorming` (superpowers): descomposición en sub-proyectos (lead-gen, producción web, ventas, entrega/billing, marketing) y diseño del primero.
3. Generar la primera spec en `docs/superpowers/specs/` y actualizar `ESTADO-FLUJO.md`.

## Pendientes
- [ ] Brainstorming + descomposición del negocio (F1).
- [ ] Decidir qué subsistema se construye primero (probable: lead-gen o pipeline de producción).
- [ ] (Opcional) Crear remoto GitHub (cuenta Kravitzz) y `git push`.

## Comando para reanudar
/inicio
