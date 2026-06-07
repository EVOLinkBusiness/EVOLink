# HANDOVER — Webs Javi

**Última sesión:** 2026-06-08
**Branch:** main
**Último commit:** `c89c072 chore: vendor local Claude skills for team access`
**Remoto:** `origin` = https://github.com/Kravitzz/Proyecto-Webs (migrará a cuenta conjunta)

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
- Skills locales (28) versionadas en git para el socio; junctions NTFS excluidas.
- Repo remoto creado y push inicial: `origin` = https://github.com/Kravitzz/Proyecto-Webs.

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
- Migración prevista (≈mediados de junio 2026): mover el repo a una cuenta conjunta de los 2 socios. El historial git es portable (transferir el repo en GitHub o añadir el nuevo remoto y `git push`); no se pierde nada.

## Próximo paso concreto
**Arrancar el brainstorming del negocio: descomponer en subsistemas y diseñar el primero.**
1. `/inicio` para cargar contexto.
2. Invocar la skill `brainstorming` (superpowers): descomposición en sub-proyectos (lead-gen, producción web, ventas, entrega/billing, marketing) y diseño del primero.
3. Generar la primera spec en `docs/superpowers/specs/` y actualizar `ESTADO-FLUJO.md`.

## Pendientes
- [ ] Brainstorming + descomposición del negocio (F1).
- [ ] Decidir qué subsistema se construye primero (probable: lead-gen o pipeline de producción).
- [ ] Migrar el repo a la cuenta conjunta cuando esté lista (transferencia GitHub o nuevo remoto + push).
- [ ] Confirmar que el repo de GitHub es PRIVADO (es estrategia de negocio).

## Comando para reanudar
/inicio
