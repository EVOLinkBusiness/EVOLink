# HANDOVER — EVOLink

**Última sesión:** 2026-06-09
**Branch:** main
**Último commit:** `cd4720b chore: rename to EVOLink, curate skills, vendor supabase config, refresh vision docs`
**Remoto:** `origin` = https://github.com/Kravitzz/Proyecto-Webs (privado; repo y carpeta se renombrarán a EVOLink más adelante)

---

## Estado del proyecto
EVOLink = agencia web **automatizada** con 2 agentes núcleo (Auditor + Generador web) sobre Supabase. Infra + metodología listas y en GitHub. **F1 en curso:** diseño del **Agente Auditor v1 cerrado y spec aprobada**; pendiente el plan de implementación (`writing-plans`). Aún NO hay código de producto.

## Hecho en la sesión actual (2026-06-09)
- Brainstorming completo del **Agente Auditor v1** → spec aprobada: `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`.
- Visión elevada a **2 agentes + tejido de agentes** (creación/supervisión/ops/mejora); Supabase multi-tenant = decisión cerrada #6.
- **Rename** Webs Javi → EVOLink (contenido del repo + memoria).
- **Curación de skills:** podadas 4 (taste-skill-v1, imagegen-frontend-mobile, stitch-skill, brutalist-skill); `animation-designer` descartada (redundante); `supabase` + `supabase-postgres-best-practices` aplanadas; `.agents/` + `skills-lock.json` gitignored.
- Docs refrescados (BUSINESS/ROADMAP/ESTADO-FLUJO/CLAUDE); `.mcp.json` versionado.
- `README.md` + `GUIA-COLABORADOR.txt` (paso a paso desde cero) actualizados.

## Subsistemas / módulos en estado
- **Auditor** — diseñado (spec aprobada); siguiente: `writing-plans`.
- Generador web — pendiente (F2).
- Funnel/captación, Entrega+billing, Aprendizaje+upsell, Marketing — pendientes.

## Decisiones cerradas (no reabrir)
1. Producción web = IA a medida (`ui-ux-pro-max` + taste), Next/Astro + Tailwind.
2. Monetización = híbrida (setup + cuota mensual).
3. Lead-gen = Google Places API; outreach **legítimo** (no phishing).
4. Metodología = re-oni-roll/AllergINC + plugin superpowers.
5. Núcleo = 2 agentes (Auditor + Generador) bajo tejido de agentes.
6. Persistencia = Supabase multi-tenant (`client_id` + RLS), proyecto `kdernwxajzzrriolnnmq` (MCP).

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE de brainstorming).
- Tras `npx skills add`: aplanar la skill a carpeta real + borrar `.agents/` + `skills-lock.json` (ya gitignored).
- Skills **globales** (`gsd-*`, etc.) fuera del repo cargan tokens cada sesión → desactivar globalmente si no se usan.
- Carpeta local "Webs Javi" y repo "Proyecto-Webs" pendientes de renombrar a EVOLink (coordinar; rompe junctions de ruta absoluta).
- Migración a cuenta GitHub conjunta pendiente.

## Próximo paso concreto (MAÑANA)
**`writing-plans` sobre la spec del Auditor v1** → plan de implementación por tareas.
1. `/inicio`.
2. Invocar `writing-plans` con `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`.
3. El plan debería arrancar por: backbone Supabase (tablas + RLS) → rúbrica de scoring (TDD) → Edge Function `generate-audit` → supervisión → dashboard Next → informe público.

## Pendientes
- [ ] `writing-plans` del Auditor v1 (mañana).
- [ ] Renombrar repo + carpeta a EVOLink (coordinado) + migrar a cuenta conjunta.
- [ ] (Opcional) Desactivar skills globales no usadas para bajar el consumo de tokens.

## Comando para reanudar
/inicio
