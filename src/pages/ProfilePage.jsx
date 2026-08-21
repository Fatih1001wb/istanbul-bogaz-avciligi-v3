import PageHeader from '../components/layout/PageHeader'
import Card from '../components/ui/Card'
import { useAuth } from '../features/auth/hooks/useAuth'

export default function ProfilePage() {
  const { user, profile } = useAuth()
  return (
    <div>
      <PageHeader title="Profilim" subtitle="Hesap bilgileriniz" />
      <div className="container-page py-8">
        <Card className="max-w-lg p-6">
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Kullanıcı adı: </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {profile?.username || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">E-posta: </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{user?.email}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
