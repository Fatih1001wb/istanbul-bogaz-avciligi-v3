const VARIANTS = {
  success:
    'bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300',
  warning:
    'bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300',
  danger:
    'bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-950 dark:text-red-300',
  info:
    'bg-brand-100 text-brand-800 ring-brand-600/20 dark:bg-brand-950 dark:text-brand-300',
  neutral:
    'bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300',
}

export default function Badge({ variant = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
