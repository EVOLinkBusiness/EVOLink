# CONTRATO — Bloque 3 (Generador web)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente | Forma |
|-----|--------|-------|
| Brief de auditoría | `audits.result` (jsonb) con `audits.status = 'approved'` | resultado de la auditoría (bloque 2) |
| Datos del negocio | tabla `clients`: `name`, `category`, `city`, `contact` (jsonb), `presence_data` (jsonb) | columnas |
| Marca y medios | Supabase Storage (logo, fotos, brandkit del cliente) | archivos |

Origen: **bloque 2 (Auditor)**. Precondición: la auditoría debe estar aprobada (`status = 'approved'`).

## Produce (salida)
| Qué | Destino | Forma |
|-----|---------|-------|
| Web del cliente | Cloudflare Pages / Vercel | sitio Next/Astro desplegado (URL pública) |
| Registro de ejecución | tabla `agent_runs` | fila con `agent='generador'`, `client_id`, `audit_id`, `status` ('ok'/'error'), `input` (jsonb), `output` (jsonb: `{url, ...}`), `tokens_in`, `tokens_out`, `cost`, `flags` (jsonb) |

Destino: **bloque 4 (Revisor)** consume la web desplegada; **bloque 7 (Mejora)** consume `agent_runs`.

## Error
Si la web no pasa la rúbrica (`playwright-cli`), NO se publica: se registra `status='error'` en `agent_runs` con el motivo en `flags`.

## Fuente de verdad en Supabase
Migraciones: `supabase/migrations/20260611000001_schema.sql` (tablas `clients`, `audits`, `agent_runs`) y `20260613000002_agent_runs_stage.sql` (`output`, `flags`).
Test de coincidencia: pendiente de crear (en el piloto del Revisor) — comprueba que los campos de este contrato existen en el esquema.
