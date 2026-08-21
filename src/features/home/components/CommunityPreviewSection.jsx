import { Link } from 'react-router-dom'
import CommunityPreviewCard from './CommunityPreviewCard'
import { mockCommunityPosts } from '../data/mockCommunityPosts'

export default function CommunityPreviewSection() {
  return (
    <section className="border-t border-slate-800 bg-mavirota-ocean py-12 sm:py-16">
      <div className="container-page">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Topluluktan
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Balıkçıların güncel av paylaşımları ve deneyimleri
            </p>
          </div>
          <Link
            to="/topluluk"
            className="shrink-0 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Topluluğa Git →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCommunityPosts.map((post) => (
            <CommunityPreviewCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
