---
name: generador-web
description: Orquesta el Agente Generador (bloque 3) de EVOLink — convierte el resultado de una auditoría + datos del cliente en una web Astro con marca, evaluada y publicada en preview de Cloudflare Pages. Pipeline de 6 etapas con artefactos versionados, 2 checkpoints humanos y registro por etapa en agent_runs. Úsala al construir cualquier web nueva de cliente (one-page o 3-5 páginas) del nicho de negocio local.
---

# generador-web — orquestación del Generador (v1)

Pipeline de 6 etapas. Cada etapa produce un **artefacto versionado** que alimenta la siguiente; reanudable en cualquier punto. Artefactos en `clientes/<id>/` (gitignored). Principio rector (heredado del Auditor): **determinista primero, LLM solo para juicio** — el modelo nunca escribe Astro, escribe el plan; el ensamblado es código reproducible.

Motor en `generador/` (Node + Astro). Comandos desde `generador/`:
`npm run assemble -- <id>` · `npm run evaluate -- <id>` · `npm run deploy -- <id>` · `npm run record -- <ruta-json>`.

## Antes de empezar
- Entrada: el JSON `result` de la auditoría (bloque 2, ya incluye los datos del formulario de entrada) + preferencias de estilo y fotos del cliente.
- Crea `clientes/<id>/` (usa el `client_id` de Supabase como `<id>`).
- v1 corre en Claude Code (coste API 0). Registra **un run por etapa** en `agent_runs` (ver final).

## Etapa 1 — Brief  → `clientes/<id>/brief.md`
- Quién: **modelo**. Lee la auditoría + datos del cliente.
- Qué: resume negocio, público, zona, servicios, tono, objetivo de la web, nº de páginas (one-page vs 3-5), activos disponibles (fotos, logo, marca previa).
- Skills: ninguna específica; aplica criterio de negocio local.

## Etapa 2 — Marca  → `clientes/<id>/marca.json`
- Quién: **modelo + `brandkit`**.
- Qué: si el cliente no tiene marca, genera básica (colores + tipografía + logo sencillo). Rellena `marca.json` (contrato en `generador/scripts/schema.ts`): `colores.primario` obligatorio (hex), resto opcional con defaults.
- Skills: `brandkit` (identidad), `estilo-evolink` (paleta de confianza, contraste AA, evitar look de plantilla).

## Etapa 3 — Plan de página  → `clientes/<id>/plan-pagina.json`
- Quién: **modelo** (compone catálogo + redacta textos).
- Qué: elige componentes y **variantes** del catálogo (`generador/catalogo/`) por sección y redacta TODOS los textos reales (cero relleno). La variedad nace de combinar variantes distintas con marcas distintas. Respeta el contrato: componentes/variantes/props válidas (`CATALOG_CONTRACT`).
- Skills: `estilo-evolink` (voz de diseño: jerarquía, anti-plantilla, 1 CTA por intención, mobile-first), `ui-ux-pro-max` (motor de diseño, *en evaluación*), `copywriting` (textos que captan en el nicho). Para macro-motion concreto: `gpt-tasteskill` (*en evaluación*); micro-interacciones: `ui-animation`.
- Catálogo v1: Header, Hero, Services, Testimonials, Gallery, Cta, ContactForm, Footer (2-3 variantes c/u) + Layout. Si falta una pieza, se crea como **componente nuevo del catálogo** (reutilizable), nunca código suelto del cliente.

> ## 🔵 CHECKPOINT 1 (brief + diseño) — OBLIGATORIO
> Tras etapas 1 y 3, presenta **juntos** `brief.md` y `plan-pagina.json` (con los textos) a los socios. **Nada se construye sin este OK.** Si hay cambios, itera el plan antes de seguir.

## Etapa 4 — Construcción  → `clientes/<id>/site/` (Astro compilable)
- Quién: **script determinista**. `npm run assemble -- <id>`.
- Qué: ensambla el sitio Astro desde `plan-pagina.json` + `marca.json` (copia catálogo, genera `marca.css` desde la marca, genera las páginas). Misma entrada → misma salida. El modelo NO escribe Astro aquí.
- Verifica build real: `cd clientes/<id>/site && npm install && npm run build`.

## Etapa 5 — Evaluación  → `clientes/<id>/informe-evaluacion.md`
- Quién: **script + modelo**. `npm run evaluate -- <id>`.
- Pase de script: render móvil (375px) y escritorio (capturas en `clientes/<id>/eval/`), Lighthouse móvil ≥90, cero enlaces rotos / mezcla de dominios, formulario presente con acción, contraste AA, cero placeholders. Exit 0 = pasa.
- Pase de modelo: lee el informe + las capturas y juzga lo no medible (rúbrica `docs/bloques/3-generador/rubrica.md` §"Juzga MODELO"): coherencia de marca, jerarquía, "no parece plantilla", textos naturales.
- **Bucle (máx. 2 iteraciones):** si suspende, el modelo corrige `plan-pagina.json` (o crea/ajusta el componente) y **re-ensambla** (etapa 4) → re-evalúa. Tras la 2ª, si sigue suspendiendo, **para** y entrega `informe-evaluacion.md` al humano con los fallos pendientes. No se insiste automáticamente.

> ## 🔵 CHECKPOINT FINAL (pre-cliente) — OBLIGATORIO
> Tras etapa 5 en verde, los socios revisan la web **en preview** antes de enseñarla al cliente. **Nada llega al cliente sin OK de socios.**

## Etapa 6 — Entrega  → URL de preview
- Quién: **script + humanos**. `npm run deploy -- <id>`.
- Qué: publica `clientes/<id>/site/dist` en Cloudflare Pages como **preview** (URL temporal). Requiere `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (env local). **Nunca dominio definitivo sin orden humana** (el script bloquea producción salvo `--production` + `EVOLINK_CONFIRM_PRODUCTION=yes`).
- Flujo de aprobación: preview interno → socios → cliente → dominio definitivo (paso humano).

## Registro en `agent_runs` (un run por etapa)
Tras cada etapa, registra el run: prepara un JSON `RunInput` (`{ "stage": "...", "clientId": "<id>", "status": "ok", "input": {...}, "output": {...}, "flags": [...] }`) y `npm run record -- <ruta-json>`. `stage` ∈ `brief|marca|plan|construccion|evaluacion|entrega`. En v1 `cost`/`tokens` = 0 (campo previsto para la API v2). Requiere `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Es la materia prima del bloque 7 (Mejora).

## Reglas duras
- HARD-GATE: nada de construir sin el Checkpoint 1; nada al cliente sin el Checkpoint final.
- Fuera de v1: rediseños (piloto `mudanzasroy.es` → v1.1 con `redesign-skill`), generación de imágenes por IA, ejecución autónoma por API.
- Fotos v1: del cliente donde aporten + stock gratuito (Unsplash/Pexels); sin IA.
- Detalle de skills por paso: `docs/bloques/3-generador/referencias/generador-agente-accesos.md`.
