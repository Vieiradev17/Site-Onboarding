-- ESTADO DO USUARIO: tema, setor ativo e progresso.
create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  theme_preference text not null default 'system'
    check (theme_preference in ('system', 'light', 'dark')),
  active_sector_id text,
  progress jsonb not null default '{"tasks":[],"completedCourses":[]}'::jsonb,
  video_progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

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

-- CENTRAL DE AJUDA: tutoriais, contatos e conversao dos links anteriores.
create table if not exists public.help_contents (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  summary text not null check (char_length(btrim(summary)) between 1 and 200),
  body text not null default '' check (char_length(body) <= 5000),
  url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.help_contents
  add column if not exists steps jsonb not null default '[]'::jsonb;
alter table public.help_contents drop constraint if exists help_contents_url_check;
alter table public.help_contents add constraint help_contents_url_check
  check (char_length(url) <= 1000 and (url = '' or url ~* '^(https?://|mailto:|tel:)'));
alter table public.help_contents drop constraint if exists help_contents_check;
alter table public.help_contents drop constraint if exists help_contents_has_content_check;
alter table public.help_contents add constraint help_contents_has_content_check
  check (jsonb_typeof(steps) = 'array'
    and (btrim(body) <> '' or btrim(url) <> '' or steps <> '[]'::jsonb));

do $$
begin
  if to_regclass('public.help_contacts') is null then
    create table public.help_contacts (
      id uuid primary key default gen_random_uuid(),
      title text not null check (char_length(btrim(title)) between 1 and 120),
      summary text not null check (char_length(btrim(summary)) between 1 and 200),
      url text not null check (char_length(url) <= 1000 and url ~* '^(https?://|mailto:|tel:)'),
      created_at timestamptz not null default now()
    );
    insert into public.help_contacts (title, summary, url) values
      ('E-mail do suporte', 'suporte@grupovillela.com', 'mailto:suporte@grupovillela.com?subject=Ajuda%20VillelaTech%20Training'),
      ('WhatsApp', '+55 (51) 98985-2847', 'https://wa.me/5551989852847');
  end if;

  insert into public.help_contacts (id, title, summary, url, created_at)
    select id, title, summary, url, created_at from public.help_contents where url <> '';
  delete from public.help_contents
    where url <> '' and btrim(body) = '' and steps = '[]'::jsonb;
  update public.help_contents set url = '' where url <> '';
end
$$;

alter table public.help_contents drop constraint if exists help_contents_has_content_check;
alter table public.help_contents add constraint help_contents_has_content_check
  check (jsonb_typeof(steps) = 'array' and (btrim(body) <> '' or steps <> '[]'::jsonb));

-- CENTRAL DE AJUDA: permissoes de leitura e gerenciamento.
alter table public.help_contacts enable row level security;
drop policy if exists "help_contacts_read_authenticated" on public.help_contacts;
create policy "help_contacts_read_authenticated"
  on public.help_contacts for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "help_contacts_manage_by_super_admin" on public.help_contacts;
create policy "help_contacts_manage_by_super_admin"
  on public.help_contacts for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.help_contacts to authenticated;

alter table public.help_contents enable row level security;
drop policy if exists "help_contents_read_authenticated" on public.help_contents;
create policy "help_contents_read_authenticated"
  on public.help_contents for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "help_contents_manage_by_super_admin" on public.help_contents;
create policy "help_contents_manage_by_super_admin"
  on public.help_contents for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.help_contents to authenticated;

-- ESTADO DO USUARIO: permissoes individuais de leitura e gravacao.
alter table public.user_state enable row level security;
drop policy if exists "user_state_read_self" on public.user_state;
create policy "user_state_read_self"
  on public.user_state for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists "user_state_insert_self" on public.user_state;
create policy "user_state_insert_self"
  on public.user_state for insert to authenticated
  with check (user_id = (select auth.uid()));
drop policy if exists "user_state_update_self" on public.user_state;
create policy "user_state_update_self"
  on public.user_state for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
grant select, insert, update on public.user_state to authenticated;

-- TRILHAS: nomes, descricoes, imagens e exclusoes compartilhadas.
create table if not exists public.course_overrides (
  course_id text primary key,
  title text not null,
  description text not null,
  image_path text,
  deleted boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.course_overrides
  add column if not exists deleted boolean not null default false;

alter table public.course_overrides enable row level security;
drop policy if exists "course_overrides_read_authenticated" on public.course_overrides;
create policy "course_overrides_read_authenticated"
  on public.course_overrides for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "course_overrides_manage_by_super_admin" on public.course_overrides;
create policy "course_overrides_manage_by_super_admin"
  on public.course_overrides for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.course_overrides to authenticated;

-- DISPONIBILIDADE: opcoes personalizadas e exclusoes do catalogo.
create table if not exists public.assignment_options (
  id text primary key,
  type text not null check (type in ('course', 'resource', 'platform')),
  title text not null,
  created_at timestamptz not null default now()
);

alter table public.assignment_options enable row level security;
drop policy if exists "assignment_options_read_authenticated" on public.assignment_options;
create policy "assignment_options_read_authenticated"
  on public.assignment_options for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "assignment_options_manage_by_super_admin" on public.assignment_options;
create policy "assignment_options_manage_by_super_admin"
  on public.assignment_options for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.assignment_options to authenticated;

create table if not exists public.deleted_catalog_items (
  item_id text not null,
  type text not null check (type in ('resource', 'platform')),
  deleted_at timestamptz not null default now(),
  primary key (item_id, type)
);

alter table public.deleted_catalog_items enable row level security;
drop policy if exists "deleted_catalog_items_read_authenticated" on public.deleted_catalog_items;
create policy "deleted_catalog_items_read_authenticated"
  on public.deleted_catalog_items for select to authenticated
  using (public.current_app_role() is not null);
drop policy if exists "deleted_catalog_items_manage_by_super_admin" on public.deleted_catalog_items;
create policy "deleted_catalog_items_manage_by_super_admin"
  on public.deleted_catalog_items for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());
grant select, insert, update, delete on public.deleted_catalog_items to authenticated;

-- ANEXOS: metadados das orientacoes e acesso ao armazenamento privado.
alter table public.orientations add column if not exists file_path text;
alter table public.orientations add column if not exists file_name text not null default '';
alter table public.orientations add column if not exists file_type text not null default '';

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
      or exists (
        select 1
        from public.course_overrides override
        join public.sector_assignments assignment
          on assignment.sector_id = public.current_app_sector()
        where override.image_path = storage.objects.name
          and override.course_id = any(assignment.course_ids)
      )
      or exists (
        select 1
        from public.orientations orientation
        join public.orientation_sectors assignment
          on assignment.orientation_id = orientation.id
        where orientation.file_path = storage.objects.name
          and assignment.sector_id = public.current_app_sector()
      )
    )
  );
