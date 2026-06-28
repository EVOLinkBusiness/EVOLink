# GUÍA DE DESARROLLO — Bloque 4 (Revisor/QA)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/revisor-agente-accesos.md`.)

Este bloque es el **PILOTO oficial del esqueleto de agentes**: sirve para validar el flujo de los 3 agentes de extremo a extremo.

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño y escribe la spec/plan + la ORDEN. Lee este archivo + `CONTRATO.md` + la spec del bloque. No implementa.
2. `programador` (Sonnet): implementa con TDD según el plan (suite QA con `playwright-cli`, registro en `agent_runs`). Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión (cumple-spec → calidad); emite veredicto. NO reescribe el código del programador.

## Orden de una tarea
brainstorming → spec (`docs/superpowers/specs/`) → writing-plans + ORDEN → (programador implementa con TDD ↔ verificador revisa) → QA → entrega.
HARD-GATE: nada de producto sin la spec aprobada por el humano.

## Skills del bloque
- `playwright-cli` (principal): navegación real, clic en enlaces, envío de formularios, capturas, inspección de red, sesiones con nombre.
- Lighthouse (vía playwright/CLI): performance móvil (umbral rúbrica ≥ 90).
- `seo-audit` (compartida con bloque 2): checklist técnico/SEO para webs EXISTENTES de upsell.
- Rúbrica COMPARTIDA con el bloque 3: `../3-generador/rubrica.md`, sección «Comprueba SCRIPT».
- Mapa completo de accesos y doble función: `referencias/revisor-agente-accesos.md`.

## Criterios de "hecho"
- La suite QA corre sobre una preview local servida por `http.server` y produce un veredicto reproducible (determinista primero; LLM solo para juicio de gravedad/comunicación).
- Cada pase de revisión registra una fila en `agent_runs` (`agent='revisor'`) con hallazgos, veredicto y coste.
- El piloto detecta los fallos del caso `mudanzasroy` (enlaces rotos / mezcla de dominios) como hallazgo GRAVE.
- Veredicto del verificador = aprobado (cumple-spec y calidad).

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE). Esta sesión de diseño NO escribe código de producto.
- El Revisor solo INSPECCIONA: no genera ni corrige la web (frontera con el bloque 3).
- Determinista primero: el script decide los hechos; el LLM solo juzga gravedad/comunicación.
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
- El bloque COMPARTE la rúbrica del 3; no crea una propia salvo decisión explícita de los 2 socios.
