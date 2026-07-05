import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function WeatherPage() {
  return (
    <div>
      <PageHeader title="Hava ve Deniz Durumu" subtitle="Güncel meteoroloji ve deniz koşulları" />
      <div className="container-page py-8">
        <EmptyState icon="🌊" title="Hava durumu yakında" description="Harici hava/deniz API'sinden veriler burada gösterilecek." />
      </div>
    </div>
  )
}
