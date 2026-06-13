# CHANGELOG — Bloque 3 (Generador web)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** Los formularios generados enviaban sin validar el email (el paso "evaluar" no lo cubría) → añadido check de validación de formulario a `rubrica.md` y al script de playwright-cli → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---

- **[2026-06-13]** El checker de enlaces (`evaluate-checks.ts`) marcaba como roto el `href` de `<link rel=stylesheet>` (`/_astro/*.css`), no solo las anclas → `findBrokenLinks` ahora solo escanea `<a href>` (los assets los gestiona el build) → aprobado por Kravitzz. Run: manual (E2E `demo`, FASE 8).
- **[2026-06-13]** Lighthouse fallaba con EPERM al crear su `user-data-dir` en el temp global del sistema (entorno restringido) → `evaluate.cli.ts` lanza chrome-launcher con un `userDataDir` local dentro de `clientes/<id>/eval/` → aprobado por Kravitzz. Run: manual (E2E `demo`, Lighthouse 98).
