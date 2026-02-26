import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

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
    .order('isBestseller', { ascending: false })
    .limit(4)

  if (error || !data) return []
  return data as Product[]
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />
}
