import Card from '../../../components/ui/Card'
import { formatRelativeTime } from '../../../utils/formatters'

function getInitials(username) {
  return username
    .split('_')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function CommunityPreviewCard({ post }) {
  const { author, content, image_url, created_at, likes, comments } = post

  return (
    <Card className="flex h-full flex-col p-4 transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${author.avatarColor}`}
        >
          {getInitials(author.username)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
            @{author.username}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatRelativeTime(created_at)}
          </p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {content}
      </p>

      {image_url && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <img
            src={image_url}
            alt="Paylaşım görseli"
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-5 border-t border-slate-100 pt-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span aria-hidden>❤️</span>
          <span className="font-medium">{likes}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden>💬</span>
          <span className="font-medium">{comments}</span>
        </span>
      </div>
    </Card>
  )
}
