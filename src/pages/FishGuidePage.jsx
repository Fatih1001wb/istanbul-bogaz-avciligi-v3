import PageHeader from '../components/layout/PageHeader'
import LiveIndicator from '../features/realtime/components/LiveIndicator'
import { useFishSpecies } from '../features/fish/hooks/useFishSpecies'
import FishFilters from '../features/fish/components/FishFilters'
import FishGrid from '../features/fish/components/FishGrid'

export default function FishGuidePage() {
  const { data, loading, filters, setFilters, filteredCount, totalCount, isLive } =
    useFishSpecies()

  return (
    <div>
      <PageHeader
        title="Balık Rehberi"
        subtitle="Türkiye kıyılarında avlanan balık türleri, sezon ve boy limitleri"
      >
        {isLive && <LiveIndicator />}
      </PageHeader>

      <div className="container-page py-8">
        <FishFilters
          filters={filters}
          onChange={setFilters}
          resultCount={filteredCount}
          totalCount={totalCount}
        />
        <FishGrid fish={data} loading={loading} />
      </div>
    </div>
  )
}
