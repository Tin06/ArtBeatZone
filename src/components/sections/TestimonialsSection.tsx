'use client'

import { useLang } from '@/lib/language'

const testimonials = [
  {
    clientHr: 'Klijent 01',
    clientEn: 'Client 01',
    quoteHr: '"ArtBeatZone je u potpunosti redefinirao naš brand. Brutalno direktan pristup — bez nepotrebnih sastanaka, samo konkretan rad i izvanredni rezultati."',
    quoteEn: '"ArtBeatZone completely redefined our brand. Brutally direct approach — no unnecessary meetings, just concrete work and outstanding results."',
    nameHr: 'Marija Kovač',
    nameEn: 'Maria Kovac',
    roleHr: 'Osnivačica, Bloom Boutique',
    roleEn: 'Founder, Bloom Boutique',
    textColor: 'text-[#ff00ff]',
    bgColor: 'bg-[#ff00ff]',
    barClass: 'w-[3px] h-full bg-[#ff00ff] absolute top-0 left-0',
  },
  {
    clientHr: 'Klijent 02',
    clientEn: 'Client 02',
    quoteHr: '"Web najam model je bio idealan za nas u fazi rasta. Za tri tjedna imali smo live stranicu koja izgleda bolje od svega što smo ikad zamišljali za tu cijenu."',
    quoteEn: '"The web rental model was ideal for our growth phase. In three weeks we had a live site that looked better than anything we had imagined at that price."',
    nameHr: 'Tomislav Horvatić',
    nameEn: 'Tomislav Horvatic',
    roleHr: 'CEO, Stark Digital',
    roleEn: 'CEO, Stark Digital',
    textColor: 'text-[#00ff88]',
    bgColor: 'bg-[#00ff88]',
    barClass: 'w-[3px] h-full bg-[#00ff88] absolute top-0 left-0',
  },
]

export default function TestimonialsSection() {
  const { t } = useLang()

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
      {testimonials.map(({ clientHr, clientEn, quoteHr, quoteEn, nameHr, nameEn, roleHr, roleEn, textColor, bgColor, barClass }, i) => (
        <div
          key={clientHr}
          className={`py-20 px-12 relative overflow-hidden ${i === 0 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
        >
          {/* Neon left accent bar */}
          <span className={barClass} />

          {/* Big quotation mark */}
          <span className="absolute top-8 right-10 text-[10rem] font-bold leading-[0.8] pointer-events-none select-none text-outline-white-mid">
            &ldquo;
          </span>

          {/* Client label */}
          <p className={`flex items-center gap-3 text-[0.62rem] font-bold tracking-[0.22em] uppercase mb-10 ${textColor}`}>
            <span className={`block w-5 h-[1.5px] shrink-0 ${bgColor}`} />
            {t(clientHr, clientEn)}
          </p>

          {/* Quote */}
          <blockquote className="text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.8] text-white/80 mb-10 max-w-[480px] relative z-10">
            {t(quoteHr, quoteEn)}
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <span className={`block w-7 h-0.5 shrink-0 ${bgColor}`} />
            <div>
              <p className="text-[0.84rem] font-bold uppercase tracking-[0.06em] text-white">
                {t(nameHr, nameEn)}
              </p>
              <p className={`text-[0.72rem] mt-0.5 ${textColor}`}>
                {t(roleHr, roleEn)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
