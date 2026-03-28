import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { Product } from '@/types'
import { Metadata } from 'next'

export const revalidate = 300

interface PageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as Product
}

async function getRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('slug', currentSlug)
    .neq('hidden', true)
    .order('isBestseller', { ascending: false })
    .limit(4)

  if (error || !data) return []
  return data as Product[]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return {}

  const title = product.name
  const desc = product.description
    ? product.description.slice(0, 155).replace(/\s+\S*$/, '') + '…'
    : `${product.name} — Premium ${(product.subcategory || '').replace(/-/g, ' ')} by Saumara India.`

  return {
    title,
    description: desc,
    keywords: [
      product.name,
      'saumara',
      `${product.subcategory?.replace(/-/g, ' ')} india`,
      'luxury beauty india',
      'premium skincare india',
      product.ingredients?.split(',')[0]?.trim() || '',
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | Saumara`,
      description: desc,
      url: `https://www.saumara.com/products/${product.slug}`,
      type: 'website',
      images: product.imageUrl
        ? [{ url: product.imageUrl, alt: product.name }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Saumara`,
      description: desc,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    alternates: {
      canonical: `https://www.saumara.com/products/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || '',
    image: [product.imageUrl, ...(product.images || [])].filter(Boolean),
    sku: product.slug,
    brand: { '@type': 'Brand', name: 'Saumara' },
    offers: {
      '@type': 'Offer',
      url: `https://www.saumara.com/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Saumara' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'INR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 6, unitCode: 'DAY' },
        },
      },
    },
    ...(product.ingredients && {
      additionalProperty: product.ingredients.split(',').slice(0, 5).map((ing: string) => ({
        '@type': 'PropertyValue',
        name: 'Ingredient',
        value: ing.trim(),
      })),
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.saumara.com' },
      {
        '@type': 'ListItem', position: 2,
        name: product.category === 'bath-body' ? 'Bath & Body' : product.category === 'skincare' ? 'Skincare' : 'Home Fragrance',
        item: `https://www.saumara.com/collections/${product.category}`,
      },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.saumara.com/products/${product.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductPageClient product={product} relatedProducts={relatedProducts} />
    </>
  )
}
