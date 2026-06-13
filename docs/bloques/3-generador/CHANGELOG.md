# CHANGELOG — Bloque 3 (Generador web)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** Los formularios generados enviaban sin validar el email (el paso "evaluar" no lo cubría) → añadido check de validación de formulario a `rubrica.md` y al script de playwright-cli → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---

- **[2026-06-13] · DIAGNÓSTICO v1 (cabecera de sesión)** — Auditoría profunda previa al piloto. **Robustez (FASE 1):** suite adversaria de entrada válida-pero-hostil (HTML/`<script>`, comillas, emojis, ñ/tildes, opcionales ausentes, textos ~1800 chars) + build real. Resultado: 0 fugas `null`/`undefined`/`[object Object]`, escapado completo de Astro verificado (atributos y RCDATA; `og:title` con `<script>` es inerte porque la `"` se escapa a `&#34;` → sin XSS). **1 bug** (ver entrada siguiente). **Skills (FASE 2):** sin contradicciones duras entre `frontend-design` (método, 1º) / `estilo-evolink` (voz de proyecto, 2º, precedencia) / `generador-web` (orquesta); enforcement de fuente única en `rubrica.md`+`evaluate`; añadido el orden explícito al orquestador (commit `d3b1c46`). **Calidad (FASE 3):** 3 webs ficticias (reformas-garcia/novabano/montanes) con paletas, variantes y mezclas de sección distintas → variedad real, no plantilla, copy específico; las 3 **PASAN** (Lighthouse móvil 91/94/98, 0 rotos, AA, formulario OK). 2 hallazgos de calidad que el gate ≥90 caza solo: (a) `google_fonts` vía `<link>` hunde el móvil bajo 90 (86→91 al quitarlo; v1 sin self-hosting → usar stack de sistema, ya mandado por `estilo-evolink §2`); (b) HeroC a sangre con imagen remota sobredimensionada penaliza LCP (1600×900→86; 1024×576→94 → limitar dimensiones del hero). Aprobado por Kravitzz. Runs: manual (3 muestras).
- **[2026-06-13]** `validatePlanPagina` exigía `nombre_negocio` en el Footer aunque `injectDefaults` lo deriva de `marca` (como en Header): un `plan-pagina.json` del LLM que lo omitiera fallaba en vez de degradar → quitado de `Footer.required` en `schema.ts` + test de regresión en la suite adversaria → aprobado por Kravitzz. Run: manual (diagnóstico FASE 1, commit `67b6abb`).
- **[2026-06-13]** En FASE 8, re-ensamblar borra `site/` entero (incl. `node_modules`) y el build de `evaluate` fallaba (`astro` no encontrado) → `evaluate.cli.ts` hace `npm install` automático si falta `node_modules` antes de construir (pipeline reanudable tras un ensamblado limpio) → aprobado por Kravitzz. Run: manual (E2E `demo`).
- **[2026-06-13]** El checker de enlaces (`evaluate-checks.ts`) marcaba como roto el `href` de `<link rel=stylesheet>` (`/_astro/*.css`), no solo las anclas → `findBrokenLinks` ahora solo escanea `<a href>` (los assets los gestiona el build) → aprobado por Kravitzz. Run: manual (E2E `demo`, FASE 8).
- **[2026-06-13]** Lighthouse fallaba con EPERM al crear su `user-data-dir` en el temp global del sistema (entorno restringido) → `evaluate.cli.ts` lanza chrome-launcher con un `userDataDir` local dentro de `clientes/<id>/eval/` → aprobado por Kravitzz. Run: manual (E2E `demo`, Lighthouse 98).
