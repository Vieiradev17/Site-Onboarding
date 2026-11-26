-- PAGINA INICIAL: textos compartilhados, editaveis apenas por superadministradores.
create table if not exists public.home_settings (
  id text primary key default 'home' check (id = 'home'),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.home_settings enable row level security;
drop policy if exists "home_settings_read_authenticated" on public.home_settings;
create policy "home_settings_read_authenticated"
  on public.home_settings for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "home_settings_manage_by_super_admin" on public.home_settings;
create policy "home_settings_manage_by_super_admin"
  on public.home_settings for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.home_settings to authenticated;
