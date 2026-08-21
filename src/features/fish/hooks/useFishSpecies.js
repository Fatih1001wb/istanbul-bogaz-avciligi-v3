import { useMemo, useState } from 'react'
import { useRealtimeQuery, REALTIME_TABLES } from '../../realtime'
import { mockFishSpecies } from '../../home/data/mockFish'
import { fishService } from '../services/fishService'
import { mapFishSpecies, sortFishByOrder, isPublishedFish } from '../utils/mapFishSpecies'
import { filterFishList, DEFAULT_FISH_FILTERS } from '../utils/fishFilters'

export function useFishSpecies({ limit, filters: externalFilters } = {}) {
  const [localFilters, setLocalFilters] = useState(DEFAULT_FISH_FILTERS)
  const filters = externalFilters ?? localFilters

  const result = useRealtimeQuery({
    queryKey: 'fish-species-published',
    table: REALTIME_TABLES.FISH_SPECIES,
    fetchFn: fishService.getPublishedSpecies,
    mapRow: mapFishSpecies,
    sortFn: sortFishByOrder,
    shouldInclude: isPublishedFish,
    fallbackData: mockFishSpecies,
  })

  const filtered = useMemo(
    () => filterFishList(result.data, filters),
    [result.data, filters]
  )

  const data = useMemo(
    () => (limit ? filtered.slice(0, limit) : filtered),
    [filtered, limit]
  )

  return {
    ...result,
    data,
    allData: result.data,
    filters,
    setFilters: setLocalFilters,
    totalCount: result.data.length,
    filteredCount: filtered.length,
  }
}
