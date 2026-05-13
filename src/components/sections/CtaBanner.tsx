'use client'

import { useLang } from '@/lib/language'

export default function CtaBanner() {
  const { t } = useLang()

  return (
    <section
      id="cta"
      data-cursor-invert="true"
      className="bg-black border-b border-white/10 py-28 px-12 flex flex-col gap-12"
    >
      {/* Heading */}
      <div className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] uppercase">
        <span className="block text-white">
          {t('VAŠA VIZIJA.', 'YOUR VISION.')}
        </span>
        <span className="block text-outline-neon-g">
          {t('NAŠE RUKE.', 'OUR HANDS.')}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 flex-wrap">
        <p className="text-[1rem] text-white/55 max-w-[480px] leading-[1.75] font-light">
          {t(
            'Razgovarajmo o vašem sljedećem projektu — bez obveza, bez korporativnog bullshita.',
            "Let's talk about your next project — no commitment, no corporate bullshit.",
          )}
        </p>
        <a
          href="#contact"
          className="inline-block bg-[#00ff88] text-black border-[1.5px] border-[#00ff88] px-12 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase no-underline whitespace-nowrap transition-colors duration-150 hover:bg-transparent hover:text-[#00ff88]"
        >
          {t('Kontaktirajte nas →', 'Contact Us →')}
        </a>
      </div>
    </section>
  )
}
