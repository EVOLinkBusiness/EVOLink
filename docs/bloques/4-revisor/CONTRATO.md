# CONTRATO — Bloque 4 (Revisor/QA)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente (bloque/tabla) | Forma |
|-----|-----------------------|-------|
| Web a revisar | Bloque 3 (Generador), §Produce | UNA de dos formas: (1) **preview HTML local** servida en disco (`python -m http.server` sobre `previews/`) → URL `http://localhost:<puerto>`; (2) **URL pública** desplegada (Cloudflare Pages / Vercel). Ambas válidas; **el piloto arranca con entrada LOCAL**. |
| Rúbrica de evaluación | `docs/bloques/3-generador/rubrica.md` | rúbrica COMPARTIDA (una sola, dos consumidores); el Revisor aplica su sección «Comprueba SCRIPT» |

Precondición: existe una preview generada por el bloque 3 servible vía HTTP (local o pública). El Revisor NO genera ni corrige la web; solo la inspecciona.

> TODO (brainstorming): confirmar si el Revisor lee también `agent_runs` de la generación previa (para correlacionar hallazgos con el run que la produjo) o si recibe la ruta/URL de forma autónoma.

## Produce (salida)
| Qué | Destino (bloque/tabla) | Forma |
|-----|------------------------|-------|
| Veredicto de revisión | (consumidores: bloque 3 corrige · bloque 1 upsell · bloque 6 mantenimiento) | TODO (brainstorming): definir formato exacto del reporte (lista de hallazgos con severidad GRAVE/WARNING, capturas, métricas Lighthouse) |
| Registro de ejecución | tabla `agent_runs` | fila con `agent='revisor'`, `client_id`, `status` ('ok'/'error'), `input` (jsonb: forma+ruta/URL revisada), `output` (jsonb: hallazgos+veredicto), `tokens_in`, `tokens_out`, `cost`, `flags` (jsonb) |

> TODO (brainstorming): definir qué columna/tabla guarda el reporte de revisión más allá de `agent_runs` (¿tabla `reviews`? ¿`output` jsonb basta para el piloto?). Qué consume cada destino y en qué forma.

## Error
TODO (brainstorming): definir umbral GRAVE vs WARNING y qué cuenta como fallo del bloque.
Borrador honesto: si la web NO pasa los checks GRAVE de la rúbrica, el veredicto es «rechazada» y se registra en `agent_runs` con el detalle en `flags`/`output`. Un error de ejecución del propio Revisor (Playwright no arranca, servidor caído) registra `status='error'`.

## Fuente de verdad en Supabase
Migraciones existentes reutilizables: `supabase/migrations/20260611000001_schema.sql` (tabla `agent_runs`) y `20260613000002_agent_runs_stage.sql` (`output`, `flags`).
TODO (brainstorming): decidir si el piloto necesita migración nueva (p.ej. tabla `reviews`) o reutiliza `agent_runs`. Test de coincidencia: PENDIENTE de definir en la spec (verifica que los campos de este contrato existen en el esquema).
