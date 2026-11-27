-- SETORES: corrige apenas o nome original atribuido incorretamente.
update public.sectors
set name = 'Auditoria Interna'
where id = 'auditoria-interna' and name = 'Auditoria';
