import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function FishGuidePage() {
  return (
    <div>
      <PageHeader title="Balık Rehberi" subtitle="Boğaz'ın balık türlerini keşfedin" />
      <div className="container-page py-8">
        <EmptyState icon="🐟" title="Balık rehberi yakında" description="Bu modülde balık türleri Supabase'ten listelenecek (sonraki aşama)." />
      </div>
    </div>
  )
}
