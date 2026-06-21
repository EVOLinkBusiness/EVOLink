# HANDOVER — EVOLink

**Última sesión:** 2026-06-21
**Branch:** main
**Último commit:** `f214480` docs(readme): update estado 2026-06-21 - skills GSAP+Three.js instaladas, Paso 5 pendiente

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — infraestructura GSAP+Three.js completada (18 skills + docs); 6 previews de diseño validadas con `.prompt.txt` retroactivos. Siguiente: generar previews GSAP 7-12.

## Bloque activo
**3-generador (rediseño v2)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Plan: `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`.

## Hecho en la sesión actual (2026-06-21)
- **Paso 1 — skills:** 8 GSAP oficiales + 10 Three.js (CloudAI-X) instaladas y aplanadas en `.claude/skills/` como carpetas reales. Incidencia resuelta: junctions rotas en threejs → `Directory.Delete()` + reinstalar.
- **Paso 2 — referencias:** `estilos-lapa-ninja.md` ampliada (Business/Agency + paletas + plataformas). `despensa.md` con placeholder servicios locales.
- **Paso 3 — docs:** `flujo-previews.md` reescrito (12=6+6, 2 reglas permanentes). `gsap-skills.md` actualizado (instalado, sección impeccable). Nueva `referencias/threejs.md`. `BLOQUE.md` corregido.
- **Paso 4 — trazabilidad (parcial):** 6 `.prompt.txt` retroactivos en `clientes/<id>/previews/` (fab-1…fab-5 + anim-5, marcados `[reconstruido]`).
- **Commits y push:** `85190c3`, `4eafa11`, `f214480`.

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
**Generar las 6 previews GSAP (Paso 5) — redactar `.prompt.txt` con estructura 4 partes → ejecutar → guardar HTML en `clientes/cb1dfbea.../previews/`.**
1. `gsap-7.prompt.txt` + `gsap-7.html`: `frontend-design` + impeccable + skills GSAP. Reveal/stagger + SplitText en hero; pin de sección servicios.
2. `gsap-8.prompt.txt` + `gsap-8.html`: ídem. Flip galería de trabajos + ScrollTrigger scrub testimonios.
3. `gsap-9.prompt.txt` + `gsap-9.html`: `gpt-tasteskill` + impeccable + GSAP. Tipografía editorial bold, pinning/stacking/scrub.
4. `gsap-10.prompt.txt` + `gsap-10.html`: ídem. Scrub fullscreen por sección, voz oscura/bold.
5. `gsap-11.prompt.txt` + `gsap-11.html`: `frontend-design` + impeccable + GSAP + Three.js CDN r184. Fondo partículas 3D + scroll-reveal GSAP foreground.
6. `gsap-12.prompt.txt` + `gsap-12.html`: ídem. Escena 3D protagonista que rota/avanza con scrub.
7. Paso 6 QA: `node .claude/skills/impeccable/scripts/detect.mjs --json` → 0 graves → local server → validar 12 con socio.

## Pendientes
- [ ] **Paso 5:** generar previews GSAP 7-12 con sus `.prompt.txt` (próximo).
- [ ] Paso 6: QA (impeccable detect + mojibake + local server + validación socio).
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
