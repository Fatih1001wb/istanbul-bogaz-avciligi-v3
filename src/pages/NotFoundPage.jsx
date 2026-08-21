import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="text-6xl">🎣</span>
      <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100">404</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Aradığınız sayfa ağa takılmadı.
      </p>
      <Link to="/" className="mt-6">
        <Button>Ana Sayfaya Dön</Button>
      </Link>
    </div>
  )
}
