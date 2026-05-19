import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'ARTBEATZONE - Dizajn & Web',
  description: 'Mali studio iz Zagreba za grafički dizajn, izradu web aplikacija i najam web stranica.',
  openGraph: {
    title: 'ARTBEATZONE - Dizajn & Web',
    description: 'Dizajniramo. Razvijamo. Realiziramo.',
    locale: 'hr_HR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
