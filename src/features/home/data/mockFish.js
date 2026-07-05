// Ana sayfa balık kartları — Supabase fish_species şemasına uyumlu mock veri
export const mockFishSpecies = [
  {
    id: 'lufar',
    name: 'Lüfer',
    latin_name: 'Pomatomus saltatrix',
    image_url:
      'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop&q=80',
    min_length_cm: 20,
    season: 'Eylül – Kasım',
    status: 'in_season',
    statusLabel: 'Sezonda',
  },
  {
    id: 'palamut',
    name: 'Palamut',
    latin_name: 'Sarda sarda',
    image_url:
      'https://images.unsplash.com/photo-1534043464124-387be4badc22?w=800&h=600&fit=crop&q=80',
    min_length_cm: 25,
    season: 'Ağustos – Ekim',
    status: 'in_season',
    statusLabel: 'Sezonda',
  },
  {
    id: 'hamsi',
    name: 'Hamsi',
    latin_name: 'Engraulis encrasicolus',
    image_url:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b3a2?w=800&h=600&fit=crop&q=80',
    min_length_cm: 9,
    season: 'Ekim – Mart',
    status: 'caution',
    statusLabel: 'Boy Limiti',
  },
  {
    id: 'cinekop',
    name: 'Çinekop',
    latin_name: 'Trachurus trachurus',
    image_url:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
    min_length_cm: 13,
    season: 'Mayıs – Eylül',
    status: 'in_season',
    statusLabel: 'Sezonda',
  },
  {
    id: 'kefal',
    name: 'Kefal',
    latin_name: 'Mugil cephalus',
    image_url:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80',
    min_length_cm: 20,
    season: 'Yıl boyu',
    status: 'in_season',
    statusLabel: 'Sezonda',
  },
  {
    id: 'barbunya',
    name: 'Barbunya',
    latin_name: 'Mullus barbatus',
    image_url:
      'https://images.unsplash.com/photo-1565557623267-b17ff3f1cd8e?w=800&h=600&fit=crop&q=80',
    min_length_cm: 11,
    season: 'Nisan – Ekim',
    status: 'closed',
    statusLabel: 'Av Yasağı',
  },
]
