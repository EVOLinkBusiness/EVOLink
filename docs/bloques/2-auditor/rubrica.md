# Rúbrica — Bloque 2 (Auditor)

Qué comprueba el script y qué juzga el modelo. Código fuente: `supabase/functions/_shared/scoring/rubric.ts` (scoring) y `supabase/functions/_shared/supervisor.ts` (supervisión). Cambios de pesos o fórmulas → entrada en `CHANGELOG.md` citando el run que lo motiva.

## Scoring determinista (script, cero LLM en los números)

Cada dimensión → subscore 0-100. Dimensión sin datos → `null` ("datos insuficientes"): se excluye y su peso se renormaliza entre las presentes. Si TODAS faltan, `overall = null`.

| Dimensión | Peso | Fórmula (`rubric.ts`) |
|-----------|------|------------------------|
| `gbp` | 20% | % de 5 señales presentes: horario, ≥3 fotos, categoría, descripción, teléfono |
| `reviews` | 20% | volumen (hasta 50 pts, satura en 50 reseñas) + nota media (hasta 30 pts, escala 1-5) + recencia (≤3 meses: 20, ≤12: 10, más: 0) |
| `maps_visibility` | 15% | `100 − (posición−1)·15` — pos. 1=100, 2=85… 7+=0 |
| `opportunity` | 25% | base por volumen de búsqueda (low 60 / medium 30 / high 10) − 2·competidores con web (máx 5). Score bajo = mucha pérdida por no tener web |
| `nap` | 10% | % de listados con NAP coherente sobre el total revisado |
| `social` | 5% | tiene perfiles (40) + activos (40) + enlace de contacto (20) |
| `local_seo` | 5% | % de keywords locales en las que aparece sobre las comprobadas |

`overall = Σ(subscore·peso) / Σ(pesos presentes)`, redondeado y acotado a 0-100.

## Supervisión del borrador (dos pases)

**1. `ruleChecks` — script.** Comprueba lo verificable sin juicio:
- Toda dimensión CON score tiene su hallazgo en la narrativa.
- Ningún hallazgo habla de una dimensión SIN datos (riesgo de invención).
- Resumen ejecutivo ≥ 80 caracteres.
- Al menos 3 recomendaciones.

**2. `llmCheck` — modelo (Haiku 4.5, ~1K tokens).** Juzga lo que un script no puede:
- ¿El texto contradice los subscores?
- ¿Afirma cifras que no están en los datos de entrada?
- ¿El tono es profesional?

Los flags de ambos pases se concatenan en `audits.supervisor_flags` y se muestran al humano junto al borrador. La narrativa la genera Opus 4.8 (`llm.ts`); el sistema le pasa los números ya calculados y le prohíbe inventar métricas.

## Señales de aprendizaje capturadas (v1, sin minado automático)
- `audits.llm_draft` vs `audits.result` → qué editó el humano.
- `audits.supervisor_flags` → qué falla más a menudo.
- `agent_runs` → coste, errores, duración por ejecución.
