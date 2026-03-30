import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Toaster } from 'react-hot-toast'
import MetaPixel from '@/components/MetaPixel'

const OG_IMAGE = 'https://res.cloudinary.com/dcgevdwcg/image/upload/v1772541807/Hero_Banner_Prompt_lmygmn.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.saumara.com'),
  title: {
    default: 'Saumara | Premium Bath, Body & Home Fragrance — India',
    template: '%s | Saumara',
  },
  description: 'Saumara is India\'s premium ritual beauty brand. Luxury bath & body, skincare and home fragrance crafted from the world\'s rarest natural ingredients. Free shipping over ₹999.',
  keywords: [
    'saumara', 'luxury skincare india', 'premium bath body india', 'natural home fragrance india',
    'sustainable beauty india', 'luxury candles india', 'organic skincare india',
    'premium body wash india', 'ritual beauty brand', 'ayurvedic skincare india',
    'indian luxury beauty', 'saumara.com', 'best body lotion india', 'luxury bath salts india',
    'reed diffuser india', 'premium face serum india', 'natural body oil india',
  ],
  authors: [{ name: 'Saumara', url: 'https://www.saumara.com' }],
  creator: 'Saumara',
  publisher: 'Saumara',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.saumara.com',
    siteName: 'Saumara',
    title: 'Saumara | Premium Bath, Body & Home Fragrance — India',
    description: 'India\'s premium ritual beauty brand. Luxury bath & body, skincare and home fragrance crafted from the world\'s rarest natural ingredients. Free shipping over ₹999.',
    images: [{ url: OG_IMAGE, width: 1920, height: 1080, alt: 'Saumara — Rituals for the Mindful Self' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saumara | Premium Bath, Body & Home Fragrance — India',
    description: 'India\'s premium ritual beauty brand. Luxury skincare, bath & body, and home fragrance. Free shipping over ₹999.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: 'https://www.saumara.com',
  },
  verification: {
    google: '', // Add your Google Search Console verification code here
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Saumara',
  url: 'https://www.saumara.com',
  logo: 'https://www.saumara.com/icon',
  description: 'India\'s premium ritual beauty brand specialising in luxury bath & body, skincare and home fragrance made from the world\'s rarest natural ingredients.',
  email: 'hello@saumara.com',
  foundingDate: '2024',
  areaServed: 'IN',
  sameAs: [
    'https://www.instagram.com/saumara',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@saumara.com',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'IN',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Saumara',
  url: 'https://www.saumara.com',
  description: 'India\'s premium ritual beauty brand.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.saumara.com/collections/bath-body?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <MetaPixel />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1C3A2E',
                color: '#F5F0E8',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.05em',
                borderRadius: '0',
                padding: '12px 20px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
