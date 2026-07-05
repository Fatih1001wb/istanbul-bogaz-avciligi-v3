import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'
import { formatRelativeTime } from '../../../utils/formatters'
import { mockWeather } from '../data/mockWeatherSea'

export default function WeatherCard() {
  const { location, temperature, condition, windSpeed, windDirection, humidity, updatedAt } =
    mockWeather

  return (
    <Card className="relative overflow-hidden p-5">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10">🌤️</div>
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Hava Durumu
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{location}</p>
          </div>
          <span className="text-3xl">⛅</span>
        </div>

        <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
          {temperature}°C
        </p>
        <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-300">{condition}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Rüzgar</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {windSpeed} km/s
            </dd>
            <dd className="text-xs text-slate-500">{windDirection}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Nem</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              %{humidity}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Güncelleme</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {formatRelativeTime(updatedAt)}
            </dd>
          </div>
        </dl>

        <Link
          to="/hava-deniz"
          className="mt-4 inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Detaylı hava →
        </Link>
      </div>
    </Card>
  )
}
