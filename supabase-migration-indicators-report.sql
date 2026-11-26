-- INDICADORES: relatorio de acessos e progresso exclusivo para superadministradores.
create or replace function public.get_indicators_report()
returns jsonb
language plpgsql
stable
security definer
set search_path = pg_catalog, public
as $$
declare
  report jsonb;
begin
  if not public.is_super_admin() then
    raise exception 'Apenas superadministradores podem consultar este relatório.'
      using errcode = '42501';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'id', profile.id,
    'name', profile.name,
    'email', profile.email,
    'role', profile.role,
    'sectorId', profile.sector_id,
    'sectorName', sector.name,
    'sectorVps', sector.vps,
    'team', profile.team,
    'accessBlocked', profile.access_blocked,
    'progress', coalesce(state.progress, '{"tasks":[],"completedCourses":[]}'::jsonb)
  ) order by profile.name, profile.id), '[]'::jsonb)
  into report
  from public.profiles profile
  left join public.sectors sector on sector.id = profile.sector_id
  left join public.user_state state on state.user_id = profile.id;

  return report;
end;
$$;

revoke all on function public.get_indicators_report() from public, anon;
grant execute on function public.get_indicators_report() to authenticated;
