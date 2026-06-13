-- Generador v1: un run por etapa. Aditivo, no rompe el Auditor (defaults).
-- La spec del Generador (§6) pide registrar inputs, outputs y flags por etapa;
-- el esquema original de agent_runs solo tenia input. Estas columnas lo completan.
alter table public.agent_runs
  add column if not exists stage  text,
  add column if not exists output jsonb not null default '{}'::jsonb,
  add column if not exists flags  jsonb not null default '[]'::jsonb;

create index if not exists agent_runs_stage_idx
  on public.agent_runs (agent, stage, created_at desc);
