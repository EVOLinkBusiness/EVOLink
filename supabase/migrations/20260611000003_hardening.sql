-- Hardening tras advisors de Supabase (lints 0011 y 0028):
-- 1) search_path fijo en la función de trigger
alter function public.set_updated_at() set search_path = '';

-- 2) is_admin solo la evalúan usuarios autenticados (políticas RLS "to authenticated");
--    anon no la necesita y no debe poder sondearla vía /rest/v1/rpc
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- get_public_audit se queda ejecutable por anon a propósito: es el informe público (spec §5)
