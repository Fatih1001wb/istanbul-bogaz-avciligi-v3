import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'
import Spinner from '../../components/common/Spinner'
import LiveIndicator from '../../features/realtime/components/LiveIndicator'
import { useFishAdmin } from '../../features/fish/hooks/useFishAdmin'
import FishAdminTable from '../../features/fish/components/admin/FishAdminTable'
import FishForm from '../../features/fish/components/admin/FishForm'
import { fishToForm } from '../../features/fish/utils/mapFishSpecies'

export default function FishAdminPage() {
  const { data, loading, isAdmin, isLive, create, update, remove } = useFishAdmin()
  const [mode, setMode] = useState('list')
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const handleCreate = async (form, imageFile) => {
    setSaving(true)
    try {
      await create(form, imageFile)
      setMode('list')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (form, imageFile) => {
    if (!editing) return
    setSaving(true)
    try {
      await update(editing.id, form, imageFile)
      setMode('list')
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (fish) => {
    if (!window.confirm(`"${fish.name}" silinsin mi?`)) return
    setDeletingId(fish.id)
    try {
      await remove(fish.id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Balık Türleri Yönetimi"
        subtitle="Admin CRUD — değişiklikler anında uygulamaya yansır"
      >
        <div className="flex items-center gap-3">
          {isLive && <LiveIndicator />}
          {mode === 'list' && (
            <Button onClick={() => setMode('create')}>+ Yeni Tür</Button>
          )}
        </div>
      </PageHeader>

      <div className="container-page py-8">
        {!isAdmin && (
          <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
            Admin işlemleri için Supabase&apos;te <code className="text-amber-100">role = admin</code>{' '}
            olan bir oturum gerekir. Authentication aşamasında bu sayfa korunacaktır.
          </div>
        )}

        {mode === 'list' && (
          <>
            {loading && data.length === 0 ? (
              <div className="flex justify-center py-16">
                <Spinner />
              </div>
            ) : (
              <FishAdminTable
                fish={data}
                onEdit={(item) => {
                  setEditing(item)
                  setMode('edit')
                }}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            )}
          </>
        )}

        {mode === 'create' && (
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-800 bg-mavirota-surface p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">Yeni Balık Türü</h2>
            <FishForm onSubmit={handleCreate} onCancel={() => setMode('list')} loading={saving} />
          </div>
        )}

        {mode === 'edit' && editing && (
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-800 bg-mavirota-surface p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">{editing.name} — Düzenle</h2>
            <FishForm
              key={editing.id}
              initial={fishToForm(editing)}
              onSubmit={handleUpdate}
              onCancel={() => {
                setMode('list')
                setEditing(null)
              }}
              loading={saving}
            />
          </div>
        )}
      </div>
    </div>
  )
}
