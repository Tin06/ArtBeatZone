import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CtaBanner from '@/components/sections/CtaBanner'
import ContactSection from '@/components/sections/ContactSection'
import { siteConfig } from '@/lib/site'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  areaServed: {
    '@type': 'Country',
    name: 'Croatia',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zagreb',
    addressCountry: 'HR',
  },
  knowsAbout: [
    'Grafički dizajn',
    'Izrada web aplikacija',
    'Najam web stranica',
    'Branding',
  ],
  serviceType: [
    'Graphic Design',
    'Web Development',
    'Website Rental',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LanguageProvider>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <CtaBanner />
          <ContactSection />
        </main>
        <Footer />
      </LanguageProvider>
    </>
  )
}
