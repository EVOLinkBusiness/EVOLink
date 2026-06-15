# HANDOVER — EVOLink

**Última sesión:** 2026-06-15
**Branch:** main
**Último commit:** `9fc6f0a feat: ampliar despensa referencias-visuales (linear, vercel, framer, superlist)`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción y Generador (bloque 3) ✅ v1 validado E2E con el piloto real mudanzasroy. **En curso: rediseño artístico v2 del Generador** — cerebro `impeccable`+`design-taste-frontend` instalado, despensa ampliada, listo para regenerar previews.

## Bloque activo
**3-generador (rediseño v2 en curso)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-15)
- Verificado que NO se perdió trabajo de la sesión anterior: reflog limpio, el cierre de ayer (`021a277`) sí commiteó correctamente. Lo que parecía "perdido" eran 4 carpetas de despensa creadas tras el cierre, intactas en disco.
- Mejorada la presentación de `/inicio` y `/cierre`: formato markdown real (antes iba en code-fence y no renderizaba negrita); ahora separa "sesión anterior" (cita) de "estado actual", con commit/próximo paso/decisiones en **negrita**.
- **Despensa ampliada de 1→5 referencias** (stripe, linear, vercel, framer, superlist) vía `skillui`. Inventario + categorización en `docs/bloques/3-generador/referencias/despensa.md`. Hueco identificado: ninguna referencia es "negocio local" genuino (todas son SaaS premium) — vigilar si las previews de mudanzasroy salen demasiado "tech".
- `ESTADO.md` (bloque 3) y `README.md` actualizados: paso "ampliar despensa" marcado ✅.
- Commit `9fc6f0a` (incluye también los cambios de `/inicio` y `/cierre`).

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (15 activas). Sin nuevas esta sesión. **Pendiente de sesiones anteriores:** valorar elevar 4 decisiones del rediseño v2 (cerebro impeccable+taste, 8 previews, Stitch manual, despensa curada) a BUSINESS.md.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes (API ~10 €/mes) hasta tener clientes que paguen.
- **Stitch:** sin MCP oficial; los comunitarios piden token de Google + tienen riesgo de seguridad → se usa **manual** (export HTML). Re-evaluar MCP solo si se industrializa.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot pueden fallar o dar extracción parcial. Extrae el sistema de diseño, NO clona HTML/textos.
- **Despensa — hueco "negocio local":** las 5 referencias actuales son SaaS premium (stripe/linear/vercel/framer/superlist); si las previews de mudanzasroy salen demasiado "tech", añadir 1-2 referencias de servicios locales con buena web.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. Cloudflare (`CLOUDFLARE_*`) + Resend (`form_action`) diferidos.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local. `clientes/` y `docs/bloques/3-generador/_pruebas/` gitignored.
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`. Deploy Edge Functions vía MCP: pasar TODOS los `_shared/`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Regenerar las previews v2 del Generador con la despensa ampliada** (ver `docs/bloques/3-generador/ESTADO.md`).
1. Regenerar **5 previews** de mudanzasroy con DESIGN_VARIANCE/MOTION altos usando `impeccable` + `design-taste-frontend` + despensa (5 refs) → HTML estático en `_pruebas/` (gitignored).
2. +1 preview de URL de referencia manual.
3. El socio genera 2 con Google Stitch (manual) usando `referencias/stitch-prompts.md`; integrarlas.
4. Detector `impeccable` sobre las 8 → servir en local (`python -m http.server`) → validar con el socio.
5. Cerrar ORDEN (Fases 7-8: limpieza `_pruebas/` + autoborrado de `2026-06-14-ORDEN-rediseño-generador.md` + push) → `writing-plans` del agente de producción.

## Pendientes
- [x] Ampliar despensa (5 referencias: stripe, linear, vercel, framer, superlist).
- [ ] Regenerar 8 previews v2 (próximo paso, arriba) + self-host de fuentes en el build final.
- [ ] Valorar elevar las 4 decisiones del rediseño v2 a `docs/BUSINESS.md`.
- [ ] Siguiente agente: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4, depende del 3).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar al socio como Owner; datos fiscales con CIF.
- [ ] Deploy vivo Cloudflare (diferido) + endpoint Resend para una web real.
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
