-- Este proyecto tiene los default privileges recortados (template endurecido con
-- rls_auto_enable): las tablas nuevas nacen sin SELECT/INSERT para los roles de la API.
-- Grants mínimos alineados con las políticas RLS:
--   anon: nada (el informe público entra solo por get_public_audit, security definer)
--   authenticated: CRUD en tablas operativas (RLS restringe a admins), lectura de su perfil
--   service_role: todo (lo usa la Edge Function; bypasea RLS por diseño)

grant select, insert, update, delete on public.clients, public.audits, public.agent_runs to authenticated;
grant select on public.profiles to authenticated;

grant all on public.clients, public.audits, public.agent_runs, public.profiles to service_role;
