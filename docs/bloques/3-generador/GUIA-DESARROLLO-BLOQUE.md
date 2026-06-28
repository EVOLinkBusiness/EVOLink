# GUÍA DE DESARROLLO — Bloque 3 (Generador web)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/generador-agente-accesos.md`.)

## Diseño vigente
- Spec VIGENTE (v4, ejecutada): `docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md`
  (absorbe y sustituye el plan v3; director de arte autónomo, flujo dinámico 8-12).
- Diseño v2 (base implementada): `docs/superpowers/specs/2026-06-14-generador-diseño-v2.md`.

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
