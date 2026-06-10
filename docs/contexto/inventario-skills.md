# Inventario de skills — mapa por bloque y criba (aprobada 2026-06-10)

**Fecha:** 2026-06-10 · **Base:** 28 skills instaladas (~8.700 líneas) + 6 nuevas evaluadas.
Criba informada por las fichas de accesos de los 4 agentes (`docs/bloques/*/referencias/`).
**Criba APROBADA por ambos socios el 2026-06-10.**
"Archivar" = mover a `docs/archivo-skills/` (fuera de `.claude/skills/`, deja de cargar tokens; recuperable desde git en cualquier momento).

## Metodología (transversales — se quedan todas)
| Skill | Veredicto |
|-------|-----------|
| brainstorming · writing-plans · executing-plans · test-driven-development · systematic-debugging · verification-before-completion · using-superpowers · requesting-code-review · receiving-code-review · finishing-a-development-branch · writing-skills | Mantener |
| dispatching-parallel-agents · subagent-driven-development · using-git-worktrees | Mantener (uso bajo con 2 socios secuenciales; revisar en 3 meses) |

## Backend (bloques 1, 2, 3, 5)
| Skill | Bloques | Veredicto |
|-------|---------|-----------|
| supabase | 1-2-3-5 | Mantener |
| supabase-postgres-best-practices | 1-2-3-5 | Mantener |

## Diseño (bloque 3, comparte con 2 y 4)
| Skill | Bloques | Veredicto |
|-------|---------|-----------|
| ui-ux-pro-max | 3 (motor) · 2 (informe) | Mantener |
| brandkit | 3 | Mantener |
| redesign-skill | 3-4 (upsell) | Mantener |
| image-to-code-skill | 3 | Mantener |
| imagegen-frontend-web | 3 | Mantener |
| gpt-tasteskill | 3 (macro-motion GSAP) | Mantener |
| ui-animation | 3 (micro-interacciones) | Mantener |
| output-skill | 3 (salida completa) | Mantener |
| web-design-guidelines | 3-4 (QA) · 2 | Mantener |
| **taste-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — sustituida por `frontend-design` oficial |
| **soft-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — solapaba con frontend-design |
| **minimalist-skill** | 3 | **ARCHIVADA** (aprobado 2026-06-10) — solapaba con frontend-design |

## Nuevas (instaladas por la orden de setup; aprobadas en planificación 2026-06-10)
| Skill | Bloques | Por qué entra | Instalación |
|-------|---------|----------------|-------------|
| playwright-cli (microsoft) | 3-4 | QA con navegador real; barata en tokens (CLI) | Ya en FASE 4 |
| frontend-design (anthropics, oficial) | 3 · 2 | Diseño con intención propia, anti-plantilla; mantenida por Anthropic; sustituye 3 skills por 1 | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| next-best-practices (vercel-labs) | 2-3 | El stack es Next y se despliega en Vercel; skill del propio Vercel | `npx skills add https://github.com/vercel-labs/next-skills --skill next-best-practices` |
| extract-design-system (arvindrk) | 3-4 | Extrae el sistema de diseño de webs existentes → pieza exacta del upsell/rediseño (piloto mudanzasroy.es) | `npx skills add https://github.com/arvindrk/extract-design-system --skill extract-design-system` |
| seo-audit (coreyhaines31) | 2-4 | Checklist SEO local para la dimensión 7 del Auditor y auditorías de upsell. Snyk en "Warn" (solo markdown, riesgo bajo; leída antes de usar) | `npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit` |
| copywriting (coreyhaines31) | 1-3 | Outreach que no suena a spam + textos de webs orientados a captar clientes del nicho | `npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting` |

## Evaluadas y descartadas (no instalar)
| Skill | Razón |
|-------|-------|
| Suite impeccable (audit/polish/critique...) | Solapa con web-design-guidelines + rúbrica propia; +7 skills de carga sin ganancia |
| hyperframes / gsap (heygen) | Ya cubierto por gpt-tasteskill + ui-animation |
| shadcn | Opcional; riesgo de "look plantilla". Se decide en la spec del bloque 3 |
| marketing-psychology, content-strategy y resto de marketingskills | YAGNI: copywriting cubre la necesidad actual del bloque 1 |
| self-improving-agent (charon-fan) | Descartada en sesión 2026-06-10 (seguridad en Warn con código; sus 2 buenas ideas ya adoptadas en bloque 7) |

## Balance
28 instaladas → 25 tras archivar el grupo taste (ejecutado) + 6 nuevas = **31 skills activas, todas con bloque asignado**. Las 3 archivadas quedan en `docs/archivo-skills/`.
Carga real por sesión: solo descripciones; el contenido se lee bajo demanda. La ganancia de la criba
es de claridad (cero skills huérfanas) más que de tokens.
