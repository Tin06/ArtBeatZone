import type { MetadataRoute } from 'next'
import { getPublishedProjects } from '@/lib/projects'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects()

  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projekti`,
      lastModified: siteConfig.lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projekti/${project.slug}`,
      lastModified: project.updated_at ?? project.created_at,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
