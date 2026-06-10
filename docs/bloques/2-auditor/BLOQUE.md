# Bloque 2 — Auditor

**Estado:** ACTIVO (F1). Spec aprobada; siguiente paso: `writing-plans`.
**Rol en el tejido:** Creación (audita la presencia digital de un negocio).

## Qué hace
Dado un negocio sin web (o con web floja), produce una auditoría profesional de presencia digital. Doble función: **gancho de venta + brief** para el bloque 3 (Generador).

## Contrato (de la spec aprobada)
- **Entrada:** datos del negocio (manuales en v1).
- **Salida:** auditoría (motor híbrido: reglas deterministas + Claude para juicio/redacción) + informe web + registro completo en `agent_runs` (inputs, tokens, coste, duración, estado, flags de supervisión).
- **Supervisión:** pase de revisión (reglas + check Claude) antes del humano.

## Documentos
- Spec: `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`
- Estado del flujo: `ESTADO.md` (esta carpeta)
- Mapa de accesos (skills, APIs, MCPs): `referencias/auditor-agente-accesos.md` (esta carpeta)

## Skills/herramientas que usa
Supabase (Edge Functions, RLS multi-tenant) · skills `supabase` + `supabase-postgres-best-practices` · API Claude server-side · dashboard Next.
