import MaviRotaLogo from './MaviRotaLogo'
import { APP_NAME } from '../../utils/constants'

export default function MaviRotaWordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-bold tracking-tight ${className}`}>
      <MaviRotaLogo className="h-8 w-8 shrink-0" />
      <span className="text-lg text-slate-100">
        Mavi<span className="text-brand-400">Rota</span>
      </span>
      <span className="sr-only">{APP_NAME}</span>
    </span>
  )
}
