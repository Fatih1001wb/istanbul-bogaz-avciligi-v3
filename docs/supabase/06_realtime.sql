-- ============================================================
-- Supabase Realtime — tablo yayınları ve replica identity
-- Admin panelindeki değişikliklerin anında yansıması için gerekli.
-- ============================================================

-- UPDATE/DELETE olaylarında tam satır verisi için
alter table public.profiles replica identity full;
alter table public.fish_species replica identity full;
alter table public.regulations replica identity full;
alter table public.fishing_spots replica identity full;
alter table public.community_posts replica identity full;
alter table public.post_likes replica identity full;
alter table public.post_comments replica identity full;
alter table public.chat_messages replica identity full;

-- supabase_realtime yayınına tabloları ekle (idempotent)
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'profiles',
    'fish_species',
    'regulations',
    'fishing_spots',
    'community_posts',
    'post_likes',
    'post_comments',
    'chat_messages'
  ]
  loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = tbl
    ) then
      execute format(
        'alter publication supabase_realtime add table public.%I',
        tbl
      );
    end if;
  end loop;
end $$;
