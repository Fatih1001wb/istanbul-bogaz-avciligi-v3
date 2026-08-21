// Saf yardımcı fonksiyonlar — yan etkisiz, test edilebilir.

export function formatDate(dateString, locale = 'tr-TR') {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatRelativeTime(dateString) {
  if (!dateString) return ''
  const diff = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'az önce'
  if (mins < 60) return `${mins} dk önce`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} sa önce`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} gün önce`
  return formatDate(dateString)
}

export function formatLength(cm) {
  if (cm == null) return '—'
  return `${cm} cm`
}
