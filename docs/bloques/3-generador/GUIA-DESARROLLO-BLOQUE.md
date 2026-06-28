# GUÍA DE DESARROLLO — Bloque 3 (Generador web)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/generador-agente-accesos.md`.)

## Diseño vigente
- Plan VIGENTE: `docs/superpowers/plans/2026-06-22-generador-director-arte-v3.md` (rediseño v3, pendiente de ejecución).
- Diseño v2 (terminado): `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`.
- Spec v3 (a formalizar al ejecutar el v3): `docs/superpowers/specs/2026-06-22-generador-director-arte-v3.md`.

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño de la tarea y escribe la spec/plan. Lee este archivo + `CONTRATO.md` + el plan/spec vigente del bloque.
2. `programador` (Sonnet): implementa con TDD según el plan. Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión; emite veredicto.

## Orden de una tarea
brainstorming → spec → writing-plans → (programador implementa con TDD ↔ verificador revisa) → QA con `playwright-cli` → entrega.

## Skills del bloque
Índice completo en `referencias/generador-agente-accesos.md`. Cerebro: `impeccable`. Diales: `design-taste-frontend`. Stack: `next-best-practices`. QA: `playwright-cli` + `verification-before-completion`.

## Criterios de "hecho"
- Cumple la rúbrica (`rubrica.md`): responsive, Lighthouse, enlaces, formulario, contraste, cero relleno.
- Registra en `agent_runs` (tokens/coste/veredicto).
- Veredicto del verificador = aprobado.

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
