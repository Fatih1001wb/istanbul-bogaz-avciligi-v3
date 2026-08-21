import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import AuthLayout from '../features/auth/components/AuthLayout'
import AuthDivider from '../features/auth/components/AuthDivider'
import GoogleSignInButton from '../features/auth/components/GoogleSignInButton'
import { mapAuthError } from '../features/auth/utils/mapAuthError'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function RegisterPage() {
  const { signUp, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [authLoading, isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { session } = await signUp(form)
      if (session) {
        navigate('/', { replace: true })
        return
      }
      setSuccess(true)
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
      await signInWithGoogle({ redirectTo: '/' })
    } catch (err) {
      setError(mapAuthError(err))
      setGoogleLoading(false)
    }
  }

  const busy = loading || googleLoading

  return (
    <AuthLayout title="Kayıt Ol" subtitle="MaviRota topluluğuna katılın">
      <GoogleSignInButton onClick={handleGoogleSignIn} disabled={busy} />
      <AuthDivider />

      {success ? (
        <p className="rounded-lg bg-emerald-950/50 px-4 py-3 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
          Kayıt başarılı! E-postanızdaki doğrulama bağlantısına tıklayın, ardından giriş
          yapabilirsiniz.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Kullanıcı Adı"
            id="username"
            required
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
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
            minLength={6}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && (
            <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-400 ring-1 ring-red-500/20">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={busy}>
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-400">
        Zaten hesabınız var mı?{' '}
        <Link to="/giris" className="font-medium text-brand-400 hover:text-brand-300">
          Giriş yapın
        </Link>
      </p>
    </AuthLayout>
  )
}
