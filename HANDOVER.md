# HANDOVER — EVOLink

**Última sesión:** 2026-06-28
**Branch:** main
**Último commit:** `ecc91cc feat: referencias truckn-roll y california-vending + correcciones extraccion`

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v4 "Director de Arte Autónomo" ejecutado. Esta sesión: cierre de la curación de referencias — Playwright instalado y 2 referencias de sector real extraídas en ultra.

## Bloque activo
**3-generador (curación cerrada, pendiente revisión socio + ascenso)** — detalle en `docs/bloques/3-generador/ESTADO.md`.

## Hecho en la sesión actual (2026-06-28)
- **Playwright instalado** como tooling del proyecto → `package.json` + `package-lock.json` versionados (no dependencia personal). Modo ultra de `skillui` operativo.
- **juanmora** re-extraída en ultra y aplanada a carpeta real (`juanmora/juanmora-design/`): tokens + screens (scroll/sections/states) + references (ANIMATIONS/COMPONENTS/LAYOUT/INTERACTIONS).
- **truckn-roll-r** (mudanzas) y **california-vending-company** (servicios-local) extraídas en ultra y admitidas → 2 referencias de sector real.
- **monarch-custom-homes APARCADO**: extracción problemática, no merece más tiempo; se reintenta si hace falta más referencia de reformas.
- `indice-referencias.md` y `Comandos.txt` actualizados. Commit `ecc91cc` (166 archivos) + push.

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones. Sin nuevas decisiones esta sesión.

## Riesgos y avisos vivos
- **Curación de referencias = palanca nº 1.** Mínimo cubierto (truckn-roll + california-vending = sector real; juanmora + Awwwards = motion). Ampliar solo si un nicho concreto lo pide. `monarch` queda como deuda menor.
- **Revisión del socio del set v4 pendiente:** `python -m http.server` sobre `clientes/<id>/previews/v4/` → elegir concepto → registrar en `agent_runs` + memoria.
- **Esqueleto de agentes ausente:** `.claude/agents/` + `CONTRATO.md`/`GUIA` del bloque 3 pendientes de retrofit cuando aterrice el esqueleto. NUNCA en la misma sesión que la ORDEN.
- Nada de producto sin spec aprobada; nada al cliente sin Checkpoint final. API ~10 €/mes; no superar ~50 €/mes.
- **Single-font en previews v1 es esperado** (fuentes de sistema; par tipográfico real en el ascenso con self-host).
- Credenciales: `generador/.env` local, nunca commitear. `clientes/` gitignored. MCP Supabase pide re-OAuth cada sesión.
- Aplanar skills post `npx skills add`: `[System.IO.Directory]::Delete()` para junctions. 28 symlinks pre-existentes en carpetas-grupo (gitignored) → poda pendiente.
- Avisos LF→CRLF al commitear en Windows (sin impacto); valorar `.gitattributes` si molesta el ruido.

## Próximo paso concreto
**Revisión del socio del set v4 de previews → elegir concepto → ascenso a producción.**
1. `python -m http.server` sobre `clientes/<id>/previews/v4/` → el socio elige 1 concepto.
2. Registrar elección en `agent_runs` (stage `preview-choice`) + volcar a `memoria-director-arte.md §3`.
3. Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare Pages).

## Pendientes
- [ ] Revisión del socio del set v4; volcar elección a `memoria-director-arte.md §3`.
- [ ] Ascenso a producción del concepto elegido (Astro + islas React, self-host fuentes, Cloudflare).
- [ ] Retrofit `CONTRATO.md`/`GUIA` del bloque 3 cuando aterrice el esqueleto de agentes.
- [ ] Elevar a `docs/BUSINESS.md`: motion por cliente 1-5 · mezcla dinámica · agente recomienda top 2-3 · "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque alternativo: Captación (bloque 1) y/o Revisor/QA (bloque 4). Spec bloque 5 antes del primer cliente.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner. Deploy vivo Cloudflare + endpoint Resend.
- [ ] Poda de 28 junctions en `.claude/skills/` (gitignored).
- [ ] (Opcional) Re-extraer `monarch-custom-homes` si se necesita más referencia de reformas.

## Comando para reanudar
/inicio
