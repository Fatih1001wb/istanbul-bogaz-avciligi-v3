import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import Spinner from '../components/common/Spinner'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/ui/Button'
import { useFishDetail } from '../features/fish/hooks/useFishDetail'
import FishDetailView from '../features/fish/components/FishDetailView'

export default function FishDetailPage() {
  const { id } = useParams()
  const { fish, loading, error, isLive } = useFishDetail(id)

  if (loading) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (error || !fish) {
    return (
      <div>
        <PageHeader title="Balık Bulunamadı" subtitle="Aradığınız tür mevcut değil" />
        <div className="container-page py-8">
          <EmptyState
            icon="🐠"
            title="Tür bulunamadı"
            description="Bu balık yayından kaldırılmış veya mevcut olmayabilir."
          />
          <div className="mt-6 text-center">
            <Link to="/balik-rehberi">
              <Button variant="outline">Balık Rehberine Dön</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title={fish.name} subtitle={fish.latin_name} />
      <div className="container-page py-8">
        <FishDetailView fish={fish} isLive={isLive} />
      </div>
    </div>
  )
}
