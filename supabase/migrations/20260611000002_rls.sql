-- RLS: admins acceso total; público solo vía get_public_audit (security definer)
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.audits enable row level security;
alter table public.agent_runs enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "admins read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

create policy "admins all clients" on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins all audits" on public.audits
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins all agent_runs" on public.agent_runs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Informe público: SOLO approved/sent y campos saneados (sin llm_draft ni flags)
create or replace function public.get_public_audit(slug text)
returns table (
  client_name text,
  client_category text,
  client_city text,
  overall_score int,
  result jsonb,
  approved_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select c.name, c.category, c.city, a.overall_score, a.result, a.approved_at
  from public.audits a
  join public.clients c on c.id = a.client_id
  where a.share_slug = slug and a.status in ('approved','sent');
$$;

grant execute on function public.get_public_audit(text) to anon, authenticated;
