import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { formatLength } from '../../../utils/formatters'
import { getFishImageUrl, getFishPlaceholder } from '../../../utils/placeholders'
import { getFishStatusVariant } from '../utils/fishStatus'
import LiveIndicator from '../../realtime/components/LiveIndicator'

export default function FishDetailView({ fish, isLive }) {
  const [imgSrc, setImgSrc] = useState(() =>
    getFishImageUrl(fish.slug || fish.id, fish.image_url)
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link to="/balik-rehberi">
          <Button variant="ghost" size="sm">
            ← Balık Rehberi
          </Button>
        </Link>
        {isLive && <LiveIndicator />}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-mavirota-surface">
          <div className="relative aspect-[4/3] bg-slate-900">
            <img
              src={imgSrc}
              alt={fish.name}
              onError={() => setImgSrc(getFishPlaceholder())}
              className="h-full w-full object-cover"
            />
            <Badge variant={getFishStatusVariant(fish.status)} className="absolute left-4 top-4">
              {fish.statusLabel}
            </Badge>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-100">{fish.name}</h1>
          {fish.latin_name && (
            <p className="mt-1 text-lg italic text-slate-400">{fish.latin_name}</p>
          )}

          <dl className="mt-8 space-y-4">
            <div className="rounded-lg border border-slate-800 bg-mavirota-surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Minimum yasal boy
              </dt>
              <dd className="mt-1 text-2xl font-bold text-brand-300">
                {formatLength(fish.min_length_cm)}
              </dd>
            </div>

            <div className="rounded-lg border border-slate-800 bg-mavirota-surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Av sezonu
              </dt>
              <dd className="mt-1 text-lg font-semibold text-slate-200">{fish.season || '—'}</dd>
            </div>

            <div className="rounded-lg border border-slate-800 bg-mavirota-surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Durum
              </dt>
              <dd className="mt-2">
                <Badge variant={getFishStatusVariant(fish.status)}>{fish.statusLabel}</Badge>
              </dd>
            </div>
          </dl>

          {fish.description && (
            <div className="mt-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Açıklama
              </h2>
              <p className="mt-2 leading-relaxed text-slate-300">{fish.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
