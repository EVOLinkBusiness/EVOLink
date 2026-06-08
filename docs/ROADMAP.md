# ROADMAP.md — EVOLink

Fases de alto nivel. La fase activa se marca aquí y en `HANDOVER.md`. Cada subsistema pasa por su ciclo superpowers (spec → plan → código).

- **F0 — Infraestructura** ✅
  Repo, metodología (CLAUDE/HANDOVER/docs), `/inicio` `/cierre`, hooks, Supabase conectado (MCP), set de skills curado.
- **F1 — Agente Auditor + backbone Supabase** ⏳ *(actual)*
  Auditoría de presencia digital (negocios sin web), datos manuales, motor híbrido (reglas + Claude), supervisión automática + `agent_runs`, dashboard interno, informe web compartible. Spec: `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`.
- **F2 — Agente Generador web**
  De auditoría + datos → web funcional con las skills de diseño; hosting y mantenimiento.
- **F3 — Funnel / captación**
  Escaneo automático de Google Maps + outreach legítimo + recogida de datos (APIs de Google).
- **F4 — Entrega + billing**
  Deploy + dominio + Stripe (setup + suscripción) + onboarding del cliente.
- **F5 — Aprendizaje + upsell**
  Agente de mejora (mina `agent_runs` + ediciones humanas) + auditoría/mejora de webs existentes.
- **F6 — Marketing automation**
  Captación y nurturing continuos a largo plazo.

> El orden de F2–F6 puede ajustarse. Cada fase pasa por su ciclo superpowers: spec → plan → código. HARD-GATE: nada de producto sin diseño aprobado.
