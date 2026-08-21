import { FISH_STATUS_LABELS } from '../../../utils/constants'

const STATUS_VARIANTS = {
  in_season: 'success',
  caution: 'warning',
  closed: 'danger',
}

export const FISH_STATUS_OPTIONS = [
  { value: 'all', label: 'Tümü' },
  { value: 'in_season', label: FISH_STATUS_LABELS.in_season },
  { value: 'caution', label: FISH_STATUS_LABELS.caution },
  { value: 'closed', label: FISH_STATUS_LABELS.closed },
]

export function getFishStatusVariant(status) {
  return STATUS_VARIANTS[status] || 'neutral'
}

export function getFishStatusLabel(status) {
  return FISH_STATUS_LABELS[status] || status
}
