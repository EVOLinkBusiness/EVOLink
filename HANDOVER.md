# HANDOVER — EVOLink

**Última sesión:** 2026-06-14
**Branch:** main
**Último commit:** `ac09429 docs: generador v2 a 8 previews (5+1+2 Stitch manual) + tipografias + stitch-prompts; cierre actualiza README`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción y Generador (bloque 3) ✅ v1 validado E2E con el piloto real mudanzasroy. **En curso: rediseño artístico v2 del Generador** — el piloto demostró que la cadena funciona; lo mejorable era la estética, así que v2 inyecta criterio real (anti-slop + variedad).

## Bloque activo
**3-generador (rediseño v2 en curso)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-14)
- **Ejecutada la ORDEN de rediseño (Fases 0-6)** sin tocar el flujo autónomo: GATE Auditor verificado (✅ 100%), spec v2, BLOQUE.md + referencias (skills, despensa, flujo, stitch-prompts, tipografias), rúbrica v2.
- **Cerebro nuevo instalado y aplanado** (0 symlinks): `impeccable` + `design-taste-frontend`. `skillui` verificado vía npx (no global). Despensa `referencias-visuales/` con smoke-test stripe OK.
- **Validación a mano (mudanzasroy):** 3 previews de prueba en `_pruebas/` (gitignored) → detector impeccable **0 hallazgos** tras pulir tells (fuentes sobreusadas, marcadores 01/02/03, em-dash). Honestidad mantenida: sin fotos/testimonios inventados.
- **Plan ampliado y cerrado con el socio:** **8 previews/cliente** (5 nuestras + 1 URL manual + 2 Stitch MANUAL); Stitch vía MCP descartado (comunitarios = riesgo+OAuth); tipografías = doc curado de pares; comando `/cierre` ahora mantiene el README; README con barra de progreso + sub-bloques por bloque.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (15 activas). **NUEVAS esta sesión (avisar para valorar elevarlas a BUSINESS.md):** (1) cerebro de diseño = `impeccable`+`design-taste-frontend` (descartadas `ui-ux-pro-max` y `ui-animation`); (2) 8 previews/cliente = 5+1+2 Stitch manual; (3) Stitch solo manual (no MCP de terceros); (4) despensa tipográfica curada.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes (API ~10 €/mes) hasta tener clientes que paguen.
- **Stitch:** sin MCP oficial; los comunitarios piden token de Google + tienen riesgo de seguridad → se usa **manual** (export HTML). Re-evaluar MCP solo si se industrializa.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot (Cloudflare challenge/CAPTCHA) pueden fallar o dar extracción parcial. Extrae el sistema de diseño, NO clona HTML/textos.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. Cloudflare (`CLOUDFLARE_*`) + Resend (`form_action`) diferidos.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local. `clientes/` y `docs/bloques/3-generador/_pruebas/` gitignored.
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`. Deploy Edge Functions vía MCP: pasar TODOS los `_shared/`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Sesión nueva: regenerar las 8 previews del Generador v2** (ver `docs/bloques/3-generador/ESTADO.md`).
1. Ampliar despensa: shortlist mía del sector o URLs del socio → `skillui` (verificar que extraen limpio).
2. Regenerar 5 previews con DESIGN_VARIANCE/MOTION altos + 1 de URL de referencia manual.
3. El socio genera 2 de Stitch (manual) con `referencias/stitch-prompts.md`; integrarlas.
4. Detector impeccable sobre las 8 → servir en local → validar → cerrar ORDEN (Fases 7-8: limpieza `_pruebas/` + autoborrado ORDEN + push) → `writing-plans` del agente de producción.

## Pendientes
- [ ] Regenerar 8 previews v2 (próximo paso, arriba) + self-host de fuentes en el build final.
- [ ] Valorar elevar las 4 decisiones nuevas a `docs/BUSINESS.md`.
- [ ] Siguiente agente: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4, depende del 3).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar al socio como Owner; datos fiscales con CIF.
- [ ] Deploy vivo Cloudflare (diferido) + endpoint Resend para una web real.
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
