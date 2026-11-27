-- VISAO GERAL: personalizacoes por setor e usuario.
create table if not exists public.home_sector_settings (
  sector_id text primary key references public.sectors (id) on delete cascade,
  content jsonb not null check (jsonb_typeof(content) = 'object')
);

create table if not exists public.home_user_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  content jsonb not null check (jsonb_typeof(content) = 'object')
);

alter table public.home_sector_settings enable row level security;
drop policy if exists "home_sector_settings_read" on public.home_sector_settings;
create policy "home_sector_settings_read" on public.home_sector_settings for select to authenticated
  using (public.is_super_admin() or (public.current_app_role() is not null and sector_id = public.current_app_sector()));
drop policy if exists "home_sector_settings_manage" on public.home_sector_settings;
create policy "home_sector_settings_manage" on public.home_sector_settings for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());
grant select, insert, update, delete on public.home_sector_settings to authenticated;

alter table public.home_user_settings enable row level security;
drop policy if exists "home_user_settings_read" on public.home_user_settings;
create policy "home_user_settings_read" on public.home_user_settings for select to authenticated
  using (public.is_super_admin() or (public.current_app_role() is not null and user_id = (select auth.uid())));
drop policy if exists "home_user_settings_manage" on public.home_user_settings;
create policy "home_user_settings_manage" on public.home_user_settings for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());
grant select, insert, update, delete on public.home_user_settings to authenticated;

-- A consulta completa do editor nao limita a lista ao tamanho padrao de pagina da API.
create or replace function public.get_home_settings_editor_data()
returns jsonb
language plpgsql
stable
security definer
set search_path = pg_catalog, public
as $$
begin
  if not public.is_super_admin() then
    raise exception 'Apenas superadministradores podem editar a visão geral.'
      using errcode = '42501';
  end if;
  return jsonb_build_object(
    'global', (select content from public.home_settings where id = 'home'),
    'sectors', (select coalesce(jsonb_agg(jsonb_build_object(
      'id', id, 'name', name, 'vps', vps
    ) order by name, id), '[]'::jsonb) from public.sectors),
    'users', (select coalesce(jsonb_agg(jsonb_build_object(
      'id', id, 'name', name, 'email', email, 'sectorId', sector_id
    ) order by name, id), '[]'::jsonb) from public.profiles),
    'sectorOverrides', (select coalesce(jsonb_object_agg(sector_id, content), '{}'::jsonb) from public.home_sector_settings),
    'userOverrides', (select coalesce(jsonb_object_agg(user_id::text, content), '{}'::jsonb) from public.home_user_settings)
  );
end;
$$;
revoke all on function public.get_home_settings_editor_data() from public, anon;
grant execute on function public.get_home_settings_editor_data() to authenticated;
