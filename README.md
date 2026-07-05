# 🎣 İstanbul Boğaz Avcılığı V3

İstanbul Boğazı için balıkçılık bilgi platformu. React + Vite + Tailwind + Supabase ile geliştirildi.

## Teknolojiler
- React 19 + Vite
- React Router (createBrowserRouter)
- Tailwind CSS (class tabanlı dark mode)
- Supabase (Auth, Database, Storage, Realtime)
- Leaflet / react-leaflet (haritalar)

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase anahtarlarınızı girin
npm run dev
```

## Ortam Değişkenleri (.env.local)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Supabase Kurulumu
`docs/supabase-schema.sql` dosyasını Supabase SQL Editor'da çalıştırın.

## Mimari
Feature-based (özellik tabanlı) yapı. Her özellik kendi `components/`, `hooks/`, `services/` klasörlerini içerir. Supabase çağrıları yalnızca `services/` katmanından yapılır.

## Komutlar
- `npm run dev` — geliştirme sunucusu
- `npm run build` — üretim derlemesi
- `npm run preview` — derlemeyi önizle
