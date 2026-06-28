# GUÍA DE DESARROLLO — Bloque 4 (Revisor/QA)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/revisor-agente-accesos.md`.)

Este bloque es el **PILOTO oficial del esqueleto de agentes**: valida el flujo de los 3 agentes de extremo a extremo. Diseño: `docs/superpowers/specs/2026-06-28-revisor-v1-design.md`.

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): cierra el diseño y escribe la spec/plan + la ORDEN. Lee este archivo + `CONTRATO.md` + la spec del bloque. No implementa.
2. `programador` (Sonnet): implementa con TDD según el plan (suite QA con `playwright-cli` + `impeccable`, registro en `agent_runs`). Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión (cumple-spec → calidad); emite veredicto. NO reescribe el código del programador.

## Orden de una tarea
brainstorming → spec (`docs/superpowers/specs/`) → writing-plans + ORDEN → (programador implementa con TDD ↔ verificador revisa) → QA → entrega.
HARD-GATE: nada de producto sin la spec aprobada por el humano.

## Skills del bloque
- `playwright-cli` (principal): navegación real, clic en enlaces, capturas, inspección de red, viewports, sesiones con nombre.
- `impeccable` (`.claude/skills/impeccable/`): detector anti-slop + contraste; engines `static-html`, `browser`, `contraste`. CLI = barato en tokens; sin instalación global.
- Lighthouse (vía playwright/CLI): performance móvil. En v1 es WARNING (en local no es representativo); GRAVE ≥90 solo con URL pública en v2.
- `seo-audit` (compartida con bloque 2): checklist técnico/SEO para webs EXISTENTES de upsell (función v2, diferida).
- Rúbrica COMPARTIDA con el bloque 3: `../3-generador/rubrica.md`, sección «Comprueba SCRIPT». No tiene rúbrica propia.
- Mapa completo de accesos y doble función: `referencias/revisor-agente-accesos.md`.

## Criterios de "hecho"
- La suite QA corre sobre una preview v4 local de Mudanzas Roy servida por `http.server` y produce un veredicto reproducible (determinista primero; LLM solo para juicio de gravedad/comunicación).
- Los checks GRAVE (1-4: enlaces, dominios, contraste AA, placeholders) son deterministas: cero dependencia del LLM.
- Cada pase de revisión registra una fila en `agent_runs` (`agent='revisor'`) con hallazgos, veredicto y coste.
- El piloto detecta enlaces rotos / mezcla de dominios como GRAVE cuando existen, y NO marca GRAVE falsos en una preview limpia.
- El servidor `http.server` queda siempre apagado.
- Veredicto del verificador = aprobado (cumple-spec y calidad).

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- El Revisor solo INSPECCIONA: no genera ni corrige la web (frontera con el bloque 3).
- Determinista primero: el script decide los hechos; el LLM solo juzga lo ambiguo y redacta la comunicación. Nunca decide un GRAVE.
- El verificador no reescribe el código del programador.
- Un bloque por sesión.
- El bloque COMPARTE la rúbrica del 3; no crea una propia salvo decisión explícita de los 2 socios.
- v1 reutiliza `agent_runs` (sin tabla ni migración nueva); `clientes/` está gitignored (no se commitean previews ni capturas).
