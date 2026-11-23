create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  theme_preference text not null default 'system'
    check (theme_preference in ('system', 'light', 'dark')),
  active_sector_id text,
  progress jsonb not null default '{"tasks":[],"completedCourses":[]}'::jsonb,
  video_progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

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
