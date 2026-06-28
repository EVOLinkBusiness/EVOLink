# CONTRATO — Bloque 4 (Revisor/QA)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente (bloque/tabla) | Forma |
|-----|-----------------------|-------|
| Web a revisar | Bloque 3 (Generador), §Produce | UNA de dos formas: (1) **preview HTML local** servida en disco (`python -m http.server` sobre la carpeta de la preview) → URL `http://localhost:<puerto>`; (2) **URL pública** desplegada (Cloudflare Pages / Vercel). Ambas válidas; **v1 usa entrada LOCAL** (la pública queda diseñada para v2). |
| Rúbrica de evaluación | `docs/bloques/3-generador/rubrica.md` | rúbrica COMPARTIDA (una sola, dos consumidores); el Revisor aplica su sección «Comprueba SCRIPT» |

Precondición: existe una preview generada por el bloque 3 servible vía HTTP. El Revisor recibe la **ruta** de la preview, levanta él mismo el servidor en un puerto libre y lo apaga al terminar. El Revisor NO genera ni corrige la web; solo la inspecciona. Cruce opcional contra los artefactos del bloque 3 (p.ej. `plan-pagina.json`, secciones esperadas) si aporta; no obligatorio en v1. Recibe la ruta/URL de forma autónoma; no necesita leer el `agent_runs` de la generación previa en v1.

## Produce (salida)
| Qué | Destino (bloque/tabla) | Forma |
|-----|------------------------|-------|
| Veredicto de revisión | `agent_runs.output` (jsonb) — consumidores: bloque 3 (corrige) · bloque 1 (upsell, v2) · bloque 6 (mantenimiento, futuro) | objeto jsonb: `verdict` (`pass` / `pass_with_warnings` / `rejected`), `target` (forma + ruta/URL), `findings[]` (`check`, `severity`, `detail`, `evidence`), `screenshots[]` (rutas en disco), `summary` (texto del LLM). Forma de referencia en la spec §5. |
| Capturas | disco local (carpeta de trabajo del run) | PNG móvil 375px + desktop; `clientes/` está gitignored, no se commitean |
| Registro de ejecución | tabla `agent_runs` | fila con `agent='revisor'`, `client_id`, `audit_id`, `status` ('ok'/'error'), `input` (jsonb: forma + ruta revisada), `output` (jsonb: el veredicto de arriba), `tokens_in`, `tokens_out`, `cost`, `flags` (jsonb) |

## Error
- **Web rechazada (≥1 hallazgo GRAVE):** `verdict='rejected'`, `agent_runs.status='error'`, motivo en `flags`. La web NO se publica. GRAVE = enlace roto, mezcla de dominios/URL malformada, contraste AA fallido, placeholder visible (checks 1-4, todos deterministas; el LLM no decide GRAVE).
- **Fallo de ejecución del propio Revisor** (Playwright no arranca, servidor no levanta, puerto ocupado): `agent_runs.status='error'` con el error técnico en `flags` y SIN `output.verdict` (el campo `output.verdict` distingue rechazo de la web vs fallo de la máquina).
- El servidor `http.server` se apaga siempre, en éxito o error.

## Fuente de verdad en Supabase
Migraciones existentes reutilizadas (SIN migración nueva en v1): `supabase/migrations/20260611000001_schema.sql` (tabla `agent_runs`) y `20260613000002_agent_runs_stage.sql` (columnas `output`, `flags`). No se crea tabla `reviews` en v1 (YAGNI; territorio del bloque 6 si hace falta histórico).
Test de coincidencia: lo define la ORDEN/spec del piloto (verifica que los campos de este contrato — `agent='revisor'`, `output`, `flags` — existen en el esquema de `agent_runs`).
