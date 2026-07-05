import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(form)
      setSuccess(true)
      setTimeout(() => navigate('/giris'), 2000)
    } catch (err) {
      setError(err.message || 'Kayıt başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-1 text-2xl font-bold text-slate-900 dark:text-slate-100">Kayıt Ol</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Topluluğa katılın</p>
        {success ? (
          <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
            Kayıt başarılı! E-postanızı doğrulayın. Giriş sayfasına yönlendiriliyorsunuz...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Kullanıcı Adı" id="username" required
              value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input label="E-posta" id="email" type="email" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Şifre" id="password" type="password" required minLength={6}
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Zaten hesabınız var mı?{' '}
          <Link to="/giris" className="font-medium text-brand-600 hover:underline">Giriş yapın</Link>
        </p>
      </Card>
    </div>
  )
}
