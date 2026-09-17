import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mag-core-v08.vercel.app'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/lab`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/drop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/multiverse`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]
}
