'use client'

import { useLang } from '@/lib/language'

const stats = [
  { num: '5+',  hr: 'Godina iskustva',      en: 'Years of experience', color: 'text-[#00ff88]' },
  { num: '40+', hr: 'Projekata',             en: 'Projects',            color: 'text-[#00ffff]' },
  { num: '30+', hr: 'Zadovoljnih klijenata', en: 'Happy clients',       color: 'text-[#ff00ff]' },
  { num: '3',   hr: 'Usluge',               en: 'Services',            color: 'text-[#00ff88]' },
]

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section id="intro" className="min-h-screen pt-[60px] flex flex-col border-b border-white/10">
      {/* Main content */}
      <div className="flex-1 px-12 py-20 flex flex-col justify-center border-b border-white/10">
        {/* Eyebrow */}
        <p className="flex items-center gap-4 text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-white/40 mb-10">
          <span className="block w-6 h-[1.5px] bg-white/30 shrink-0" />
          {t('Boutique agencija · Zagreb · Est. 2017', 'Boutique agency · Zagreb · Est. 2017')}
        </p>

        {/* Heading */}
        <h1 className="text-[clamp(4.5rem,12vw,11rem)] font-bold leading-[0.92] tracking-[-0.04em] uppercase">
          <span className="block text-white">
            {t('DIZAJN', 'DESIGN')}
          </span>
          <span className="block text-outline-neon-c">
            &amp; WEB
          </span>
        </h1>

        {/* Sub */}
        <p className="text-[clamp(1rem,1.5vw,1.1rem)] text-white/50 max-w-[560px] leading-[1.7] mt-10">
          {t(
            'Dizajniramo. Razvijamo. Iznajmljujemo. — Za male tvrtke i startupe koji odbijaju biti nevidljivi.',
            'We Design. We Build. We Rent. — For small businesses and startups that refuse to be invisible.',
          )}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-col md:flex-row border-b border-white/10">
        {stats.map(({ num, hr, en, color }, i) => (
          <div
            key={num}
            className={`flex-1 px-12 py-8 flex flex-col gap-1 ${i < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
          >
            <span className={`text-[3rem] font-bold tracking-[-0.05em] leading-none ${color}`}>{num}</span>
            <span className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-white/40">
              {t(hr, en)}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="px-12 py-4 flex items-center gap-4 text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-white/30">
        {t('Scroll za više', 'Scroll for more')}
        <span className="block w-[60px] h-px bg-white/20" />
      </div>
    </section>
  )
}
