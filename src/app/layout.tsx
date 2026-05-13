import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'ARTBEATZONE - Dizajn & Web',
  description:
    'Boutique agencija za graficki dizajn, izradu web aplikacija i rentanje web stranica. Zagreb.',
  openGraph: {
    title: 'ARTBEATZONE - Dizajn & Web',
    description: 'Dizajniramo. Razvijamo. Iznajmljujemo.',
    locale: 'hr_HR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className="antialiased">
      <body className="min-h-screen overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
