import Badge from '../../../../components/ui/Badge'
import Button from '../../../../components/ui/Button'
import { getFishStatusVariant } from '../../utils/fishStatus'
import { formatLength } from '../../../../utils/formatters'

export default function FishAdminTable({ fish, onEdit, onDelete, deletingId }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-800 bg-mavirota-ocean text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Tür</th>
            <th className="px-4 py-3 font-medium">Durum</th>
            <th className="px-4 py-3 font-medium">Min. boy</th>
            <th className="px-4 py-3 font-medium">Sezon</th>
            <th className="px-4 py-3 font-medium">Yayın</th>
            <th className="px-4 py-3 font-medium text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {fish.map((item) => (
            <tr key={item.id} className="bg-mavirota-surface hover:bg-slate-900/40">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-500">{item.slug}</p>
              </td>
              <td className="px-4 py-3">
                <Badge variant={getFishStatusVariant(item.status)}>{item.statusLabel}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-300">{formatLength(item.min_length_cm)}</td>
              <td className="px-4 py-3 text-slate-400">{item.season || '—'}</td>
              <td className="px-4 py-3">
                <Badge variant={item.is_published ? 'success' : 'neutral'}>
                  {item.is_published ? 'Evet' : 'Hayır'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    Düzenle
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    disabled={deletingId === item.id}
                    onClick={() => onDelete(item)}
                  >
                    {deletingId === item.id ? '...' : 'Sil'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
