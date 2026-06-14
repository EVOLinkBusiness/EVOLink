# Spec — Bloque Generador v2 (rediseño artístico)

**Fecha:** 2026-06-14 · **Estado:** aprobada (Kravitzz) · **Bloque:** 3-generador
**Sustituye al enfoque del piloto** (diseños planos tipo plantilla). No reabre el flujo autónomo auditor→generador, que ya funciona.

## 1. Problema
El piloto genera webs planas, parecidas a la web base del cliente. El fallo NO es el motor ni el flujo autónomo (correctos): es el **criterio artístico**. Los modelos tienden al "centro estadístico" (fuente Inter, gradientes morados, 3 tarjetas en fila). Esta spec inyecta criterio y variedad reales.

## 2. Decisiones cerradas
- **Cerebro de diseño:** `impeccable` (dirección + detector de "AI slop" = lo que parece hecho por IA) + `design-taste-frontend` (diales DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY).
- **Descartadas:** `UI-UX Pro Max` y `ui-animation` (redundantes con lo anterior).
- **Despensa:** `skillUI` (paquete npm `skillui`, vía `npx`) extrae el ADN visual de webs premium de referencia → ingredientes reutilizables, **coste 0 tokens**. Análisis estático de webs **públicas** (sin login); extrae el *sistema de diseño* (no clona HTML/textos). Se construye una vez; se amplía a mano (curación humana).
- **Tipografías:** despensa tipográfica curada (`referencias/tipografias.md`): pares premium por perfil + lista negra de fuentes sobreusadas. impeccable elige según el brief. Self-host en el build final; CDN solo en previews.
- **8 previews/cliente:** **5** (impeccable+taste+despensa, HTML estático) + **1** (a partir de una URL de referencia manual que aporta el socio) + **2** (Google Stitch **manual** — el socio las genera en stitch.withgoogle.com y exporta su HTML; sin MCP, gratis, 0 API de Claude). *Stitch vía MCP queda descartado de momento: solo hay servidores comunitarios (riesgo de seguridad + auth Google interactiva).*
- **Render:** HTML/CSS estático local (gratis). Ascenso a Next + Tailwind + Vercel solo para la elegida.
- **Coste:** previews con Sonnet; web final con Opus; tareas mecánicas/QA con Haiku. Prompt caching del system + brief + skills.

## 3. Arquitectura interna (4 fases)
- **Fase 0 — Despensa (una vez):** `skillui` extrae ADN de 6-10 webs premium por perfiles (corporativo-confianza, servicios-local, minimal-lujo, editorial...). Vive en `.claude/skills/referencias-visuales/`. Ampliable.
- **Fase 1 — Brief y encaje (por cliente):** entra la auditoría del Bloque 2 → impeccable fija el contexto de marca (sector, público, tono) → elige qué ingredientes de la despensa encajan y descarta los que no (aquí muere "plantilla de moda para una empresa de reformas"). El criterio de pertinencia lo da el brief del auditor, no un paso aparte.
- **Fase 2 — 8 previews:** 5 vía impeccable+taste+despensa (cada una con animación y arquetipo distinto, HTML estático) + 1 a partir de una URL de referencia manual (skillui extrae su ADN → preview inspirada) + 2 de Stitch manual. Sirven en local para revisión.
- **Fase 3 — Elección:** Kravitzz y socio eligen, mezclan ("preview 2 con animaciones de preview 5") o piden ajustes. Iterar es barato (es HTML).
- **Fase 4 — Ascenso + QA + entrega:** la elegida → Next + Tailwind reutilizando tokens/DESIGN.md ya generados (no se recalcula el estilo → ahorra tokens) → QA con `playwright-cli` → OK final de Kravitzz → pasa al resto de bloques.

## 4. Contrato E/S
- **Entrada:** brief de la auditoría (sector, público, tono, anti-referencias) + datos del cliente.
- **Salida:** 8 previews HTML + (tras elección) web Next desplegable + registro en `agent_runs` (inputs, tokens, coste, duración, estado, QA).

## 5. Coste y presupuesto (límite ~10 €/mes API)
- 5 previews HTML ≈ céntimos a pocos euros (Sonnet). Las 2 de Stitch no tocan la API de Claude.
- Lo que dispara el gasto: generar React real e iterar mucho. Mitigación: HTML estático en previews, Haiku para QA/mecánico, prompt caching, `/clear` entre tareas, limitar iteraciones.
- Vercel: previews en local = 0 €. Web final comercial → plan de pago de Vercel u hosting estático.

## 6. QA (Playwright)
`playwright-cli` (ya instalado): capturas, enlaces, formularios, responsive, comparación con la referencia. Comparte rúbrica con el bloque (`../rubrica.md`).

## 7. Validación de esta spec (criterio de éxito)
La prueba de renovación de `mudanzasroy.es` debe producir previews claramente distintas entre sí, premium y que NO "parezcan hechas por IA" (pasar el detector de slop de impeccable). Si siguen planas: subir DESIGN_VARIANCE y ampliar la despensa.

## 8. Pendientes (no en esta spec)
- `writing-plans` del agente generador de producción (código que orquesta las 4 fases).
- Curar la despensa completa (elección humana de las webs de referencia).
- Decidir hosting final (Vercel Pro vs estático) cuando haya cliente de pago.
