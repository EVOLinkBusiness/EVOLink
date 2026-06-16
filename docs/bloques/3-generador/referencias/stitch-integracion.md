# Referencia — Integración con Google Stitch

## Qué es Stitch
`stitch.withgoogle.com`: herramienta de Google Labs (Gemini 2.5 Pro) que genera UI (pantallas + sistema de diseño) a partir de texto, con export a HTML/CSS/Figma. Motor distinto a Claude → variedad real para el grupo "Stitch" de las 9 previews.

## Opción A — Manual (sin instalar nada)
1. El socio abre `stitch.withgoogle.com`, pega el prompt de `stitch-prompts.md`.
2. Genera, exporta HTML.
3. Pega el HTML en `_pruebas/preview-N.html`, ajusta placeholders/contacto/honestidad si hace falta.
4. Pasa el detector `impeccable` + check de mojibake como cualquier otra preview.

**Coste:** 0€, 0 instalaciones, 0 tokens de Claude.

## Opción B — MCP/API (activada 2026-06-16) ← ESTADO ACTUAL

Expone 14 tools de Stitch directamente en Claude Code vía MCP.

**Corrección al registro anterior:** el proxy v0.9.0 NO usa `GOOGLE_CLOUD_PROJECT` ni el token OAuth de `gcloud`. Requiere `STITCH_API_KEY` (API key durable) o `STITCH_ACCESS_TOKEN` (token gcloud, caduca en ~1h — no recomendado). El README del paquete estaba desactualizado en ese punto.

**Requisitos reales (ya cumplidos):**
- Google Cloud SDK v572 instalado (`gcloud` en PATH).
- `gcloud auth application-default login` (ADC, hecho por el socio).
- Proyecto GCP `evolink-stitch-123` (ya existía, vinculado a la cuenta del socio).
- API `stitch.googleapis.com` habilitada en ese proyecto.
- `STITCH_API_KEY` creada (restringida a Stitch) y guardada como variable de entorno del sistema con `setx STITCH_API_KEY "..."`.

**Config activa en `.mcp.json`:**
```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@_davideast/stitch-mcp", "proxy"],
      "env": { "STITCH_API_KEY": "${STITCH_API_KEY}" }
    }
  }
}
```

**14 tools disponibles:** `create_project`, `get_project`, `list_projects`, `create_design_system`, `list_design_systems`, `apply_design_system`, `update_design_system`, `create_design_system_from_design_md`, `upload_design_md`, `generate_screen_from_text`, `generate_variants`, `edit_screens`, `list_screens`, `get_screen`, `download_assets`.

**Aviso:** `@_davideast/stitch-mcp` es un paquete de tercero (David East, no oficial de Google) y experimental. Apto para previews internas; no depender de él para entrega a clientes sin verificar estabilidad.

## Flujo recomendado para previews 7-9 (MCP activo)

```
mcp__stitch__create_project → mcp__stitch__create_design_system →
mcp__stitch__generate_screen_from_text (con prompt de stitch-prompts.md) →
mcp__stitch__get_screen (exportar HTML) → preview-N.html → detector impeccable
```

## Estado
- 2026-06-16: investigado + **activado**. API key vía `setx`, entrada en `.mcp.json`, 14 tools verificadas.
- Opción A sigue disponible como fallback sin dependencias.
