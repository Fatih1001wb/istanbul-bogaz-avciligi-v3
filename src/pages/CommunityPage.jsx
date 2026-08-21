import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function CommunityPage() {
  return (
    <div>
      <PageHeader title="Topluluk" subtitle="Sohbet ve paylaşımlar" />
      <div className="container-page py-8">
        <EmptyState icon="💬" title="Topluluk yakında" description="Gerçek zamanlı sohbet ve forum paylaşımları burada olacak." />
      </div>
    </div>
  )
}
