import { FISH_STATUS_LABELS } from '../../../utils/constants'

const STATUS_VARIANTS = {
  in_season: 'success',
  caution: 'warning',
  closed: 'danger',
}

export function getFishStatusVariant(status) {
  return STATUS_VARIANTS[status] || 'neutral'
}

export function getFishStatusLabel(status) {
  return FISH_STATUS_LABELS[status] || status
}
