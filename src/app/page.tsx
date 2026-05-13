import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollSequence from '@/components/sections/ScrollSequence'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CtaBanner from '@/components/sections/CtaBanner'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <ScrollSequence />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <CtaBanner />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
