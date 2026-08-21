import { supabase } from '../../../lib/supabase'
import { TABLES, BUCKETS } from '../../../utils/constants'
import { isFishUuid } from '../utils/mapFishSpecies'

export const fishService = {
  async getPublishedSpecies() {
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data ?? []
  },

  async getAllSpecies() {
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data ?? []
  },

  async getBySlugOrId(identifier) {
    const column = isFishUuid(identifier) ? 'id' : 'slug'
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .select('*')
      .eq(column, identifier)
      .maybeSingle()

    if (error) throw error
    return data
  },

  async createSpecies(payload) {
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateSpecies(id, payload) {
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteSpecies(id) {
    const { error } = await supabase.from(TABLES.FISH_SPECIES).delete().eq('id', id)
    if (error) throw error
  },

  async uploadFishImage(slug, file) {
    const ext = file.name.split('.').pop()
    const path = `${slug}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.FISH_IMAGES)
      .upload(path, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(BUCKETS.FISH_IMAGES).getPublicUrl(path)
    return data.publicUrl
  },
}
