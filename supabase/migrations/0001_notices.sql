-- =============================================================================
-- UFA notices: schema, row-level security, storage bucket and storage policies
-- Run once in the Supabase SQL Editor (or via the Supabase CLI).
-- Idempotent where practical.
-- =============================================================================
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self" on public.admins for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.admins from anon;
revoke insert, update, delete on public.admins from authenticated;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a where a.user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 200),
  description text check (description is null or char_length(description) <= 1000),
  category text not null default 'General' check (char_length(btrim(category)) between 1 and 40),
  published_at date not null default ((now() at time zone 'Asia/Kolkata')::date),
  file_path text not null unique check (char_length(file_path) between 5 and 200 and file_path ~ '^[A-Za-z0-9._-]+$'),
  file_name text not null check (char_length(file_name) between 1 and 150),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null default auth.uid()
);
create index if not exists notices_published_idx on public.notices (published_at desc, created_at desc);
create index if not exists notices_created_by_idx on public.notices (created_by);
alter table public.notices enable row level security;
drop policy if exists "notices_public_read" on public.notices;
create policy "notices_public_read" on public.notices for select to anon, authenticated using (true);
drop policy if exists "notices_admin_insert" on public.notices;
create policy "notices_admin_insert" on public.notices for insert to authenticated with check ((select public.is_admin()));
drop policy if exists "notices_admin_delete" on public.notices;
create policy "notices_admin_delete" on public.notices for delete to authenticated using ((select public.is_admin()));
revoke insert, update, delete, truncate on public.notices from anon;
revoke update, truncate on public.notices from authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('notice-files', 'notice-files', true, 4194304, array['application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "notice_files_admin_select" on storage.objects;
create policy "notice_files_admin_select" on storage.objects for select to authenticated using (bucket_id = 'notice-files' and (select public.is_admin()));
drop policy if exists "notice_files_admin_insert" on storage.objects;
create policy "notice_files_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'notice-files' and (select public.is_admin()));
drop policy if exists "notice_files_admin_delete" on storage.objects;
create policy "notice_files_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'notice-files' and (select public.is_admin()));
