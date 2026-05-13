'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language'

interface Project {
  num: string
  catHr: string
  catEn: string
  name: string
  year: string
  bgClass: string
}

const projects: Project[] = [
  { num: '01', catHr: 'Vizualni identitet', catEn: 'Visual Identity', name: 'Bloom Boutique', year: '2024', bgClass: 'card-bg-0' },
  { num: '02', catHr: 'Web aplikacija', catEn: 'Web App', name: 'Stark Digital', year: '2024', bgClass: 'card-bg-1' },
  { num: '03', catHr: 'Web najam', catEn: 'Web Rental', name: 'Kavana Nora', year: '2023', bgClass: 'card-bg-2' },
  { num: '04', catHr: 'Branding', catEn: 'Branding', name: 'Vox Studio', year: '2023', bgClass: 'card-bg-3' },
  { num: '05', catHr: 'E-commerce', catEn: 'E-commerce', name: 'Terra Organic', year: '2022', bgClass: 'card-bg-4' },
]

const n = projects.length

function getPos(i: number, current: number): string {
  const d = (i - current + n) % n
  if (d === 0) return '0'
  if (d === 1) return '1'
  if (d === 2) return '2'
  return '-1'
}

export default function ProjectsSection() {
  const { t } = useLang()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchX = useRef(0)

  const move = useCallback((dir: 1 | -1) => {
    setCurrent(prev => (prev + dir + n) % n)
  }, [])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => move(1), 4500)
  }, [move])

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  const pad = (x: number) => String(x).padStart(2, '0')

  return (
    <section id="projects" className="border-b border-white/10 scroll-mt-[60px] bg-black">
      <div className="flex items-center justify-between px-12 py-12 border-b border-white/10">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] uppercase text-white">
          {t('Odabrani radovi', 'Selected Work')}
        </h2>
        <a
          href="#contact"
          className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#00ff88] no-underline border border-[#00ff88]/50 px-6 py-2 transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
        >
          {t('Svi projekti ->', 'All Projects ->')}
        </a>
      </div>

      <div className="px-12 py-12">
        <div
          className="relative h-[400px] md:h-[520px]"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1)
          }}
          onClick={() => move(1)}
        >
          {projects.map((proj, i) => (
            <div
              key={proj.name}
              className={`proj-card ${proj.bgClass}`}
              data-pos={getPos(i, current)}
            >
              <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <span className="proj-num-outline text-[5rem] font-bold tracking-[-0.06em] leading-none">
                  {proj.num}
                </span>
                <div>
                  <p className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#00ff88] mb-2">
                    {t(proj.catHr, proj.catEn)}
                  </p>
                  <p className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.025em] uppercase text-white leading-[1.1]">
                    {proj.name}
                  </p>
                  <p className="text-[0.7rem] text-white/45 mt-2">{proj.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-6">
          <button
            onClick={() => move(-1)}
            aria-label={t('Prethodni', 'Previous')}
            className="w-[52px] h-[52px] flex items-center justify-center border border-white/20 text-[1.2rem] text-[#00ff88] -mr-[1.5px] transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
          >
            &lt;-
          </button>
          <button
            onClick={() => move(1)}
            aria-label={t('Sljedeci', 'Next')}
            className="w-[52px] h-[52px] flex items-center justify-center border border-white/20 text-[1.2rem] text-[#00ff88] transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
          >
            -&gt;
          </button>
          <div className="h-[52px] border border-white/20 border-l-0 px-6 flex items-center text-[0.72rem] font-bold tracking-[0.1em] text-white/60">
            {pad(current + 1)} / {pad(n)}
          </div>
        </div>
      </div>
    </section>
  )
}
