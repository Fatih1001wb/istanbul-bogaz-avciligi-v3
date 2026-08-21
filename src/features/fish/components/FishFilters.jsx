import { FISH_STATUS_OPTIONS } from '../utils/fishStatus'

export default function FishFilters({ filters, onChange, resultCount, totalCount }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-800 bg-mavirota-surface p-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="fish-search" className="mb-1.5 block text-sm font-medium text-slate-300">
          Ara
        </label>
        <input
          id="fish-search"
          type="search"
          placeholder="Tür adı veya latince isim..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-mavirota-ocean px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div className="sm:w-48">
        <label htmlFor="fish-status" className="mb-1.5 block text-sm font-medium text-slate-300">
          Durum
        </label>
        <select
          id="fish-status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-mavirota-ocean px-3 py-2 text-slate-100 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {FISH_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-500 sm:pb-2">
        {resultCount} / {totalCount} tür
      </p>
    </div>
  )
}
