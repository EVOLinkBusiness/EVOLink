# CHANGELOG — Bloque 2 (Auditor)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El scoring daba 0 a negocios con ficha de Google Maps válida (falso negativo en el motor de reglas) → añadida regla "ficha de Maps verificada ⇒ score base ≥ 20" a la rúbrica de scoring → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---
*(sin entradas — bloque aún sin código)*
