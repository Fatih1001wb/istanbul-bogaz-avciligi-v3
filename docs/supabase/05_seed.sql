-- ============================================================
-- Başlangıç verisi — Balık türleri (Adım 3'e kadar mock yerine kullanılabilir)
-- Tekrar çalıştırılabilir (slug üzerinden upsert).
-- ============================================================

insert into public.fish_species (slug, name, latin_name, description, image_url, min_length_cm, season, status, sort_order)
values
  (
    'lufar', 'Lüfer', 'Pomatomus saltatrix',
    'Türkiye kıyılarının en popüler av balıklarından biri. Sürü halinde avlanır, sonbaharda Boğaz ve Karadeniz''de yoğundur.',
    'https://picsum.photos/seed/mavirota-lufar/800/600',
    20, 'Eylül – Kasım', 'in_season', 1
  ),
  (
    'palamut', 'Palamut', 'Sarda sarda',
    'Hızlı yüzen pelagik tür. Yaz sonu ve sonbaharda Marmara ve Karadeniz kıyılarında görülür.',
    'https://picsum.photos/seed/mavirota-palamut/800/600',
    25, 'Ağustos – Ekim', 'in_season', 2
  ),
  (
    'hamsi', 'Hamsi', 'Engraulis encrasicolus',
    'Karadeniz''in simge balığı. Küçük boylu sürüler halinde avlanır; boy limitine dikkat edilmelidir.',
    'https://picsum.photos/seed/mavirota-hamsi/800/600',
    9, 'Ekim – Mart', 'caution', 3
  ),
  (
    'cinekop', 'Çinekop', 'Trachurus trachurus',
    'Kıyı ve açık denizde yaygın. İlkbahardan sonbahara kadar aktif sezondadır.',
    'https://picsum.photos/seed/mavirota-cinekop/800/600',
    13, 'Mayıs – Eylül', 'in_season', 4
  ),
  (
    'kefal', 'Kefal', 'Mugil cephalus',
    'Kıyı balıkçılığının klasik türü. Hafif tuzlu ve tatlı su geçişlerinde bulunur.',
    'https://picsum.photos/seed/mavirota-kefal/800/600',
    20, 'Yıl boyu', 'in_season', 5
  ),
  (
    'barbunya', 'Barbunya', 'Mullus barbatus',
    'Dip balığı olarak bilinir. Sezon ve bölgesel yasaklar dönemsel olarak uygulanabilir.',
    'https://picsum.photos/seed/mavirota-barbunya/800/600',
    11, 'Nisan – Ekim', 'closed', 6
  )
on conflict (slug) do update set
  name = excluded.name,
  latin_name = excluded.latin_name,
  description = excluded.description,
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
