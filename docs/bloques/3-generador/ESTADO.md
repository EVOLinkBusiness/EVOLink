# ESTADO — Bloque 3 (Generador) · flujo superpowers

Fase global: **F2 — Agente Generador web**. v1 IMPLEMENTADO (13/06/2026) · rediseño artístico v2 ejecutado · **v4 "Director de Arte Autónomo" EJECUTADO (26/06/2026).**

Spec vigente: `docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md` (absorbe y sustituye el plan v3).
Motor v1: `generador/` (Node + Astro). Suite **24/24 verde** (no se toca en v4).

---

## ✅ v4 — Director de Arte Autónomo (EJECUTADO 26/06/2026)

Ejecutada la ORDEN `2026-06-23-ORDEN-generador-v4.md` (Fases 0-10). Sustituye el reparto de previews por **slot fijo** (origen del cubo) por un **director de arte** que decide por cliente y rechaza lo impertinente.

**Entregado (commiteado):**
- **Auditoría de las 12 previews** + fallo de slot fijo → `referencias/auditoria-diseno-v4.md` (+ CHANGELOG cabecera).
- **Cerebro:** skill `.claude/skills/director-arte/SKILL.md` (7 diales + presets por nicho · referencias por roles + pesos de scoring · primitivas P1-P6 con scroll reversible · rechazos explícitos · salida `direccion-arte.md`).
- **Andamiaje:** `referencias/indice-referencias.md` (por roles, gate de admisión, cola de candidatos) + `referencias/memoria-director-arte.md` (aprendizaje ligero).
- **`estilo-evolink §7`** → espectro de motion **1-5** delegado al director, invariantes trust-first intactos.
- **`flujo-previews.md`** reescrito: dinámico **8-12** (sin slots), primitivas + referencias por roles; reparto histórico movido a nota. Las 2 reglas permanentes (`.prompt.txt` 1:1 + esquema 4 partes) intactas.
- **`ascenso-produccion.md`** (Astro + Tailwind + islas React → Cloudflare Pages) + **rúbrica** (encaje concepto↔referencia, pertinencia del motion, primitivas+scroll reversible, criterio de recomendación) + **BLOQUE.md** al día (63 líneas).

**Validación E2E (mudanzasroy `cb1dfbea`, `clientes/` gitignored — sin commit):**
- `direccion-arte.md`: perfil confianza-servicio, **motion 2-3 justificado**, **cubo 3D y partículas RECHAZADOS con motivo**. ✅
- Set dinámico de **8 previews** (`previews/v4/v4-1…v4-8`) + 8 `.prompt.txt` 1:1, ancladas por roles + primitivas, ninguna comparte referencia/género/par tipográfico. ✅
- Detector impeccable: **13 hallazgos, todos `warning` (0 graves)**, **0 mojibake**. Warnings = `single-font` (×8, restricción v1 conocida: fuentes de sistema porque Google Fonts hunde Lighthouse; el par tipográfico real se materializa en el ascenso con self-host) + `dark-glow` (×5, sombras sutiles intencionales). Gate "0 graves" cumplido.
- `recomendacion.md`: top 3 (1º `v4-2` Datos que tranquilizan · 2º `v4-3` Proceso sin sorpresas · 3º `v4-1` Confianza clara), con razón de diseño. ✅
- **Entrada nueva** en `memoria-director-arte.md §3`. ✅
- Render local 200 (`python -m http.server`, assets reales resuelven). `cd generador && npm test` → **24/24**. ✅

---

## ✅ Curación de referencias (28/06/2026)

- **Playwright instalado** como tooling del proyecto (`package.json` + `package-lock.json` versionados). Modo ultra de `skillui` operativo.
- **juanmora** re-extraída en ultra y aplanada a carpeta real (`juanmora/juanmora-design/`): tokens + screens scroll/sections/states + references ANIMATIONS/COMPONENTS/LAYOUT/INTERACTIONS.
- **truckn-roll-r** (mudanzas) y **california-vending-company** (servicios-local) extraídas en ultra y admitidas → 2 referencias de sector real, mínimo necesario para enseñar ESTRUCTURA.
- **monarch-custom-homes** APARCADO: extracción problemática, no merece más tiempo ahora. Se reintenta si hace falta más referencia de reformas.
- `indice-referencias.md` y `Comandos.txt` al día. Commit `ecc91cc`.

## Dónde retomar (próximo paso)

1. **Revisión del socio** del set v4 en local (`python -m http.server` sobre `previews/v4/`) → elegir 1 concepto → registrar en `agent_runs` (stage `preview-choice`) y volcar a `memoria-director-arte.md §3`.
2. **Palanca nº 1 (curación humana):** ✅ cubierto el mínimo (truckn-roll + california-vending = sector real; juanmora + Awwwards = motion). Ampliar con más negocios locales reales solo si un nicho concreto lo pide.
3. **Ascenso a producción** del concepto elegido (Astro + islas React, self-host de fuentes, Cloudflare Pages) cuando el socio lo apruebe.
4. Elevar a `docs/BUSINESS.md` las decisiones nuevas del v4 (motion por cliente 1-5 · mezcla dinámica decidida por el cerebro · el agente puntúa y recomienda top 2-3).
5. **Test de coincidencia del CONTRATO** (pendiente propio del bloque 3, NO del piloto del 4): un test verifica que los campos del `CONTRATO.md` existen en el esquema de Supabase. Criterio de hecho: test verde en la suite del bloque 3.

> **Código orquestador** (generación de punta a punta llamando a la API) y **pgvector** de referencias = **fuera de alcance**, diferidos al bloque 7. La generación sigue siendo asistida con skills.

## Notas técnicas
- Sitios de cliente: Astro 5 + Tailwind 3 (islas React en el ascenso). Hosting webs cliente: Cloudflare Pages.
- `clientes/` gitignored (datos fuera del repo; registro durable = `agent_runs`).
- Lighthouse necesita `userDataDir` local (temp global da EPERM); reusa chromium de Playwright vía `chromePath`.
- Detector anti-slop: `node .claude/skills/impeccable/scripts/detect.mjs --json <previews>/*.html`.
