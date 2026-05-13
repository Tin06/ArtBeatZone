'use client'

import { useLang } from '@/lib/language'

export default function AboutSection() {
  const { t } = useLang()

  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] border-b border-white/10 scroll-mt-[60px]">
      {/* Left — big number + tags */}
      <div className="px-12 py-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
        <div>
          <p className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
            {t('Broj usluga', 'Services count')}
          </p>
          <span className="text-[clamp(6rem,14vw,12rem)] font-bold leading-none tracking-[-0.06em] text-outline-neon-m">
            03
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {[
            { hr: 'Grafički dizajn', en: 'Graphic Design', color: 'border-[#ff00ff]/40 text-[#ff00ff]' },
            { hr: 'Web razvoj',      en: 'Web Dev',        color: 'border-[#00ffff]/40 text-[#00ffff]' },
            { hr: 'Web najam',       en: 'Web Rental',     color: 'border-[#00ff88]/40 text-[#00ff88]' },
          ].map(({ hr, en, color }) => (
            <span
              key={hr}
              className={`text-[0.6rem] font-bold tracking-[0.1em] uppercase border-[1.5px] px-3 py-1 ${color}`}
            >
              {t(hr, en)}
            </span>
          ))}
        </div>
      </div>

      {/* Right — description */}
      <div className="px-16 py-20 flex flex-col justify-center">
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
          {t('O nama', 'About Us')}
        </p>

        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] uppercase mb-8 text-white">
          {t('Radimo manje.\nRadimo bolje.', 'We do less.\nWe do it better.').split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <p className="text-[0.95rem] text-white/50 leading-[1.85] font-light max-w-[520px]">
          {t(
            'ArtBeatZone je boutique agencija specijalizirana za grafički dizajn, izradu web aplikacija i rentanje web stranica. Ciljamo na male tvrtke i startupe koji znaju da kvaliteta vizualnog identiteta nije opcija — već preduvjet za rast.',
            'ArtBeatZone is a boutique agency specialising in graphic design, web application development, and web rental. We target small businesses and startups that know quality visual identity isn\'t optional — it\'s a prerequisite for growth.',
          )}
        </p>
        <p className="text-[0.95rem] text-white/50 leading-[1.85] font-light max-w-[520px] mt-5">
          {t(
            'Naš pristup je brutalno jasan: fokus, preciznost, isporuka. Bez korporativnog žargona. Samo rezultati.',
            'Our approach is brutally clear: focus, precision, delivery. No corporate jargon. Just results.',
          )}
        </p>

        {/* Visual block */}
        <div className="w-full h-[180px] mt-12 bg-black border border-white/10 relative overflow-hidden">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.8rem] font-bold tracking-[0.3em] uppercase text-outline-white-thin whitespace-nowrap">
            ARTBEATZONE
          </span>
        </div>
      </div>
    </section>
  )
}
