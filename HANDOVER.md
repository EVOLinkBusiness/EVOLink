# HANDOVER — EVOLink

**Última sesión:** 2026-06-11
**Branch:** main
**Último commit:** `chore: migracion a repo conjunto EVOLinkBusiness` (este mismo)

---

## Estado del proyecto
EVOLink = agencia web semiautónoma (mapa de 4 agentes sobre Supabase; los humanos cierran la venta). **Reorganización por bloques completada:** 7 bloques en `docs/bloques/`, CLAUDE.md v2 (regla 200 líneas), /inicio y /cierre v2, skill `playwright-cli` instalada, inventario de skills creado. Aún NO hay código de producto.

## Bloque activo
2-auditor — detalle en `docs/bloques/2-auditor/ESTADO.md` (spec aprobada; siguiente: writing-plans)

## Hecho en la sesión actual (2026-06-11)
- **Migración al repo conjunto COMPLETADA:** `origin` → `https://github.com/EVOLinkBusiness/EVOLink` (historial completo subido; Kravitzz como colaborador). URL antigua sustituida en README, GUIA-COLABORADOR.txt y docs/TRANSICION-PLANIFICACION.md.

## Hecho en la sesión anterior (2026-06-10)
- CLAUDE.md v2: arquitectura de bloques + regla de 200 líneas + aprendizaje vía CHANGELOG por bloque.
- Creados los 7 bloques en `docs/bloques/` (contratos, rúbrica del Generador, ESTADO del Auditor, CHANGELOG con formato de registro de errores + ejemplo en cada bloque).
- /inicio y /cierre v2: bloque activo + decisiones por referencia (fin de la duplicación con BUSINESS.md).
- Instalada y aplanada la skill `playwright-cli` (Microsoft; QA del Generador y base del Revisor).
- `docs/contexto/inventario-skills.md`: mapa skill→bloque con criba aprobada y ejecutada (grupo taste archivado).
- ROADMAP referenciando bloques. Eliminado ESTADO-FLUJO.md (migrado al bloque 2).
- Descartada la skill externa `self-improving-agent` (seguridad en Warn); sus 2 buenas ideas adoptadas en el bloque 7.
- Creadas las fichas de accesos de los 4 agentes (`docs/bloques/{1,2,3,4}-*/referencias/*-agente-accesos.md`): mapa de skills/APIs/MCPs, flujo, señales de aprendizaje y conexiones. Insumo de cada writing-plans.
- Criba de skills APROBADA por ambos socios y ejecutada: grupo taste archivado en `docs/archivo-skills/`; 31 skills activas mapeadas a bloque en `docs/contexto/inventario-skills.md`.
- Instaladas 5 skills nuevas aprobadas: `frontend-design` (oficial), `next-best-practices`, `extract-design-system`, `seo-audit`, `copywriting`.
- Evaluado Claude Design (beta Anthropic): NO sustituye al Generador (sin API, no automatizable); aprobado como herramienta de los socios para la fase de validación manual y el piloto mudanzasroy.es.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (8 activas). Nueva de esta sesión (añadida a BUSINESS.md como punto 8): los bloques viven en `docs/bloques/`; skills ejecutables en `.claude/skills/`.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json`.
- Skills globales no usadas cargan tokens cada sesión → poda pendiente (ver inventario).

## Próximo paso concreto
**Empezar la programación:** `writing-plans` sobre la spec aprobada del Auditor v1 (bloque 2, `docs/bloques/2-auditor/ESTADO.md`).

## Pendientes
- [x] Migración a repo conjunto (2026-06-11).
- [ ] `writing-plans` del Auditor v1.
- [ ] Sesión: canales de promoción (punto abierto en BUSINESS.md).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente.

## Comando para reanudar
/inicio
