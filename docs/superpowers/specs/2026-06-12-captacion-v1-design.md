# Spec — Bloque 1: Agente Captación/Seguimiento (v1)

**Fecha:** 2026-06-12
**Estado:** aprobada en brainstorming (sesión Claude, decisiones confirmadas por Kravitzz)
**Destino en repo:** `docs/superpowers/specs/2026-06-12-captacion-v1-design.md`
**Bloque:** `docs/bloques/1-captacion/`
**Enfoque elegido:** B refinado — cadena de 6 etapas con paradas humanas + 2 piezas fijas

---

## 1. Objetivo

Dado una zona + nicho (reformas Móstoles/Madrid) o un lead manual, producir leads cualificados con puntuación, formulario del Auditor pre-rellenado, mini-auditoría gancho y secuencia de contacto de 2 toques. El agente asiste; **los socios cierran la venta**. Confirmación humana obligatoria antes de cualquier contacto.

## 2. Alcance v1

**Incluye:** búsqueda vía API de Google Places (5-10 leads/semana), enriquecimiento, puntuación determinista, panel de confirmación, envío de emails (Resend) y guiones de llamada, temporizador del toque 2, gestión de bajas, registro en `agent_runs`.

**Excluye (v2+):** detección automática de respuestas al email, más de 2 toques, otros nichos, ejecución por API de Anthropic (v1 corre en Claude Code), redes sociales, WhatsApp (descartado por norma).

## 3. Contrato de entrada/salida

- **Entrada:** `{ zona, nicho }` para búsqueda, o lead manual (mismo formulario del Auditor).
- **Salida por lead:** registro en `leads` con estado + puntuación + nota de contexto + formulario del Auditor relleno + mini-auditoría + mensajes (toque 1 y 2) + registro completo en `agent_runs` (inputs, tokens, coste, duración, flags de supervisión).

## 4. Ciclo de vida del lead (máquina de estados)

```
nuevo → puntuado → descartado
                 → confirmado → contactado → en_seguimiento
                                           → respondió → traspasado → ganado | perdido
(cualquier estado) → baja   [terminal y permanente — RGPD]
```

Reglas: ninguna transición fuera de la máquina · cada transición se registra con fecha y origen (agente/socio) · `baja` no se revierte jamás.

## 5. Las 6 etapas

| # | Etapa | Quién | Resultado guardado |
|---|-------|-------|--------------------|
| 1 | Buscar | Agente (Places) | leads `nuevo`, deduplicados, marca sí/no web |
| 2 | Enriquecer | Agente | email público si existe; heurística SL/autónomo; `null` si no hay dato (nunca inventar) |
| 3 | Puntuar | Reglas + nota del modelo | `confirmado` (≥55) o `descartado` |
| 4 | Confirmar | **Socio** (panel) | datos corregidos + formulario Auditor validado + canal elegido |
| 5 | Contactar | Agente | mini-auditoría + toque 1 enviado (email) o guion listo (teléfono) + toque 2 redactado y programado |
| 6 | Seguir/traspasar | Temporizador + socio | toque 2 a +5 días si no hay respuesta ni baja · respuesta → dudas simples → `traspasado` |

**Piezas fijas:**
- **Temporizador:** Edge Function programada (cron) en Supabase. Determinista, sin LLM, sin tokens.
- **Panel:** vistas en Supabase (leads por estado, pendientes de confirmar, respuestas) + email Resend a socios solo para lo urgente (respuesta recibida, lote listo para confirmar).

## 6. Canal de contacto (decisión por dato disponible)

Places NO devuelve email; un negocio sin web rara vez lo publica. Por tanto:
- Hay email público (ficha o directorios) → **email** (preferente para SL).
- Solo hay teléfono → **guion de llamada** en el panel; llama siempre un socio.
- Heurística SL/autónomo por nombre ("S.L.", "S.L.U."...); el socio corrige en la etapa 4.
- WhatsApp en frío: prohibido.

## 7. Rúbrica de puntuación (0-100, determinista)

| Criterio | Puntos |
|----------|--------|
| Sin web propia | +35 |
| Con web floja (sustituye al anterior) | +20 |
| Ficha de Maps activa (actualizada <6 meses, con fotos) | +20 |
| Reseñas: ≥10 y nota ≥4,0 (escala parcial) | +15 |
| Teléfono disponible | +10 |
| Zona objetivo exacta (Móstoles > resto Madrid) | +10 |
| Señales de actividad (horario completo, categoría correcta) | +10 |

- **Umbral: ≥55 = confirmado.** Ajustable solo con entrada en CHANGELOG.
- El modelo añade una **nota de contexto** (2-3 frases) que NUNCA altera la cifra.
- Detalle y casos límite: `docs/bloques/1-captacion/rubrica.md`. Scoring con TDD.

## 8. Modelo de datos (Supabase, nombres en español)

- **`leads`** — datos del negocio, origen (places/manual), estado, puntuación, nota_contexto, tiene_web, tipo (sl/autonomo/desconocido), email, telefono, ref. formulario Auditor, fechas.
- **`contactos`** — lead, canal, toque (1/2), contenido, fecha_envio o fecha_programada, resultado.
- **`bajas`** — email/teléfono + fecha + vía. **Se consulta SIEMPRE antes de cualquier envío; violación = error bloqueante.**
- **`agent_runs`** — ya existente por contrato; cada etapa registra su run.

Todo con RLS multi-tenant, mismo patrón que el resto del proyecto.

## 9. Plantillas y cumplimiento legal (España)

- Plantillas de email (toque 1 y 2) aprobadas **UNA VEZ** por un socio; el agente solo personaliza huecos (nombre, hallazgos de la mini-auditoría). Cambio de plantilla = nueva aprobación + entrada en CHANGELOG.
- Obligatorio en cada email: identificación de EVOLink, motivo del contacto, **baja en un clic** (enlace que escribe en `bajas`), solo direcciones de empresa.
- Las respuestas llegan al buzón de los socios (campo "responder a"). Detección automática: v2.
- **Precondición de llamadas:** decisión conjunta de los socios sobre el alta en Lista Robinson ANTES de la primera llamada de prospección (gasto legal aparte, fuera del tope del bloque).
- Marco: RGPD + ePrivacy + LSSI. Nada de contacto frío masivo.

## 10. Integración con el Auditor (Bloque 2)

- La etapa 4 entrega el **formulario del anexo del Auditor ya relleno y confirmado** (`2026-06-12-auditor-v1-anexo-entrada.md`): Places es "la segunda forma de rellenar el formulario" que ese anexo dejó prevista. El Auditor no se toca.
- La **mini-auditoría gancho** (3-4 hallazgos en el email del toque 2) reutiliza el motor de scoring del Auditor en modo salida corta. NO se programa un segundo motor.
- Auditoría completa: solo si el lead responde con interés.

## 11. Supervisión y registro

Pase de supervisión antes de cada envío (mismo patrón que el Auditor):
- **Reglas:** ¿está en `bajas`? ¿plantilla aprobada? ¿enlace de baja presente? ¿algún dato inventado (campo no-null sin fuente)?
- **Modelo:** tono, personalización real, sin promesas falsas.
- Fallo → flag en `agent_runs` + queda en el panel para revisión. No se envía.

## 12. Costes (tope ≤5 €/mes)

| Concepto | Coste |
|----------|-------|
| Places (5-10 leads/semana) | 0 € (capa gratuita 200 $/mes) |
| Resend (≤100 emails/mes) | 0 € (capa gratuita) |
| Temporizador Supabase | 0 € |
| Tokens (nota + mini-auditoría + mensajes) | ~3-8 céntimos/lead → <4 €/mes |
| Lista Robinson | Fuera del tope; decisión entre socios |

## 13. Piloto transversal: mudanzasroy.es

Prueba toda la cadena sin riesgo legal (negocio familiar, consentimiento garantizado):
1. Etapas 1-3: búsqueda real "mudanzas + su zona" → aparece, se deduplica, se puntúa (caso "con web floja").
2. Etapa 4: confirmación del formulario del Auditor con sus datos reales → conecta con el piloto Auditor + Generador ya planificado.
3. Etapas 5-6: envío real de toque 1 y 2 a un email propio/del familiar; prueba de la baja en un clic y del temporizador.

**Criterio de éxito:** el lead recorre todos los estados sin intervención fuera de las paradas humanas previstas, y el formulario resultante alimenta una auditoría real.

## 14. Ciclo de vida del ORDEN asociado

El ORDEN de este bloque (`2026-06-12-ORDEN-Programacion-Agente-Captacion_v1.md`, raíz del repo) solo se ejecuta cuando **Auditor (Bloque 2) Y Generador (Bloque 3) estén al 100%** — su Fase 0 lo verifica y aborta si no. Al completarse, el ORDEN **se borra a sí mismo** del repo (commit); esta spec permanece y git conserva el historial.

## 15. Decisiones cerradas en esta spec (trasladar a BUSINESS.md si procede)

1. Places API en v1; canal por dato disponible (email si existe, si no teléfono).
2. Puntuación 100% determinista + nota de contexto sin efecto en la cifra; umbral 55.
3. Confirmación humana obligatoria antes de contactar (etapa 4).
4. 2 toques (+5 días); toque 2 vía temporizador Supabase, sin LLM.
5. Mini-auditoría gancho reutiliza el motor del Auditor (salida corta).
6. Plantillas con aprobación única + baja en un clic + tabla `bajas` bloqueante.
7. Robinson como precondición de llamadas, fuera del tope de 5 €/mes.
8. ORDEN ejecutable solo con Auditor + Generador al 100%; autoborrado final.
9. Piloto transversal: mudanzasroy.es en todas las etapas.
10. v1 en Claude Code, bajo demanda; avisos por email (urgente) + panel (todo).
