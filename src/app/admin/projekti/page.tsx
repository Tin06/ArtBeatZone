import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminAuthGate from '@/components/admin/AdminAuthGate'
import AdminProjectsList from '@/components/admin/AdminProjectsList'

export const metadata = {
  title: 'Admin projekti - ARTBEATZONE',
}

export default function AdminProjectsPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <AdminAuthGate>
        <main className="min-h-screen bg-black">
          <AdminProjectsList />
        </main>
      </AdminAuthGate>
      <Footer />
    </LanguageProvider>
  )
}
