'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import type { ProjectRecord } from '@/lib/projects'

export default function AdminProjectsList() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [message, setMessage] = useState('Ucitavanje...')

  const loadProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(error.message)
      return
    }

    setProjects((data ?? []) as ProjectRecord[])
    setMessage('')
  }, [supabase])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProjects()
  }, [loadProjects])

  async function removeProject(id: string) {
    if (!window.confirm('Obrisati projekt?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      setMessage(error.message)
      return
    }
    await loadProjects()
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 md:px-12 py-8 border-b border-white/10">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] uppercase text-white">
          Admin projekti
        </h1>
        <Link
          href="/admin/projekti/novi"
          className="inline-block bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-6 py-3 text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline hover:text-[#00ffff] hover:border-[#00ffff]"
        >
          Novi projekt
        </Link>
      </div>

      {message && <p className="px-5 md:px-12 py-8 text-white/50">{message}</p>}

      <div className="border-b border-white/10">
        {projects.map((project) => (
          <div key={project.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 px-5 md:px-12 py-6 border-b border-white/10">
            <div>
              <p className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#00ff88] mb-2">
                {project.published ? 'Objavljeno' : 'Draft'} / {project.category_hr}
              </p>
              <h2 className="text-[1.4rem] font-bold uppercase tracking-[-0.02em] text-white">
                {project.title_hr}
              </h2>
              <p className="text-[0.78rem] text-white/40 mt-1">/{project.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/projekti/${project.id}`} className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#00ff88] border border-[#00ff88]/50 px-4 py-2 no-underline">
                Uredi
              </Link>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#ff3b6b] border border-[#ff3b6b]/50 px-4 py-2"
              >
                Obrisi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
