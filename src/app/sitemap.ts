import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE = 'https://www.saumara.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all product slugs from Supabase
  const { data: products } = await supabase
    .from('products')
    .select('slug, createdAt')

  const productUrls: MetadataRoute.Sitemap = (products || []).map(p => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(p.createdAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: BASE,                                   lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/collections/bath-body`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/collections/skincare`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/collections/home-fragrance`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/shipping`,                     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,                      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,                        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    ...productUrls,
  ]
}
