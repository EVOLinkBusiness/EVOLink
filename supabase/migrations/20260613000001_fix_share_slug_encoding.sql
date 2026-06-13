-- Fix: encode() de Postgres no soporta 'base64url' (solo base64/hex/escape).
-- El default original de audits.share_slug fallaba en cada INSERT con
-- "ERROR: 22023 unrecognized encoding: base64url", bloqueando toda auditoría.
-- Slug URL-safe vía translate de base64 (9 bytes = 12 chars exactos, sin padding '=').
alter table public.audits
  alter column share_slug set default
  replace(replace(encode(gen_random_bytes(9), 'base64'), '+', '-'), '/', '_');
