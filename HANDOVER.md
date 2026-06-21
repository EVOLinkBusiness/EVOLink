# HANDOVER — EVOLink

**Última sesión:** 2026-06-21
**Branch:** main
**Último commit:** `85190c3` feat(generador): install GSAP+Three.js skills + update docs (Pasos 1-3)

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — 6 previews de diseño generadas y validadas; 18 skills instaladas (8 GSAP + 10 Three.js); docs actualizados; **próximo: generar previews 7-12 con sus `.prompt.txt`**.

## Bloque activo
**3-generador (rediseño v2)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Plan aprobado: `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`.

## Hecho en la sesión actual (2026-06-21)
- **Paso 1:** 8 skills GSAP oficiales + 10 skills Three.js comunitarias (CloudAI-X) instaladas y aplanadas en `.claude/skills/` como carpetas reales sin symlinks. `.agents/` y `skills-lock.json` eliminados.
- **Paso 2:** `estilos-lapa-ninja.md` ampliada (Business/Agency/paletas/plataformas). `despensa.md` con placeholder servicios locales pendiente de curación.
- **Paso 3:** `flujo-previews.md` reescrito (12 previews + 2 reglas permanentes). `gsap-skills.md` actualizado (estado instalado, sin duplicado, sección impeccable + Three.js ref). Nueva `referencias/threejs.md`. `BLOQUE.md` corregido (12 previews, tabla skills ampliada).
- **Paso 4 (parcial):** 6 `.prompt.txt` retroactivos creados (fab-1…fab-5 + anim-5, marcados como `[reconstruido]`). Las previews 7-12 tendrán su `.prompt.txt` ANTES de generar el HTML (Paso 5).
- **Commit + push:** `85190c3`.

## Decisiones de esta sesión (cerradas con el socio)
1. **12 previews** = 6 diseño (se conservan las 6 ya validadas) + 6 GSAP nuevas, repartidas **2+2+2**:
   - 7-8: `frontend-design` + impeccable + skills GSAP.
   - 9-10: `gpt-tasteskill` + impeccable + skills GSAP.
   - 11-12: `frontend-design` + impeccable + skills GSAP + **Three.js**.
2. **Three.js:** instalar skill comunitaria (CloudAI-X) **+ CDN r184**; fallback a solo-CDN si da fricción tipo Stitch.
3. **OBLIGATORIO — trazabilidad:** cada preview (las 12) lleva su `<nombre>.prompt.txt` con el prompt exacto, junto al HTML en `clientes/<id>/previews/`.
4. **REGLA OBLIGATORIA DEL BLOQUE — estructura de prompt de 4 partes** (esquema del blog, repetido en sus 3 proyectos): `/*1*/` qué+cliente+dirección visual · `/*2*/` skills · `/*3*/` qué incluir · `/*4*/` requisitos (con "Interacciones fluidas y reales" siempre). Sumar/quitar detalle = razonar en qué parte y por qué. Se documentará como permanente en `flujo-previews.md`.
5. **Ampliar referencias con lapa.ninja** (géneros de layout, sin scraping).

## Alcance de instalación automática (confirmado con el socio)
- **Auto-instalo (2 `npx skills add`, local + aplanado):** GSAP oficial (8 skills) + Three.js comunitaria (CloudAI-X).
- **CDN, sin instalar:** plugins GSAP (SplitText/ScrollTrigger/Flip/Draggable/DrawSVG/MorphSVG/CustomEase/Observer/Inertia/ScrollTo) + Three.js r184 por importmap.
- **Ya instaladas, no se tocan:** frontend-design, impeccable, gpt-tasteskill, design-taste-frontend.
- Nada global; todo local al proyecto.

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE). En el Generador: nada al cliente sin Checkpoint final.
- El riesgo es de demanda/distribución, no técnico → validar sin promocionarse. No superar ~50 €/mes hasta tener clientes que paguen.
- **Three.js skill comunitaria** = no oficial: si estorba (riesgo tipo Stitch), descartar y seguir con CDN.
- **Tras `npx skills add`:** aplanar a carpeta real en `.claude/skills/`, borrar `.agents/` + `skills-lock.json`; los symlinks absolutos se rompen al clonar.
- **skillui (despensa):** solo extrae webs PÚBLICAS sin login; las grandes con anti-bot pueden dar extracción parcial.
- **Generador — credenciales:** `generador/.env` (SUPABASE_URL + SERVICE_ROLE_KEY) en local, nunca commitear. `clientes/` y `_pruebas/` gitignored.
- **Generador — entorno:** Lighthouse necesita `userDataDir` local.
- `ANTHROPIC_API_KEY` NUNCA se commitea. El MCP de Supabase pide re-OAuth cada sesión. Borrados en Supabase: nombrar UUID exactos.
- Tests: Auditor `npx deno test`; Generador `cd generador && npm test`.
- 28 symlinks pre-existentes en carpetas-grupo de `.claude/skills/` (gitignored) → poda pendiente.

## Próximo paso concreto
**Paso 5 — Generar las 6 previews GSAP (2+2+2) con sus `.prompt.txt`.**
Continuando el plan `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`:

**Para cada preview: redactar el `.prompt.txt` con la estructura de 4 partes → ejecutar ese texto para generar el HTML → guardar ambos en `clientes/cb1dfbea.../previews/`.**

- **Previews 7-8 · GSAP + frontend-design** (Mudanzas Roy, dirección visual distinta entre las 2):
  - 7: reveal/stagger en hero con SplitText + pin de sección de servicios
  - 8: Flip en galería de trabajos + ScrollTrigger scrub en testimonios
- **Previews 9-10 · GSAP + gpt-tasteskill** (editorial/cinético, mudanzas Roy):
  - 9: tipografía editorial grande, pinning de secciones en stack, random de layout
  - 10: ScrollTrigger scrub fullscreen en cada sección, voz más oscura/bold
- **Previews 11-12 · GSAP + Three.js** (frontend-design + threejs-fundamentals + threejs-animation + CDN r184):
  - 11: fondo 3D de partículas flotantes (Three.js) + scroll-reveal GSAP en foreground
  - 12: escena 3D protagonista que rota/avanza con ScrollTrigger scrub

Naming: `gsap-7.html`, `gsap-8.html`, `gsap-9.html`, `gsap-10.html`, `gsap-11.html`, `gsap-12.html` (y sus `.prompt.txt`).

## Pendientes
- [x] Pasos 1-3 del plan (skills + docs) — completados 2026-06-21.
- [x] Paso 4 parcial: `.prompt.txt` retroactivos de previews 1-6 — completados.
- [ ] **Paso 5:** generar previews GSAP 7-12 con sus `.prompt.txt` (próximo).
- [ ] Paso 6: QA (impeccable detect + mojibake + local server + validación socio).
- [ ] Validar las 12 con el socio → elegir dirección → producción.
- [ ] `writing-plans` del agente de producción.
- [ ] Elevar a `docs/BUSINESS.md` la decisión "Stitch descartado / grupo animación = GSAP + Three.js".
- [ ] Siguiente bloque: **Captación (bloque 1, co-prioritario)** y/o Revisor/QA (bloque 4).
- [ ] Spec del bloque 5 (pagos) antes del primer cliente que pague.
- [ ] Cuentas conjuntas: renombrar org Supabase/Anthropic + invitar socio como Owner.
- [ ] Deploy vivo Cloudflare + endpoint Resend para una web real.
- [ ] Self-host de fuentes (Google Fonts hunde Lighthouse móvil en el build final).
- [ ] Poda de junctions en `.claude/skills/` (gitignored).

## Comando para reanudar
/inicio
