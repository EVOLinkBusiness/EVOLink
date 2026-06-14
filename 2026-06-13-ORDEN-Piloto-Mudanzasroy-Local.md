# ORDEN DE SESIÓN — Piloto parcial Auditor → Generador (mudanzasroy.es) en local

**Fecha de redacción:** 2026-06-13
**Origen:** sesión de planificación en Claude (proyecto EVOLink). Aprobado por Kravitzz.
**Tu rol (Claude Code):** ejecutar la cadena Auditor → Generador con datos reales de mudanzasroy.es, hasta producir una web visible en local (sin deploy a internet). Metodología superpowers.

## Reglas de ejecución
1. Ejecuta las fases EN ORDEN. Cada fase termina en un commit atómico (salvo lo que sea solo prueba en local sin cambios de código).
2. **Evidencia antes de afirmar:** cada resultado se demuestra con salida de comando, captura o URL local.
3. **No deploy a internet.** Cloudflare queda diferido por decisión del proyecto. Todo se sirve en local (`localhost`).
4. Credenciales en `.env` local (gitignored). Las pega el usuario; tú nunca las escribes ni las muestras.
5. Responde en español, conciso. Código y commits en inglés.
6. Esta orden NO se autoborra hasta que el usuario confirme que ha visto la web (Fase 5).

---

## FASE 0 — Precondiciones (ABORTA si falla)
1. `cat docs/bloques/2-auditor/ESTADO.md` → Auditor COMPLETADO v1 (con la entrada del anexo aplicada).
2. `cat docs/bloques/3-generador/ESTADO.md` → Generador COMPLETADO + **diagnóstico superado** (entrada en su CHANGELOG).
3. `git status --short` limpio; `git pull` en `main`.
4. Comprueba que existe `.env` local con las credenciales de Supabase (las del Auditor). Si falta, pídeselas al usuario y PARA hasta tenerlas.

---

## FASE 1 — Entrada real: formulario de mudanzasroy
El Auditor se alimenta del formulario del anexo de entrada. Como Captación aún no existe, el formulario se rellena a mano.

1. Pide al usuario los datos reales de mudanzasroy.es: nombre del negocio, teléfono, web actual, zona/dirección, y cualquier dato del anexo. (Opcional: captura de su ficha de Google Maps, según el anexo.)
2. Construye la entrada del Auditor con esos datos (sin inventar campos; lo que no haya, `null`).

No commit (es entrada de datos, no código).

---

## FASE 2 — Auditoría real (Auditor)
1. Ejecuta el Auditor con la entrada de la Fase 1.
2. Resultado esperado: auditoría completa (scoring determinista + narrativa) + registro en `agent_runs` (Supabase real).
3. Muestra al usuario: el veredicto de la auditoría y la fila creada en `agent_runs` (evidencia: consulta a Supabase).

**Commit:** `test(auditor): real audit run for mudanzasroy pilot` (si genera artefactos versionables; si no, sin commit).

---

## FASE 3 — Web real (Generador), servida en local
1. Pasa la auditoría de la Fase 2 como brief al Generador.
2. El Generador ejecuta su pipeline de 6 etapas: ensamblar → evaluar (playwright + lighthouse + juicio) → máx. 2 iteraciones.
3. **NO deploy a Cloudflare.** En su lugar: build local + `preview` en `localhost`. Dame el comando exacto para abrir la web en mi navegador (ej. `npm run preview` y la URL `http://localhost:...`).
4. Muestra el informe de evaluación: Lighthouse móvil, enlaces, contraste, formulario.

**Commit:** `test(generador): real site build for mudanzasroy pilot (local)`.

---

## FASE 4 — Verificación del piloto (evidencia)
1. Confirma la cadena completa con evidencia: entrada → fila en `agent_runs` del Auditor → auditoría → fila en `agent_runs` del Generador → web en local.
2. Checklist de calidad de la web de mudanzasroy: Lighthouse móvil ≥90, 0 enlaces rotos, contraste AA, formulario presente, contenido específico del negocio (no relleno), no parece plantilla.
3. **Pide al usuario que abra la URL local y confirme que ve la web.** Espera su confirmación o capturas antes de continuar.

No commit (verificación).

---

## FASE 5 — Cierre y AUTOBORRADO (solo tras confirmación del usuario)
1. Solo cuando el usuario confirme que ha visto la web en local:
2. Actualiza `HANDOVER.md`: piloto parcial superado (Auditor→Generador en local); pendientes que quedan = deploy vivo a Cloudflare (diferido a final de proyecto) + Captación (Etapa 3) + resto de agentes.
3. Anota en los CHANGELOG de los bloques 2 y 3 una línea: "Piloto real mudanzasroy en local: cadena Auditor→Generador verificada".
4. **Borra este archivo:** `git rm 2026-06-13-ORDEN-Piloto-Mudanzasroy-Local.md`
5. **Commit:** `docs: mudanzasroy local pilot complete; remove ORDEN (self-delete)` → `git push`.
6. Mensaje final: resumen de la cadena, métricas de la web, y la decisión de qué viene después (Captación o credenciales Cloudflare).

Si algo falla: repórtalo con ❌ (fase, comando, error), déjalo en CHANGELOG + HANDOVER, y NO autoborres la orden.
