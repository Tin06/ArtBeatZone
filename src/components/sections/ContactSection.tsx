'use client'

import { useRef, useState } from 'react'
import { useLang } from '@/lib/language'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactSection() {
  const { t } = useLang()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || '').trim(),
          email: String(formData.get('email') || '').trim(),
          service: String(formData.get('service') || '').trim(),
          message: String(formData.get('message') || '').trim(),
        }),
      })

      const data = await res.json() as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? t('Slanje nije uspjelo.', 'Sending failed.'))
        setStatus('error')
        return
      }

      setStatus('sent')
      formRef.current?.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setErrorMsg(t('Mrežna greška. Pokušajte ponovo.', 'Network error. Please try again.'))
      setStatus('error')
    }
  }

  const inputClass = 'bg-transparent text-white text-[0.9rem] py-5 px-6 outline-none transition-colors duration-150 focus:bg-[#00ff88]/8 focus-visible:ring-2 focus-visible:ring-[#00ff88]/50 w-full placeholder:text-white/25'
  const labelClass = 'text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#00ff88] py-5 px-4 flex items-center border-b md:border-b-0 md:border-r border-white/10'
  const fieldClass = 'grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-white/10'

  const isSending = status === 'sending'

  return (
    <section id="contact" className="border-b border-white/10 scroll-mt-[60px] bg-black">
      <div className="px-5 md:px-12 py-12 md:py-20 pb-8 md:pb-12 border-b border-white/10">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#00ffff] mb-6">
          {t('Kontaktirajte nas', 'Get in touch')}
        </p>
        <a
          href="mailto:info@artbeatzone.hr"
          className="text-[clamp(1rem,5vw,4.5rem)] font-bold tracking-[-0.02em] uppercase text-white no-underline inline-block border-b-[3px] border-[#00ff88] leading-[1.2] transition-colors duration-200 hover:text-[#00ff88] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88]/60 break-all"
        >
          info@artbeatzone.hr
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]">
        <div className="px-5 md:px-12 py-10 md:py-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-8">
          {[
            { labelHr: 'Telefon', labelEn: 'Phone', valueHr: '+385 91 1234569', valueEn: '+385 91 1234569', color: 'text-[#00ffff]' },
            { labelHr: 'Lokacija', labelEn: 'Location', valueHr: 'Zagreb, HR', valueEn: 'Zagreb, HR', color: 'text-[#ff00ff]' },
            { labelHr: 'Radno vrijeme', labelEn: 'Working hours', valueHr: 'Pon - Pet, 0-24h', valueEn: 'Mon - Fri, 0-24h', color: 'text-[#00ff88]' },
          ].map(({ labelHr, labelEn, valueHr, valueEn, color }) => (
            <div key={labelHr}>
              <span className="block text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
                {t(labelHr, labelEn)}
              </span>
              <span className={`text-[0.9rem] font-medium ${color}`}>{t(valueHr, valueEn)}</span>
            </div>
          ))}
        </div>

        <div className="px-5 md:px-12 py-10 md:py-16">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
            <div className={`${fieldClass} border-t`}>
              <label htmlFor="contact-name" className={labelClass}>{t('Ime', 'Name')}</label>
              <input id="contact-name" name="name" type="text" placeholder={t('Ana Anić', 'Ana Anic')} className={inputClass} autoComplete="name" required disabled={isSending} />
            </div>
            <div className={fieldClass}>
              <label htmlFor="contact-email" className={labelClass}>Email</label>
              <input id="contact-email" name="email" type="email" placeholder="ana@tvrtka.hr" className={inputClass} autoComplete="email" required disabled={isSending} />
            </div>
            <div className={fieldClass}>
              <label htmlFor="contact-service" className={labelClass}>{t('Usluga', 'Service')}</label>
              <select id="contact-service" name="service" className={`${inputClass} appearance-none`} defaultValue="" disabled={isSending}>
                <option value="" className="bg-black">{t('- odaberite -', '- select -')}</option>
                <option value="graficki-dizajn" className="bg-black">{t('Grafički dizajn', 'Graphic Design')}</option>
                <option value="web-aplikacije" className="bg-black">{t('Izrada web aplikacija', 'Web Development')}</option>
                <option value="najam-web" className="bg-black">{t('Najam web stranice', 'Web Rental')}</option>
                <option value="izrada-web-stranica" className="bg-black">{t('Izrada web stranica', 'Website Creation')}</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label htmlFor="contact-message" className={`${labelClass} items-start pt-5`}>{t('Poruka', 'Message')}</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t('Opišite vaš projekt...', 'Describe your project...')}
                className={`${inputClass} min-h-[120px] resize-none`}
                required
                disabled={isSending}
              />
            </div>

            <div className="mt-8 flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={isSending}
                className="bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-12 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-colors duration-150 hover:text-[#00ffff] hover:border-[#00ffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88]/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? t('Slanje...', 'Sending...') : t('Pošalji ->', 'Send ->')}
              </button>
              <p className="min-h-5 text-[0.72rem] font-medium tracking-[0.08em] uppercase" role="status" aria-live="polite">
                {status === 'sent' && (
                  <span className="text-[#00ff88]">{t('Poruka je poslana. Javit ćemo se uskoro.', 'Message sent. We will get back to you soon.')}</span>
                )}
                {status === 'error' && (
                  <span className="text-[#ff3b6b]">{errorMsg}</span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
