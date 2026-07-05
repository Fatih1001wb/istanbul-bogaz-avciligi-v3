import { getFishStatusLabel } from '../../home/utils/fishStatus'

// Supabase satırını UI modeline dönüştürür.
export function mapFishSpecies(row) {
  if (!row) return row

  return {
    ...row,
    slug: row.slug || row.id,
    statusLabel: row.statusLabel || getFishStatusLabel(row.status),
    sort_order: row.sort_order ?? 0,
  }
}

export function sortFishByOrder(a, b) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export function isPublishedFish(row) {
  return row.is_published !== false
}
