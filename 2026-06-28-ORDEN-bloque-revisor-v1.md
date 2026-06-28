# ORDEN — Implementar Bloque 4 (Revisor/QA) v1

**Fecha:** 28/06/2026. **Tipo:** ORDEN ejecutable (cubo C — se autoborra al completarse; la spec permanece).
**Spec fuente (el QUÉ):** `docs/superpowers/specs/2026-06-28-revisor-v1-design.md`.
**Sesión:** nueva (`/clear`), un bloque por sesión. La sesión principal orquesta y delega en los 3 agentes.

Esto es el CÓMO/CUÁNDO desechable. Si algo contradice la spec, manda la spec. No reabras decisiones cerradas (ver CHANGELOG del bloque 4, entrada 28/06/2026).

---

## 0. Contexto que el orquestador inyecta a los agentes
Un subagente NO lee `CLAUDE.md` por su cuenta. Al delegar, pásale el trozo que necesita:
- A **todos**: `docs/bloques/4-revisor/GUIA-DESARROLLO-BLOQUE.md` + `CONTRATO.md` + la spec.
- Rúbrica compartida: `docs/bloques/3-generador/rubrica.md` (sección «Comprueba SCRIPT»).
- Accesos del producto: `docs/bloques/4-revisor/referencias/revisor-agente-accesos.md`.

## Datos técnicos reales (no inventar)
- Cliente piloto: **Mudanzas Roy**, UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`.
- Previews v4: `clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/v4/v4-1.html` … `v4-8.html` (8 conceptos). Imágenes en `previews/img/`.
- Artefactos del bloque 3 (junto a `previews/`): `brief.md`, `audit-result.json`, `audit-meta.json`, `direccion-arte.md`, `marca.json`, `plan-pagina.json`, `recomendacion.md`, `informe-evaluacion.md`. Cruce contra `plan-pagina.json` = opcional.
- `clientes/` está **gitignored**: trabajar sobre disco local; NO commitear previews ni capturas.
- `playwright-cli` aplanada en `.claude/skills/playwright-cli/`.
- `impeccable` aplanada: `.claude/skills/impeccable/scripts/detect.mjs` + `scripts/detector/` (engines `static-html`, `browser`, `contraste`). CLI; sin instalación global.

---

## 1. Pasos de ejecución (orquestador → agentes)

### Paso 1 — Arranque
- `/inicio`. Confirmar bloque activo = 4 (Revisor). Leer `ESTADO.md` + `GUIA-DESARROLLO-BLOQUE.md` del bloque.
- Verificar que existen en disco las previews v4 de Mudanzas Roy (si no, PARAR: el piloto necesita el sujeto).

### Paso 2 — Test de coincidencia de contrato (verificador escribe, programador no toca código aún)
- Test que comprueba que el esquema de `agent_runs` admite los campos del CONTRATO: `agent='revisor'`, `output` (jsonb), `flags` (jsonb), `input`, `status`, `client_id`, `audit_id`, `tokens_in/out`, `cost`.
- Migraciones de referencia: `supabase/migrations/20260611000001_schema.sql` + `20260613000002_agent_runs_stage.sql`. SIN migración nueva.

### Paso 3 — Implementación con TDD (programador ↔ verificador, ciclo por checker)
Orden recomendado (de más determinista a menos), cada uno test-first:
1. **Regla de veredicto** (función pura): lista de hallazgos → `pass` / `pass_with_warnings` / `rejected`. ≥1 GRAVE → `rejected`.
2. **Enlaces rotos** internos/externos (GRAVE) — playwright-cli, inspección de red.
3. **Mezcla de dominios** .com/.es + URL malformada (GRAVE) — regla de dominio canónico.
4. **Contraste AA** (GRAVE) — engine `contraste` de impeccable.
5. **Placeholders** / lorem ipsum (GRAVE) — regla de texto / impeccable.
6. **Render 375px + desktop** (WARNING) — viewports + capturas a disco.
7. **Anti-slop** (WARNING) — `impeccable detect` (engines static-html, browser).
8. **Lighthouse** performance (WARNING en local).
- **Determinista primero:** checks 2-5 (GRAVE) no pasan por el LLM. El LLM solo clasifica hallazgos marcados ambiguos por el script y redacta `output.summary`. Mockear el LLM en los tests.

### Paso 4 — Entrada local autocontenida
- Función que recibe la ruta de una preview, levanta `python -m http.server` en **puerto libre**, devuelve la URL, y un teardown que **apaga el servidor siempre** (éxito o error). Test: el proceso no queda colgado.

### Paso 5 — Salida (output jsonb + agent_runs)
- Componer `output` con la forma de la spec §5 (`verdict`, `target`, `findings[]`, `screenshots[]`, `summary`).
- Escribir fila en `agent_runs` (`agent='revisor'`, `client_id` = UUID de Mudanzas Roy, `status`, `input`, `output`, tokens, `cost`, `flags`). Rechazo GRAVE → `status='error'` + motivo en `flags`. Fallo técnico → `status='error'` SIN `output.verdict`.
- Capturas a carpeta de trabajo del run (disco local, no commitear).

### Paso 6 — E2E ligero sobre el caso piloto
- Levantar server sobre una preview v4 de Mudanzas Roy → correr la suite completa → obtener veredicto + fila en `agent_runs` → servidor apagado.
- Validar AMBOS sentidos: si la preview tiene enlace roto / mezcla de dominios, sale GRAVE → `rejected`; si está limpia, sale `pass`/`pass_with_warnings`. No forzar que toda preview falle.

### Paso 7 — Doble revisión del verificador
- 1ª pasada: cumple-spec (todos los puntos de §9 de la spec). 2ª pasada: calidad de código.
- Emite veredicto. El verificador NO reescribe el código del programador; reporta y el programador corrige.

### Paso 8 — Cierre
- `/cierre`: vuelca a HANDOVER + `ESTADO.md` del bloque. Marcar el checklist del plan.
- Si todo aprobado: bloque 4 v1 = hecho; **borrar esta ORDEN** (la spec permanece). Anotar en `CHANGELOG.md` cualquier ajuste de contrato que surgiera.

---

## Criterios de "completado" (de la spec §9)
- Suite corre sobre preview v4 local de Mudanzas Roy → veredicto reproducible + fila en `agent_runs`.
- Checks 1-4 deterministas (cero LLM para GRAVE).
- Detecta enlaces rotos / mezcla de dominios como GRAVE cuando existen; sin GRAVE falsos en preview limpia.
- Servidor siempre apagado. Cero migraciones / tabla nueva. Veredicto del verificador = aprobado.

## Guardarraíles
- HARD-GATE ya superado (diseño aprobado): se PUEDE escribir código en esta sesión.
- No tocar el código del bloque 3. El Revisor solo inspecciona.
- No instalar nada global. No commitear `clientes/` (gitignored).
- Un bloque por sesión.
