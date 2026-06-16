# HANDOVER — EVOLink

**Última sesión:** 2026-06-17
**Branch:** main
**Último commit:** *(se actualiza en el commit de este cierre)*

---

## Estado del proyecto
Auditor (bloque 2) ✅ en producción. Generador (bloque 3) ✅ v1 validado E2E. **En curso: rediseño artístico v2** — 6 previews de diseño generadas y validadas; **plan aprobado para reestructurar a 12 previews = 6 diseño + 6 GSAP**. La ejecución empieza la próxima sesión.

## Bloque activo
**3-generador (rediseño v2)** — detalle en `docs/bloques/3-generador/ESTADO.md`. Plan aprobado: `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md`.

## Hecho en la sesión actual (2026-06-17)
- **Investigación a fondo** del blog `webreactiva.com/blog/gsap-skills` (8 skills GSAP, plugins gratis tras Webflow, patrón de prompt, 3 proyectos de ejemplo, cierre con impeccable), skills Three.js en skills.sh (ecosistema comunitario, sin oficial) y lapa.ninja (galería 7.300+ landings).
- **Plan aprobado** (con varias condiciones del socio) y persistido en `docs/superpowers/plans/`.
- **Reestructuración decidida:** previews pasan de 9 (3+3+3) a **12 = 6 diseño (existentes) + 6 GSAP (nuevas, 2+2+2)**.
- **Cierre:** HANDOVER + ESTADO + README actualizados, commit + push.

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
**Ejecutar el plan `docs/superpowers/plans/2026-06-17-gsap-threejs-previews-7-12.md` (Pasos 1-6).**
1. Instalar skills GSAP + Three.js comunitaria (`npx skills add` + aplanar + borrar `.agents/`/`skills-lock.json`).
2. Ampliar `estilos-lapa-ninja.md` (+ hueco "negocio local" en `despensa.md`).
3. Actualizar docs del bloque: `gsap-skills.md` (cierre "Maximizar con impeccable" + sección Three.js, y nueva `threejs.md`), `flujo-previews.md` (reparto 12 + 2 reglas durables), `BLOQUE.md`, `ESTADO.md`.
4. Generar las 6 previews GSAP (2+2+2) con sus `.prompt.txt` (estructura de 4 partes) + las `.txt` retroactivas de 1-6.
5. QA: detector impeccable `[]` + 0 mojibake → servir en local → validar las 12 con el socio.
6. Cuando las 12 estén OK: `writing-plans` del agente de producción + self-host de fuentes.

## Pendientes
- [ ] Ejecutar el plan aprobado (próximo paso, arriba).
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
