# HANDOVER — EVOLink

**Última sesión:** 2026-06-22
**Branch:** main
**Último commit:** (ver git log)

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — **Pasos 1-5 COMPLETADOS**. Las 12 previews (6 diseño + 6 GSAP) están generadas en `clientes/cb1dfbea.../previews/`. Siguiente: QA + validación con socio.

## Bloque activo
**3-generador (rediseño v2)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Plan: `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`.

## Hecho en la sesión actual (2026-06-22)
- **Paso 5 — previews GSAP 7-12:** 6 HTML + 6 `.prompt.txt` generados en `clientes/cb1dfbea.../previews/`:
  - `gsap-7`: azul/blanco · SplitText palabras + CountUp + stagger (frontend-design)
  - `gsap-8`: navy/dorado · Flip filter + DrawSVGPlugin + parallax scrub (frontend-design)
  - `gsap-9`: negro/rojo · Bebas Neue chars brutal + pin bento + counter (gpt-tasteskill)
  - `gsap-10`: negro/azul · horizontal scroll 6 paneles + hero scrub-driven + CustomEase (gpt-tasteskill)
  - `gsap-11`: azul oscuro · Three.js partículas fondo (canvas fixed) + SplitText (Three.js + GSAP)
  - `gsap-12`: blanco roto · Three.js BoxGeometry scroll-driven 250vh sticky (Three.js + GSAP)

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (N activas). Sin decisiones nuevas esta sesión.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **Three.js skill comunitaria** (`threejs-interaction` = Critical Risk en Gen, Low en Socket/Snyk — probable falso positivo). No afecta uso para generación de contenido estático.
- **Aplanar skills post `npx skills add`:** usar `[System.IO.Directory]::Delete()` para eliminar junctions (Remove-Item falla en modo no-interactivo); luego crear carpeta real y copiar SKILL.md con `[System.IO.File]::WriteAllText()`.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot pueden dar extracción parcial.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. `clientes/` y `_pruebas/` gitignored.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local.
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Paso 6 — QA de las 12 previews:**
1. `node .claude/skills/impeccable/scripts/detect.mjs --json clientes/<id>/previews/gsap-*.html` → 0 hallazgos graves
2. Chequeo mojibake en las 6 nuevas + index.html
3. `python -m http.server` sobre `clientes/cb1dfbea.../previews/` → abrir las 12 en el navegador
4. Validar las **12** con el socio → elegir dirección → `writing-plans` del agente de producción

## Pendientes
- [x] ~~Paso 5: generar previews GSAP 7-12~~ ✅ 2026-06-22
- [ ] **Paso 6:** QA (impeccable detect + mojibake + local server + validación socio).
- [ ] Validar las 12 con el socio → elegir dirección → producción.
- [ ] `writing-plans` del agente de producción.
- [ ] Elevar a `docs/BUSINESS.md`: "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque: Captación (bloque 1, co-prioritario) y/o Revisor/QA (bloque 4).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner.
- [ ] Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Self-host de fuentes (Google Fonts hunde Lighthouse móvil en el build final).
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
