# Bloque 5 — Pagos y facturación

**Estado:** pendiente de spec. **Debe tener spec aprobada ANTES del primer cliente de pago.**
**Rol en el tejido:** Ops.

## Qué cubre
- Alta de cliente: cobro de setup (250-300 € fundadores) + suscripción 30 €/mes (Stripe Checkout/Billing).
- **Factura española obligatoria** por cada cobro (datos fiscales, IVA, numeración correlativa). Decidir en la spec: Stripe Invoicing vs herramienta de facturación ES.
- Impagos: recordatorio automático (Resend) → reintento → corte de servicio (pausar web en Cloudflare Pages) → reactivación.
- Registro en Supabase (tabla de suscripciones por `client_id`) + webhooks de Stripe vía Edge Function.

## Por qué es un bloque y no "un detalle del final"
El MRR es el activo del negocio (decisión cerrada). El flujo cobro→factura→impago→corte es tan core como generar la web.

## Próximo hito
Brainstorming → spec cuando el primer cliente esté cerca (no antes: YAGNI).
