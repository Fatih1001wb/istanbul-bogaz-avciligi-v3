-- ============================================================
-- İstanbul Boğaz Avcılığı V3 — MVP Şema (Adım 1)
-- Supabase SQL Editor'da sırayla çalıştırın.
-- ============================================================

-- Enum tipleri
do $$ begin
  create type public.user_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.fish_status as enum ('in_season', 'caution', 'closed');
exception when duplicate_object then null;
end $$;

-- 1) PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) FISH_SPECIES
create table if not exists public.fish_species (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  latin_name text,
  description text,
  image_url text,
  min_length_cm int,
  season text,
  status public.fish_status not null default 'in_season',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) REGULATIONS
create table if not exists public.regulations (
  id uuid primary key default gen_random_uuid(),
  fish_id uuid references public.fish_species(id) on delete set null,
  title text not null,
  description text,
  min_length_cm int,
  ban_start date,
  ban_end date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4) FISHING_SPOTS
create table if not exists public.fishing_spots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  latitude double precision not null,
  longitude double precision not null,
  spot_type text not null default 'shore',
  is_verified boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5) COMMUNITY_POSTS
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  image_url text,
  likes_count int not null default 0,
  comments_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6) POST_LIKES
create table if not exists public.post_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- 7) POST_COMMENTS
create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8) CHAT_MESSAGES
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

-- Performans indeksleri
create index if not exists idx_fish_species_slug on public.fish_species(slug);
create index if not exists idx_fish_species_published on public.fish_species(is_published, sort_order);
create index if not exists idx_fishing_spots_coords on public.fishing_spots(latitude, longitude);
create index if not exists idx_community_posts_created on public.community_posts(created_at desc);
create index if not exists idx_post_comments_post on public.post_comments(post_id, created_at);
create index if not exists idx_chat_messages_created on public.chat_messages(created_at desc);
