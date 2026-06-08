# HANDOVER — EVOLink

**Última sesión:** 2026-06-08
**Branch:** main
**Último commit:** `chore: curate design skills + collaborator guide (cierre 2026-06-08)`
**Remoto:** `origin` = https://github.com/Kravitzz/Proyecto-Webs (privado; migrará a cuenta conjunta)

---

## Estado del proyecto
Infraestructura + metodología montadas, versionadas y subidas a GitHub (privado). Set de skills de diseño curado. El negocio sigue en F0→F1: aún NO hay diseño ni código de producto.

## Hecho en la sesión actual (2026-06-08)
- Bootstrap completo (CLAUDE/HANDOVER/docs/comandos/hooks) + 28 skills versionadas + repo remoto creado y push.
- `GUIA-COLABORADOR.txt`: guía paso a paso (clonar en VS Code + mecánica diaria pull → /inicio → trabajo → /cierre → push, nunca los dos a la vez).
- Skills curadas: **+`ui-animation`** (micro-interacciones, recetas de transición, perf/a11y) y **+`web-design-guidelines`** (QA: accesibilidad + Web Interface Guidelines), aplanadas a carpetas reales/portables. **−`css-animations`** (era adapter de HyperFrames, no encajaba). Retirados `.agents/` + symlinks + lockfile.
- `CLAUDE.md` actualizado con el combo de diseño (generación / motion / QA); las 2 nuevas ocultas en explorador y agrupadas en "UI-UX skill".

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
- Set de skills de diseño = generación (ui-ux-pro-max + taste) · motion (gpt-tasteskill + ui-animation) · QA (web-design-guidelines). css-animations descartada.

## Riesgos y avisos vivos
- Negocio en fase de diseño: nada de producto sin spec aprobada (HARD-GATE de brainstorming).
- Las decisiones cerradas no se reabren sin acuerdo de los 2 socios.
- Migración prevista (≈mediados de junio 2026) a cuenta conjunta. Historial git portable (transferir repo en GitHub o nuevo remoto + `git push`); no se pierde nada.
- **Skills con `npx skills add`:** el CLI crea `.agents/` + symlink de ruta ABSOLUTA (se rompe al clonar). Tras instalar, aplanar a carpeta real en `.claude/skills/` y borrar `.agents/` + `skills-lock.json` (como se hizo con ui-animation/web-design-guidelines).

## Próximo paso concreto
**Arrancar el brainstorming del negocio (F1): descomponer en subsistemas y diseñar el primero.**
1. `/inicio` para cargar contexto.
2. Invocar la skill `brainstorming` (superpowers): descomposición (lead-gen, producción web, ventas, entrega/billing, marketing) y diseño del primero.
3. Generar la primera spec en `docs/superpowers/specs/` y actualizar `docs/superpowers/ESTADO-FLUJO.md`.

## Pendientes
- [ ] Brainstorming + descomposición del negocio (F1).
- [ ] Decidir qué subsistema se construye primero (probable: lead-gen o pipeline de producción).
- [ ] Migrar el repo a la cuenta conjunta cuando esté lista (transferencia GitHub o nuevo remoto + push).

## Comando para reanudar
/inicio
