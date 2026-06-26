# HANDOVER — EVOLink

**Última sesión:** 2026-06-26
**Branch:** main
**Último commit:** (ver git log)

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 + v2. **v4 "Director de Arte Autónomo" EJECUTADO esta sesión** (ORDEN `2026-06-23-ORDEN-generador-v4.md`, Fases 0-10). El reparto de previews por **slot fijo** (origen del cubo 3D) queda sustituido por un **director de arte** que decide por cliente y rechaza lo impertinente.

## Bloque activo
**3-generador (v4 ejecutado)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Spec: `docs/superpowers/specs/2026-06-23-generador-director-arte-v4-design.md`.

## Hecho en la sesión actual (2026-06-26)
- **Auditoría de las 12 previews** + fallo de slot fijo documentado → `referencias/auditoria-diseno-v4.md` (+ CHANGELOG).
- **Cerebro nuevo:** skill `director-arte` (7 diales + presets · referencias por roles + scoring · primitivas P1-P6 con scroll reversible · rechazos · salida `direccion-arte.md`).
- **Andamiaje:** `indice-referencias.md` (por roles) + `memoria-director-arte.md` (aprendizaje ligero).
- **`estilo-evolink §7`** → espectro de motion **1-5** (lo fija el director); invariantes trust-first intactos.
- **`flujo-previews.md`** dinámico **8-12** (sin slots, primitivas, referencias por roles); 2 reglas permanentes intactas. Reparto histórico → nota.
- **`ascenso-produccion.md`** (Astro + islas React → Cloudflare) + **rúbrica** y **BLOQUE.md** al día.
- **Validación E2E (mudanzasroy, `clientes/` gitignored):** `direccion-arte.md` con **cubo+partículas RECHAZADOS**; **8 previews** v4 + 8 `.prompt.txt`; detector **0 graves / 0 mojibake** (13 warnings: single-font + dark-glow); `recomendacion.md` (top 3); entrada nueva en memoria; render local 200; **npm test 24/24**.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones. **Pendientes de elevar a BUSINESS.md (del v4):** motion = gusto por cliente (espectro 1-5) · mezcla de previews dinámica decidida por el cerebro · el agente puntúa y recomienda top 2-3.

## Riesgos y avisos vivos
- **Curación de referencias = palanca nº 1.** El `indice-referencias.md` aún NO tiene un negocio local real de mudanzas/reformas → la estructura se ancla en stripe + criterio; riesgo de "parecer startup". Curar 1-2 locales reales + Awwwards limpias antes del próximo cliente del nicho.
- **Esqueleto de agentes ausente (Fase 0):** `.claude/agents/` + `CONTRATO.md`/`GUIA` del bloque 3 no estaban montados al ejecutar v4. Quedan pendientes de **retrofit** cuando aterrice el esqueleto. NUNCA ejecutar esta ORDEN y la de ESTRUCTURA NUEVA en la misma sesión.
- Nada de producto sin spec aprobada (HARD-GATE); nada al cliente sin Checkpoint final. Riesgo es de demanda, no técnico → no superar ~50 €/mes hasta tener clientes que paguen (API ~10 €/mes).
- **Single-font en previews v1 es esperado:** el brief manda fuentes de sistema (Google Fonts hunde Lighthouse móvil); el par tipográfico real se materializa en el **ascenso** con self-host.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) local, nunca commitear. `clientes/` y `_pruebas/` gitignored. `ANTHROPIC_API_KEY` nunca se commitea. MCP Supabase pide re-OAuth cada sesión.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test` (24/24). Lighthouse necesita `userDataDir` local.
- **Aplanar skills post `npx skills add`:** `[System.IO.Directory]::Delete()` para junctions; luego carpeta real + copiar SKILL.md. 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Revisión del socio del set v4** (`python -m http.server` sobre `clientes/<id>/previews/v4/`) → elegir 1 concepto → registrar en `agent_runs` + memoria. Recomendado: 1º `v4-2`, 2º `v4-3`, 3º `v4-1`. Luego **curar referencias** (palanca nº 1) y/o **ascenso a producción** del elegido.

## Pendientes
- [ ] Revisión + elección del socio sobre el set v4; volcar a `memoria-director-arte.md §3`.
- [ ] **Curar referencias** en `indice-referencias.md`: 1-2 negocios locales reales + Awwwards limpias (palanca nº 1).
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Retrofit `CONTRATO.md`/`GUIA` del bloque 3 cuando aterrice el esqueleto de agentes.
- [ ] Elevar a `docs/BUSINESS.md` las decisiones nuevas del v4 + "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque alternativo: Captación (bloque 1) y/o Revisor/QA (bloque 4). Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
