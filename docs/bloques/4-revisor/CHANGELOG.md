# CHANGELOG — Bloque 4 (Revisor/QA)

Registro de evolución del bloque. Cada corrección motivada por un fallo se anota en UNA entrada (la más reciente arriba) con este formato:

- **[YYYY-MM-DD]** [error detectado] → [qué se cambió y dónde] → aprobado por [socio]. Run #[id en `agent_runs`, o "manual" si no hay run].

Ejemplo ilustrativo (NO real, no copiar):
- **[2026-07-02]** El pase de enlaces solo detectaba 404 y no la mezcla de dominios .com/.es (caso mudanzasroy.es) → añadida comprobación de dominio canónico al pase de enlaces → aprobado por Kravitzz. Run #127.

Reglas: nunca borrar entradas · si un cambio se revierte, se añade entrada nueva explicándolo · el bloque 7 (Mejora) usará este historial para validar que las correcciones siguen vigentes.

---

## Entradas

- **[29/06/2026]** Implementación del bloque 4 v1 (sesión 4B, piloto del esqueleto de 3 agentes ejecutado de extremo a extremo). Código en `revisor/` (carpeta propia que espeja convenciones de `generador/`; runner `node --import tsx --test`, 69 tests verdes). Commits `eb564f9`→`7887434`. Correcciones motivadas por fallos detectados en el propio piloto:
  - **Falso GRAVE por atributo `placeholder=`:** los checkers `findPlaceholders`/`findBrokenLinks` portados del bloque 3 marcaban GRAVE el atributo HTML legítimo `<textarea placeholder="…">` y el ancla no-op `href="#"`, rechazando las 8 previews limpias de Mudanzas Roy → en `revisor/scripts/evaluate-checks.ts`: `findPlaceholders` ahora hace strip de tags (y de `<script>`/`<style>`) y aplica los patrones solo sobre texto visible; se elimina la regla `href="#"` de placeholders y se ignora el ancla vacía en `findBrokenLinks`. Detectado por el orquestador y fijado con 4 tests de regresión del verificador (`tests/false-positives.test.ts` + fixture `form-legit.html`). Tras el fix, v4-1/v4-2 → `pass_with_warnings` (0 GRAVE). Commit `7887434`. → aprobado por los dos socios. Run: manual (E2E local; sin fila aún en `agent_runs`, ver nota de insert real pendiente).
  - **Linaje compartido — aviso al bloque 3:** `generador/scripts/evaluate-checks.ts` conserva el MISMO patrón de falso positivo (atributo `placeholder=` + `href="#"`). Candidato a portar el mismo fix allí (tarea del bloque 3 / rol Mejora), no tocado desde el 4 por frontera dura.
  - **Alcance v1 de "enlaces internos":** sobre preview de página única servida en local, las rutas de página (`/servicios`) no resuelven; el orquestador comprueba solo anclas `#id` localmente. La verificación de rutas completas queda para v2 (entrada URL pública). `findBrokenLinks` sigue validando rutas cuando se le pasan `validRoutes`.
  - **Lighthouse / impeccable** degradan a WARNING informativo si no corren limpios en local (conforme a spec §2/§4); nunca bloquean el pase.

- **[28/06/2026]** Creación del bloque 4 (Revisor/QA) v1 → diseño cerrado y aprobado (HARD-GATE): spec `docs/superpowers/specs/2026-06-28-revisor-v1-design.md` + `BLOQUE.md`/`CONTRATO.md`/`GUIA-DESARROLLO-BLOQUE.md`/`ESTADO.md` reescritos a v1, y ORDEN de ejecución en raíz. Decisiones cerradas hoy:
  - Alcance v1 = solo función QA de la preview del bloque 3 (entrada LOCAL autocontenida); upsell de webs ajenas diferido a v2.
  - Suite v1 = núcleo determinista (enlaces, mezcla de dominios, contraste AA, placeholders, responsive, anti-slop, Lighthouse como WARNING); se difieren formulario+Resend y check de motion.
  - Umbral: GRAVE (enlace roto / mezcla de dominios / contraste AA fallido / placeholder) bloquea publicación; el LLM solo clasifica lo ambiguo y redacta, no decide GRAVE.
  - Persistencia: reutiliza `agent_runs.output` (jsonb), sin tabla `reviews` ni migración nueva.
  - Rúbrica compartida con el bloque 3 (sin rúbrica propia).
  - Caso piloto: Mudanzas Roy (UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`), previews v4 en disco.
  → aprobado por los dos socios. Run: manual (bloque sin código aún).
