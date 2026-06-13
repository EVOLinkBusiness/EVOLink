# Anexo a Spec — Bloque 2: Auditor v1 · Entrada de datos

**Fecha:** 2026-06-12
**Estado:** aprobado por Kravitzz (sesión de planificación en Claude)
**Modifica a:** `docs/superpowers/specs/2026-06-08-auditor-v1-design.md` (SOLO la entrada de datos; el resto de la spec permanece intacto)
**Destino en repo:** `docs/superpowers/specs/2026-06-12-auditor-v1-anexo-entrada.md`

---

## 1. Qué cambia y por qué

La spec original define la entrada como "datos del negocio (manuales en v1)", sin estructura. Este anexo la sustituye por una **puerta de entrada formal en tres vías**, para que la recogida sea consistente, rápida y preparada para la automatización futura (Bloque 1).

**No cambia nada más:** motor de scoring determinista, redacción por modelo, pase de supervisión, registro en `agent_runs` y JSON `result` de salida quedan exactamente como están en la spec original.

## 2. Flujo de entrada (nuevo)

```
Cliente nuevo
   → Formulario de datos (campos §3)
   → ¿Tiene ficha de Google Maps?
        SÍ → se aporta CAPTURA de pantalla de la ficha
             → el modelo extrae los datos automáticamente
             → los datos extraídos rellenan el formulario
             → el humano CONFIRMA/corrige antes de auditar
        NO → el formulario por sí solo basta para avanzar
   → Auditoría (scoring determinista + redacción, SIN CAMBIOS)
   → JSON result → resto de bloques (SIN CAMBIOS)
```

Regla: el scoring NUNCA lee la captura directamente. La captura solo sirve para rellenar campos del formulario; el scoring opera siempre sobre el formulario confirmado. Así el motor sigue siendo determinista y auditable.

## 3. Campos del formulario de entrada

**Obligatorios (mínimo para auditar):**
- Nombre del negocio
- Actividad/nicho (ej.: reformas, mudanzas)
- Zona de actuación (municipio/s)
- Teléfono de contacto
- ¿Tiene web propia? (sí/no + URL si sí)
- ¿Tiene ficha de Google Maps? (sí/no + URL o captura si sí)

**Opcionales (mejoran la auditoría; extraíbles de la captura de Maps):**
- Email
- Dirección física exacta
- Horario
- Nº de reseñas y nota media en Maps
- Redes sociales (URLs)
- Categoría declarada en Maps
- Fotos en la ficha (sí/no, cuántas aprox.)
- Antigüedad del negocio

Campos vacíos no bloquean: el motor de scoring puntúa con lo disponible y el informe señala la ausencia como hallazgo ("sin ficha de Maps" ya es, en sí, un dato de la auditoría).

## 4. Extracción desde captura de Maps

- El humano aporta 1-2 capturas de pantalla de la ficha (cabecera + reseñas).
- El modelo (Claude, que ya forma parte del bloque) lee la imagen y devuelve los campos §3 que identifique, marcando con `null` los que no vea.
- Pantalla/paso de confirmación: el humano valida o corrige antes de lanzar la auditoría. La confirmación humana es obligatoria en v1 (los datos alimentan el scoring y el informe que verá un cliente).
- Coste: una llamada de visión por captura (céntimos); se registra en `agent_runs` como parte del run.

## 5. Preparado para v2 (no implementar ahora)

Cuando el Bloque 1 (Captación) incorpore la API de Google Places, la recogida será automática sin capturas: Places rellenará el MISMO formulario por debajo. Por eso el formulario es el contrato estable: capturas (v1) y Places (v2) son solo dos formas de rellenarlo. El Auditor no necesitará retocarse otra vez.

## 6. Impacto en la implementación en curso

- Si el plan de implementación actual ya tiene tareas de "entrada de datos": se sustituyen por las de este anexo.
- Si aún no se había llegado a esa parte: se incorporan al plan en su posición natural (antes del scoring).
- Tareas nuevas derivadas: (a) definición del formulario como estructura de datos validada, (b) paso de extracción por visión desde captura, (c) paso de confirmación humana, (d) tolerancia del scoring a campos vacíos.
- Registro del cambio: entrada en `docs/bloques/2-auditor/CHANGELOG.md` motivada por este anexo (origen: "manual", decisión de diseño pre-código).
