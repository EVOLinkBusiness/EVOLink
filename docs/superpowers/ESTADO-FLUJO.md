# Estado del flujo de Superpowers — Webs Javi

Registra en qué punto exacto del proceso superpowers estamos, para reanudar sin perder contexto entre sesiones. La "memoria" del proyecto son estos documentos versionados, no ninguna sesión concreta.

Fase global: **F1 — brainstorming pendiente de arrancar**. Infra (F0) hecha. Aún NO hay spec, ni plan de implementación, ni código de producto.

## Regla de continuidad
Nada vive solo en una conversación. Antes de cerrar se ejecuta `/cierre` (vuelca estado a `HANDOVER.md`); al abrir, `/inicio` lo recupera. Mientras el repo exista y esté commiteado, no se pierde detalle.

## Descomposición del negocio (a confirmar en brainstorming)
Subsistemas candidatos, cada uno con su propio ciclo spec → plan → código:
1. Lead-gen (Google Places)
2. Producción web (pipeline IA)
3. Ventas / outreach
4. Entrega / hosting / billing
5. Marketing automation

## Checklist de brainstorming (subsistema actual: — ninguno aún —)
| # | Paso | Estado |
|---|------|--------|
| 1 | Explorar contexto del proyecto | Pendiente |
| 2 | Ofrecer companion visual | Pendiente |
| 3 | Preguntas de aclaración | Pendiente |
| 4 | Proponer 2-3 enfoques | Pendiente |
| 5 | Presentar diseño y aprobar por secciones | Pendiente |
| 6 | Escribir spec de diseño | Pendiente |
| 7 | Auto-revisión de la spec | Pendiente |
| 8 | Revisión de la spec por el usuario | Pendiente |
| 9 | Pasar a writing-plans (plan de implementación) | Pendiente |

## Dónde retomar exactamente
Próxima acción: `/inicio` → invocar skill `brainstorming` para **descomponer el negocio** y elegir/diseñar el primer subsistema. Hasta tener una spec aprobada no se escribe código de producto (HARD-GATE).
