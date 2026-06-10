# HANDOVER — EVOLink

**Última sesión:** 2026-06-11
**Branch:** main
**Último commit:** `d6ee008 chore: migracion a repo conjunto EVOLinkBusiness`

---

## Estado del proyecto
EVOLink = agencia web semiautónoma (mapa de 4 agentes sobre Supabase; los humanos cierran la venta). Reorganización por bloques completada y **repo conjunto operativo**: el proyecto vive en `https://github.com/EVOLinkBusiness/EVOLink` (privado, ambos socios con acceso). Aún NO hay código de producto.

## Bloque activo
2-auditor — detalle en `docs/bloques/2-auditor/ESTADO.md` (spec aprobada; siguiente: writing-plans)

## Hecho en la sesión actual (2026-06-11)
- **Migración al repo conjunto COMPLETADA:** `origin` → `https://github.com/EVOLinkBusiness/EVOLink` (cuenta de usuario EVOLinkBusiness), historial completo subido, Kravitzz como colaborador.
- Repo nuevo puesto en **privado**; el antiguo `Kravitzz/EVOLink` queda **archivado** en GitHub.
- URL antigua sustituida en README.md, GUIA-COLABORADOR.txt (línea de clone del socio) y docs/TRANSICION-PLANIFICACION.md. Remoto de respaldo `old-origin` eliminado tras verificar.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Sin nuevas en esta sesión.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente (ver inventario).

## Próximo paso concreto
**OBJETIVO DE LA PRÓXIMA SESIÓN: `writing-plans` del Auditor v1 (bloque 2) — primer plan de implementación del proyecto.**
1. Leer la spec aprobada y `docs/bloques/2-auditor/referencias/auditor-agente-accesos.md` (insumo del plan).
2. Aplicar la skill `writing-plans` sobre la spec → plan de implementación por tareas.
3. Aprobación del plan por el usuario antes de tocar código (HARD-GATE).

## Pendientes
- [ ] `writing-plans` del Auditor v1 (próxima sesión).
- [ ] Sesión: canales de promoción (punto abierto en BUSINESS.md).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
