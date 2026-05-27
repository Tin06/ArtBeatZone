import Link from 'next/link'
import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminAuthGate from '@/components/admin/AdminAuthGate'

export default function AdminPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <AdminAuthGate>
        <main className="min-h-screen bg-black">
          <section className="px-5 md:px-12 py-12 md:py-20 border-b border-white/10">
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#00ff88] mb-6">
              Admin
            </p>
            <h1 className="text-[clamp(2.4rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em] uppercase text-white">
              Nadzorna ploca
            </h1>
            <Link
              href="/admin/projekti"
              className="inline-block mt-10 bg-black text-[#00ff88] border-[1.5px] border-[#00ff88] px-10 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase no-underline hover:text-[#00ffff] hover:border-[#00ffff]"
            >
              Projekti -&gt;
            </Link>
          </section>
        </main>
      </AdminAuthGate>
      <Footer />
    </LanguageProvider>
  )
}
