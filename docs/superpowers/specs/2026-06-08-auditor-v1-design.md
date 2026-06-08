# Spec de diseño — Agente Auditor v1 + backbone Supabase

**Fecha:** 2026-06-08
**Estado:** diseño aprobado (pendiente de revisión final del usuario antes de `writing-plans`)
**Subsistema:** Auditor (1er slice vertical del proyecto)
**Fase roadmap:** F1

---

## 1. Contexto y objetivo
"EVOLink" es una agencia web automatizada cuyo corazón son **agentes autónomos** sobre **Supabase**. Este es el **primer slice vertical**: un **Agente Auditor** que, dado un negocio **sin web**, produce una **auditoría profesional de presencia digital** que sirve a la vez de **gancho de ventas** y de **brief** para el futuro generador web (Agente B).

Objetivo del slice: entregar una auditoría demostrable y de calidad, y **establecer el patrón de "bloque-agente"** (creación + supervisión + registro + captura de señales) que reutilizarán todos los subsistemas siguientes.

## 2. Modelo operativo del sistema (tejido de agentes)
Cada función es un **bloque autocontenido** (skill/agente) con interfaz clara, testeable y arreglable de forma aislada. Roles:

| Rol | Función | En la v1 |
|-----|---------|----------|
| **Creación** | produce el artefacto | `generate-audit` (Edge Function + Claude) |
| **Supervisión** | QA automático antes del humano | pase de revisión (reglas + check Claude) que marca flags |
| **Ops / Registro** | gestiona y registra el día a día | `/inicio` `/cierre` + HANDOVER (humano) · tabla `agent_runs` (máquina) |
| **Mejora** | mina registros → mejora skills/rúbricas | **diferido**: solo se capturan señales en v1 |

**Contrato común de cada bloque:** I/O definida · registra cada ejecución (inputs, tokens, coste, duración, estado) · captura señales de feedback (ediciones humanas, flags de supervisión, luego conversión).

**Regla de token-eficiencia:** *determinista primero, LLM solo para juicio*. Los números los calcula el código; el LLM razona y redacta. Supervisión = un pase dirigido, no un enjambre.

## 3. Alcance v1

**Entra:**
- Auditoría de **presencia digital** para negocios **sin web**.
- Datos de entrada **manuales** (negocios reales introducidos a mano).
- Motor **híbrido**: scoring determinista + narrativa/recomendaciones con **Claude**.
- **7 dimensiones** (ver §6).
- Salida: **registro estructurado** en Supabase **+ informe web** de marca con enlace compartible.
- **Score** global (0-100) + subscore por dimensión.
- Flujo **borrador → aprobación humana → compartible** (`draft/approved/sent`).
- **Supervisión automática** del borrador (flags) + **registro** (`agent_runs`) + **captura de señales**.
- **Dashboard interno mínimo** (Next + Supabase Auth) para operar.
- Backbone **multi-tenant + RLS** desde el día 1 (solo admins operan en v1).

**NO entra (YAGNI):** APIs de Google (datos a mano), portal de cliente (solo esquema listo), escaneo automático de Maps / outreach, aprendizaje ML real (solo captura), generador web (Agente B), export PDF, multi-agente/colas.

## 4. Arquitectura
```
[Dashboard Next + Supabase Auth]  ──invoca──>  [Edge Function: generate-audit]
   (2 admins)                                     1. carga negocio + datos
        │ alta negocio / revisar / aprobar        2. scoring determinista (rúbrica)
        │                                          3. Claude → narrativa + recomendaciones (JSON)
        │                                          4. supervisión automática → flags
        v                                          5. escribe audit (draft) + agent_runs
[Supabase Postgres + RLS + Storage]  <───────────┘
        │
        └──> [Informe público /r/{slug}]  (solo approved/sent, función security-definer)
```
- **LLM:** Claude vía API Anthropic; claves **solo server-side** (secrets de la Edge Function).
- **Backend** bajo Supabase; Next = UI fina. La misma Edge Function la dispararán luego el cron de Maps y el outreach (sin duplicar).
- **Deploy:** Supabase (proyecto `kdernwxajzzrriolnnmq`) + app Next en Vercel.

## 5. Modelo de datos (multi-tenant)
Todas las tablas con **RLS**.

- **`clients`** — ancla del tenant (`client_id`):
  `id`, `name`, `category`, `city`, `contact` (jsonb), `website_url` (null = sin web), `status` (prospect/active/churned), `source` (manual/maps/outreach), `presence_data` (jsonb: campos de las 7 dimensiones), `created_by`, `created_at`.
- **`audits`**:
  `id`, `client_id` (FK), `version`, `status` (draft/approved/sent), `overall_score` (int 0-100), `result` (jsonb: subscores + hallazgos + recomendaciones + narrativa), `llm_draft` (jsonb: salida original del LLM, señal de aprendizaje vs. edición final), `supervisor_flags` (jsonb), `share_slug` (único), `approved_by`, `approved_at`, `created_by`, `created_at`, `updated_at`.
- **`agent_runs`** (registro/ops):
  `id`, `agent` (p.ej. `auditor`), `client_id`, `audit_id` (nullable), `status` (ok/error), `input` (jsonb), `tokens_in`, `tokens_out`, `cost`, `duration_ms`, `error` (text), `created_at`.
- **`profiles`** (= `auth.users`): `id`, `role` (admin), `full_name`. (Portal de cliente futuro = nuevas políticas, no refactor.)

**RLS:**
- Admins (`profiles.role='admin'`) → acceso total a `clients`/`audits`/`agent_runs`.
- Informe público → función `security-definer` `get_public_audit(slug)` que devuelve **solo** auditorías `approved/sent`, con **campos saneados** (sin notas internas ni `llm_draft`). No expone las tablas.
- Políticas escritas en términos de pertenencia a `client_id` para que el portal de cliente futuro se active añadiendo rol/políticas.

## 6. Motor de scoring (7 dimensiones)
Cada dimensión → subscore 0-100 por **rúbrica determinista** sobre `presence_data`. Media **ponderada** → `overall_score`. Pesos (constantes en código v1, ajustables):

| Dimensión | Peso | Señal (de datos manuales) |
|-----------|------|----------------------------|
| Perfil Google Business (completitud) | 20% | horario, fotos, categoría, descripción, contacto presentes |
| Reseñas y reputación | 20% | nº reseñas, nota media, recencia |
| Visibilidad en Maps vs competencia | 15% | posición percibida vs. competidores locales |
| Coste de oportunidad de NO tener web | 25% | sector + volumen estimado de búsqueda → leads perdidos |
| Consistencia NAP | 10% | Nombre/Dirección/Teléfono coherentes en listados |
| Redes sociales | 5% | existencia/actividad/enlace a contacto |
| SEO local / keywords (*best-effort*) | 5% | aparición en términos locales (estimación a mano; gana fidelidad con APIs) |

- **Los números los pone el código, no el LLM** (cero alucinación de métricas).
- Campo faltante → dimensión "**datos insuficientes**", **nunca un 0 falso**; se excluye del peso y se renormaliza.
- **Claude** recibe datos + subscores + rúbrica → devuelve **JSON estructurado** (resumen ejecutivo, hallazgo por dimensión, recomendaciones priorizadas, tono persuasivo). **Explica** los números, no los inventa.

## 7. Supervisión automática
Tras generar el borrador, un **pase de supervisión** (reglas + un check breve de Claude) verifica: coherencia score↔narrativa, ausencia de afirmaciones inventadas, completitud, tono. Produce `supervisor_flags` (lista de avisos). El borrador llega al humano **con los flags resaltados** → menos trabajo de revisión, más calidad.

## 8. Interfaz (v1)
Dashboard interno (Next + Supabase Auth, login email):
- **/clients** — lista + alta de negocio (formulario con los campos de las 7 dimensiones).
- **/clients/[id]** — detalle + botón "Generar auditoría" (invoca la Edge Function).
- **/audits/[id]** — revisar borrador: scores + narrativa **editables**, flags del supervisor, botón "Aprobar" (→ `approved`), copiar enlace.
- **Informe público /r/[slug]** — página de marca compartible (con las skills de diseño), solo auditorías aprobadas vía `get_public_audit`.

## 9. Errores y seguridad
- Claves (Anthropic, service role) **solo server-side**; nunca en el cliente.
- Fallo/timeout de Claude → los **subscores deterministas se guardan igual**; se reintenta solo la narrativa (no se pierde nada). El `agent_run` registra el error.
- Validación de entrada; faltantes → "datos insuficientes".
- RLS estricta; informe público saneado vía función.
- Registro de tokens/coste por ejecución (control de gasto).

## 10. Testing
- **TDD** de la **rúbrica de scoring** (funciones puras: input → subscores/overall esperados; incluye renormalización por "datos insuficientes").
- Edge Function con **respuesta de Claude mockeada** → asserts de forma del `audit`, score, `status=draft`, `agent_run` creado.
- Tests de **RLS**: un no-admin no lee nada; `get_public_audit` solo devuelve aprobadas y saneadas.
- **E2E ligero**: alta negocio → generar → supervisión → aprobar → render del enlace público.

## 11. Stack
Next + Tailwind (app/dashboard + informe) · Supabase (Postgres + Auth + Storage + Edge Functions + RLS) · Claude (Anthropic API) · Vercel (app) + Supabase (backend). Skills de diseño para el informe público: `ui-ux-pro-max` + taste + `web-design-guidelines` (QA).

## 12. Diferido / siguientes ciclos
APIs de Google (Places/PageSpeed) para datos automáticos · escaneo Maps (cron) + outreach legítimo · agente de **mejora** (mina `agent_runs` + ediciones → mejora rúbrica/prompts) · portal de cliente · **Agente B (generador web)** consumiendo el `result` de la auditoría · billing (Stripe).
