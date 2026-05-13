import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ARTBEATZONE — Dizajn & Web',
  description:
    'Boutique agencija za grafički dizajn, izradu web aplikacija i rentanje web stranica. Zagreb.',
  openGraph: {
    title: 'ARTBEATZONE — Dizajn & Web',
    description: 'Dizajniramo. Razvijamo. Iznajmljujemo.',
    locale: 'hr_HR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
