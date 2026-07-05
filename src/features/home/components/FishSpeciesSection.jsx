import { Link } from 'react-router-dom'
import FishCard from './FishCard'
import { useFishSpecies } from '../../fish/hooks/useFishSpecies'
import LiveIndicator from '../../realtime/components/LiveIndicator'
import Spinner from '../../../components/common/Spinner'

export default function FishSpeciesSection() {
  const { data: fish, loading, isLive } = useFishSpecies({ limit: 6 })

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Boğaz Balıkları
            </h2>
            {isLive && <LiveIndicator />}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Türleri tanıyın, sezon ve boy limitlerini kontrol edin
          </p>
        </div>
        <Link
          to="/balik-rehberi"
          className="shrink-0 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Tümünü Gör →
        </Link>
      </div>

      {loading && fish.length === 0 ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {fish.map((item) => (
            <div key={item.id} className="w-[72vw] shrink-0 sm:w-auto">
              <FishCard fish={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
