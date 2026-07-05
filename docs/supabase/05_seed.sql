-- ============================================================
-- Başlangıç verisi — Balık türleri (Adım 3'e kadar mock yerine kullanılabilir)
-- Tekrar çalıştırılabilir (slug üzerinden upsert).
-- ============================================================

insert into public.fish_species (slug, name, latin_name, image_url, min_length_cm, season, status, sort_order)
values
  (
    'lufar', 'Lüfer', 'Pomatomus saltatrix',
    'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop&q=80',
    20, 'Eylül – Kasım', 'in_season', 1
  ),
  (
    'palamut', 'Palamut', 'Sarda sarda',
    'https://images.unsplash.com/photo-1534043464124-387be4badc22?w=800&h=600&fit=crop&q=80',
    25, 'Ağustos – Ekim', 'in_season', 2
  ),
  (
    'hamsi', 'Hamsi', 'Engraulis encrasicolus',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b3a2?w=800&h=600&fit=crop&q=80',
    9, 'Ekim – Mart', 'caution', 3
  ),
  (
    'cinekop', 'Çinekop', 'Trachurus trachurus',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
    13, 'Mayıs – Eylül', 'in_season', 4
  ),
  (
    'kefal', 'Kefal', 'Mugil cephalus',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80',
    20, 'Yıl boyu', 'in_season', 5
  ),
  (
    'barbunya', 'Barbunya', 'Mullus barbatus',
    'https://images.unsplash.com/photo-1565557623267-b17ff3f1cd8e?w=800&h=600&fit=crop&q=80',
    11, 'Nisan – Ekim', 'closed', 6
  )
on conflict (slug) do update set
  name = excluded.name,
  latin_name = excluded.latin_name,
  image_url = excluded.image_url,
  min_length_cm = excluded.min_length_cm,
  season = excluded.season,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Örnek av noktaları (Boğaz)
insert into public.fishing_spots (name, description, latitude, longitude, spot_type, is_verified)
select * from (values
  ('Bebek Sahili', 'Kıyıdan lüfer ve çinekop için popüler nokta.', 41.0775, 29.0433, 'shore', true),
  ('Kandilli Önleri', 'Derin su, palamut ve lüfer avı.', 41.0667, 29.0583, 'shore', true),
  ('Sarıyer İskelesi', 'İskeleden hamsi ve istavrit.', 41.1667, 29.0500, 'pier', true),
  ('Çengelköy', 'Sakin kıyı, kefal ve çipura.', 41.0500, 29.0500, 'shore', true),
  ('Ortaköy', 'Merkezi konum, akşam avı.', 41.0553, 29.0275, 'shore', true)
) as v(name, description, latitude, longitude, spot_type, is_verified)
where not exists (
  select 1 from public.fishing_spots fs where fs.name = v.name
);
