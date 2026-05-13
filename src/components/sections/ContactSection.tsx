'use client'

import { useState } from 'react'
import { useLang } from '@/lib/language'

export default function ContactSection() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputClass = 'bg-transparent text-white text-[0.9rem] py-5 px-6 outline-none transition-colors duration-150 focus:bg-white/5 w-full placeholder:text-white/25'
  const labelClass = 'text-[0.62rem] font-bold tracking-[0.16em] uppercase text-white/40 py-5 px-4 flex items-center border-b md:border-b-0 md:border-r border-white/10'
  const fieldClass = 'grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-white/10'

  return (
    <section id="contact" className="border-b border-white/10 scroll-mt-[60px]">
      {/* Top — email */}
      <div className="px-12 py-20 pb-12 border-b border-white/10">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-white/40 mb-6">
          {t('Kontaktirajte nas', 'Get in touch')}
        </p>
        <a
          href="mailto:hello@artbeatzone.hr"
          className="text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.04em] uppercase text-white no-underline inline-block border-b-[3px] border-[#00ff88] leading-[1.1] transition-opacity duration-200 hover:opacity-50"
        >
          hello@artbeatzone.hr
        </a>
      </div>

      {/* Body — info + form */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]">
        {/* Info column */}
        <div className="px-12 py-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-8">
          {[
            { labelHr: 'Telefon',       labelEn: 'Phone',         valueHr: '+385 1 234 5678',   valueEn: '+385 1 234 5678',    color: 'text-[#00ffff]' },
            { labelHr: 'Lokacija',      labelEn: 'Location',      valueHr: 'Zagreb, HR',          valueEn: 'Zagreb, HR',         color: 'text-[#ff00ff]' },
            { labelHr: 'Radno vrijeme', labelEn: 'Working hours', valueHr: 'Pon – Pet, 09–17h',  valueEn: 'Mon – Fri, 9am–5pm', color: 'text-[#00ff88]' },
          ].map(({ labelHr, labelEn, valueHr, valueEn, color }) => (
            <div key={labelHr}>
              <span className="block text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
                {t(labelHr, labelEn)}
              </span>
              <span className={`text-[0.9rem] font-medium ${color}`}>{t(valueHr, valueEn)}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="px-12 py-16">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className={`${fieldClass} border-t`}>
              <label className={labelClass}>{t('Ime', 'Name')}</label>
              <input type="text" placeholder={t('Ana Anić', 'Ana Anic')} className={inputClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Email</label>
              <input type="email" placeholder="ana@tvrtka.hr" className={inputClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>{t('Usluga', 'Service')}</label>
              <select className={`${inputClass} appearance-none`}>
                <option value="" className="bg-black">{t('— odaberite —', '— select —')}</option>
                <option className="bg-black">{t('Grafički dizajn', 'Graphic Design')}</option>
                <option className="bg-black">{t('Izrada web aplikacija', 'Web Development')}</option>
                <option className="bg-black">{t('Rentanje web stranica', 'Web Rental')}</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label className={`${labelClass} items-start pt-5`}>{t('Poruka', 'Message')}</label>
              <textarea
                placeholder={t('Opišite vaš projekt...', 'Describe your project...')}
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-[#00ff88] text-black border-[1.5px] border-[#00ff88] px-12 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-colors duration-150 hover:bg-transparent hover:text-[#00ff88]"
              >
                {sent ? t('Poslano ✓', 'Sent ✓') : t('Pošalji →', 'Send →')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
