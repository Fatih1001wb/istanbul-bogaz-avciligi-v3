export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="border-b border-slate-800 bg-mavirota-ocean">
      <div className="container-page py-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
