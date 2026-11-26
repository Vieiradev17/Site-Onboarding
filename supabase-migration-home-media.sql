-- VISAO GERAL: imagens privadas, separadas por publico.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('home-media', 'home-media', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "home_media_read" on storage.objects;
create policy "home_media_read" on storage.objects for select to authenticated
using (
  bucket_id = 'home-media'
  and (
    public.is_super_admin()
    or (
      public.current_app_role() is not null
      and (
        split_part(name, '/', 1) = 'global'
        or (split_part(name, '/', 1) = 'sector' and split_part(name, '/', 2) = public.current_app_sector())
        or (split_part(name, '/', 1) = 'user' and split_part(name, '/', 2) = (select auth.uid())::text)
      )
      and exists (
        select 1
        from (
          select content from public.home_settings where id = 'home'
          union all
          select content from public.home_sector_settings where sector_id = public.current_app_sector()
          union all
          select content from public.home_user_settings where user_id = (select auth.uid())
        ) applicable
        where jsonb_path_exists(
          applicable.content, '$.** ? (@ == $image)',
          jsonb_build_object('image', to_jsonb('storage:' || storage.objects.name))
        )
      )
    )
  )
);

drop policy if exists "home_media_insert" on storage.objects;
create policy "home_media_insert" on storage.objects for insert to authenticated
with check (bucket_id = 'home-media' and public.is_super_admin());

drop policy if exists "home_media_delete" on storage.objects;
create policy "home_media_delete" on storage.objects for delete to authenticated
using (bucket_id = 'home-media' and public.is_super_admin());
