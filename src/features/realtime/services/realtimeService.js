import { supabase } from '../../../lib/supabase'
import { isSupabaseConfigured } from '../utils/isSupabaseConfigured'

const listeners = new Map()
const channels = new Map()
const statusListeners = new Set()

let connectionStatus = 'IDLE'

function channelKey({ schema = 'public', table, filter }) {
  return filter ? `${schema}:${table}:${filter}` : `${schema}:${table}`
}

function notifyStatus(status) {
  connectionStatus = status
  statusListeners.forEach((cb) => cb(status))
}

function ensureChannel(key, config) {
  if (channels.has(key)) return channels.get(key)

  const changeConfig = {
    event: config.event || '*',
    schema: config.schema || 'public',
    table: config.table,
  }
  if (config.filter) changeConfig.filter = config.filter

  const channel = supabase
    .channel(`rt:${key}`)
    .on('postgres_changes', changeConfig, (payload) => {
      listeners.get(key)?.forEach((cb) => cb(payload))
    })
    .subscribe((status) => {
      notifyStatus(status)
    })

  channels.set(key, channel)
  return channel
}

function teardownChannel(key) {
  const channel = channels.get(key)
  if (!channel) return
  supabase.removeChannel(channel)
  channels.delete(key)
}

// Merkezi realtime abonelik yöneticisi — ref-count ile kanal paylaşımı.
export const realtimeService = {
  getConnectionStatus() {
    return connectionStatus
  },

  onStatusChange(callback) {
    statusListeners.add(callback)
    callback(connectionStatus)
    return () => statusListeners.delete(callback)
  },

  subscribe({ table, schema = 'public', filter, event = '*', onPayload }) {
    if (!isSupabaseConfigured()) {
      return () => {}
    }

    const key = channelKey({ schema, table, filter })

    if (!listeners.has(key)) {
      listeners.set(key, new Set())
    }
    listeners.get(key).add(onPayload)

    ensureChannel(key, { table, schema, filter, event })

    return () => {
      const set = listeners.get(key)
      if (!set) return
      set.delete(onPayload)
      if (set.size === 0) {
        listeners.delete(key)
        teardownChannel(key)
      }
    }
  },
}
