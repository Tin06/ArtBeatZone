'use client'

import { useLang } from '@/lib/language'

export default function Footer() {
  const { lang, t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 flex flex-col md:flex-row items-stretch justify-between">
      <span className="px-12 py-6 text-[0.7rem] font-medium tracking-[0.08em] text-white/40 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
        &copy; {year} ARTBEATZONE.{' '}
        {t('SVA PRAVA PRIDRZANA.', 'ALL RIGHTS RESERVED.')}
      </span>

      <ul className="flex list-none">
        {[
          { href: '#about',    hr: 'O NAMA',  en: 'ABOUT'    },
          { href: '#services', hr: 'USLUGE',  en: 'SERVICES' },
          { href: '#contact',  hr: 'KONTAKT', en: 'CONTACT'  },
        ].map(({ href, hr, en }) => (
          <li key={href}>
            <a
              href={href}
              className="flex items-center px-6 py-4 md:py-0 h-full text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-white/50 no-underline border-r border-b md:border-b-0 border-white/10 transition-colors duration-150 hover:text-[#00ff88]"
            >
              {lang === 'hr' ? hr : en}
            </a>
          </li>
        ))}
      </ul>

      <span className="px-12 py-6 text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/60 border-t md:border-t-0 md:border-l border-white/10 flex items-center">
        {t('Dizajniramo. Razvijamo. Iznajmljujemo.', 'We Design. We Build. We Rent.')}
      </span>
    </footer>
  )
}
