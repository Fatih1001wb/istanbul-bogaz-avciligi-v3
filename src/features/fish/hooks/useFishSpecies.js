import { useMemo } from 'react'
import { useRealtimeQuery, REALTIME_TABLES } from '../../realtime'
import { mockFishSpecies } from '../../home/data/mockFish'
import { fishService } from '../services/fishService'
import { mapFishSpecies, sortFishByOrder, isPublishedFish } from '../utils/mapFishSpecies'

// Balık türleri — Supabase Realtime ile senkronize.
// Admin panelindeki değişiklikler anında yansır.
export function useFishSpecies({ limit } = {}) {
  const result = useRealtimeQuery({
    queryKey: 'fish-species-published',
    table: REALTIME_TABLES.FISH_SPECIES,
    fetchFn: fishService.getPublishedSpecies,
    mapRow: mapFishSpecies,
    sortFn: sortFishByOrder,
    shouldInclude: isPublishedFish,
    fallbackData: mockFishSpecies,
  })

  const data = useMemo(
    () => (limit ? result.data.slice(0, limit) : result.data),
    [result.data, limit]
  )

  return { ...result, data }
}
