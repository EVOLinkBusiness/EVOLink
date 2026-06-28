# GUÍA DE DESARROLLO — Bloque <N> (<nombre>)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/<bloque>-agente-accesos.md`.)

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño y escribe la spec/plan. Lee este archivo + `CONTRATO.md` + la spec del bloque.
2. `programador` (Sonnet): implementa con TDD según el plan. Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión; emite veredicto.

## Orden de una tarea
brainstorming → spec → writing-plans → (programador implementa con TDD ↔ verificador revisa) → QA → entrega.

## Skills del bloque
<índice / enlace a referencias/<bloque>-agente-accesos.md>.

## Criterios de "hecho"
- <cumple rúbrica / registra en agent_runs / veredicto del verificador = aprobado>.

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
