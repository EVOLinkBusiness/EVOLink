# CONTRATO — Bloque 1 (Captación/Seguimiento)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`. Fuente del diseño: `docs/superpowers/specs/2026-06-12-captacion-v1-design.md`.

## Consume (entrada)
| Qué | Fuente (bloque/tabla) | Forma |
|-----|-----------------------|-------|
| Petición de búsqueda | Socio (bajo demanda, v1 en Claude Code) | `{ zona, nicho }` (p.ej. reformas Móstoles/Madrid) → etapa 1 (Places API, 5-10 leads/semana) |
| Lead manual | Socio | mismo formulario del Auditor (anexo `2026-06-12-auditor-v1-anexo-entrada.md`); entra directo a puntuar |
| Motor de mini-auditoría | Bloque 2 (Auditor) | el motor de scoring del Auditor en **modo salida corta** (3-4 hallazgos gancho). NO se programa un segundo motor; el Auditor no se toca. |
| Lista de bajas | tabla `bajas` | **se consulta SIEMPRE antes de cualquier envío**; violación = error bloqueante |

Precondición (Fase 0 del ORDEN): los bloques 2 (Auditor) y 3 (Generador) están al 100%; si no, el ORDEN aborta. Places NO devuelve email: el canal se decide por dato disponible (email público → email; solo teléfono → guion de llamada para el socio). WhatsApp en frío prohibido; llamadas de prospección supeditadas al alta en Lista Robinson (decisión conjunta previa).

## Produce (salida)
| Qué | Destino (bloque/tabla) | Forma |
|-----|------------------------|-------|
| Lead cualificado | tabla `leads` | fila con datos del negocio, origen (`places`/`manual`), estado (máquina de estados de la spec §4), puntuación 0-100 **determinista** (rúbrica §7, umbral ≥55), `nota_contexto` (LLM, 2-3 frases, NUNCA altera la cifra), `tiene_web`, tipo (`sl`/`autonomo`/`desconocido`), email/teléfono (`null` si no hay dato; nunca inventar), ref. al formulario del Auditor, fechas |
| Formulario del Auditor relleno | Bloque 2 (Auditor), vía etapa 4 | formulario del anexo **relleno y confirmado por el socio** (Places = "segunda vía de rellenado" prevista por el anexo) |
| Mensajes de contacto | tabla `contactos` | fila por toque: lead, canal (`email`/`telefono`), toque (1/2), contenido (plantilla aprobada + huecos personalizados), `fecha_envio` o `fecha_programada` (toque 2 = +5 días, temporizador Supabase sin LLM), resultado |
| Mini-auditoría gancho | contenido del toque (tabla `contactos`) | 3-4 hallazgos generados con el motor del bloque 2 en salida corta |
| Bajas | tabla `bajas` | email/teléfono + fecha + vía (enlace de baja en un clic en cada email). **Terminal y permanente — RGPD; no se revierte jamás** |
| Registro de ejecución | tabla `agent_runs` | una fila por etapa ejecutada: `agent='captacion'`, inputs, tokens, coste, duración, `status`, `flags` (supervisión) |

## Error
- **Lead en `bajas`:** cualquier intento de envío se bloquea; `agent_runs.status='error'` con motivo en `flags`. Nunca se envía.
- **Supervisión fallida** (plantilla no aprobada, enlace de baja ausente, dato inventado — campo no-null sin fuente —, tono/promesas falsas): flag en `agent_runs`, el mensaje queda retenido en el panel para revisión humana. No se envía.
- **Transición ilegal de estado** (fuera de la máquina de la spec §4): error bloqueante; cada transición se registra con fecha y origen (agente/socio).
- **Fallo técnico** (Places/Resend caído, cuota): `agent_runs.status='error'` con el error en `flags`; el lead conserva su último estado válido.

## Fuente de verdad en Supabase
Tablas nuevas `leads`, `contactos`, `bajas` (migración propia del bloque, nombres en español) + `agent_runs` existente (`supabase/migrations/20260611000001_schema.sql` + `20260613000002_agent_runs_stage.sql`). Todo con RLS multi-tenant, mismo patrón que el resto del proyecto. Temporizador del toque 2: Edge Function programada (cron), determinista, sin tokens.
Test de coincidencia: verifica que las columnas usadas por este contrato existen en el esquema (`leads`/`contactos`/`bajas` + `agent='captacion'`, `output`, `flags` en `agent_runs`).
