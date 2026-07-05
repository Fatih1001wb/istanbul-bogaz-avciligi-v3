import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { mockSea } from '../data/mockWeatherSea'

export default function SeaCard() {
  const { waveHeight, waterTemp, current, tide, fishingIndex, fishingIndexVariant } = mockSea

  return (
    <Card className="relative overflow-hidden p-5">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10">🌊</div>
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Deniz Koşulları
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Marmara & Boğaz</p>
          </div>
          <Badge variant={fishingIndexVariant}>Av: {fishingIndex}</Badge>
        </div>

        <div className="mt-4 flex items-end gap-6">
          <div>
            <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">{waveHeight} m</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Dalga yüksekliği</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-sea dark:text-sea-light">{waterTemp}°C</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Su sıcaklığı</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Akıntı</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {current}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Gelgit</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {tide}
            </dd>
          </div>
        </dl>

        <Link
          to="/hava-deniz"
          className="mt-4 inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Detaylı deniz →
        </Link>
      </div>
    </Card>
  )
}
