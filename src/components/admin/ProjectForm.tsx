'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { projectImagesBucket } from '@/lib/supabase/config'
import type { ProjectRecord } from '@/lib/projects'

interface ProjectFormProps {
  projectId?: string
}

interface ProjectFormState {
  slug: string
  title_hr: string
  title_en: string
  category_hr: string
  category_en: string
  excerpt_hr: string
  excerpt_en: string
  description_hr: string
  description_en: string
  client: string
  year: string
  services_hr: string
  services_en: string
  cover_image_url: string
  gallery_image_urls: string
  published: boolean
  show_date: boolean
  sort_order: number
}

const emptyState: ProjectFormState = {
  slug: '',
  title_hr: '',
  title_en: '',
  category_hr: '',
  category_en: '',
  excerpt_hr: '',
  excerpt_en: '',
  description_hr: '',
  description_en: '',
  client: '',
  year: '',
  services_hr: '',
  services_en: '',
  cover_image_url: '',
  gallery_image_urls: '',
  published: false,
  show_date: false,
  sort_order: 0,
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function linesToArray(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function arrayToLines(value: string[] | null | undefined) {
  return (value ?? []).join('\n')
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const router = useRouter()
  const [form, setForm] = useState<ProjectFormState>(emptyState)
  const [loading, setLoading] = useState(Boolean(projectId))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!projectId) return

    supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setMessage(error.message)
          setLoading(false)
          return
        }

        const project = data as ProjectRecord
        setForm({
          slug: project.slug,
          title_hr: project.title_hr,
          title_en: project.title_en,
          category_hr: project.category_hr,
          category_en: project.category_en,
          excerpt_hr: project.excerpt_hr ?? '',
          excerpt_en: project.excerpt_en ?? '',
          description_hr: project.description_hr ?? '',
          description_en: project.description_en ?? '',
          client: project.client ?? '',
          year: project.year ?? '',
          services_hr: arrayToLines(project.services_hr),
          services_en: arrayToLines(project.services_en),
          cover_image_url: project.cover_image_url ?? '',
          gallery_image_urls: arrayToLines(project.gallery_image_urls),
          published: project.published,
          show_date: project.show_date,
          sort_order: project.sort_order,
        })
        setLoading(false)
      })
  }, [projectId, supabase])

  function updateField<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function uploadFile(file: File, folder: string) {
    const extension = file.name.split('.').pop() || 'jpg'
    const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'
    const filePath = `${folder}/${Date.now()}-${baseName}.${extension}`
    const { error } = await supabase.storage.from(projectImagesBucket).upload(filePath, file, {
      upsert: true,
      cacheControl: '31536000',
    })

    if (error) throw error

    return supabase.storage.from(projectImagesBucket).getPublicUrl(filePath).data.publicUrl
  }

  async function uploadCover(file: File | null) {
    if (!file) return
    try {
      setMessage('Upload cover slike...')
      const url = await uploadFile(file, 'covers')
      updateField('cover_image_url', url)
      setMessage('Cover slika je ucitana.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload cover slike nije uspio.')
    }
  }

  async function uploadGallery(files: FileList | null) {
    if (!files?.length) return
    try {
      setMessage('Upload galerije...')
      const urls = []
      for (const file of Array.from(files)) {
        urls.push(await uploadFile(file, 'gallery'))
      }
      updateField('gallery_image_urls', [form.gallery_image_urls, ...urls].filter(Boolean).join('\n'))
      setMessage('Galerija je ucitana.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload galerije nije uspio.')
    }
  }

  async function saveProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const payload = {
      slug: form.slug || slugify(form.title_hr),
      title_hr: form.title_hr,
      title_en: form.title_en,
      category_hr: form.category_hr,
      category_en: form.category_en,
      excerpt_hr: form.excerpt_hr || null,
      excerpt_en: form.excerpt_en || null,
      description_hr: form.description_hr || null,
      description_en: form.description_en || null,
      client: form.client || null,
      year: form.year || null,
      services_hr: linesToArray(form.services_hr),
      services_en: linesToArray(form.services_en),
      cover_image_url: form.cover_image_url || null,
      gallery_image_urls: linesToArray(form.gallery_image_urls),
      published: form.published,
      show_date: form.show_date,
      sort_order: Number(form.sort_order) || 0,
    }

    const result = projectId
      ? await supabase.from('projects').update(payload).eq('id', projectId).select('id').single()
      : await supabase.from('projects').insert(payload).select('id').single()

    setSaving(false)

    if (result.error) {
      setMessage(result.error.message)
      return
    }

    router.push('/admin/projekti')
    router.refresh()
  }

  const inputClass = 'bg-transparent text-white text-[0.9rem] py-4 px-5 outline-none focus:bg-[#00ff88]/8 w-full placeholder:text-white/25'
  const labelClass = 'text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#00ff88] py-4 px-4 flex items-center border-b md:border-b-0 md:border-r border-white/10'
  const fieldClass = 'grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-white/10'

  if (loading) return <div className="px-5 md:px-12 py-12 text-white/50">Ucitavanje projekta...</div>

  return (
    <form onSubmit={saveProject} className="border border-white/10">
      <div className={fieldClass}>
        <label htmlFor="title_hr" className={labelClass}>Naslov HR</label>
        <input id="title_hr" value={form.title_hr} onChange={(e) => updateField('title_hr', e.target.value)} className={inputClass} required />
      </div>
      <div className={fieldClass}>
        <label htmlFor="title_en" className={labelClass}>Naslov EN</label>
        <input id="title_en" value={form.title_en} onChange={(e) => updateField('title_en', e.target.value)} className={inputClass} required />
      </div>
      <div className={fieldClass}>
        <label htmlFor="slug" className={labelClass}>Slug</label>
        <input id="slug" value={form.slug} onChange={(e) => updateField('slug', slugify(e.target.value))} placeholder={slugify(form.title_hr)} className={inputClass} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="category_hr" className={labelClass}>Kategorija HR</label>
        <input id="category_hr" value={form.category_hr} onChange={(e) => updateField('category_hr', e.target.value)} className={inputClass} required />
      </div>
      <div className={fieldClass}>
        <label htmlFor="category_en" className={labelClass}>Kategorija EN</label>
        <input id="category_en" value={form.category_en} onChange={(e) => updateField('category_en', e.target.value)} className={inputClass} required />
      </div>
      <div className={fieldClass}>
        <label htmlFor="client" className={labelClass}>Klijent</label>
        <input id="client" value={form.client} onChange={(e) => updateField('client', e.target.value)} className={inputClass} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="year" className={labelClass}>Godina</label>
        <input id="year" value={form.year} onChange={(e) => updateField('year', e.target.value)} className={inputClass} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="excerpt_hr" className={labelClass}>Sazetak HR</label>
        <textarea id="excerpt_hr" value={form.excerpt_hr} onChange={(e) => updateField('excerpt_hr', e.target.value)} className={`${inputClass} min-h-[90px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="excerpt_en" className={labelClass}>Sazetak EN</label>
        <textarea id="excerpt_en" value={form.excerpt_en} onChange={(e) => updateField('excerpt_en', e.target.value)} className={`${inputClass} min-h-[90px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="description_hr" className={labelClass}>Opis HR</label>
        <textarea id="description_hr" value={form.description_hr} onChange={(e) => updateField('description_hr', e.target.value)} className={`${inputClass} min-h-[180px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="description_en" className={labelClass}>Opis EN</label>
        <textarea id="description_en" value={form.description_en} onChange={(e) => updateField('description_en', e.target.value)} className={`${inputClass} min-h-[180px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="services_hr" className={labelClass}>Usluge HR</label>
        <textarea id="services_hr" value={form.services_hr} onChange={(e) => updateField('services_hr', e.target.value)} placeholder="Jedna usluga po liniji" className={`${inputClass} min-h-[110px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="services_en" className={labelClass}>Usluge EN</label>
        <textarea id="services_en" value={form.services_en} onChange={(e) => updateField('services_en', e.target.value)} placeholder="One service per line" className={`${inputClass} min-h-[110px]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="cover_image_url" className={labelClass}>Cover URL</label>
        <input id="cover_image_url" value={form.cover_image_url} onChange={(e) => updateField('cover_image_url', e.target.value)} className={inputClass} />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Upload cover</span>
        <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files?.[0] ?? null)} className={`${inputClass} file:mr-4 file:border file:border-[#00ff88]/50 file:bg-black file:px-4 file:py-2 file:text-[#00ff88]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="gallery_image_urls" className={labelClass}>Galerija URL</label>
        <textarea id="gallery_image_urls" value={form.gallery_image_urls} onChange={(e) => updateField('gallery_image_urls', e.target.value)} placeholder="Jedan URL po liniji" className={`${inputClass} min-h-[120px]`} />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Upload galerija</span>
        <input type="file" accept="image/*" multiple onChange={(e) => uploadGallery(e.target.files)} className={`${inputClass} file:mr-4 file:border file:border-[#00ff88]/50 file:bg-black file:px-4 file:py-2 file:text-[#00ff88]`} />
      </div>
      <div className={fieldClass}>
        <label htmlFor="sort_order" className={labelClass}>Redoslijed</label>
        <input id="sort_order" type="number" value={form.sort_order} onChange={(e) => updateField('sort_order', Number(e.target.value))} className={inputClass} />
      </div>

      <div className="p-5 md:p-8 flex flex-col gap-4 border-b border-white/10">
        <label className="flex items-center gap-3 text-[0.84rem] text-white/70">
          <input type="checkbox" checked={form.published} onChange={(e) => updateField('published', e.target.checked)} />
          Objavi projekt
        </label>
        <label className="flex items-center gap-3 text-[0.84rem] text-white/70">
          <input type="checkbox" checked={form.show_date} onChange={(e) => updateField('show_date', e.target.checked)} />
          Prikazi datum
        </label>
      </div>

      <div className="p-5 md:p-8 flex flex-col md:flex-row gap-4 md:items-center">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-10 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-colors duration-150 hover:text-[#00ffff] hover:border-[#00ffff] disabled:opacity-50"
        >
          {saving ? 'Spremanje...' : 'Spremi projekt'}
        </button>
        {message && <p className="text-[0.84rem] text-white/55">{message}</p>}
      </div>
    </form>
  )
}
