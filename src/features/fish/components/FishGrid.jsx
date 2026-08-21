import FishCard from './FishCard'
import Spinner from '../../../components/common/Spinner'
import EmptyState from '../../../components/common/EmptyState'

export default function FishGrid({ fish, loading }) {
  if (loading && fish.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (!loading && fish.length === 0) {
    return (
      <EmptyState
        icon="🐟"
        title="Balık bulunamadı"
        description="Arama veya filtre kriterlerinizi değiştirmeyi deneyin."
      />
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {fish.map((item) => (
        <FishCard key={item.id} fish={item} />
      ))}
    </div>
  )
}
