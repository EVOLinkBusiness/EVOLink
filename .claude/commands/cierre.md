---
description: Cierra la sesión. Reescribe HANDOVER.md con estado y próximo paso, y propone commit.
allowed-tools: Read, Write, Bash(git status*), Bash(git log*), Bash(git diff*), Bash(git add *), Bash(git commit -m *)
---

# /cierre — Cierre de sesión (Webs Javi)

Ejecuta en orden SIN pedir confirmación entre pasos. Máximo 6 tool calls.

1. Una sola llamada Bash: `git status --short && echo --- && git log --oneline -5`
2. Sobrescribe `HANDOVER.md` (raíz) con este formato EXACTO:

```
# HANDOVER — Webs Javi

**Última sesión:** [YYYY-MM-DD]
**Branch:** [git branch --show-current]
**Último commit:** `[hash corto] [mensaje]`

---

## Estado del proyecto
[2-3 frases sobre la fase actual y qué funciona]

## Hecho en la sesión actual ([fecha])
- [bullet por cada cambio significativo]

## Subsistemas / módulos en estado
- [Subsistema o módulo] — [diseñado / en código / a medias / pendiente]

## Decisiones cerradas (no reabrir)
[copiar del anterior + añadir nuevas]
- Producción web = IA a medida con skills propias (ui-ux-pro-max + taste); código Astro/Next + Tailwind.
- Monetización = híbrida: setup inicial + cuota mensual (recurrencia).
- Lead-gen = Google Places API oficial.
- Metodología = réplica de re-oni-roll/AllergINC + plugin superpowers (brainstorming → spec → plan → código).

## Riesgos y avisos vivos
- Negocio aún en fase de diseño: nada de producto sin spec aprobada (HARD-GATE de brainstorming).
- Las 4 decisiones cerradas no se reabren sin acuerdo de los 2 socios.
- [otros que surjan]

## Próximo paso concreto
**[Una frase con archivo y acción]**
1. [Sub-paso 1]
2. [Sub-paso 2]

## Pendientes
- [ ] [tareas]

## Comando para reanudar
/inicio
```

3. Muestra `git diff HANDOVER.md` (primeras 40 líneas).
4. Pregunta: "¿Hago commit de esta sesión? Dime el tipo (feat/fix/docs/chore)."
5. Si confirma: propón mensaje convencional y `git add -A && git commit -m "..."`. Recuerda hacer `git push`.
6. Termina con: "Sesión cerrada. Próxima vez: /inicio".

Reglas:
- NO leas `docs/` enteros: infiere de la sesión y del HANDOVER anterior.
- "Decisiones cerradas" y "Riesgos vivos" SIEMPRE se copian y se añade lo nuevo; nunca se vacían.
- Responde en español, conciso.
