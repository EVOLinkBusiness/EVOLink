# Bloque 7 — Mejora continua

**Estado:** futuro (diferido por decisión de la spec del Auditor: en v1 solo se capturan señales).
**Rol en el tejido:** Mejora.

## Qué hará
Mina la tabla `agent_runs` (inputs, salidas, coste en tokens, veredictos de QA, correcciones humanas, flags) para detectar patrones de fallo y **proponer diffs** a las skills/rúbricas afectadas. **Un humano aprueba cada cambio** — nunca auto-modificación.

## Principios (adoptados de la evaluación de skills externas, 2026-06-10)
- **Marcadores de evolución:** todo cambio aprobado se anota en el CHANGELOG.md del bloque afectado con el error/run que lo motivó. *(Ya en vigor para todos los bloques, sin esperar a este.)*
- **Validación periódica:** cada N runs, revisar que las correcciones pasadas siguen siendo válidas — evita sobre-generalizar de un caso aislado.
- Se descartó importar `charon-fan/self-improving-agent` (auditorías de seguridad en "Warn", memoria en markdown auto-reescrito). Nuestra versión usa datos estructurados en Supabase + aprobación humana.

## Dependencias
Requiere que los bloques 2-4 estén instrumentados con `agent_runs` (lo están por contrato desde la spec del Auditor).
