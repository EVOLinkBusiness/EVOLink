# Bloque 4 — Revisor/QA de webs

**Estado:** futuro. **Depende del bloque 3** (no se revisa antes de generar).
**Rol en el tejido:** Supervisión.

## Qué hace
Busca fallos en webs generadas y en webs de clientes potenciales de upsell (vía rediseño): enlaces rotos, formularios muertos, velocidad, render móvil. Aquí encaja el mantenimiento preventivo y el gancho de upsell ("tu web tiene N fallos").

## Herramienta principal
`playwright-cli` (skill aplanada en `.claude/skills/playwright-cli/`): navegación, clic, formularios, capturas, inspección de red, sesiones con nombre. Comparte rúbrica con el bloque 3 (`../3-generador/rubrica.md`) — una sola rúbrica, dos consumidores.

## Caso de prueba identificado
`mudanzasroy.es`: enlaces internos rotos mezclando .com/.es, URL malformada, diseño anticuado — detectable con un pase de comprobación de enlaces.

Detalle completo: `referencias/revisor-agente-accesos.md` (esta carpeta).
