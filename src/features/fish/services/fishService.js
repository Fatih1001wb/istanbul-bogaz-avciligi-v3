import { supabase } from '../../../lib/supabase'
import { TABLES } from '../../../utils/constants'

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

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from(TABLES.FISH_SPECIES)
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    return data
  },
}
