import { getFishStatusLabel } from './fishStatus'
import { getFishImageUrl } from '../../../utils/placeholders'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isFishUuid(value) {
  return UUID_RE.test(value)
}

export function mapFishSpecies(row) {
  if (!row) return row

  const slug = row.slug || row.id

  return {
    ...row,
    slug,
    image_url: getFishImageUrl(slug, row.image_url),
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

export function toFishPayload(form) {
  return {
    slug: form.slug.trim(),
    name: form.name.trim(),
    latin_name: form.latin_name?.trim() || null,
    description: form.description?.trim() || null,
    image_url: form.image_url?.trim() || null,
    min_length_cm: form.min_length_cm ? Number(form.min_length_cm) : null,
    season: form.season?.trim() || null,
    status: form.status,
    is_published: form.is_published,
    sort_order: Number(form.sort_order) || 0,
  }
}

export const EMPTY_FISH_FORM = {
  slug: '',
  name: '',
  latin_name: '',
  description: '',
  image_url: '',
  min_length_cm: '',
  season: '',
  status: 'in_season',
  is_published: true,
  sort_order: 0,
}

export function fishToForm(fish) {
  if (!fish) return { ...EMPTY_FISH_FORM }
  return {
    slug: fish.slug || '',
    name: fish.name || '',
    latin_name: fish.latin_name || '',
    description: fish.description || '',
    image_url: fish.image_url || '',
    min_length_cm: fish.min_length_cm ?? '',
    season: fish.season || '',
    status: fish.status || 'in_season',
    is_published: fish.is_published !== false,
    sort_order: fish.sort_order ?? 0,
  }
}
