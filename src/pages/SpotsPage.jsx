import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function SpotsPage() {
  return (
    <div>
      <PageHeader title="Av Noktaları Haritası" subtitle="En iyi avlanma noktaları" />
      <div className="container-page py-8">
        <EmptyState icon="🗺️" title="Harita yakında" description="Leaflet haritası ve av noktaları burada gösterilecek." />
      </div>
    </div>
  )
}
