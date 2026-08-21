-- ============================================================
-- Row Level Security politikaları
-- ============================================================

alter table public.profiles enable row level security;
alter table public.fish_species enable row level security;
alter table public.regulations enable row level security;
alter table public.fishing_spots enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;
alter table public.chat_messages enable row level security;

-- ---- PROFILES ----
drop policy if exists "Profiller herkese açık" on public.profiles;
create policy "Profiller herkese açık"
  on public.profiles for select using (true);

drop policy if exists "Kendi profilini günceller" on public.profiles;
create policy "Kendi profilini günceller"
  on public.profiles for update using (auth.uid() = id);

-- ---- FISH_SPECIES ----
drop policy if exists "Herkes balıkları okuyabilir" on public.fish_species;
create policy "Herkes balıkları okuyabilir"
  on public.fish_species for select using (is_published = true or public.is_admin());

drop policy if exists "Admin balık yönetir" on public.fish_species;
create policy "Admin balık yönetir"
  on public.fish_species for all using (public.is_admin());

-- ---- REGULATIONS ----
drop policy if exists "Herkes kuralları okuyabilir" on public.regulations;
create policy "Herkes kuralları okuyabilir"
  on public.regulations for select using (true);

drop policy if exists "Admin kural yönetir" on public.regulations;
create policy "Admin kural yönetir"
  on public.regulations for all using (public.is_admin());

-- ---- FISHING_SPOTS ----
drop policy if exists "Herkes av noktalarını okuyabilir" on public.fishing_spots;
create policy "Herkes av noktalarını okuyabilir"
  on public.fishing_spots for select using (true);

drop policy if exists "Giriş yapan nokta ekler" on public.fishing_spots;
create policy "Giriş yapan nokta ekler"
  on public.fishing_spots for insert
  with check (auth.uid() = created_by);

drop policy if exists "Kendi noktasını günceller" on public.fishing_spots;
create policy "Kendi noktasını günceller"
  on public.fishing_spots for update
  using (auth.uid() = created_by or public.is_admin());

drop policy if exists "Kendi noktasını siler" on public.fishing_spots;
create policy "Kendi noktasını siler"
  on public.fishing_spots for delete
  using (auth.uid() = created_by or public.is_admin());

-- ---- COMMUNITY_POSTS ----
drop policy if exists "Gönderiler herkese açık" on public.community_posts;
create policy "Gönderiler herkese açık"
  on public.community_posts for select using (true);

drop policy if exists "Giriş yapan gönderi ekler" on public.community_posts;
create policy "Giriş yapan gönderi ekler"
  on public.community_posts for insert
  with check (auth.uid() = author_id);

drop policy if exists "Kendi gönderisini günceller" on public.community_posts;
create policy "Kendi gönderisini günceller"
  on public.community_posts for update
  using (auth.uid() = author_id or public.is_admin());

drop policy if exists "Kendi gönderisini siler" on public.community_posts;
create policy "Kendi gönderisini siler"
  on public.community_posts for delete
  using (auth.uid() = author_id or public.is_admin());

-- ---- POST_LIKES ----
drop policy if exists "Beğeniler herkese açık" on public.post_likes;
create policy "Beğeniler herkese açık"
  on public.post_likes for select using (true);

drop policy if exists "Giriş yapan beğenir" on public.post_likes;
create policy "Giriş yapan beğenir"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Kendi beğenisini kaldırır" on public.post_likes;
create policy "Kendi beğenisini kaldırır"
  on public.post_likes for delete
  using (auth.uid() = user_id);

-- ---- POST_COMMENTS ----
drop policy if exists "Yorumlar herkese açık" on public.post_comments;
create policy "Yorumlar herkese açık"
  on public.post_comments for select using (true);

drop policy if exists "Giriş yapan yorum ekler" on public.post_comments;
create policy "Giriş yapan yorum ekler"
  on public.post_comments for insert
  with check (auth.uid() = author_id);

drop policy if exists "Kendi yorumunu günceller" on public.post_comments;
create policy "Kendi yorumunu günceller"
  on public.post_comments for update
  using (auth.uid() = author_id);

drop policy if exists "Kendi yorumunu siler" on public.post_comments;
create policy "Kendi yorumunu siler"
  on public.post_comments for delete
  using (auth.uid() = author_id or public.is_admin());

-- ---- CHAT_MESSAGES ----
drop policy if exists "Mesajlar herkese açık" on public.chat_messages;
create policy "Mesajlar herkese açık"
  on public.chat_messages for select using (true);

drop policy if exists "Giriş yapan mesaj atar" on public.chat_messages;
create policy "Giriş yapan mesaj atar"
  on public.chat_messages for insert
  with check (auth.uid() = author_id);

drop policy if exists "Kendi mesajını siler" on public.chat_messages;
create policy "Kendi mesajını siler"
  on public.chat_messages for delete
  using (auth.uid() = author_id or public.is_admin());
