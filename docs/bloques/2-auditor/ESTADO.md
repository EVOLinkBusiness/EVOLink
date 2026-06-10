# ESTADO — Bloque 2 (Auditor) · flujo superpowers

Fase global: **F1 — Agente Auditor + backbone Supabase**. Diseño cerrado (spec escrita y aprobada). **Siguiente: `writing-plans`.**

## Checklist de brainstorming — Auditor v1
| # | Paso | Estado |
|---|------|--------|
| 1 | Explorar contexto | Hecho |
| 2 | Companion visual | N/A (preguntas conceptuales) |
| 3 | Preguntas de aclaración | Hecho |
| 4 | Proponer enfoques | Hecho |
| 5 | Presentar diseño y aprobar | Hecho |
| 6 | Escribir spec | Hecho (`docs/superpowers/specs/2026-06-08-auditor-v1-design.md`) |
| 7 | Auto-revisión de la spec | Hecho |
| 8 | Revisión del usuario | Hecho (aprobada) |
| 9 | Pasar a writing-plans | **Siguiente** |

## Dónde retomar
Invocar `writing-plans` sobre la spec del Auditor v1. Orden sugerido del plan: backbone Supabase (tablas + RLS) → rúbrica de scoring (TDD) → Edge Function `generate-audit` → supervisión → dashboard Next → informe público.

En paralelo (validación sin promo): piloto `mudanzasroy.es` + auditorías manuales de reformas.
