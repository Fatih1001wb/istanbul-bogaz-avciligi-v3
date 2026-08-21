import { useState } from 'react'
import Input from '../../../../components/ui/Input'
import Button from '../../../../components/ui/Button'
import { FISH_STATUS_OPTIONS } from '../../utils/fishStatus'
import { EMPTY_FISH_FORM } from '../../utils/mapFishSpecies'

export default function FishForm({ initial = EMPTY_FISH_FORM, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial)
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await onSubmit(form, imageFile)
    } catch (err) {
      setError(err.message || 'Kayıt başarısız oldu.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Slug (URL)"
          id="slug"
          required
          value={form.slug}
          onChange={(e) => set('slug', e.target.value)}
          placeholder="lufar"
        />
        <Input
          label="Sıra"
          id="sort_order"
          type="number"
          value={form.sort_order}
          onChange={(e) => set('sort_order', e.target.value)}
        />
      </div>

      <Input
        label="Tür adı"
        id="name"
        required
        value={form.name}
        onChange={(e) => set('name', e.target.value)}
      />

      <Input
        label="Latince ad"
        id="latin_name"
        value={form.latin_name}
        onChange={(e) => set('latin_name', e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Min. boy (cm)"
          id="min_length_cm"
          type="number"
          min="0"
          value={form.min_length_cm}
          onChange={(e) => set('min_length_cm', e.target.value)}
        />
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-300">
            Durum
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-mavirota-ocean px-3 py-2 text-slate-100"
          >
            {FISH_STATUS_OPTIONS.filter((o) => o.value !== 'all').map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Sezon"
        id="season"
        value={form.season}
        onChange={(e) => set('season', e.target.value)}
        placeholder="Eylül – Kasım"
      />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-300">
          Açıklama
        </label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-mavirota-ocean px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <Input
        label="Görsel URL (isteğe bağlı)"
        id="image_url"
        value={form.image_url}
        onChange={(e) => set('image_url', e.target.value)}
        placeholder="https://..."
      />

      <div>
        <label htmlFor="image_file" className="mb-1.5 block text-sm font-medium text-slate-300">
          Görsel yükle
        </label>
        <input
          id="image_file"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-sm file:text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => set('is_published', e.target.checked)}
          className="rounded border-slate-600 bg-mavirota-ocean text-brand-500"
        />
        Yayında
      </label>

      {error && (
        <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-400">{error}</p>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            İptal
          </Button>
        )}
      </div>
    </form>
  )
}
