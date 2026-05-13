'use client'

import { useLang } from '@/lib/language'

const services = [
  {
    num: '01',
    numColor: 'text-[#ff00ff]',
    hr: 'Grafički dizajn',
    en: 'Graphic Design',
    descHr: 'Logo, vizualni identitet, tiskovine, packaging i brand guidelines. Dizajn koji govori prije nego što izgovorite ijednu riječ.',
    descEn: 'Logo, visual identity, print materials, packaging, and brand guidelines. Design that speaks before you say a word.',
  },
  {
    num: '02',
    numColor: 'text-[#00ffff]',
    hr: 'Izrada web aplikacija',
    en: 'Web Development',
    descHr: 'Prilagođene web aplikacije, e-commerce rješenja i landing pageovi. Brzo, sigurno i skalabilno za vaš rast.',
    descEn: 'Custom web applications, e-commerce solutions, and landing pages. Fast, secure, and scalable for your growth.',
  },
  {
    num: '03',
    numColor: 'text-[#00ff88]',
    hr: 'Rentanje web stranica',
    en: 'Web Rental',
    descHr: 'Profesionalna web prisutnost od prvog dana bez kapitalnih troškova. Pretplatni model koji raste s vama.',
    descEn: 'Professional web presence from day one without capital costs. A subscription model that grows with you.',
  },
]

export default function ServicesSection() {
  const { t } = useLang()

  return (
    <section id="services" className="border-b border-white/10 scroll-mt-[60px]">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-12 border-b border-white/10">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] uppercase text-white">
          {t('Usluge', 'Services')}
        </h2>
        <span className="text-[4rem] font-bold tracking-[-0.06em] text-outline-neon-g leading-none">
          03
        </span>
      </div>

      {/* Service rows */}
      {services.map(({ num, numColor, hr, en, descHr, descEn }, i) => (
        <div
          key={num}
          className={`group grid grid-cols-[70px_1fr_50px] md:grid-cols-[100px_1fr_auto] items-center border-white/10 transition-colors duration-150 hover:bg-white hover:text-black ${i < services.length - 1 ? 'border-b' : ''}`}
        >
          {/* Number */}
          <div className={`py-10 px-6 md:px-12 text-[0.72rem] font-bold tracking-[0.14em] uppercase border-r border-white/10 group-hover:border-black/20 group-hover:text-black transition-colors duration-150 ${numColor}`}>
            {num}
          </div>

          {/* Body */}
          <div className="py-10 px-6 md:px-12">
            <p className="text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold tracking-[-0.025em] uppercase mb-2 text-white group-hover:text-black transition-colors duration-150">
              {t(hr, en)}
            </p>
            <p className="text-[0.84rem] text-white/45 font-light leading-[1.7] max-w-[560px] group-hover:text-black/60 transition-colors duration-150">
              {t(descHr, descEn)}
            </p>
          </div>

          {/* Arrow */}
          <a
            href="#contact"
            className="flex items-center py-10 px-6 md:px-12 text-[1.4rem] text-white/50 group-hover:text-black transition-colors duration-150"
          >
            →
          </a>
        </div>
      ))}
    </section>
  )
}
