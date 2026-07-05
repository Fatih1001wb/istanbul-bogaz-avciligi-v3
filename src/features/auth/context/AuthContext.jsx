import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // İlk yüklemede mevcut oturumu al
    authService
      .getSession()
      .then((s) => setSession(s))
      .catch(() => setSession(null))
      .finally(() => setLoading(false))

    // Oturum değişikliklerini dinle
    const { data: listener } = authService.onAuthStateChange((s) => {
      setSession(s)
    })

    return () => listener?.subscription?.unsubscribe()
  }, [])

  // Oturum değiştiğinde profili getir
  useEffect(() => {
    if (session?.user?.id) {
      authService
        .getProfile(session.user.id)
        .then(setProfile)
        .catch(() => setProfile(null))
    } else {
      setProfile(null)
    }
  }, [session?.user?.id])

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    isAuthenticated: !!session,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut,
    refreshProfile: async () => {
      if (session?.user?.id) {
        const p = await authService.getProfile(session.user.id)
        setProfile(p)
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext, AuthProvider içinde kullanılmalı')
  return ctx
}
