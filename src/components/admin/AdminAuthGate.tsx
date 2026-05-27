'use client'

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

const adminEmail = 'tin.lojen@hotmail.com'

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState(adminEmail)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let mounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setUser(data.user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  async function signIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (data.user?.email !== adminEmail) {
      await supabase.auth.signOut()
      setMessage('Ovaj korisnik nema admin pristup.')
      return
    }

    setUser(data.user)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return <div className="px-5 md:px-12 py-12 text-white/50">Ucitavanje admina...</div>
  }

  if (!user || user.email !== adminEmail) {
    return (
      <main className="min-h-screen pt-[60px] bg-black">
        <section className="px-5 md:px-12 py-12 md:py-20 border-b border-white/10">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#00ff88] mb-6">
            Admin
          </p>
          <h1 className="text-[clamp(2.4rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em] uppercase text-white">
            Prijava
          </h1>
        </section>

        <section className="px-5 md:px-12 py-10 md:py-16 max-w-[620px]">
          <form onSubmit={signIn} className="flex flex-col border border-white/10">
            <label className="grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-white/10">
              <span className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#00ff88] py-5 px-4 border-b md:border-b-0 md:border-r border-white/10">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white text-[0.9rem] py-5 px-6 outline-none focus:bg-[#00ff88]/8"
                required
              />
            </label>
            <label className="grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-white/10">
              <span className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#00ff88] py-5 px-4 border-b md:border-b-0 md:border-r border-white/10">
                Lozinka
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white text-[0.9rem] py-5 px-6 outline-none focus:bg-[#00ff88]/8"
                required
              />
            </label>
            <div className="p-5">
              <button
                type="submit"
                className="bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-10 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-colors duration-150 hover:text-[#00ffff] hover:border-[#00ffff]"
              >
                Prijavi se
              </button>
              {message && <p className="mt-5 text-[0.84rem] text-[#ff3b6b]">{message}</p>}
            </div>
          </form>
        </section>
      </main>
    )
  }

  return (
    <>
      <div className="pt-[60px] px-5 md:px-12 py-4 border-b border-white/10 bg-black flex items-center justify-between">
        <span className="text-[0.7rem] uppercase tracking-[0.12em] text-white/50">{user.email}</span>
        <button
          type="button"
          onClick={signOut}
          className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#00ff88] border border-[#00ff88]/50 px-4 py-2 hover:text-[#00ffff] hover:border-[#00ffff]"
        >
          Odjava
        </button>
      </div>
      {children}
    </>
  )
}
