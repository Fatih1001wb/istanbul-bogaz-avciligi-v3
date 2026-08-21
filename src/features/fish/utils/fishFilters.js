export function filterFishList(fish, { search = '', status = 'all' } = {}) {
  const query = search.trim().toLowerCase()

  return fish.filter((item) => {
    if (status !== 'all' && item.status !== status) return false

    if (!query) return true

    return (
      item.name?.toLowerCase().includes(query) ||
      item.latin_name?.toLowerCase().includes(query) ||
      item.slug?.toLowerCase().includes(query)
    )
  })
}

export const DEFAULT_FISH_FILTERS = {
  search: '',
  status: 'all',
}
