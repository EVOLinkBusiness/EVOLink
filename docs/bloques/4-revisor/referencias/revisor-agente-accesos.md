# Accesos — Bloque 4 (Revisor/QA)

Ficha técnica de accesos del agente Revisor. Bloque futuro: **depende del bloque 3**
(no se revisa antes de generar). Borrador informado; spec propia cuando le toque.

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| `playwright-cli` | Herramienta principal: navegación real, clic en enlaces, envío de formularios, capturas, inspección de red | QA (script) | `.claude/skills/playwright-cli/` |
| Lighthouse | Velocidad/performance móvil (umbral de la rúbrica: ≥ 90) | QA (script) | Vía playwright/CLI |
| API de Anthropic | Juicio subjetivo sobre los hallazgos del script (¿es grave? ¿cómo comunicarlo al cliente?) | Producción | Secreto server-side |
| Supabase Postgres | Escribe resultados de revisión + `agent_runs`; lee inventario de webs vivas | Producción | Service role + RLS |
| Skill `seo-audit` (coreyhaines31) | Checklist de auditoría técnica/SEO para webs EXISTENTES de upsell | Desarrollo | `.claude/skills/` (compartida con bloque 2) |
| Rúbrica compartida | `../3-generador/rubrica.md` — una sola rúbrica, dos consumidores (3 evalúa lo que fabrica; 4 vigila lo que vive) | Ambas | docs/bloques/3-generador/ |

## Doble función
1. **QA continuo** de webs generadas y en producción (parte del valor de la cuota mensual; conecta con el bloque 6-mantenimiento).
2. **Gancho de upsell**: auditar webs flojas existentes ("tu web tiene N fallos") → alimenta al bloque 1.

## Caso de prueba identificado
`mudanzasroy.es`: enlaces internos rotos mezclando .com/.es, URL malformada, diseño
anticuado. Detectable con un pase de comprobación de enlaces + dominio canónico.

## Aprendizaje y realimentación
- `agent_runs`: cada pase de revisión con hallazgos y coste.
- Falsos positivos/negativos del script → ajuste de la rúbrica → `CHANGELOG.md` (suyo o del bloque 3, según dónde viva el check).
- Sus hallazgos sobre webs generadas son la señal de mejora más directa para el bloque 3.

## Conexión con el resto de agentes
```
3-Generador ──web──> 4-REVISOR ──hallazgos──> 3 (corrige) · 1 (upsell) · 6 (mantenimiento)
                          │
                          └── agent_runs ──> 7-Mejora (futuro)
```

## Pendiente de decisión (socios)
- [ ] Nada propio: sus dos skills (`playwright-cli`, `seo-audit`) ya están decididas en los bloques 2 y 3. Spec propia cuando el Generador exista.
