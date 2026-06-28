---
description: Arranca la sesión. Lee el contexto mínimo y reporta dónde estamos.
allowed-tools: Read, Bash(git status*), Bash(git log*), Bash(git branch*)
---

# /inicio — Arranque de sesión (EVOLink)

Ejecuta SIN pedir confirmación entre pasos. Máximo 6 tool calls.

1. Lee `HANDOVER.md` (raíz). Fuente principal del estado actual.
2. Lee `CLAUDE.md` (raíz). Reglas operativas permanentes. *(Ya se inyecta como project instructions; esta relectura es un refuerzo deliberado — omítela si ya está en contexto para ahorrar tokens.)*
3. Una sola llamada Bash: `git status --short && echo --- && git log --oneline -5 && echo --- && git branch --show-current`
4. Si el HANDOVER indica un **bloque activo**, lee `docs/bloques/<bloque>/ESTADO.md` **y `docs/bloques/<bloque>/GUIA-DESARROLLO-BLOQUE.md`** (procedimiento del bloque).
5. (Opcional, solo si el HANDOVER apunta a un archivo concreto del próximo paso) léelo.

Reporta en este formato EXACTO (markdown real, sin envolver en code fence — el negrita debe renderizarse):

```markdown
> **Sesión anterior ([fecha del HANDOVER]):** [1-2 frases: qué se hizo y en qué quedó]

**Branch:** [actual] · **Último commit:** `[hash corto]` [mensaje]
**Sin commitear:** [conteo + 1 línea, o "ninguno"]

**Fase:** [del HANDOVER] · **Bloque activo:** [del HANDOVER, o "ninguno"]

### ▶ Próximo paso
**[del HANDOVER, una frase]**

**Decisiones:** docs/BUSINESS.md (N activas) · **Bloqueos:** [del HANDOVER, o "ninguno"]
```

Termina preguntando si procedes con el próximo paso o hay otra prioridad (fuera del bloque anterior, como texto normal).

Reglas:
- NO leas `docs/` enteros. Solo HANDOVER + CLAUDE + git + ESTADO.md del bloque activo.
- NO ejecutes el próximo paso todavía: espera confirmación.
- Si no existe `HANDOVER.md`, dilo y pide usar `/cierre` al terminar.
- Responde en español, conciso.
