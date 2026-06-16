# HANDOVER — EVOLink

**Última sesión:** 2026-06-16
**Branch:** main
**Último commit:** `54685ef chore: drop Stitch, pivot previews 7-9 to GSAP + Three.js`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — 6 de 9 previews generadas y validadas; grupos 7-9 se harán con GSAP + `frontend-design` + Three.js CDN (Stitch descartado).

## Bloque activo
**3-generador (rediseño v2, previews 7-9 pendientes)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-16)
- **Fix token Stitch (fallido):** investigado wrapper ADC con auto-refresh; la API Stitch requiere quota project en ADC. Demasiada fricción estructural.
- **Decisión: descartado Stitch.** Grupo 7-9 pasa a GSAP + `frontend-design` + Three.js CDN.
- **Limpieza completa de Stitch:** eliminados `scripts/` (stitch-proxy.cmd, stitch-refresh.js, stitch-proxy.ps1), `stitch-integracion.md`, `stitch-prompts.md`; entrada `stitch` borrada de `.mcp.json`.
- **Docs actualizados:** BLOQUE.md, ESTADO.md, flujo-previews.md, README.md — todo apunta a GSAP+Three.js.
- **gsap-skills.md añadido** a `referencias/` (skills, patrón de prompt, ejemplos de webreactiva.com, aplicación EVOLink).
- Commit + push `54685ef` — repo online limpio, sin rastro de Stitch.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (15 activas). **Nueva esta sesión:** Google Stitch descartado como herramienta de generación de previews; grupo 7-9 → GSAP + Three.js. Pendiente elevar a BUSINESS.md.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot pueden dar extracción parcial.
- **Despensa — hueco "negocio local":** las 5 referencias actuales son SaaS premium; las lapa.ninja compensan algo, pero vigilar si mudanzasroy resulta "demasiado tech".
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. Cloudflare + Resend diferidos.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local. `clientes/` y `_pruebas/` gitignored (no tracked).
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`. Deploy Edge Functions vía MCP: pasar TODOS los `_shared/`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.
- **GSAP skills:** aún no instaladas. Instalar con `npx skills add https://github.com/greensock/gsap-skills` y aplanar antes de generar previews 7-9.

## Próximo paso concreto
**Instalar skills GSAP y generar previews 7-9 con `frontend-design` + GSAP + Three.js CDN.**
1. `npx skills add https://github.com/greensock/gsap-skills` → aplanar a `.claude/skills/` → borrar `.agents/` + `skills-lock.json`.
2. Preview-7: voz "confianza cálida / humana" — Mudanzas Roy, brand #1e50c8, fade-up suave, Three.js sutil de fondo.
3. Preview-8: voz "editorial bold kinético" — mismo brief, tipografía grande, un scroll-driven moment, Three.js protagonista.
4. Preview-9: voz "minimal funcional / app-like" — micro-interacciones, 150ms transitions, Three.js decorativo.
5. Detector impeccable + mojibake → servir en local → validar las 9 con el socio.
6. Cuando las 9 estén OK: `writing-plans` del agente de producción + self-host de fuentes.

## Pendientes
- [ ] Instalar skills GSAP (ver gsap-skills.md) y generar previews 7-9 (próximo paso, arriba).
- [ ] Validar las 9 con el socio → elegir dirección → producción.
- [ ] `writing-plans` del agente de producción.
- [ ] Elevar decisión "Stitch descartado / GSAP+Three.js" a `docs/BUSINESS.md`.
- [ ] Siguiente bloque: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner.
- [ ] Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Self-host de fuentes (Google Fonts hunde Lighthouse móvil en el build final).
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
