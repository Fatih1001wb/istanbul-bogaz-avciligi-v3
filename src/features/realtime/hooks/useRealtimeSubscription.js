import { useEffect } from 'react'
import { realtimeService } from '../services/realtimeService'
import { isSupabaseConfigured } from '../utils/isSupabaseConfigured'

// Düşük seviye: tek tabloya postgres_changes aboneliği.
export function useRealtimeSubscription({ table, filter, event, onPayload, enabled = true }) {
  useEffect(() => {
    if (!enabled || !table || !onPayload) return undefined

    if (!isSupabaseConfigured()) return undefined

    return realtimeService.subscribe({ table, filter, event, onPayload })
  }, [table, filter, event, onPayload, enabled])
}
