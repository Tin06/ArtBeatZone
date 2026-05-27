'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/language'
import type { ProjectRecord } from '@/lib/projects'
import StackedCardsInteraction, { type CardData } from './StackedCardsInteraction'

interface ProjectsSectionProps {
  projects: ProjectRecord[]
  loadError?: boolean
}

interface DisplayProject {
  id: string
  num: string
  serviceHr: string
  serviceEn: string
  company: string
  descHr: string
  descEn: string
  tagsHr: string[]
  tagsEn: string[]
  images: string[]
  bgClass: string
}

const bgClasses = ['card-bg-0', 'card-bg-1', 'card-bg-2', 'card-bg-3', 'card-bg-4']

function getPos(i: number, current: number, count: number): string {
  const d = (i - current + count) % count
  if (d === 0) return '0'
  if (d === 1) return '1'
  if (d === 2) return '2'
  return '-1'
}

function getImages(project: ProjectRecord) {
  return [project.cover_image_url, ...project.gallery_image_urls].filter(Boolean) as string[]
}

function mapProject(project: ProjectRecord, index: number): DisplayProject {
  const tagsHr = project.services_hr.length > 0 ? project.services_hr : [project.category_hr]
  const tagsEn = project.services_en.length > 0 ? project.services_en : [project.category_en]

  return {
    id: project.id,
    num: String(index + 1).padStart(2, '0'),
    serviceHr: tagsHr[0] ?? project.category_hr,
    serviceEn: tagsEn[0] ?? project.category_en,
    company: project.client || project.title_hr,
    descHr: project.excerpt_hr ?? project.description_hr ?? '',
    descEn: project.excerpt_en ?? project.description_en ?? project.excerpt_hr ?? project.description_hr ?? '',
    tagsHr,
    tagsEn,
    images: getImages(project),
    bgClass: bgClasses[index % bgClasses.length],
  }
}

function getStackedCards(project: DisplayProject): CardData[] {
  const images = project.images

  return [
    {
      image: images[0],
      accentClass: 'from-[#050505] via-[#151515] to-[#00ff8840]',
    },
    {
      image: images[1],
      accentClass: 'from-[#050505] via-[#151515] to-[#00ffff35]',
    },
    {
      image: images[2],
      accentClass: 'from-[#050505] via-[#151515] to-[#ff00ff35]',
    },
  ]
}

export default function ProjectsSection({ projects, loadError = false }: ProjectsSectionProps) {
  const { lang, t } = useLang()
  const displayProjects = useMemo(
    () => projects.map((project, index) => mapProject(project, index)),
    [projects]
  )
  const count = displayProjects.length
  const [current, setCurrent] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const touchX = useRef(0)
  const activeIndex = count > 0 ? Math.min(current, count - 1) : 0

  const move = useCallback((dir: 1 | -1) => {
    if (count === 0) return
    setCurrent(prev => (prev + dir + count) % count)
  }, [count])

  const startTimer = useCallback(() => {
    if (count <= 1 || reduceMotion || !isActive) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => move(1), 4500)
  }, [count, isActive, move, reduceMotion])

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => {
      setReduceMotion(media.matches)
      if (media.matches) stopTimer()
    }

    syncMotion()
    media.addEventListener('change', syncMotion)
    return () => media.removeEventListener('change', syncMotion)
  }, [stopTimer])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      const active = entry.isIntersecting && !document.hidden
      setIsActive(active)
      if (!active) stopTimer()
    }, { threshold: 0.25 })

    const syncVisibility = () => {
      const active = !document.hidden && section.getBoundingClientRect().bottom > 0 && section.getBoundingClientRect().top < window.innerHeight
      setIsActive(active)
      if (!active) stopTimer()
    }

    observer.observe(section)
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [stopTimer])

  const pad = (x: number) => String(x).padStart(2, '0')

  if (loadError) {
    return (
      <section id="projects" ref={sectionRef} className="border-b border-white/10 scroll-mt-[60px] bg-black">
        <div className="px-5 py-12 md:px-12 md:py-16">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold uppercase tracking-[-0.03em] text-white">
            Projekti su trenutno na kratkoj pauzi.
          </h2>
          <p className="mt-5 max-w-[620px] text-[0.95rem] leading-[1.75] text-white/55">
            Ne možemo ih prikazati jer se podaci nisu uspjeli učitati. Osvježite stranicu ili pokušajte ponovno malo kasnije.
          </p>
        </div>
      </section>
    )
  }

  if (count === 0) return null

  return (
    <section id="projects" ref={sectionRef} className="border-b border-white/10 scroll-mt-[60px] bg-black">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-8 md:px-12 md:py-12">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold uppercase tracking-[-0.03em] text-white">
          {t('Odabrani radovi', 'Selected Work')}
        </h2>
        <Link
          href="/projekti"
          className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#00ff88] no-underline border border-[#00ff88]/50 px-6 py-2 transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
        >
          {t('Svi projekti ->', 'All Projects ->')}
        </Link>
      </div>

      <div className="px-5 py-8 md:px-12 md:py-12">
        <div
          className="relative h-[760px] overflow-hidden sm:h-[720px] lg:h-[560px]"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('Odabrani radovi', 'Selected work')}
          aria-live="polite"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onFocusCapture={stopTimer}
          onBlurCapture={startTimer}
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1)
          }}
        >
          {displayProjects.map((proj, i) => (
            <div
              key={proj.id}
              className={`proj-card ${proj.bgClass}`}
              data-pos={getPos(i, activeIndex, count)}
              aria-hidden={i !== current}
              role="group"
              aria-label={`${i + 1} / ${count}: ${proj.company}`}
            >
              <div className="relative z-10 grid h-full grid-cols-1 gap-6 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1fr)] lg:items-center lg:p-10">
                <div className="flex h-full flex-col justify-between">
                  <span className="proj-num-outline text-[5rem] font-bold leading-none tracking-[-0.06em]">
                    {proj.num}
                  </span>
                  <div>
                    <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#00ff88]">
                      {lang === 'hr' ? proj.serviceHr : proj.serviceEn}
                    </p>
                    <p className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold uppercase leading-[1.1] tracking-[-0.025em] text-white">
                      {proj.company}
                    </p>
                    {(lang === 'hr' ? proj.descHr : proj.descEn) && (
                      <p className="mt-4 max-w-[540px] text-[0.88rem] leading-[1.7] text-white/55">
                        {lang === 'hr' ? proj.descHr : proj.descEn}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(lang === 'hr' ? proj.tagsHr : proj.tagsEn).map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/15 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <StackedCardsInteraction cards={getStackedCards(proj)} />
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="mt-6 flex items-center">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={t('Prethodni', 'Previous')}
              className="flex h-[52px] w-[52px] items-center justify-center border border-white/20 text-[1.2rem] text-[#00ff88] -mr-[1.5px] transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
            >
              &lt;-
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={t('Sljedeci', 'Next')}
              className="flex h-[52px] w-[52px] items-center justify-center border border-white/20 text-[1.2rem] text-[#00ff88] transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
            >
              -&gt;
            </button>
            <div className="flex h-[52px] items-center border border-l-0 border-white/20 px-6 text-[0.72rem] font-bold tracking-[0.1em] text-white/60">
              <span aria-live="polite">{pad(activeIndex + 1)} / {pad(count)}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
