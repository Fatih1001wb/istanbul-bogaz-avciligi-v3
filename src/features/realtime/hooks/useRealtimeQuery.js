import { useCallback, useEffect, useRef, useState } from 'react'
import { applyRowChange } from '../utils/applyRowChange'
import { realtimeService } from '../services/realtimeService'
import { isSupabaseConfigured } from '../utils/isSupabaseConfigured'

// İlk fetch + realtime CDC birleşimi — feature hook'larının temel yapı taşı.
export function useRealtimeQuery({
  queryKey,
  table,
  fetchFn,
  mapRow = (row) => row,
  sortFn,
  shouldInclude = () => true,
  filter,
  enabled = true,
  fallbackData = [],
}) {
  const [data, setData] = useState(() => fallbackData.map(mapRow))
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(isSupabaseConfigured() ? 'loading' : 'fallback')

  const mapRowRef = useRef(mapRow)
  const sortFnRef = useRef(sortFn)
  const shouldIncludeRef = useRef(shouldInclude)

  mapRowRef.current = mapRow
  sortFnRef.current = sortFn
  shouldIncludeRef.current = shouldInclude

  const applySort = useCallback((rows) => {
    if (!sortFnRef.current) return rows
    return [...rows].sort(sortFnRef.current)
  }, [])

  const handlePayload = useCallback(
    (payload) => {
      setData((prev) => {
        const next = applyRowChange(prev, payload, {
          mapRow: mapRowRef.current,
          shouldInclude: shouldIncludeRef.current,
        })
        return applySort(next)
      })
      setSource('live')
    },
    [applySort]
  )

  useEffect(() => {
    if (!enabled) {
      setData(fallbackData.map(mapRowRef.current))
      setSource('fallback')
      setLoading(false)
      return undefined
    }

    if (!isSupabaseConfigured()) {
      setData(fallbackData.map(mapRowRef.current))
      setSource('fallback')
      setLoading(false)
      return undefined
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const rows = await fetchFn()
        if (cancelled) return
        setData(applySort((rows ?? []).map(mapRowRef.current)))
        setSource('live')
      } catch (err) {
        if (cancelled) return
        setError(err)
        setData(fallbackData.map(mapRowRef.current))
        setSource('fallback')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    const unsubscribe = realtimeService.subscribe({
      table,
      filter,
      onPayload: handlePayload,
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [queryKey, table, filter, enabled, fetchFn, fallbackData, handlePayload, applySort])

  return {
    data,
    loading,
    error,
    source,
    isLive: source === 'live',
    isFallback: source === 'fallback',
  }
}
