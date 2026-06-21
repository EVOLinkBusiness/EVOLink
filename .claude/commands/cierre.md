---
description: Cierra la sesión. Reescribe HANDOVER.md y ESTADO.md del bloque activo, actualiza README.md, commitea y pushea automáticamente.
allowed-tools: Read, Write, Bash(git status*), Bash(git log*), Bash(git diff*), Bash(git add *), Bash(git commit -m *), Bash(git push*)
---

# /cierre — Cierre de sesión (EVOLink)

Ejecuta en orden SIN pedir confirmación entre pasos. Máximo 8 tool calls.

1. Una sola llamada Bash: `git status --short && echo --- && git log --oneline -5`
2. Si en la sesión se avanzó un bloque, actualiza `docs/bloques/<bloque>/ESTADO.md` (checklist + "dónde retomar"). Si un cambio fue una corrección motivada por un fallo, añade una línea a su `CHANGELOG.md`.
3. Sobrescribe `HANDOVER.md` (raíz) con este formato EXACTO (límite duro: 200 líneas; objetivo: <80):

```
# HANDOVER — EVOLink

**Última sesión:** [YYYY-MM-DD]
**Branch:** [git branch --show-current]
**Último commit:** `[hash corto] [mensaje]`

---

## Estado del proyecto
[2-3 frases sobre la fase actual y qué funciona]

## Bloque activo
[N-nombre, o "ninguno"] — detalle en docs/bloques/<bloque>/ESTADO.md

## Hecho en la sesión actual ([fecha])
- [bullet por cada cambio significativo]

## Decisiones cerradas
Ver `docs/BUSINESS.md` §Decisiones ([N] activas). [Solo si hubo NUEVAS en esta sesión: listarlas aquí y AVISAR de añadirlas a BUSINESS.md.]

## Riesgos y avisos vivos
- [copiar del anterior + añadir nuevos; NUNCA vaciar]

## Próximo paso concreto
**[Una frase con archivo y acción]**
1. [Sub-paso 1]
2. [Sub-paso 2]

## Pendientes
- [ ] [tareas]

## Comando para reanudar
/inicio
```

4. Actualiza siempre `README.md` (raíz): pon al día la **barra de progreso** y el checklist de **sub-bloques** del bloque activo (formato definido en el propio README).
5. Muestra un resumen breve en markdown real (sin code fence):

```markdown
**Hecho en esta sesión:**
- [bullet por cada cambio significativo, igual que en el HANDOVER]

### ▶ Próximo paso
**[una frase, igual que en el HANDOVER]**
```

   Seguido de `git diff --stat` (HANDOVER.md, README.md y el ESTADO.md si se tocó).
6. Elige el tipo de commit que mejor refleje la sesión según esta lógica:
   - `feat` — se añadió código de producto nuevo o skills funcionales
   - `fix` — se corrigió un bug o un error de configuración
   - `docs` — solo documentación, HANDOVER, README, ESTADO o CHANGELOG
   - `chore` — mantenimiento (refactor, deps, limpieza)
   - Si la sesión mezcla tipos, usa **múltiples commits atómicos** (uno por tipo).
   Ejecuta: `git add -A && git commit -m "<tipo>(scope): <descripción concisa>\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
7. Pushea: `git push origin main`
8. Termina con: "**Sesión cerrada.** Próxima vez: `/inicio`".

Reglas:
- Las decisiones cerradas viven SOLO en `docs/BUSINESS.md`: el HANDOVER las referencia, NUNCA las copia.
- "Riesgos vivos" siempre se copia del anterior y se añade lo nuevo; nunca se vacía.
- NO leas `docs/` enteros: infiere de la sesión y del HANDOVER anterior.
- Responde en español, conciso.
