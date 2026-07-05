import { APP_NAME, APP_VERSION } from '../../utils/constants'

export default function Footer({ className = '' }) {
  return (
    <footer className={`border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950 ${className}`}>
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {APP_NAME} {APP_VERSION}. Tüm hakları saklıdır.
        </p>
        <p className="text-xs">
          Boğaz'ın balıkçıları için ❤️ ile yapıldı
        </p>
      </div>
    </footer>
  )
}
