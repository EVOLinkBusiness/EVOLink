# CHANGELOG — Bloque 2 (Auditor)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El scoring daba 0 a negocios con ficha de Google Maps válida (falso negativo en el motor de reglas) → añadida regla "ficha de Maps verificada ⇒ score base ≥ 20" a la rúbrica de scoring → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
- **[2026-06-11]** El test del happy path destapó que `llmCheck` (supervisor) lanzaba excepción si la salida de Haiku no traía el campo `flags`, tumbando el run entero → parseo defensivo en `supabase/functions/_shared/supervisor.ts` (flags ausentes/malformados ⇒ `[]`, el run continúa) → aprobado por Kravitzz (ejecución del plan aprobado). Run manual (test, commit `b386b92`).
- **[2026-06-11]** Los advisors de Supabase avisaron de `search_path` mutable en `set_updated_at` y de `is_admin()` ejecutable por `anon`; además el proyecto tiene default privileges recortados (sin SELECT/INSERT ni para `service_role`, habría roto la Edge Function) → migraciones `20260611000003_hardening.sql` + `20260611000004_grants.sql` → aprobado por Kravitzz. Run manual (commit `f598585`).
