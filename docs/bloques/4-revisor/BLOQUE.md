# Bloque 4 — Revisor/QA de webs

**Estado:** ACTIVO (en desarrollo, v1). Es el **PILOTO oficial del esqueleto de agentes**.
**Depende del bloque 3** (no se revisa antes de generar). **Rol en el tejido:** Supervisión.
**Diseño:** `docs/superpowers/specs/2026-06-28-revisor-v1-design.md`. **Contrato:** `CONTRATO.md`.

## Qué hace (v1)
Pase de QA reproducible sobre una **preview generada por el bloque 3**, servida en LOCAL. El Revisor recibe la ruta de la preview, levanta él mismo `python -m http.server` en un puerto libre, corre la suite con `playwright-cli` contra `http://localhost:<puerto>`, clasifica los hallazgos por gravedad y emite un veredicto. **Regla núcleo:** determinista primero; el LLM solo clasifica lo ambiguo y redacta el mensaje al humano (nunca decide un GRAVE).

## Qué NO hace (v1 — diferido a v2, ya diseñado en el CONTRATO)
- **Gancho de upsell** de webs ajenas vivas (`seo-audit` → bloque 1): otra entrada, otro consumidor aún inexistente.
- **Formulario + Resend:** la preview local no tiene backend → falso negativo.
- **Check de motion** (transform/opacity, scroll reversible): el más caro; se instrumenta más tarde.
- No genera ni corrige la web (frontera dura con el bloque 3); solo INSPECCIONA.

## Suite de checks (v1)
| # | Check | Severidad |
|---|-------|-----------|
| 1 | Enlaces internos/externos rotos | **GRAVE** |
| 2 | Mezcla de dominios (.com/.es) / URL malformada | **GRAVE** |
| 3 | Contraste AA en textos principales | **GRAVE** |
| 4 | Placeholder visible (lorem ipsum / relleno) | **GRAVE** |
| 5-6 | Render 375px (móvil) y desktop (+ capturas) | WARNING |
| 7 | Anti-slop ("AI slop") | WARNING |
| 8 | Lighthouse performance (en local, no representativo) | WARNING |

Veredicto: ≥1 GRAVE → `rejected` (no se publica); 0 GRAVE → `pass` / `pass_with_warnings`.

## Herramienta principal
`playwright-cli` (`.claude/skills/playwright-cli/`): navegación real, clic en enlaces, formularios, capturas, inspección de red, viewports, sesiones con nombre.

## Skills que usa (índice)
- `playwright-cli` — motor de navegación/QA. Paso: ejecución de la suite.
- `impeccable` (`.claude/skills/impeccable/`) — detector anti-slop + contraste; engines `static-html`, `browser`, `contraste`. CLI = barato en tokens; sin instalación global.
- Lighthouse (vía CLI/playwright) — performance móvil (WARNING en v1; GRAVE solo con URL pública en v2).
- `seo-audit` (compartida con bloque 2) — checklist técnico/SEO para webs EXISTENTES de upsell (función v2).
- **Rúbrica COMPARTIDA** con el bloque 3: `../3-generador/rubrica.md`, sección «Comprueba SCRIPT». No tiene rúbrica propia.
- Mapa completo de accesos y doble función: `referencias/revisor-agente-accesos.md`.

## Persistencia
Reutiliza `agent_runs` (sin tabla nueva ni migración en v1): fila con `agent='revisor'`, veredicto y hallazgos en `output` (jsonb), motivo del rechazo en `flags`, capturas en disco. Bloque 7 (Mejora) consumirá estos runs.

## Caso piloto
Mudanzas Roy (UUID `cb1dfbea-7306-4c1e-bdde-b5d606243083`): previews v4 en `clientes/<uuid>/previews/v4/v4-1.html` … `v4-8.html`. Fallo conocido del `mudanzasroy.es` real: enlaces rotos mezclando `.com`/`.es` + URL malformada → debe salir GRAVE. `clientes/` está gitignored; el piloto trabaja sobre disco local.

Detalle completo: `referencias/revisor-agente-accesos.md` (esta carpeta).
