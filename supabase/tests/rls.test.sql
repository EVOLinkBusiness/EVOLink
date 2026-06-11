begin;
create extension if not exists pgtap with schema extensions;
select plan(4);

-- 1. anon no lee clients
set local role anon;
select is_empty('select * from public.clients', 'anon cannot read clients');

-- 2. anon no lee audits
select is_empty('select * from public.audits', 'anon cannot read audits');

-- 3. get_public_audit no devuelve borradores
select is_empty(
  $$select * from public.get_public_audit('slug-inexistente')$$,
  'get_public_audit returns nothing for unknown/draft slug'
);

-- 4. usuario autenticado SIN perfil admin no lee clients
set local role authenticated;
set local request.jwt.claims to '{"sub":"00000000-0000-0000-0000-000000000099","role":"authenticated"}';
select is_empty('select * from public.clients', 'non-admin authenticated cannot read clients');

select * from finish();
rollback;
