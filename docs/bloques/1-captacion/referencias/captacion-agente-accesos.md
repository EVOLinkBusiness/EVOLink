# Accesos — Bloque 1 (Captación/Seguimiento)

Ficha técnica de accesos del agente Captación. Borrador informado: el contrato definitivo
se cierra en su brainstorming → spec. Co-prioritario con el bloque 3 (decisión cerrada).

## Mapa de accesos

| Recurso | Acceso | Fase | Dónde se configura |
|---------|--------|------|--------------------|
| API de Anthropic | Cualifica y puntúa leads; redacta borradores de contacto y secuencias | Producción | Secreto de Edge Function; NUNCA en cliente |
| Supabase Postgres | Lee/escribe `clients` (status=prospect, source) + futuras tablas de leads/secuencias; registra en `agent_runs` | Producción | Service role + RLS |
| Edge Function `generate-audit` (bloque 2) | La invoca para producir la auditoría-gancho de cada lead cualificado | Producción | Llamada interna entre funciones |
| Resend | SOLO genera borradores de email en v1; **un socio revisa y envía**. Envío automático = fase posterior, con baja/opt-out implementado | Producción (asistido) | API key server-side |
| Google Places API | Rastreo de negocios por zona/nicho | ❌ Diferido (v1 = manual/semi). Activar implica coste por petición | Pendiente de spec |
| Skill `copywriting` (coreyhaines31/marketingskills) | Referencia para redactar outreach y secuencias que no suenen a spam | Desarrollo | `.claude/skills/` (nueva, aprobada en planificación 2026-06-10) |

## Límites legales (no negociables, UE)
RGPD + ePrivacy + LSSI: nada de contacto en frío masivo automatizado. El agente investiga,
cualifica y redacta; **los socios envían y cierran**. Interés legítimo documentado para B2B,
identificación clara del remitente y mecanismo de baja desde el primer email.

## Qué NO hace
- No envía emails sin revisión humana (v1).
- No cierra ventas (confianza humana).
- No usa datos de particulares: solo negocios (B2B).

## Aprendizaje y realimentación
- `agent_runs`: cada cualificación/borrador con coste y resultado.
- Señal clave: tasa de respuesta por plantilla/secuencia → qué outreach funciona.
- Borrador del agente vs email final enviado por el socio = señal de mejora (mismo patrón `llm_draft` del Auditor).
- Correcciones → `CHANGELOG.md` de este bloque, aprobadas por un socio.

## Conexión con el resto de agentes
```
1-CAPTACIÓN ──invoca──> 2-Auditor (gancho) ──si convierte──> 3-Generador
     │                                                            │
     └────────── agent_runs ──> 7-Mejora (futuro) <───────────────┘
```

## Decisiones
- [x] Skill `copywriting` aprobada e instalada (2026-06-10).
- [ ] En su spec (cuando toque): criterios de puntuación de leads y estructura de tablas.
