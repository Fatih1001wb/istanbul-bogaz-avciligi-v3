-- ============================================================
-- Storage bucket'ları ve politikaları
-- Supabase Dashboard > Storage'da bucket'lar yoksa oluşturulur.
-- ============================================================

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('fish-images', 'fish-images', true),
  ('post-images', 'post-images', true)
on conflict (id) do nothing;

-- AVATARS: herkes okur, kullanıcı kendi klasörüne yükler
drop policy if exists "Avatarlar herkese açık" on storage.objects;
create policy "Avatarlar herkese açık"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Kullanıcı kendi avatarını yükler" on storage.objects;
create policy "Kullanıcı kendi avatarını yükler"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Kullanıcı kendi avatarını günceller" on storage.objects;
create policy "Kullanıcı kendi avatarını günceller"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Kullanıcı kendi avatarını siler" on storage.objects;
create policy "Kullanıcı kendi avatarını siler"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- FISH-IMAGES: herkes okur, admin yazar
drop policy if exists "Balık görselleri herkese açık" on storage.objects;
create policy "Balık görselleri herkese açık"
  on storage.objects for select
  using (bucket_id = 'fish-images');

drop policy if exists "Admin balık görseli yükler" on storage.objects;
create policy "Admin balık görseli yükler"
  on storage.objects for insert
  with check (bucket_id = 'fish-images' and public.is_admin());

drop policy if exists "Admin balık görseli yönetir" on storage.objects;
create policy "Admin balık görseli yönetir"
  on storage.objects for update
  using (bucket_id = 'fish-images' and public.is_admin());

drop policy if exists "Admin balık görseli siler" on storage.objects;
create policy "Admin balık görseli siler"
  on storage.objects for delete
  using (bucket_id = 'fish-images' and public.is_admin());

-- POST-IMAGES: herkes okur, kullanıcı kendi klasörüne yükler
drop policy if exists "Gönderi görselleri herkese açık" on storage.objects;
create policy "Gönderi görselleri herkese açık"
  on storage.objects for select
  using (bucket_id = 'post-images');

drop policy if exists "Kullanıcı gönderi görseli yükler" on storage.objects;
create policy "Kullanıcı gönderi görseli yükler"
  on storage.objects for insert
  with check (
    bucket_id = 'post-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Kullanıcı kendi gönderi görselini yönetir" on storage.objects;
create policy "Kullanıcı kendi gönderi görselini yönetir"
  on storage.objects for update
  using (
    bucket_id = 'post-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Kullanıcı kendi gönderi görselini siler" on storage.objects;
create policy "Kullanıcı kendi gönderi görselini siler"
  on storage.objects for delete
  using (
    bucket_id = 'post-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
