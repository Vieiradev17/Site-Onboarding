-- TABELAS PRINCIPAIS: perfis, setores, disponibilidade, materiais e notificacoes.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null default '',
  role text not null default 'collaborator'
    check (role in ('collaborator', 'admin', 'super-admin')),
  sector_id text,
  team text not null default '',
  access_blocked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.sectors (
  id text primary key,
  name text not null,
  vps text[] not null default array[]::text[],
  teams jsonb not null default '[]'::jsonb
    check (jsonb_typeof(teams) = 'array')
);

alter table public.sectors drop constraint if exists sectors_name_key;

create table if not exists public.sector_assignments (
  sector_id text primary key references public.sectors (id) on delete cascade,
  course_ids text[] not null default array[]::text[],
  resource_ids text[] not null default array[]::text[],
  platform_ids text[] not null default array[]::text[]
);

create table if not exists public.course_modules (
  id text primary key,
  course_id text not null,
  title text not null,
  description text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.course_modules add column if not exists description text not null default '';

create table if not exists public.course_materials (
  id text primary key,
  course_id text not null,
  module_id text not null references public.course_modules (id) on delete cascade,
  type text not null check (type in ('video', 'pdf', 'image', 'text', 'material')),
  title text not null,
  description text not null default '',
  url text not null default '',
  file_path text unique,
  file_name text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.course_materials drop constraint if exists course_materials_type_check;
alter table public.course_materials add constraint course_materials_type_check
  check (type in ('video', 'pdf', 'image', 'text', 'material'));

create table if not exists public.orientations (
  id text primary key,
  title text not null,
  body text not null,
  url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.orientation_sectors (
  orientation_id text not null references public.orientations (id) on delete cascade,
  sector_id text not null references public.sectors (id) on delete cascade,
  primary key (orientation_id, sector_id)
);

create table if not exists public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  event_key text not null,
  title text not null,
  body text not null default '',
  link text not null default '#/materiais',
  created_at timestamptz not null default now(),
  read_at timestamptz,
  unique (user_id, event_key)
);

create index if not exists notifications_user_created_at_idx
  on public.notifications (user_id, created_at desc);

-- PERMISSOES: perfil e setor do usuario autenticado.
create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = (select auth.uid())
    and access_blocked = false
$$;

create or replace function public.current_app_sector()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select sector_id
  from public.profiles
  where id = (select auth.uid())
    and access_blocked = false
$$;

create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() in ('admin', 'super-admin'), false)
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() = 'super-admin', false)
$$;

-- AUTENTICACAO: cria o perfil ao cadastrar uma conta.
create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is not null then
    insert into public.profiles (id, email, name)
    values (
      new.id,
      lower(new.email),
      coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists create_profile_after_auth_signup on auth.users;
create trigger create_profile_after_auth_signup
  after insert on auth.users
  for each row execute procedure public.create_profile_for_auth_user();

-- SEGURANCA: politicas de acesso por perfil, setor e conteudo.
alter table public.profiles enable row level security;
alter table public.sectors enable row level security;
alter table public.sector_assignments enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_materials enable row level security;
alter table public.orientations enable row level security;
alter table public.orientation_sectors enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "profiles_read_self_or_admin" on public.profiles;
create policy "profiles_read_self_or_admin"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_app_admin());

drop policy if exists "profiles_update_by_admin" on public.profiles;
create policy "profiles_update_by_admin"
  on public.profiles for update to authenticated
  using (
    public.is_super_admin()
    or (
      public.current_app_role() = 'admin'
      and id <> (select auth.uid())
      and role <> 'super-admin'
    )
  )
  with check (
    public.is_super_admin()
    or (
      public.current_app_role() = 'admin'
      and id <> (select auth.uid())
      and role <> 'super-admin'
    )
  );

drop policy if exists "sectors_read_authenticated" on public.sectors;
create policy "sectors_read_authenticated"
  on public.sectors for select to authenticated
  using (public.current_app_role() is not null);

drop policy if exists "sectors_manage_by_admin" on public.sectors;
create policy "sectors_manage_by_admin"
  on public.sectors for all to authenticated
  using (public.is_app_admin())
  with check (public.is_app_admin());

drop policy if exists "assignments_read_for_sector_or_admin" on public.sector_assignments;
create policy "assignments_read_for_sector_or_admin"
  on public.sector_assignments for select to authenticated
  using (sector_id = public.current_app_sector() or public.is_app_admin());

drop policy if exists "assignments_manage_by_super_admin" on public.sector_assignments;
create policy "assignments_manage_by_super_admin"
  on public.sector_assignments for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "course_modules_read_assigned" on public.course_modules;
create policy "course_modules_read_assigned"
  on public.course_modules for select to authenticated
  using (
    public.is_app_admin()
    or exists (
      select 1
      from public.sector_assignments assignment
      where assignment.sector_id = public.current_app_sector()
        and course_modules.course_id = any(assignment.platform_ids)
    )
  );

drop policy if exists "course_modules_manage_by_super_admin" on public.course_modules;
create policy "course_modules_manage_by_super_admin"
  on public.course_modules for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "course_materials_read_assigned" on public.course_materials;
create policy "course_materials_read_assigned"
  on public.course_materials for select to authenticated
  using (
    public.is_app_admin()
    or exists (
      select 1
      from public.sector_assignments assignment
      where assignment.sector_id = public.current_app_sector()
        and course_materials.course_id = any(assignment.platform_ids)
    )
  );

drop policy if exists "course_materials_manage_by_super_admin" on public.course_materials;
create policy "course_materials_manage_by_super_admin"
  on public.course_materials for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "orientations_read_for_sector_or_admin" on public.orientations;
create policy "orientations_read_for_sector_or_admin"
  on public.orientations for select to authenticated
  using (
    public.is_app_admin()
    or exists (
      select 1
      from public.orientation_sectors assignment
      where assignment.orientation_id = orientations.id
        and assignment.sector_id = public.current_app_sector()
    )
  );

drop policy if exists "orientations_manage_by_super_admin" on public.orientations;
create policy "orientations_manage_by_super_admin"
  on public.orientations for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "orientation_sectors_read_for_sector_or_admin" on public.orientation_sectors;
create policy "orientation_sectors_read_for_sector_or_admin"
  on public.orientation_sectors for select to authenticated
  using (sector_id = public.current_app_sector() or public.is_app_admin());

drop policy if exists "orientation_sectors_manage_by_super_admin" on public.orientation_sectors;
create policy "orientation_sectors_manage_by_super_admin"
  on public.orientation_sectors for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "notifications_read_self" on public.notifications;
create policy "notifications_read_self"
  on public.notifications for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "notifications_update_self" on public.notifications;
create policy "notifications_update_self"
  on public.notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- PERMISSOES SQL: privilegios das contas autenticadas e do servico.
grant select, insert, update on public.profiles to authenticated;
grant select, update on public.profiles to service_role;
grant select, insert, update, delete on public.sectors to authenticated;
grant select on public.sectors to service_role;
grant select, insert, update, delete on public.sector_assignments to authenticated;
grant select, insert, update, delete on public.course_modules to authenticated;
grant select, insert, update, delete on public.course_materials to authenticated;
grant select, insert, update, delete on public.orientations to authenticated;
grant select, insert, update, delete on public.orientation_sectors to authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.current_app_sector() to authenticated;
grant execute on function public.is_app_admin() to authenticated;
grant execute on function public.is_super_admin() to authenticated;

-- DADOS INICIAIS: setores e disponibilidade padrao.
insert into public.sectors (id, name, vps)
values
  ('juridico', 'Jurídico', array['Adria', 'Thalles', 'Mirelly']),
  ('invest', 'Invest', array['Alysson']),
  ('comercial-lead-next', 'Comercial Next', array['Bendl', 'Laureen']),
  ('vbb', 'VBB', array['Jader', 'Nayara']),
  ('rh-departamento-pessoal', 'RH Departamento Pessoal', array['Sueli', 'Audrey']),
  ('rh-franqueados', 'RH Franqueados', array['Sueli', 'Camila Maurente']),
  ('financeiro', 'Financeiro', array['Rocha', 'Mabiane']),
  ('auditoria-interna', 'Auditoria Interna', array['Jean Seindler']),
  ('auditoria', 'Auditoria', array['Wendel', 'Sergio']),
  ('desenvolvimento', 'Desenvolvimento', array['Wendel']),
  ('compliance', 'Compliance', array['Labarthe', 'Jean Seindler']),
  ('contabilidade', 'Contabilidade', array['Carla']),
  ('cobranca', 'Cobrança', array['Rocha', 'Camila Cristofoli']),
  ('c3', 'C3', array['Labarthe']),
  ('vboffice', 'VB Office', array['Guilherme Coletto', 'Rafael Aguiar']),
  ('ti', 'TI', array['Márcio']),
  ('tax', 'Tax', array['Molinaro', 'Fernanda Ferrari']),
  ('marketing', 'Marketing', array['Vinicius', 'Roberta']),
  ('comercial-lead-on', 'Comercial Lead On', array['Eduardo', 'Sabrina']),
  ('comercial', 'Comercial', array['Maquene'])
on conflict (id) do update
set name = excluded.name,
    vps = excluded.vps;

update public.profiles
set sector_id = 'ti',
    team = ''
where sector_id is not null
  and sector_id not in (
    'juridico', 'invest', 'comercial-lead-next', 'vbb',
    'rh-departamento-pessoal', 'rh-franqueados', 'financeiro',
    'auditoria-interna', 'auditoria', 'desenvolvimento', 'compliance',
    'contabilidade', 'cobranca', 'c3', 'vboffice', 'ti', 'tax',
    'marketing', 'comercial-lead-on', 'comercial'
  );

delete from public.sectors
where id not in (
  'juridico', 'invest', 'comercial-lead-next', 'vbb',
  'rh-departamento-pessoal', 'rh-franqueados', 'financeiro',
  'auditoria-interna', 'auditoria', 'desenvolvimento', 'compliance',
  'contabilidade', 'cobranca', 'c3', 'vboffice', 'ti', 'tax',
  'marketing', 'comercial-lead-on', 'comercial'
);

insert into public.sector_assignments (sector_id, course_ids, resource_ids, platform_ids)
select
  id,
  array['welcome', 'security', 'tools'],
  array['security-email', 'it-support', 'orientation-seat-change'],
  array['security']
from public.sectors
on conflict (sector_id) do nothing;

-- NOTIFICACOES: criacao e disparos para trilhas, modulos, materiais e orientacoes.
create or replace function public.create_sector_notification(
  target_sector_id text,
  notification_title text,
  notification_body text,
  notification_link text,
  notification_event_key text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (user_id, event_key, title, body, link)
  select profile.id, notification_event_key, notification_title, notification_body, notification_link
  from public.profiles profile
  where profile.sector_id = target_sector_id
    and profile.access_blocked = false
  on conflict (user_id, event_key) do nothing;
end;
$$;

revoke all on function public.create_sector_notification(text, text, text, text, text) from public, anon, authenticated;

create or replace function public.notify_new_sector_trail()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  platform_id text;
  platform_name text;
  old_platform_ids text[] := '{}'::text[];
  platform_page text;
begin
  if tg_op = 'UPDATE' then
    old_platform_ids := coalesce(old.platform_ids, '{}'::text[]);
  end if;

  for platform_id in
    select unnest(coalesce(new.platform_ids, '{}'::text[]))
    except
    select unnest(old_platform_ids)
  loop
    platform_page := case platform_id
      when 'hubspot' then 'hubspot'
      when 'microsoft' then 'microsoft'
      when 'security' then 'seguranca'
      else 'materiais'
    end;
    platform_name := case platform_id
      when 'hubspot' then 'HubSpot'
      when 'microsoft' then 'Microsoft 365'
      when 'security' then 'Segurança e TI'
      else platform_id
    end;
    perform public.create_sector_notification(
      new.sector_id,
      'Nova trilha disponível',
      format('A trilha %s agora está disponível para o seu setor.', platform_name),
      format('#/materiais/%s', platform_page),
      format('trail:%s:%s:%s', new.sector_id, platform_id, gen_random_uuid())
    );
  end loop;
  return new;
end;
$$;

drop trigger if exists notify_sector_trail_after_assignment on public.sector_assignments;
create trigger notify_sector_trail_after_assignment
  after insert or update on public.sector_assignments
  for each row execute procedure public.notify_new_sector_trail();

create or replace function public.notify_new_course_module()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_sector record;
  platform_page text;
  platform_name text;
begin
  platform_page := case new.course_id
    when 'hubspot' then 'hubspot'
    when 'microsoft' then 'microsoft'
    when 'security' then 'seguranca'
    else 'materiais'
  end;
  platform_name := case new.course_id
    when 'hubspot' then 'HubSpot'
    when 'microsoft' then 'Microsoft 365'
    when 'security' then 'Segurança e TI'
    else new.course_id
  end;
  for assigned_sector in
    select assignment.sector_id
    from public.sector_assignments assignment
    where new.course_id = any(assignment.platform_ids)
  loop
    perform public.create_sector_notification(
      assigned_sector.sector_id,
      'Novo módulo publicado',
      format('O módulo %s de %s já pode ser acessado.', new.title, platform_name),
      format('#/materiais/%s?modulo=%s', platform_page, new.id),
      format('module:%s', new.id)
    );
  end loop;
  return new;
end;
$$;

drop trigger if exists notify_course_module_after_insert on public.course_modules;
create trigger notify_course_module_after_insert
  after insert on public.course_modules
  for each row execute procedure public.notify_new_course_module();

create or replace function public.notify_new_course_material()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_sector record;
  platform_page text;
  platform_name text;
begin
  platform_page := case new.course_id
    when 'hubspot' then 'hubspot'
    when 'microsoft' then 'microsoft'
    when 'security' then 'seguranca'
    else 'materiais'
  end;
  platform_name := case new.course_id
    when 'hubspot' then 'HubSpot'
    when 'microsoft' then 'Microsoft 365'
    when 'security' then 'Segurança e TI'
    else new.course_id
  end;
  for assigned_sector in
    select assignment.sector_id
    from public.sector_assignments assignment
    where new.course_id = any(assignment.platform_ids)
  loop
    perform public.create_sector_notification(
      assigned_sector.sector_id,
      'Novo conteúdo publicado',
      format('%s foi publicado em um módulo de %s.', new.title, platform_name),
      format('#/materiais/%s?modulo=%s&aula=%s', platform_page, new.module_id, new.id),
      format('material:%s', new.id)
    );
  end loop;
  return new;
end;
$$;

drop trigger if exists notify_course_material_after_insert on public.course_materials;
create trigger notify_course_material_after_insert
  after insert on public.course_materials
  for each row execute procedure public.notify_new_course_material();

create or replace function public.notify_new_orientation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  orientation_title text;
begin
  select orientation.title into orientation_title
  from public.orientations orientation
  where orientation.id = new.orientation_id;
  if orientation_title is not null then
    perform public.create_sector_notification(
      new.sector_id,
      'Nova orientação publicada',
      format('%s está disponível para consulta.', orientation_title),
      '#/orientacoes',
      format('orientation:%s:%s', new.orientation_id, new.sector_id)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists notify_orientation_after_assignment on public.orientation_sectors;
create trigger notify_orientation_after_assignment
  after insert on public.orientation_sectors
  for each row execute procedure public.notify_new_orientation();

-- TEMPO REAL: habilita a publicacao das notificacoes.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'notifications'
    ) then
    execute 'alter publication supabase_realtime add table public.notifications';
  end if;
end;
$$;

-- ARQUIVOS: bucket privado e politicas de acesso aos materiais.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'course-media',
  'course-media',
  false,
  52428800,
  array['video/mp4', 'video/webm', 'video/quicktime', 'application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "course_media_read_assigned" on storage.objects;
create policy "course_media_read_assigned"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'course-media'
    and (
      public.is_app_admin()
      or exists (
        select 1
        from public.course_materials material
        join public.sector_assignments assignment
          on assignment.sector_id = public.current_app_sector()
        where material.file_path = storage.objects.name
          and material.course_id = any(assignment.platform_ids)
      )
    )
  );

drop policy if exists "course_media_insert_by_super_admin" on storage.objects;
create policy "course_media_insert_by_super_admin"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'course-media' and public.is_super_admin());

drop policy if exists "course_media_update_by_super_admin" on storage.objects;
create policy "course_media_update_by_super_admin"
  on storage.objects for update to authenticated
  using (bucket_id = 'course-media' and public.is_super_admin())
  with check (bucket_id = 'course-media' and public.is_super_admin());

drop policy if exists "course_media_delete_by_super_admin" on storage.objects;
create policy "course_media_delete_by_super_admin"
  on storage.objects for delete to authenticated
  using (bucket_id = 'course-media' and public.is_super_admin());
