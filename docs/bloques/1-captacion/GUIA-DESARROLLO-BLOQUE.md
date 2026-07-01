# GUÍA DE DESARROLLO — Bloque 1 (Captación/Seguimiento)

Procedimiento del equipo de desarrollo para construir/mantener este bloque. (Recursos del producto en marcha: `referencias/captacion-agente-accesos.md`.)

Diseño cerrado: `docs/superpowers/specs/2026-06-12-captacion-v1-design.md` (cadena de 6 etapas con paradas humanas + 2 piezas fijas: temporizador y panel). **Precondición dura (Fase 0 del ORDEN): los bloques 2 y 3 al 100%; si no, se aborta.**

## Quién hace qué (los 3 agentes)
1. `planificador` (Opus): convierte la spec en plan por fases + ORDEN. Lee este archivo + `CONTRATO.md` + la spec del bloque. No implementa.
2. `programador` (Sonnet): implementa con TDD según el plan (scoring, máquina de estados, etapas, supervisión, migración `leads`/`contactos`/`bajas`). Respeta `CONTRATO.md`.
3. `verificador` (Sonnet): escribe/refina el banco de tests y hace la doble revisión (cumple-spec → calidad); emite veredicto. NO reescribe el código del programador.

## Orden de una tarea
brainstorming → spec (`docs/superpowers/specs/`) → writing-plans + ORDEN → (programador implementa con TDD ↔ verificador revisa) → QA → entrega.
HARD-GATE: nada de producto sin la spec aprobada por el humano.

## Fases de implementación (siguen las 6 etapas de la spec §5)
1. **Datos primero:** migración `leads`/`contactos`/`bajas` (RLS multi-tenant) + test de coincidencia del CONTRATO.
2. **Scoring (TDD estricto):** rúbrica §7 determinista, umbral 55, casos límite en `rubrica.md`. Tests ANTES del código; la `nota_contexto` (LLM) se añade después y un test comprueba que NUNCA altera la cifra.
3. **Máquina de estados (§4):** transiciones legales + registro fecha/origen; `baja` terminal. TDD.
4. **Etapas 1-3** (buscar/enriquecer/puntuar): Places API, deduplicación, heurística SL/autónomo, `null` si no hay dato.
5. **Etapa 4** (panel de confirmación): vistas Supabase + formulario del Auditor validado por el socio.
6. **Etapas 5-6** (contactar/seguir): plantillas aprobadas + supervisión + Resend + temporizador (Edge Function cron, sin LLM) + baja en un clic.
7. **Piloto transversal:** mudanzasroy.es recorre todos los estados (spec §13); envíos reales solo a email propio/del familiar.

## Skills/herramientas del bloque
- Google Places API (etapa 1; capa gratuita) · Resend (etapa 5; capa gratuita) · Supabase (tablas, vistas del panel, Edge Function cron).
- `copywriting`: personalización de huecos en las plantillas (las plantillas mismas las aprueba un socio UNA vez).
- Motor del bloque 2 en modo salida corta: mini-auditoría gancho (no se duplica motor).
- Skills transversales: `test-driven-development` (scoring y máquina de estados), `supabase` + `supabase-postgres-best-practices`.
- Mapa completo de accesos: `referencias/captacion-agente-accesos.md`.

## Criterios de "hecho"
- El test de coincidencia del CONTRATO pasa (tablas y columnas del contrato existen en el esquema).
- Scoring 100% determinista con banco de tests verde (incl. casos límite de `rubrica.md`); la nota del modelo no altera la cifra.
- Ninguna transición de estado fuera de la máquina; `baja` irreversible, comprobado por test.
- **Ningún envío sin pasar los dos gates:** confirmación del socio (etapa 4) + pase de supervisión (reglas: `bajas`, plantilla aprobada, enlace de baja, datos inventados; modelo: tono/personalización/promesas). Un test cubre el bloqueo por `bajas`.
- Cada etapa registra su fila en `agent_runs` (`agent='captacion'`) con tokens, coste y flags.
- Piloto mudanzasroy.es completo: el lead recorre todos los estados sin intervención fuera de las paradas previstas y el formulario resultante alimenta una auditoría real.
- Coste dentro del tope: ≤5 €/mes (spec §12).
- Veredicto del verificador = aprobado (cumple-spec y calidad).

## Guardarraíles
- Nada sin spec aprobada (HARD-GATE).
- **HARD-GATE legal/humano: cero envíos sin confirmación del socio (etapa 4) y sin pase de supervisión.** Nada de contacto frío masivo; RGPD + ePrivacy + LSSI. WhatsApp en frío prohibido; llamadas solo tras decisión conjunta sobre Lista Robinson.
- Determinista primero: puntuación, temporizador y máquina de estados sin LLM; el modelo solo redacta (nota, personalización, mini-auditoría) y nunca decide un envío ni una cifra.
- El agente asiste; **los socios cierran la venta**. Las respuestas van al buzón de los socios (detección automática = v2).
- Nunca inventar datos: campo sin fuente = `null`; violación = flag de supervisión.
- Umbral de puntuación (55) y plantillas: cambiarlos exige aprobación de socio + entrada en `CHANGELOG.md`.
- El verificador no reescribe el código del programador. Un bloque por sesión.
- Frontera con el bloque 2: se consume su motor y su formulario; no se modifica el Auditor desde aquí.
