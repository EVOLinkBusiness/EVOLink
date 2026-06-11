-- Auditor v1 schema: profiles, clients, audits, agent_runs
-- Spec: docs/superpowers/specs/2026-06-08-auditor-v1-design.md §5

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  full_name text,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  city text,
  contact jsonb not null default '{}'::jsonb,
  website_url text,
  status text not null default 'prospect' check (status in ('prospect','active','churned')),
  source text not null default 'manual' check (source in ('manual','maps','outreach')),
  presence_data jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.audits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  version int not null default 1,
  status text not null default 'draft' check (status in ('draft','approved','sent')),
  overall_score int check (overall_score between 0 and 100),
  result jsonb not null default '{}'::jsonb,
  llm_draft jsonb,
  supervisor_flags jsonb not null default '[]'::jsonb,
  share_slug text unique not null default encode(gen_random_bytes(9), 'base64url'),
  approved_by uuid references public.profiles (id),
  approved_at timestamptz,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent text not null,
  client_id uuid references public.clients (id) on delete set null,
  audit_id uuid references public.audits (id) on delete set null,
  status text not null check (status in ('ok','error')),
  input jsonb not null default '{}'::jsonb,
  tokens_in int not null default 0,
  tokens_out int not null default 0,
  cost numeric(10,6) not null default 0,
  duration_ms int not null default 0,
  error text,
  created_at timestamptz not null default now()
);

create index audits_client_id_idx on public.audits (client_id);
create index audits_share_slug_idx on public.audits (share_slug);
create index agent_runs_agent_created_idx on public.agent_runs (agent, created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger audits_updated_at before update on public.audits
  for each row execute function public.set_updated_at();
