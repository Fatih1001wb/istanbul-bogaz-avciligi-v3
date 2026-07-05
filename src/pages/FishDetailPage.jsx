import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function FishDetailPage() {
  return (
    <div>
      <PageHeader title="Balık Detayı" subtitle="Tür bilgileri" />
      <div className="container-page py-8">
        <EmptyState icon="🐠" title="Detay sayfası yakında" description="Seçilen balığın detayları burada gösterilecek." />
      </div>
    </div>
  )
}
