# HANDOVER — EVOLink

**Última sesión:** 2026-06-22
**Branch:** main
**Último commit:** (ver git log)

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E + las 12 previews v2 generadas. **En curso: rediseño v3 — director de arte autónomo.** Plan APROBADO esta sesión, **pendiente de ejecución** (el socio tiene otra prioridad antes).

## Bloque activo
**3-generador (rediseño v3)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Plan aprobado: `docs/superpowers/plans/2026-06-22-generador-director-arte-v3.md`.

## Hecho en la sesión actual (2026-06-22)
- **Validación parcial de las 12 previews con el socio:** las GSAP vistosas/elegantes gustan; **gsap-12 (cubo 3D) descartada como concepto** (animación buena, impertinente para una mudanza).
- **Diagnóstico de raíz:** el pipeline reparte motores por **slot fijo** (1-3/4-6/7-8/9-10/11-12), sin criterio por cliente → el cubo se forzó porque el slot 11-12 obliga a Three.js. La regla de "pertinencia" está escrita pero no operacionalizada.
- **Plan v3 APROBADO** (`director de arte autónomo`): cerebro que decide con criterio y rechaza lo impertinente, mezcla dinámica de previews, y recomendación con argumentos. Versionado en `docs/superpowers/plans/`.
- **Alcance acotado:** cerebro + pipeline + auditoría como skills/docs; **sin código orquestador** (la generación sigue asistida; automatizar en código = plan posterior, bloque 7).

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones (N activas). **Nuevas esta sesión (del plan v3, pendientes de elevar a BUSINESS.md cuando se ejecute):** motion = gusto por cliente (espectro 1-5) · mezcla de previews dinámica decidida por el cerebro · el agente puntúa y recomienda top 2-3.

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
**Ejecutar el plan v3 cuando se retome el bloque 3** — empezar por formalizar la spec.
1. `docs/superpowers/specs/2026-06-22-generador-director-arte-v3.md` vía `writing-plans` (formaliza las 4 decisiones cerradas).
2. Fase A: auditoría de las 12 previews → `referencias/auditoria-diseno-v3.md`.
3. Fase B: nueva skill `.claude/skills/director-arte/SKILL.md` (el cerebro).
4. (Resto de fases C-G en el plan.)

## Pendientes
- [ ] **Ejecutar rediseño v3** (plan `2026-06-22-generador-director-arte-v3.md`, fases A-G).
- [ ] Elevar a `docs/BUSINESS.md` las decisiones nuevas del v3 al ejecutarlas.
- [ ] Elevar a `docs/BUSINESS.md`: "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque alternativo: Captación (bloque 1, co-prioritario) y/o Revisor/QA (bloque 4).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner.
- [ ] Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Self-host de fuentes (Google Fonts hunde Lighthouse móvil en el build final).
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
