import PageHeader from '../components/layout/PageHeader'
import Card from '../components/ui/Card'
import { useTheme } from '../context/ThemeContext'
import Button from '../components/ui/Button'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <PageHeader title="Ayarlar" subtitle="Tercihlerinizi yönetin" />
      <div className="container-page py-8">
        <Card className="max-w-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Tema</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Şu an: {theme === 'dark' ? 'Koyu' : 'Açık'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
