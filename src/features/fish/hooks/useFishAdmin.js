import { useCallback } from 'react'
import { useRealtimeQuery, REALTIME_TABLES } from '../../realtime'
import { useAuth } from '../../auth/hooks/useAuth'
import { USER_ROLES } from '../../../utils/constants'
import { fishService } from '../services/fishService'
import { mapFishSpecies, sortFishByOrder, toFishPayload } from '../utils/mapFishSpecies'

export function useFishAdmin() {
  const { profile } = useAuth()
  const isAdmin = profile?.role === USER_ROLES.ADMIN

  const result = useRealtimeQuery({
    queryKey: 'fish-species-admin',
    table: REALTIME_TABLES.FISH_SPECIES,
    fetchFn: fishService.getAllSpecies,
    mapRow: mapFishSpecies,
    sortFn: sortFishByOrder,
    shouldInclude: () => true,
    fallbackData: [],
  })

  const create = useCallback(async (form, imageFile) => {
    let imageUrl = form.image_url
    if (imageFile) {
      imageUrl = await fishService.uploadFishImage(form.slug, imageFile)
    }
    return fishService.createSpecies({ ...toFishPayload(form), image_url: imageUrl })
  }, [])

  const update = useCallback(async (id, form, imageFile) => {
    let imageUrl = form.image_url
    if (imageFile) {
      imageUrl = await fishService.uploadFishImage(form.slug, imageFile)
    }
    return fishService.updateSpecies(id, { ...toFishPayload(form), image_url: imageUrl })
  }, [])

  const remove = useCallback(async (id) => {
    await fishService.deleteSpecies(id)
  }, [])

  return {
    ...result,
    isAdmin,
    create,
    update,
    remove,
  }
}
