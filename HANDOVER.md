# HANDOVER — EVOLink

**Última sesión:** 2026-06-26
**Branch:** main
**Último commit:** `5ed0b98 chore: cierre ORDEN generador v4 (autoborrado)`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte Autónomo" ejecutado. Esta sesión: curación inicial del índice de referencias (candidatos Awwwards + juanmora admitida).

## Bloque activo
**3-generador (referencias en curación)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-26)
- **Comandos.txt** — nuevo apartado `[ PÁGINAS DE REFERENCIA DEL DISEÑADOR ]` con las 6 referencias activas (5 despensa + juanmora) y los candidatos pendientes.
- **Candidatos Awwwards** añadidos a `indice-referencias.md`: `truckn-roll-r` (mudanzas), `monarch-custom-homes` (reformas), `california-vending-company` (servicios-local).
- **Vocabulario motion `awwwards-moving-co`** documentado: bloques emergentes, image reveal, hover grid, card Flip — con sub-candidatos `loandbehold.studio`, `exergy3.com`, `feedagency.co`.
- **`juanmora.co` extraída con `skillui`** y admitida en Inventario: motion + tipografía (Goga display, bounce springy `cubic-bezier(.292,1.932,.281,.996)`), solo idioma, motion 3-4. Tokens en `.claude/skills/referencias-visuales/juanmora/`. Corrección documentada: `webflow-icons` es icon font, font real = `Goga-Regular.otf`.
- **Tarea pendiente preparada**: instalar Playwright + re-extraer juanmora en modo ultra (computed styles + scroll screenshots). Comando listo en `Comandos.txt`.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones. Sin nuevas decisiones esta sesión.

## Riesgos y avisos vivos
- **Curación de referencias = palanca nº 1.** `truckn-roll-r`, `monarch-custom-homes`, `california-vending-company` pendientes de extracción real (`npx skillui`). Sin negocios locales de estructura, una mudanza tiende a parecer startup.
- **Playwright no instalado:** `extract-design-system` y modo ultra de `skillui` fallan. Tarea preparada para próxima sesión. No bloquea ningún otro flujo.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- **Esqueleto de agentes ausente:** `.claude/agents/` + `CONTRATO.md`/`GUIA` del bloque 3 pendientes de retrofit cuando aterrice el esqueleto. NUNCA en la misma sesión que la ORDEN.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- **Single-font en previews v1 es esperado** (fuentes de sistema; par tipográfico real en el ascenso con self-host).
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` gitignored. MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`: `[System.IO.Directory]::Delete()` para junctions. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.

## Próximo paso concreto
**Instalar Playwright y re-extraer juanmora en ultra** (`Comandos.txt` tiene el comando exacto), luego extraer los 3 candidatos Awwwards.
1. `npm install -g playwright && npx playwright install chromium`
2. `npx skillui@latest --url https://juanmora.co/ --mode ultra --out .claude/skills/referencias-visuales/juanmora`
3. Repetir con `truckn-roll-r`, `monarch-custom-homes`, `california-vending-company` (ver `Comandos.txt`).
4. Revisión del socio del set v4 previews → elección → ascenso a producción.

## Pendientes
- [ ] Instalar Playwright + re-extraer juanmora ultra + 3 candidatos Awwwards.
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Retrofit `CONTRATO.md`/`GUIA` del bloque 3 cuando aterrice el esqueleto de agentes.
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque alternativo: Captación (bloque 1) y/o Revisor/QA (bloque 4). Spec bloque 5 antes del primer cliente.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
