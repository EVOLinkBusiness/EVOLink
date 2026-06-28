# Accesos — Bloque 2 (Auditor)

Ficha técnica de accesos del agente Auditor v1. Complementa la spec aprobada
(`docs/superpowers/specs/2026-06-08-auditor-v1-design.md`); no la sustituye ni la reabre.
Insumo directo para el `writing-plans` del bloque.

## Los dos Claudes (no confundir)
| Claude | Quién paga | Para qué |
|--------|-----------|----------|
| **Claude Code** (Pro, ~20 €/mes) | Suscripción de los socios | CONSTRUIR el agente: escribir tablas, Edge Function, dashboard |
| **API de Anthropic** (por tokens) | Coste de producto (~céntimos/auditoría) | SER el cerebro del agente en producción: narrativa + supervisión |

El agente en producción solo necesita 2 accesos: la base de datos y la API de Claude.
Todo lo demás de la tabla siguiente es herramienta de construcción.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Genera narrativa/recomendaciones (paso 3) y check de supervisión (paso 4) | Producción | Secreto de la Edge Function (`ANTHROPIC_API_KEY`); NUNCA en el cliente |
| Supabase Postgres | Lee `clients`; escribe `audits` + `agent_runs` | Producción | Service role en la Edge Function; RLS estricta |
| Supabase Storage | Logos/imágenes del informe público | Producción | Mismo proyecto (`kdernwxajzzrriolnnmq`) |
| MCP `supabase` | Crear tablas, políticas RLS, desplegar funciones | Solo desarrollo | `.mcp.json` del repo (ya conectado) |
| Skills `supabase` + `supabase-postgres-best-practices` | Buenas prácticas al escribir RLS/funciones | Solo desarrollo | `.claude/skills/` |
| Skills de diseño (`ui-ux-pro-max` + taste + `web-design-guidelines`) | Construir la plantilla del informe `/r/{slug}` (una vez) | Solo desarrollo | `.claude/skills/` |
| Skill `seo-audit` (coreyhaines31/marketingskills) | Referencia de rúbrica para la dimensión SEO local y para auditorías de upsell | Desarrollo | **PENDIENTE de aprobar por los 2 socios** (ver abajo) |

## Accesos que NO tiene (v1, YAGNI)
- Google Places API — datos a mano en v1; la entrada automática llegará por el bloque 1.
- Resend, Stripe — pertenecen a los bloques 1 y 5.
- `playwright-cli` — pertenece a los bloques 3 y 4.

## Flujo de ejecución (5 pasos por run)
1. **Carga**: la Edge Function `generate-audit` recibe `client_id` y lee `presence_data`.
2. **Scoring determinista**: código puro calcula 7 subscores + global. Cero LLM en los números.
3. **Claude redacta**: datos + subscores + rúbrica → JSON (resumen, hallazgos, recomendaciones). Explica los números, no los inventa.
4. **Supervisión**: reglas + check breve de Claude → `supervisor_flags`.
5. **Registro**: `audit` en borrador + fila en `agent_runs` (tokens, coste, duración, error).

## Aprendizaje y realimentación (v1 = captura de señales)
- **`llm_draft` vs `result`**: lo que Claude escribió vs lo que el humano dejó tras editar. La diferencia ES la señal.
- **`supervisor_flags`**: qué fallos marca la supervisión con más frecuencia.
- **`agent_runs`**: coste, errores y duración por ejecución.
- Cierre del bucle (manual): fallo → cambio en rúbrica/prompt → entrada en `CHANGELOG.md` de este bloque con el run que lo evidencia → aprueba un socio. El bloque 7 (Mejora) automatizará el minado en el futuro.

## Conexión con el resto de agentes
```
1-Captación ──invoca la misma Edge Function──> 2-AUDITOR ──`result` = brief──> 3-Generador
                                                   │
                                                   └── agent_runs ──> 7-Mejora (futuro)
```
- El bloque 1 reutiliza `generate-audit` como gancho de venta (por eso la función no está acoplada al dashboard).
- El `result` (JSON de hallazgos) es la entrada del Generador: la auditoría se convierte en brief.
- El 4-Revisor comparte el patrón de supervisión (rúbrica en `../3-generador/rubrica.md`).

## Decisiones
- [x] Skill `seo-audit` aprobada e instalada (10/06/2026). Auditorías de seguridad: Trust Hub ✅ · Socket ✅ · Snyk en "Warn" (solo markdown, riesgo bajo).
