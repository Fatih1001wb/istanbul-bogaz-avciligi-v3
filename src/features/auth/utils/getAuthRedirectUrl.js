// OAuth dönüş URL'si — Supabase Dashboard'da izinli olmalıdır.
export function getAuthRedirectUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${window.location.origin}${normalized}`
}
