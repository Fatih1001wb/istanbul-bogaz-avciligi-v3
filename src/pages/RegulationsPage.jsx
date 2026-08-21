import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function RegulationsPage() {
  return (
    <div>
      <PageHeader title="Av Kuralları ve Limitleri" subtitle="Yasal boy limitleri ve av yasakları" />
      <div className="container-page py-8">
        <EmptyState icon="📏" title="Kurallar yakında" description="Av kuralları ve sezon limitleri burada listelenecek." />
      </div>
    </div>
  )
}
