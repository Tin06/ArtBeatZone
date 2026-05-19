'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Lang = 'hr' | 'en'

interface LangCtx {
  lang: Lang
  toggleLang: () => void
  t: (hr: string, en: string) => string
}

const LangContext = createContext<LangCtx>({
  lang: 'hr',
  toggleLang: () => {},
  t: (hr) => hr,
})

function isLang(value: string | null): value is Lang {
  return value === 'hr' || value === 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'hr'

    const paramsLang = new URLSearchParams(window.location.search).get('lang')
    const savedLang = window.localStorage.getItem('artbeatzone-lang')

    if (isLang(paramsLang)) return paramsLang
    if (isLang(savedLang)) return savedLang
    return 'hr'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('artbeatzone-lang', lang)
  }, [lang])

  const value = useMemo<LangCtx>(() => ({
    lang,
    toggleLang: () => setLang((current) => (current === 'hr' ? 'en' : 'hr')),
    t: (hr: string, en: string) => (lang === 'hr' ? hr : en),
  }), [lang])

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
