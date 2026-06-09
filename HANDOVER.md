# HANDOVER — EVOLink

**Última sesión:** 2026-06-09
**Branch:** main
**Último commit:** `docs: integrate planning decisions (esta sesión)`
**Remoto:** `origin` = https://github.com/Kravitzz/EVOLink (privado). Carpeta local de Kravitzz aún "Webs Javi" (rename pendiente).

---

## Estado del proyecto
EVOLink = agencia web **semiautónoma** (mapa de 4 agentes sobre Supabase; los humanos cierran la venta). Infra + metodología listas y en GitHub. **F1:** Agente Auditor v1 con spec aprobada; pendiente `writing-plans`. Integradas en los docs vivos las decisiones de la sesión de planificación (`docs/TRANSICION-PLANIFICACION.md`). Aún NO hay código de producto.

## Hecho en la sesión actual (2026-06-09 — planificación)
- Integradas en los docs vivos las decisiones de `docs/TRANSICION-PLANIFICACION.md`: mapa de 4 agentes, captación reformulada (co-prioritaria), nicho reformas, precios (30 € + setup subir), validación con pilotos, herramientas (Playwright, Cloudflare Pages, Resend), visión semiautónoma.
- (Sesión previa) Auditor v1 diseñado + spec aprobada; rename a EVOLink; curación de skills; README + GUIA.

## Subsistemas / módulos en estado (mapa de 4 agentes)
- **Auditor** — spec aprobada; siguiente `writing-plans`.
- **Generador web** — pendiente (F2; fórmula fabricar→evaluar→entregar + Playwright).
- **Captación/Seguimiento** — co-prioritario; asistente (humanos cierran); pendiente.
- **Revisor/QA de webs** — futuro; depende del Generador; Playwright.
- En paralelo: validación sin promo (piloto `mudanzasroy.es` + auditorías manuales de reformas).

## Decisiones cerradas (no reabrir)
1. Producción web = IA a medida (`ui-ux-pro-max` + taste), Next/Astro + Tailwind.
2. Monetización = **cuota 30 €/mes + setup 250-300 €→400-600 €** (vía "subir setup").
3. Captación = asistente (los socios cierran); outreach legítimo (RGPD/ePrivacy/LSSI; sin frío masivo); lead-gen = Places.
4. Metodología = re-oni-roll/AllergINC + plugin superpowers.
5. Núcleo = **mapa de 4 agentes** sobre el tejido de agentes.
6. Persistencia = Supabase multi-tenant (`client_id` + RLS), `kdernwxajzzrriolnnmq` (MCP).
7. **Nicho de arranque = reformas** (Móstoles/Madrid).
8. Herramientas: **Playwright** (evaluar/QA), **Cloudflare Pages** (webs de cliente), **Resend** (email).

## Puntos abiertos
- **Canales de promoción** (presencial / redes / internet) → sesión de brainstorming aparte. *(No resuelto.)*

## Riesgos y avisos vivos
- Nada de producto sin spec aprobada (HARD-GATE).
- El riesgo es de **demanda/distribución**, no técnico → validar sin promocionarse.
- No superar ~50 €/mes hasta tener clientes que paguen.
- Tras `npx skills add`: aplanar la skill + borrar `.agents/` + `skills-lock.json` (gitignored).
- Skills globales (`gsd-*`, etc.) cargan tokens cada sesión → desactivar si no se usan.
- Repo ya renombrado a EVOLink (remoto actualizado). Pendiente: renombrar la carpeta local + migrar a cuenta GitHub conjunta.

## Próximo paso concreto
**`writing-plans` sobre la spec del Auditor v1** (estas decisiones no lo bloquean).
1. `/inicio`.
2. `writing-plans` con `docs/superpowers/specs/2026-06-08-auditor-v1-design.md`.
3. Orden sugerido: backbone Supabase (tablas + RLS) → rúbrica de scoring (TDD) → Edge Function `generate-audit` → supervisión → dashboard Next → informe público.

## Pendientes
- [ ] `writing-plans` del Auditor v1.
- [ ] Sesión: canales de promoción.
- [ ] Renombrar la carpeta local + migrar a cuenta conjunta (repo ya = EVOLink).

## Comando para reanudar
/inicio
