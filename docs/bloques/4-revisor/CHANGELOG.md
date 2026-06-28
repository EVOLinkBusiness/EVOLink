# CHANGELOG — Bloque 4 (Revisor/QA)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El pase de enlaces solo detectaba 404 y no la mezcla de dominios .com/.es (caso mudanzasroy.es) → añadida comprobación de dominio canónico al pase de enlaces → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---

## Entradas

- **[28/06/2026]** Creación del bloque 4 (Revisor/QA) v1 → diseño cerrado y aprobado (HARD-GATE): spec `docs/superpowers/specs/2026-06-28-revisor-v1-design.md` + `BLOQUE.md`/`CONTRATO.md`/`GUIA-DESARROLLO-BLOQUE.md`/`ESTADO.md` reescritos a v1, y ORDEN de ejecución en raíz. Decisiones cerradas hoy:
  - Alcance v1 = solo función QA de la preview del bloque 3 (entrada LOCAL autocontenida); upsell de webs ajenas diferido a v2.
  - Suite v1 = núcleo determinista (enlaces, mezcla de dominios, contraste AA, placeholders, responsive, anti-slop, Lighthouse como WARNING); se difieren formulario+Resend y check de motion.
  - Umbral: GRAVE (enlace roto / mezcla de dominios / contraste AA fallido / placeholder) bloquea publicación; el LLM solo clasifica lo ambiguo y redacta, no decide GRAVE.
  - Persistencia: reutiliza `agent_runs.output` (jsonb), sin tabla `reviews` ni migración nueva.
  - Rúbrica compartida con el bloque 3 (sin rúbrica propia).
  - Caso piloto: Mudanzas Roy (UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`), previews v4 en disco.
  → aprobado por los dos socios. Run: manual (bloque sin código aún).
