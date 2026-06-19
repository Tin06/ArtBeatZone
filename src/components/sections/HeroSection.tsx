'use client'

import { useLang } from '@/lib/language'

const stats = [
  { num: '5+', hr: 'Godina iskustva', en: 'Years of experience', color: 'text-[#00ff88]' },
  { num: '40+', hr: 'Projekata', en: 'Projects', color: 'text-[#00ffff]' },
  { num: '30+', hr: 'Zadovoljnih klijenata', en: 'Happy clients', color: 'text-[#ff00ff]' },
  { num: '4', hr: 'Usluge', en: 'Services', color: 'text-[#00ff88]' },
]

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen pt-[60px] flex flex-col border-b border-white/10 bg-black">
      <div className="relative z-10 flex-1 px-5 md:px-12 py-12 md:py-20 flex flex-col justify-center border-b border-white/10">
        <p className="flex items-center gap-4 text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#00ff88] mb-10">
          <span className="block w-6 h-[1.5px] bg-[#00ff88] shrink-0" />
          {t('Studio / Zagreb / Est. 2017', 'Studio / Zagreb / Est. 2017')}
        </p>

        <h1 className="text-[clamp(3rem,12vw,11rem)] font-bold leading-[0.92] tracking-[-0.04em] uppercase">
          <span className="block text-white">{t('DIZAJN', 'DESIGN')}</span>
          <span className="block text-[#00ffff]">&amp; WEB</span>
        </h1>

        <p className="text-[clamp(1rem,1.5vw,1.1rem)] text-white/55 max-w-[560px] leading-[1.7] mt-10">
          {t(
            'Dizajniramo. Razvijamo. Realiziramo. Za male tvrtke i startupe koji odbijaju biti nevidljivi.',
            'We Design. We Build. We Deliver. For small businesses and startups that refuse to be invisible.',
          )}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="#contact"
            className="inline-block bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-10 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase no-underline transition-colors duration-150 hover:text-[#00ffff] hover:border-[#00ffff]"
          >
            {t('Javi se ->', 'Get in touch ->')}
          </a>
          <a
            href="#projects"
            className="inline-block text-white/60 border-[1.5px] border-white/20 px-10 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase no-underline transition-colors duration-150 hover:text-white hover:border-white/50"
          >
            {t('Pogledaj radove', 'View Work')}
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:flex md:flex-row border-b border-white/10">
        {stats.map(({ num, hr, en, color }, i) => {
          const border = [
            'border-b border-r border-white/10 md:border-b-0',
            'border-b border-white/10 md:border-b-0 md:border-r',
            'border-r border-white/10',
            '',
          ][i]
          return (
          <div
            key={num}
            className={`flex-1 px-3 md:px-12 py-5 md:py-8 flex flex-col gap-1 ${border}`}
          >
            <span className={`text-[2.2rem] md:text-[3rem] font-bold tracking-[-0.05em] leading-none ${color}`}>{num}</span>
            <span className="text-[0.62rem] md:text-[0.7rem] font-medium tracking-[0.1em] md:tracking-[0.12em] uppercase text-white/45 leading-tight">
              {t(hr, en)}
            </span>
          </div>
          )
        })}
      </div>

      <div className="relative z-10 px-5 md:px-12 py-4 flex items-center gap-4 text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[#00ff88]">
        {t('Scroll za više', 'Scroll for more')}
        <span className="block w-[60px] h-px bg-[#00ff88]" />
      </div>
    </section>
  )
}
