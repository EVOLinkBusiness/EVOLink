# ROADMAP.md — EVOLink

Fases de alto nivel, organizadas alrededor del **mapa de 4 agentes**. La fase activa se marca aquí y en `HANDOVER.md`. Cada subsistema pasa por su ciclo superpowers (spec → plan → código). HARD-GATE: nada de producto sin diseño aprobado.

- **F0 — Infraestructura** ✅
  Repo, metodología (CLAUDE/HANDOVER/docs), `/inicio` `/cierre`, hooks, Supabase conectado (MCP), set de skills curado.
- **F1 — Agente Auditor + backbone Supabase** ✅ → bloque `2-auditor`
  Auditoría de presencia digital (negocios sin web), datos manuales, motor híbrido (reglas + Claude), supervisión + `agent_runs`, informe. **Completada:** 2 Edge Functions activas, suite 35/35. Spec: `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`.
- **F2 — Agente Generador web** ✅ v1 → bloque `3-generador`
  De auditoría + datos → web Astro con marca. Fórmula **fabricar → evaluar → entregar** con rúbrica explícita; ensamblado determinista + **Playwright** + Lighthouse. **Implementado y diagnosticado** (suite 24/24, 3 muestras con variedad real). Posicionamiento: rápidas, con marca, no plantilla.
- **▶ Piloto `mudanzasroy.es` (local)** ⏳ *(siguiente)*
  Cadena Auditor→Generador con datos reales como **cliente nuevo** (no rediseño, no se toca la web actual), servida en `localhost` — sin deploy; Cloudflare diferido. Prueba empírica de los 2 agentes encadenados. *Bloqueado por credenciales:* `generador/.env` (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`). En paralelo (validación sin promo): auditorías manuales sobre reformas reales.
- **Agente Captación/Seguimiento — CO-PRIORITARIO** *(no al final)* → bloque `1-captacion`
  Asistente: rastrea / cualifica / contacta / secuencia / contenido; los socios cierran. Arranca con datos manuales/semi y crece (Google Places cuando toque). Límites legales (RGPD/ePrivacy/LSSI); nada de frío masivo.
- **Agente Revisor/QA de webs** → bloque `4-revisor`
  Detecta fallos (webs generadas y de upsell) + mantenimiento. Usa **Playwright**. **Depende del Generador** (no se revisa antes de generar). Aquí encaja el upsell de rediseño.
- **Entrega + billing** → bloques `5-pagos` · `6-mantenimiento`
  Stripe (setup + cuota) + dominio + **Cloudflare Pages** para las webs de cliente + onboarding.

> Estructura física: cada agente/área = un bloque en `docs/bloques/` (1-captacion · 2-auditor · 3-generador · 4-revisor · 5-pagos · 6-mantenimiento · 7-mejora).

> Generador y Captación/Seguimiento son **co-prioritarios**; el Revisor depende del Generador. El orden fino se ajusta sesión a sesión. (La antigua "fase de marketing" se disuelve en el agente de Captación/Seguimiento; el "aprendizaje" es el rol de **Mejora** del tejido.)
