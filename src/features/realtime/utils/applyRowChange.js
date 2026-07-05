// Postgres CDC payload'ını yerel dizi state'ine uygular.
// Tüm realtime tüketicileri bu yardımcıyı kullanır.

export function applyRowChange(rows, payload, options = {}) {
  const {
    getId = (row) => row.id,
    mapRow = (row) => row,
    shouldInclude = () => true,
  } = options

  const { eventType, new: newRecord, old: oldRecord } = payload

  if (eventType === 'DELETE') {
    return rows.filter((row) => getId(row) !== getId(oldRecord))
  }

  if (!newRecord) return rows

  const mapped = mapRow(newRecord)
  const id = getId(mapped)

  if (!shouldInclude(newRecord)) {
    return rows.filter((row) => getId(row) !== id)
  }

  if (eventType === 'INSERT') {
    const exists = rows.some((row) => getId(row) === id)
    if (exists) {
      return rows.map((row) => (getId(row) === id ? mapped : row))
    }
    return [...rows, mapped]
  }

  if (eventType === 'UPDATE') {
    const exists = rows.some((row) => getId(row) === id)
    if (!exists) return [...rows, mapped]
    return rows.map((row) => (getId(row) === id ? mapped : row))
  }

  return rows
}
