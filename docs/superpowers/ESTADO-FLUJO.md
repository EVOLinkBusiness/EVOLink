# Estado del flujo de Superpowers — EVOLink

Registra en qué punto del proceso superpowers estamos, para reanudar sin perder contexto. La memoria del proyecto son estos documentos versionados, no ninguna sesión concreta.

Fase global: **F1 — Agente Auditor + backbone**. Diseño cerrado (spec escrita y aprobada). Siguiente: `writing-plans`.

## Regla de continuidad
Antes de cerrar, `/cierre` vuelca el estado a `HANDOVER.md`; al abrir, `/inicio` lo recupera. Mientras el repo esté commiteado, no se pierde detalle.

## Subsistemas (cada uno su ciclo spec → plan → código)
1. **Auditor** ← actual (spec lista)
2. Generador web
3. Funnel / captación (Maps + outreach)
4. Entrega / hosting / billing
5. Aprendizaje + upsell
6. Marketing

## Checklist de brainstorming — subsistema: Auditor v1
| # | Paso | Estado |
|---|------|--------|
| 1 | Explorar contexto | Hecho |
| 2 | Companion visual | N/A (preguntas conceptuales) |
| 3 | Preguntas de aclaración | Hecho |
| 4 | Proponer enfoques | Hecho |
| 5 | Presentar diseño y aprobar | Hecho |
| 6 | Escribir spec | Hecho (`specs/2026-06-08-auditor-v1-design.md`) |
| 7 | Auto-revisión de la spec | Hecho |
| 8 | Revisión del usuario | Hecho (aprobada) |
| 9 | Pasar a writing-plans | **Siguiente** |

## Dónde retomar
Invocar `writing-plans` sobre la spec del Auditor v1 para generar el plan de implementación.
