import MaviRotaWordmark from '../../../components/brand/MaviRotaWordmark'
import { APP_TAGLINE } from '../../../utils/constants'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="container-page flex min-h-[75vh] flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <MaviRotaWordmark className="justify-center" />
        <p className="mt-3 text-sm text-slate-500">{APP_TAGLINE}</p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-mavirota-surface p-8 shadow-xl shadow-black/20">
        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
