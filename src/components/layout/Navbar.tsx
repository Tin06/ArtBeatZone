'use client'

import { useState } from 'react'
import { useLang } from '@/lib/language'

const navLinks = [
  { href: '#about',    hr: 'O NAMA',   en: 'ABOUT'    },
  { href: '#services', hr: 'USLUGE',   en: 'SERVICES' },
  { href: '#projects', hr: 'PROJEKTI', en: 'PROJECTS' },
  { href: '#contact',  hr: 'KONTAKT',  en: 'CONTACT'  },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[500] bg-black border-b border-white/10 h-[60px] flex items-stretch justify-between">
      {/* Logo */}
      <a
        href="#hero"
        className="flex items-center px-8 text-[0.9rem] font-bold tracking-[0.14em] uppercase text-white no-underline border-r border-white/10"
      >
        ArtBeatZone
      </a>

      {/* Right side */}
      <div className="flex items-stretch">
        {/* Desktop nav links */}
        <ul className="hidden md:flex items-stretch list-none">
          {navLinks.map(({ href, hr, en }) => (
            <li key={href} className="flex items-stretch">
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-[1.4rem] text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-white/60 no-underline border-l border-white/10 transition-colors duration-150 hover:text-[#00ff88] hover:border-[#00ff88]/30"
              >
                {lang === 'hr' ? hr : en}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center px-6 text-[0.72rem] font-bold tracking-[0.12em] uppercase bg-[#00ff88] text-black border-l border-[#00ff88] transition-colors duration-150 hover:bg-transparent hover:text-[#00ff88]"
        >
          {lang === 'hr' ? 'EN' : 'HR'}
        </button>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={t('Izbornik', 'Menu')}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-[60px] border-l border-white/10 bg-transparent"
        >
          <span className="block w-5 h-[1.5px] bg-white" />
          <span className="block w-5 h-[1.5px] bg-white" />
          <span className="block w-5 h-[1.5px] bg-white" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <ul className="md:hidden fixed inset-0 top-[60px] bg-black z-[499] flex flex-col items-center justify-center list-none border-t border-white/10">
          {navLinks.map(({ href, hr, en }) => (
            <li key={href} className="w-full border-b border-white/10">
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center py-6 text-[1rem] font-semibold tracking-[0.1em] uppercase text-white no-underline transition-colors duration-150 hover:text-[#00ff88]"
              >
                {lang === 'hr' ? hr : en}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
