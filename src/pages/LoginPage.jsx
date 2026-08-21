import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import AuthLayout from '../features/auth/components/AuthLayout'
import AuthDivider from '../features/auth/components/AuthDivider'
import GoogleSignInButton from '../features/auth/components/GoogleSignInButton'
import { mapAuthError } from '../features/auth/utils/mapAuthError'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function LoginPage() {
  const { signIn, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [authLoading, isAuthenticated, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithGoogle({ redirectTo: from })
    } catch (err) {
      setError(mapAuthError(err))
      setGoogleLoading(false)
    }
  }

  const busy = loading || googleLoading

  return (
    <AuthLayout title="Giriş Yap" subtitle="Hesabınıza erişin">
      <GoogleSignInButton onClick={handleGoogleSignIn} disabled={busy} label="Google ile giriş yap" />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-posta"
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Şifre"
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && (
          <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-400 ring-1 ring-red-500/20">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={busy}>
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Hesabınız yok mu?{' '}
        <Link to="/kayit" className="font-medium text-brand-400 hover:text-brand-300">
          Kayıt olun
        </Link>
      </p>
    </AuthLayout>
  )
}
