import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/order-confirmation/'],
      },
    ],
    sitemap: 'https://www.saumara.com/sitemap.xml',
    host: 'https://www.saumara.com',
  }
}
