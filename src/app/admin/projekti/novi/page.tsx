import Link from 'next/link'
import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminAuthGate from '@/components/admin/AdminAuthGate'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata = {
  title: 'Novi projekt - ARTBEATZONE',
}

export default function NewProjectPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <AdminAuthGate>
        <main className="min-h-screen bg-black">
          <section className="px-5 md:px-12 py-8 border-b border-white/10">
            <Link href="/admin/projekti" className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#00ff88] no-underline">
              &lt;- Admin projekti
            </Link>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] uppercase text-white mt-6">
              Novi projekt
            </h1>
          </section>
          <ProjectForm />
        </main>
      </AdminAuthGate>
      <Footer />
    </LanguageProvider>
  )
}
