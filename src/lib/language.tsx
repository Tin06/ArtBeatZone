'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('hr')
  const toggleLang = () => setLang(l => (l === 'hr' ? 'en' : 'hr'))
  const t = (hr: string, en: string) => (lang === 'hr' ? hr : en)
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
