import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { formatLength } from '../../../utils/formatters'
import { getFishStatusVariant } from '../utils/fishStatus'

export default function FishCard({ fish }) {
  const { id, slug, name, latin_name, image_url, min_length_cm, season, status, statusLabel } = fish
  const linkId = slug || id

  return (
    <Link to={`/balik/${linkId}`} className="group block snap-start">
      <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={image_url}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <Badge variant={getFishStatusVariant(status)} className="absolute left-3 top-3">
            {statusLabel}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{name}</h3>
          <p className="text-xs italic text-slate-500 dark:text-slate-400">{latin_name}</p>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Min. yasal boy
            </span>
            <span className="text-sm font-bold text-brand-700 dark:text-brand-300">
              {formatLength(min_length_cm)}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Sezon: {season}
          </p>
        </div>
      </Card>
    </Link>
  )
}
