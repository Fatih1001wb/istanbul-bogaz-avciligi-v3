export default function Spinner({ size = 'md' }) {
  const dim = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6'
  return (
    <div
      className={`${dim} animate-spin rounded-full border-2 border-slate-300 border-t-brand-600`}
      role="status"
      aria-label="Yükleniyor"
    />
  )
}
