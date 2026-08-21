-- ============================================================
-- Fonksiyonlar ve tetikleyiciler
-- ============================================================

-- updated_at otomatik güncelleme
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Admin kontrolü (RLS politikalarında kullanılır)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Yeni kullanıcı kaydında otomatik profil (email + Google OAuth uyumlu)
create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_username text;
  final_username text;
  suffix int := 0;
begin
  base_username := coalesce(
    nullif(trim(new.raw_user_meta_data->>'username'), ''),
    nullif(trim(split_part(new.email, '@', 1)), ''),
    'balikci'
  );

  final_username := base_username;

  while exists (select 1 from public.profiles where username = final_username) loop
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  end loop;

  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    final_username,
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
      nullif(trim(new.raw_user_meta_data->>'name'), ''),
      final_username
    )
  );

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Gönderi beğeni sayacı
create or replace function public.handle_post_like_change()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
    set likes_count = likes_count + 1
    where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.community_posts
    set likes_count = greatest(likes_count - 1, 0)
    where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_post_like_change on public.post_likes;
create trigger on_post_like_change
  after insert or delete on public.post_likes
  for each row execute procedure public.handle_post_like_change();

-- Yorum sayacı
create or replace function public.handle_post_comment_change()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
    set comments_count = comments_count + 1
    where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.community_posts
    set comments_count = greatest(comments_count - 1, 0)
    where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_post_comment_change on public.post_comments;
create trigger on_post_comment_change
  after insert or delete on public.post_comments
  for each row execute procedure public.handle_post_comment_change();

-- updated_at tetikleyicileri
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_fish_species_updated_at on public.fish_species;
create trigger set_fish_species_updated_at
  before update on public.fish_species
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_regulations_updated_at on public.regulations;
create trigger set_regulations_updated_at
  before update on public.regulations
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_fishing_spots_updated_at on public.fishing_spots;
create trigger set_fishing_spots_updated_at
  before update on public.fishing_spots
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_community_posts_updated_at on public.community_posts;
create trigger set_community_posts_updated_at
  before update on public.community_posts
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_post_comments_updated_at on public.post_comments;
create trigger set_post_comments_updated_at
  before update on public.post_comments
  for each row execute procedure public.set_updated_at();
