import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getPublishedProjectBySlug } from '@/lib/projects'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getPublishedProjectBySlug(slug)

  if (!project) return {}

  return {
    title: `${project.title_hr} - ARTBEATZONE`,
    description: project.excerpt_hr ?? project.description_hr ?? 'ArtBeatZone projekt.',
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getPublishedProjectBySlug(slug)

  if (!project) notFound()

  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen pt-[60px] bg-black">
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] border-b border-white/10">
          <div className="px-5 md:px-12 py-12 md:py-20 border-b md:border-b-0 md:border-r border-white/10">
            <Link
              href="/projekti"
              className="inline-block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#00ff88] no-underline border border-[#00ff88]/50 px-5 py-2 transition-colors duration-150 hover:border-[#00ffff] hover:text-[#00ffff]"
            >
              &lt;- Svi projekti
            </Link>

            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#00ffff] mt-10 mb-6">
              {project.category_hr}
            </p>
            <h1 className="text-[clamp(2.2rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] uppercase text-white">
              {project.title_hr}
            </h1>

            <dl className="grid grid-cols-1 gap-5 mt-10">
              {project.client && (
                <div>
                  <dt className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40">Klijent</dt>
                  <dd className="text-[0.9rem] text-[#00ff88] mt-1">{project.client}</dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40">Godina</dt>
                  <dd className="text-[0.9rem] text-[#00ffff] mt-1">{project.year}</dd>
                </div>
              )}
              {project.show_date && (
                <div>
                  <dt className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40">Objavljeno</dt>
                  <dd className="text-[0.9rem] text-[#ff00ff] mt-1">
                    {new Intl.DateTimeFormat('hr-HR').format(new Date(project.created_at))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="px-5 md:px-12 py-12 md:py-20">
            {project.cover_image_url && (
              <div className="aspect-[16/10] bg-[#050505] border border-white/10 overflow-hidden mb-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.cover_image_url} alt={project.title_hr} className="h-full w-full object-contain" />
              </div>
            )}

            {project.excerpt_hr && (
              <p className="text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.55] font-medium text-white mb-8">
                {project.excerpt_hr}
              </p>
            )}

            {project.description_hr && (
              <div className="max-w-[720px] whitespace-pre-line text-[0.98rem] text-white/60 leading-[1.9]">
                {project.description_hr}
              </div>
            )}

            {project.services_hr.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {project.services_hr.map((service) => (
                  <span
                    key={service}
                    className="text-[0.6rem] font-bold tracking-[0.1em] uppercase border-[1.5px] border-[#00ff88]/60 px-3 py-1 text-[#00ff88]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {project.gallery_image_urls.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
            {project.gallery_image_urls.map((imageUrl, index) => (
              <div key={imageUrl} className={`aspect-[16/10] bg-[#050505] overflow-hidden border-white/10 ${index % 2 === 0 ? 'md:border-r' : ''} border-b`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={`${project.title_hr} ${index + 1}`} className="h-full w-full object-contain" />
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </LanguageProvider>
  )
}
