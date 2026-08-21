import { APP_NAME } from '../../utils/constants'

export default function Footer({ className = '' }) {
  return (
    <footer
      className={`border-t border-slate-800 bg-mavirota-deep py-8 ${className}`}
    >
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {APP_NAME}. Tüm hakları saklıdır.</p>
        <p className="text-xs text-slate-600">Boğaz balıkçıları için yapıldı</p>
      </div>
    </footer>
  )
}
