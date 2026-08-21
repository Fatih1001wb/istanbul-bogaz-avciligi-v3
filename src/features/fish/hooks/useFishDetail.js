import { useCallback, useEffect, useState } from 'react'
import { realtimeService, REALTIME_TABLES, isSupabaseConfigured } from '../../realtime'
import { mockFishSpecies } from '../../home/data/mockFish'
import { fishService } from '../services/fishService'
import { mapFishSpecies, isPublishedFish, isFishUuid } from '../utils/mapFishSpecies'

function findMockFish(identifier) {
  return mockFishSpecies.find(
    (f) => f.slug === identifier || f.id === identifier
  )
}

export function useFishDetail(identifier) {
  const [fish, setFish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('loading')

  const loadFish = useCallback(async () => {
    if (!identifier) {
      setFish(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!isSupabaseConfigured()) {
        const mock = findMockFish(identifier)
        setFish(mock ? mapFishSpecies(mock) : null)
        setSource('fallback')
        return
      }

      const row = await fishService.getBySlugOrId(identifier)
      if (!row || !isPublishedFish(row)) {
        setFish(null)
      } else {
        setFish(mapFishSpecies(row))
      }
      setSource('live')
    } catch (err) {
      const mock = findMockFish(identifier)
      if (mock) {
        setFish(mapFishSpecies(mock))
        setSource('fallback')
      } else {
        setError(err)
        setFish(null)
        setSource('fallback')
      }
    } finally {
      setLoading(false)
    }
  }, [identifier])

  useEffect(() => {
    loadFish()
  }, [loadFish])

  useEffect(() => {
    if (!identifier || !isSupabaseConfigured()) return undefined

    return realtimeService.subscribe({
      table: REALTIME_TABLES.FISH_SPECIES,
      onPayload: (payload) => {
        const row = payload.new || payload.old
        if (!row) return

        const matches =
          row.slug === identifier ||
          row.id === identifier ||
          (isFishUuid(identifier) && row.id === identifier)

        if (!matches) return

        if (payload.eventType === 'DELETE') {
          setFish(null)
          return
        }

        if (!isPublishedFish(payload.new)) {
          setFish(null)
          return
        }

        setFish(mapFishSpecies(payload.new))
        setSource('live')
      },
    })
  }, [identifier])

  return { fish, loading, error, source, isLive: source === 'live', reload: loadFish }
}
