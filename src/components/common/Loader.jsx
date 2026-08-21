import Spinner from './Spinner'

export default function Loader({ message = 'Yükleniyor...' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  )
}
