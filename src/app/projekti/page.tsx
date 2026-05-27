import Link from 'next/link'
import { LanguageProvider } from '@/lib/language'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getPublishedProjects } from '@/lib/projects'

export const metadata = {
  title: 'Projekti - ARTBEATZONE',
  description: 'Odabrani radovi studija ArtBeatZone.',
}

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen pt-[60px] bg-black">
        <section className="border-b border-white/10 px-5 md:px-12 py-12 md:py-20">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#00ff88] mb-6">
            Portfolio
          </p>
          <h1 className="text-[clamp(2.4rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em] uppercase text-white">
            Projekti
          </h1>
          <p className="text-[1rem] text-white/55 max-w-[560px] leading-[1.75] mt-8">
            Odabrani radovi, web rjesenja i vizualni identiteti objavljeni iz ArtBeatZone baze projekata.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
          {projects.length === 0 ? (
            <div className="px-5 md:px-12 py-12 md:py-20 text-white/50">
              Trenutno nema objavljenih projekata.
            </div>
          ) : (
            projects.map((project, index) => (
              <article
                key={project.id}
                className={`group border-white/10 ${index % 2 === 0 ? 'md:border-r' : ''} border-b`}
              >
                <Link href={`/projekti/${project.slug}`} className="block h-full no-underline">
                  <div className="aspect-[16/10] bg-[#050505] border-b border-white/10 overflow-hidden">
                    {project.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.cover_image_url}
                        alt={project.title_hr}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#050505] via-[#151515] to-[#00ff8830]" />
                    )}
                  </div>
                  <div className="px-5 md:px-12 py-8 md:py-10">
                    <p className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#00ff88] mb-3">
                      {project.category_hr}
                    </p>
                    <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-[-0.03em] uppercase text-white group-hover:text-[#00ff88] transition-colors duration-150">
                      {project.title_hr}
                    </h2>
                    {project.excerpt_hr && (
                      <p className="text-[0.92rem] text-white/55 leading-[1.75] mt-5 max-w-[560px]">
                        {project.excerpt_hr}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-4 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/45">
                      {project.year && <span>{project.year}</span>}
                      <span className="text-[#00ff88]">-&gt;</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
