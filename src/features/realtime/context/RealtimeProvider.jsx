import { createContext, useContext, useEffect, useState } from 'react'
import { realtimeService } from '../services/realtimeService'
import { isSupabaseConfigured } from '../utils/isSupabaseConfigured'

const RealtimeContext = createContext(null)

export function RealtimeProvider({ children }) {
  const [status, setStatus] = useState(realtimeService.getConnectionStatus())
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) return undefined
    return realtimeService.onStatusChange(setStatus)
  }, [configured])

  const value = {
    status,
    isConnected: status === 'SUBSCRIBED',
    isConfigured: configured,
  }

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
}

export function useRealtimeStatus() {
  const ctx = useContext(RealtimeContext)
  if (!ctx) throw new Error('useRealtimeStatus, RealtimeProvider içinde kullanılmalı')
  return ctx
}
