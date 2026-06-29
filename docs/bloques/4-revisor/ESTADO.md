# ESTADO — Bloque 4 (Revisor/QA)

**Estado:** v1 IMPLEMENTADO. **Fecha:** 29/06/2026.
**Punto exacto del flujo:** ORDEN ejecutada (sesión 4B). Código en `revisor/`, 69 tests verdes, doble revisión del verificador = APROBADA tras corregir el falso-GRAVE (ver CHANGELOG 29/06). Piloto del esqueleto de 3 agentes completado de extremo a extremo. Pendiente menor: 1 insert real en `agent_runs` (validación "en caliente"), supeditado a aprobación del socio.

## Artefactos de diseño (hechos)
- Spec: `docs/superpowers/specs/2026-06-28-revisor-v1-design.md`.
- `BLOQUE.md`, `CONTRATO.md`, `GUIA-DESARROLLO-BLOQUE.md`: reescritos a v1 real.
- ORDEN de ejecución: `2026-06-28-ORDEN-bloque-revisor-v1.md` (raíz; se autoborra al completarse).
- Caso piloto confirmado en disco: Mudanzas Roy (UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`), previews v4.

## Próximo paso
Sesión nueva (`/clear`) → ejecutar la ORDEN: el orquestador delega en programador (TDD) y verificador (doble revisión).

## Checklist del plan (ejecutado en 4B)
- [x] Test de coincidencia de contrato: `agent='revisor'` + `output` + `flags` existen en `agent_runs` (test estático sobre las migraciones; `tests/contract.test.ts`).
- [x] Checkers deterministas con TDD (funciones puras donde aplique):
  - [x] Enlaces rotos internos/externos (GRAVE) — internos puros + externos por red en runtime.
  - [x] Mezcla de dominios .com/.es / URL malformada (GRAVE) — `findDomainIssues`.
  - [x] Contraste AA (GRAVE) — helper puro + engine `contraste` de impeccable.
  - [x] Placeholders / lorem ipsum (GRAVE) — sobre texto visible (fix falso-GRAVE 29/06).
  - [x] Render 375px y desktop + capturas (WARNING).
  - [x] Anti-slop con `impeccable detect` (WARNING).
  - [x] Lighthouse performance (WARNING en local).
- [x] Regla de veredicto como función pura (`computeVerdict`: hallazgos → `pass` / `pass_with_warnings` / `rejected`).
- [x] Entrada local autocontenida: `serveDir` levanta `http.server` en puerto libre + teardown garantizado (SIGTERM→SIGKILL).
- [x] Componer `output` jsonb (forma de la spec §5, `composeOutput`) + recorder a `agent_runs` (`buildRunRow` + `record.cli.ts`).
- [x] E2E ligero sobre preview v4 de Mudanzas Roy → veredicto + fila construida + servidor apagado (`tests/e2e.test.ts` + `npm run review`).
- [x] Doble revisión del verificador (cumple-spec → calidad) → APROBADA tras fix del falso-GRAVE.
- [ ] (Pendiente menor) 1 insert REAL en `agent_runs` para validar el contrato "en caliente" — supeditado a aprobación del socio (acción outward-facing sobre la BD de producción).

## Notas / riesgos abiertos
- La forma exacta del `output` jsonb y los nombres de carpeta de capturas se cierran durante el TDD (no bloquean).
- Si una preview v4 sale limpia, el veredicto correcto es `pass`/`pass_with_warnings`: el piloto valida que clasifica bien en ambos sentidos, no que toda preview falle.
