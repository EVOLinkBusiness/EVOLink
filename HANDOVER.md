# HANDOVER — EVOLink

**Última sesión:** 2026-06-16
**Branch:** main
**Último commit:** `bd36b8a docs: cierre sesion - despensa ampliada + presentacion inicio/cierre`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — 6 de 9 previews generadas y validadas; Stitch MCP activado (14 tools); próximas: generar previews 7-9 con Stitch.

## Bloque activo
**3-generador (rediseño v2, previews 7-9 pendientes)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-16)
- **Fix reveal v2 en preview-3 (kinético/framer):** eliminado patrón OLD `.js .reveal` sin `setTimeout`; título hero a `@keyframes word-rise` (CSS puro, sin IO); `.reveal.is-hidden` con pre-check `getBoundingClientRect()` + `setTimeout(revealAll,1200)`. Sin riesgo de pantalla en blanco permanente.
- **Reparto ampliado a 9 = 3+3+3** (propias / lapa.ninja / Stitch): `flujo-previews.md` actualizado; preview-4 kinético→slot 3; previews 5 (superlist) y antigua 3 (vercel) descartadas por gusto del socio.
- **3 nuevas lapa.ninja generadas:** preview-4 Magazine/Editorial (Spectral+Hanken, wipe), preview-5 Real Estate/Furniture (Schibsted Grotesk+Onest, zoom-settle), preview-6 Retro/Pattern (Archivo+Hanken, slide). Detector `[]` · 0 mojibake en las 3.
- **Placeholders Stitch 7-9** creados (dashed card + Georgia serif fix anti single-font); prompts listos en `stitch-prompts.md` (3 voces).
- **Nueva despensa:** `referencias/estilos-lapa-ninja.md` — géneros de layout/paleta (Magazine, Real Estate, Retro, Bento Grid, Corporate, Minimal, SaaS suave) mapeados a perfiles EVOLink.
- **Stitch MCP activado:** `STITCH_API_KEY` en `setx` del sistema, entrada `@_davideast/stitch-mcp proxy` en `.mcp.json`; 14 tools disponibles en Claude Code tras reiniciar. Corrección: el proxy v0.9.0 usa `STITCH_API_KEY`, NO `GOOGLE_CLOUD_PROJECT`; `stitch-integracion.md` actualizado.
- `index.html` de `_pruebas/` reescrito con estructura 3 grupos (1-3/4-6/7-9). CHANGELOG bloque 3 actualizado.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (15 activas). Sin nuevas esta sesión. **Pendiente de sesiones anteriores:** valorar elevar las decisiones del rediseño v2 (cerebro, 9 previews, Stitch MCP, despensa dual) a BUSINESS.md.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **Stitch MCP:** `@_davideast/stitch-mcp` es paquete de tercero (David East), experimental. Apto para previews internas; no depender para entrega a clientes sin verificar estabilidad. `STITCH_API_KEY` durable pero caduca si se revoca en GCP.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot pueden dar extracción parcial.
- **Despensa — hueco "negocio local":** las 5 referencias actuales son SaaS premium; las lapa.ninja compensan algo, pero vigilar si mudanzasroy resulta "demasiado tech".
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. Cloudflare + Resend diferidos.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local. `clientes/` y `_pruebas/` gitignored (no tracked).
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`. Deploy Edge Functions vía MCP: pasar TODOS los `_shared/`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Generar previews 7-9 con Stitch MCP** (`mcp__stitch__*` tools en Claude Code).
1. `create_project` → `create_design_system` con paleta/tipografía de cada voz (stitch-prompts.md).
2. `generate_screen_from_text` con el prompt completo de Stitch-7, Stitch-8 y Stitch-9.
3. `get_screen` → exportar HTML → pegar en `_pruebas/preview-7/8/9.html`.
4. Detector impeccable + mojibake check sobre las 3 → servir en local (`python -m http.server 8765 --directory _pruebas/`) → validar con el socio.
5. Cuando las 9 estén OK: `writing-plans` del agente de producción + self-host de fuentes.

## Pendientes
- [ ] Generar previews 7-9 con Stitch MCP (próximo paso, arriba).
- [ ] Validar las 9 con el socio → elegir dirección → producción.
- [ ] `writing-plans` del agente de producción.
- [ ] Valorar elevar decisiones rediseño v2 a `docs/BUSINESS.md`.
- [ ] Siguiente bloque: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner.
- [ ] Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Self-host de fuentes (Google Fonts hunde Lighthouse móvil en el build final).
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
