'use client'

import { useLang } from '@/lib/language'

const services = [
  {
    num: '01',
    numColor: 'text-[#ff00ff]',
    hr: 'Grafički dizajn',
    en: 'Graphic Design',
    descHr: 'Logo, vizualni identitet, brošure, packaging i brand smjernice. Sve što vaš brand treba da ostavi pravi prvi dojam, još prije nego što netko pročita prvu riječ.',
    descEn: 'Logo, visual identity, brochures, packaging, and brand guidelines. Everything your brand needs to make the right first impression, before anyone reads a single word.',
  },
  {
    num: '02',
    numColor: 'text-[#00ffff]',
    hr: 'Izrada web aplikacija',
    en: 'Web Development',
    descHr: 'Web aplikacije, e-commerce rješenja i landing stranice prilagođene vašim potrebama. Gradimo stvari koje rade, brzo, pouzdano i spremno za rast.',
    descEn: 'Web applications, e-commerce solutions, and landing pages tailored to your needs. We build things that work, fast, reliably, and ready to grow.',
  },
  {
    num: '03',
    numColor: 'text-[#00ff88]',
    hr: 'Najam web stranice',
    en: 'Web Rental',
    descHr: 'Profesionalna web stranica bez velikih početnih troškova. Plaćate mjesečno, mi brinemo o dizajnu, hostingu i održavanju, vi se fokusirate na posao.',
    descEn: 'A professional website without large upfront costs. You pay monthly, we handle design, hosting, and maintenance, you focus on your business.',
  },
  {
    num: '04',
    numColor: 'text-[#ff8800]',
    hr: 'Izrada web stranica',
    en: 'Website Creation',
    descHr: 'Moderne, brze i responzivne web stranice prilagođene vašem brendu. Od jednostavnih prezentacijskih stranica do kompleksnijih rješenja s CMS-om.',
    descEn: 'Modern, fast, and responsive websites tailored to your brand. From simple presentation pages to more complex solutions with CMS.',
  },
]

export default function ServicesSection() {
  const { t } = useLang()

  return (
    <section id="services" className="border-b border-white/10 scroll-mt-[60px] bg-black">
      <div className="flex items-center justify-between px-5 md:px-12 py-8 md:py-12 border-b border-white/10">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] uppercase text-white">
          {t('Usluge', 'Services')}
        </h2>
        <span className="text-[4rem] font-bold tracking-[-0.06em] text-[#00ff88] leading-none">
          04
        </span>
      </div>

      {services.map(({ num, numColor, hr, en, descHr, descEn }, i) => (
        <div
          key={num}
          className={`group grid grid-cols-[52px_1fr_52px] md:grid-cols-[100px_1fr_auto] items-center border-white/10 transition-colors duration-150 hover:bg-[#00ff88]/8 ${i < services.length - 1 ? 'border-b' : ''}`}
        >
          <div className={`py-6 md:py-10 px-3 md:px-12 text-[0.72rem] font-bold tracking-[0.14em] uppercase border-r border-white/10 group-hover:border-[#00ff88]/40 transition-colors duration-150 ${numColor}`}>
            {num}
          </div>

          <div className="py-6 md:py-10 px-4 md:px-12">
            <p className="text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold tracking-[-0.025em] uppercase mb-2 text-white group-hover:text-[#00ff88] transition-colors duration-150">
              {t(hr, en)}
            </p>
            <p className="text-[0.84rem] text-white/50 font-light leading-[1.7] max-w-[560px] transition-colors duration-150">
              {t(descHr, descEn)}
            </p>
          </div>

          <a
            href="#contact"
            aria-label={t(`${hr} kontakt`, `${en} contact`)}
            className="flex items-center py-6 md:py-10 px-3 md:px-12 text-[1.4rem] text-[#00ff88] transition-colors duration-150 group-hover:text-[#00ffff]"
          >
            -&gt;
          </a>
        </div>
      ))}
    </section>
  )
}
