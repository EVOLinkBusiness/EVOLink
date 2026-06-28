# ESTADO — Bloque 4 (Revisor/QA)

**Estado:** ACTIVO. **Fecha:** 28/06/2026.
**Punto exacto del flujo:** diseño CERRADO y aprobado por el humano (HARD-GATE superado). Pendiente: ejecutar la implementación en sesión nueva (4B) según la ORDEN.

## Artefactos de diseño (hechos)
- Spec: `docs/superpowers/specs/2026-06-28-revisor-v1-design.md`.
- `BLOQUE.md`, `CONTRATO.md`, `GUIA-DESARROLLO-BLOQUE.md`: reescritos a v1 real.
- ORDEN de ejecución: `2026-06-28-ORDEN-bloque-revisor-v1.md` (raíz; se autoborra al completarse).
- Caso piloto confirmado en disco: Mudanzas Roy (UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`), previews v4.

## Próximo paso
Sesión nueva (`/clear`) → ejecutar la ORDEN: el orquestador delega en programador (TDD) y verificador (doble revisión).

## Checklist del plan (lo ejecuta la ORDEN)
- [ ] Test de coincidencia de contrato: `agent='revisor'` + `output` + `flags` existen en `agent_runs`.
- [ ] Checkers deterministas con TDD (funciones puras donde aplique):
  - [ ] Enlaces rotos internos/externos (GRAVE).
  - [ ] Mezcla de dominios .com/.es / URL malformada (GRAVE).
  - [ ] Contraste AA (GRAVE) — engine `contraste` de impeccable.
  - [ ] Placeholders / lorem ipsum (GRAVE).
  - [ ] Render 375px y desktop + capturas (WARNING).
  - [ ] Anti-slop con `impeccable detect` (WARNING).
  - [ ] Lighthouse performance (WARNING en local).
- [ ] Regla de veredicto como función pura (hallazgos → `pass` / `pass_with_warnings` / `rejected`).
- [ ] Entrada local autocontenida: levantar `http.server` en puerto libre + apagarlo siempre.
- [ ] Componer `output` jsonb (forma de la spec §5) + escribir fila en `agent_runs`.
- [ ] E2E ligero sobre una preview v4 de Mudanzas Roy → veredicto + fila en `agent_runs` + servidor apagado.
- [ ] Doble revisión del verificador (cumple-spec → calidad) → veredicto = aprobado.

## Notas / riesgos abiertos
- La forma exacta del `output` jsonb y los nombres de carpeta de capturas se cierran durante el TDD (no bloquean).
- Si una preview v4 sale limpia, el veredicto correcto es `pass`/`pass_with_warnings`: el piloto valida que clasifica bien en ambos sentidos, no que toda preview falle.
