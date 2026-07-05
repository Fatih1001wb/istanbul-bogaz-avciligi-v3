// Uygulama geneli sabitler — tek kaynak.

export const APP_NAME = 'İstanbul Boğaz Avcılığı'
export const APP_VERSION = 'V3'

// Navigasyon menüsü (Navbar ve mobil menüde kullanılır)
export const NAV_LINKS = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/balik-rehberi', label: 'Balık Rehberi' },
  { to: '/kurallar', label: 'Av Kuralları' },
  { to: '/hava-deniz', label: 'Hava & Deniz' },
  { to: '/av-noktalari', label: 'Av Noktaları' },
  { to: '/topluluk', label: 'Topluluk' },
]

// Mobil alt navigasyon — uygulama tarzı 5 sekme
export const BOTTOM_NAV_LINKS = [
  { to: '/', label: 'Ana Sayfa', icon: 'home' },
  { to: '/balik-rehberi', label: 'Balık', icon: 'fish' },
  { to: '/hava-deniz', label: 'Hava', icon: 'weather' },
  { to: '/topluluk', label: 'Topluluk', icon: 'community' },
  { to: '/profil', label: 'Profil', icon: 'profile', authOnly: true },
]

// Boğaz merkez koordinatı (harita başlangıç noktası)
export const BOSPHORUS_CENTER = { lat: 41.1086, lng: 29.0608 }
export const DEFAULT_MAP_ZOOM = 11

// Supabase tablo isimleri — tek yerden yönetilir
export const TABLES = {
  PROFILES: 'profiles',
  FISH_SPECIES: 'fish_species',
  REGULATIONS: 'regulations',
  FISHING_SPOTS: 'fishing_spots',
  COMMUNITY_POSTS: 'community_posts',
  POST_LIKES: 'post_likes',
  POST_COMMENTS: 'post_comments',
  CHAT_MESSAGES: 'chat_messages',
}

// Kullanıcı rolleri (profiles.role)
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

// Balık durum etiketleri (fish_species.status)
export const FISH_STATUS_LABELS = {
  in_season: 'Sezonda',
  caution: 'Boy Limiti',
  closed: 'Av Yasağı',
}

// Storage bucket isimleri
export const BUCKETS = {
  AVATARS: 'avatars',
  FISH_IMAGES: 'fish-images',
  POST_IMAGES: 'post-images',
}
