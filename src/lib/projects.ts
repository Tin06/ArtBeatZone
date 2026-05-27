import { createServerSupabaseClient } from './supabase/server'

export interface ProjectRecord {
  id: string
  slug: string
  title_hr: string
  title_en: string
  category_hr: string
  category_en: string
  excerpt_hr: string | null
  excerpt_en: string | null
  description_hr: string | null
  description_en: string | null
  client: string | null
  year: string | null
  services_hr: string[]
  services_en: string[]
  cover_image_url: string | null
  gallery_image_urls: string[]
  published: boolean
  show_date: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProjectsResult {
  projects: ProjectRecord[]
  error: boolean
}

export async function getPublishedProjects(limit?: number) {
  const supabase = createServerSupabaseClient()
  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Failed to load published projects', error)
    return []
  }

  return (data ?? []) as ProjectRecord[]
}

export async function getLatestPublishedProjects(limit = 5): Promise<ProjectsResult> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to load latest published projects', error)
    return { projects: [], error: true }
  }

  return { projects: (data ?? []) as ProjectRecord[], error: false }
}

export async function getPublishedProjectBySlug(slug: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Failed to load project', error)
    return null
  }

  return data as ProjectRecord | null
}
