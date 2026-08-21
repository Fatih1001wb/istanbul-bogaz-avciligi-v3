const FISH_PLACEHOLDER = '/images/fish-placeholder.svg'

export function getFishImageUrl(slug, imageUrl) {
  if (
    imageUrl &&
    (imageUrl.includes('fish-images') ||
      imageUrl.startsWith('/') ||
      imageUrl.includes('supabase.co'))
  ) {
    return imageUrl
  }
  if (slug) {
    return `https://picsum.photos/seed/mavirota-${slug}/800/600`
  }
  return FISH_PLACEHOLDER
}

export function getFishPlaceholder() {
  return FISH_PLACEHOLDER
}
