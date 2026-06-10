# Accesos — Bloque 3 (Generador web)

Ficha técnica de accesos del agente Generador. Borrador informado (evaluación 2026-06-10):
el contrato definitivo se cierra en su brainstorming → spec, tras el Auditor v1.
Fórmula cerrada: **fabricar → evaluar → entregar**.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Genera la web (estructura, código, textos) y juzga la parte subjetiva de la rúbrica | Producción | Secreto server-side |
| Supabase Postgres | Lee `audits.result` (el brief) + datos del cliente; escribe `agent_runs` | Producción | Service role + RLS |
| Supabase Storage | Fotos/logo/brandkit del cliente | Producción | Mismo proyecto |
| Cloudflare Pages | Despliegue de la web del cliente (coste 0, derechos comerciales) | Producción | API token de despliegue |
| Resend | Endpoint del formulario de contacto de cada web generada | Producción | API key server-side |
| `playwright-cli` | Paso "evaluar": render móvil/escritorio, enlaces, formulario, capturas | QA (script) | `.claude/skills/playwright-cli/` |

## Skills de diseño (paso "fabricar")

| Paso | Skill | Estado |
|------|-------|--------|
| Motor de diseño | `ui-ux-pro-max` | Instalada |
| Gusto/estilo anti-plantilla | `frontend-design` (anthropics, **oficial**) | Nueva — sustituye al grupo taste (ver inventario) |
| Identidad de marca | `brandkit` | Instalada |
| Framework correcto (stack Next) | `next-best-practices` (vercel-labs) | Nueva |
| Rediseños/upsell | `redesign-skill` + `extract-design-system` | Instalada + nueva |
| Referencia visual → código | `image-to-code-skill` + `imagegen-frontend-web` | Instaladas |
| Textos orientados a captar clientes | `copywriting` | Nueva (compartida con bloque 1) |
| Macro-motion (scroll, GSAP) | `gpt-tasteskill` | Instalada |
| Micro-interacciones | `ui-animation` | Instalada |
| Salida completa sin truncar | `output-skill` | Instalada |
| QA de diseño (paso "evaluar") | `web-design-guidelines` + `verification-before-completion` + `playwright-cli` | Instaladas |

## Claude Design (herramienta de los socios, NO del agente)
Producto beta de Anthropic (claude.ai/design, incluido en Pro, cupos semanales, **sin API**).
No puede ser el Generador: no es invocable por el pipeline, no registra en `agent_runs`, no pasa la rúbrica automáticamente.
**Uso aprobado:** fase de validación manual (primeros clientes a mano), maqueta del piloto
mudanzasroy.es, y exploración visual antes de fijar brandkits. Su exportación entrega un
paquete a Claude Code, compatible con nuestro flujo. Tabla comparativa completa: sesión de planificación 2026-06-10.

## Rúbrica
Detalle en `../rubrica.md` (única, compartida con el bloque 4): lo medible lo comprueba
script (`playwright-cli` + Lighthouse); el gusto y la coherencia los juzga el modelo.

## Aprendizaje y realimentación
- `agent_runs`: tokens/coste por web generada (~1-5 € objetivo), veredictos de la rúbrica.
- Web generada vs web tras pulido humano = señal de mejora.
- Las webs hechas a mano en validación (con Claude Design) sirven de ejemplos de referencia para afinar rúbrica y prompts ANTES de escribir la spec.
- Correcciones → `CHANGELOG.md` de este bloque.

## Conexión con el resto de agentes
```
2-Auditor ──`result` = brief──> 3-GENERADOR ──web desplegada──> 4-Revisor (QA continuo)
                                     │
                                     └── agent_runs ──> 7-Mejora (futuro)
```

## Decisiones de skills (cerradas 2026-06-10 por ambos socios)
- [x] Instaladas `frontend-design`, `next-best-practices`, `extract-design-system`.
- [x] Grupo taste archivado en `docs/archivo-skills/`.
- [ ] ÚNICO punto abierto: `shadcn` (componentes accesibles) — se decide en la spec de este bloque (riesgo: "look plantilla").
