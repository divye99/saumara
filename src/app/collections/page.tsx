import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import { Suspense } from 'react'
import ProductGrid from './[category]/ProductGrid'
import CollectionFilters from './CollectionFilters'
import { Metadata } from 'next'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'The Collection | Saumara',
  description: 'Shop the full Saumara collection — luxury bath & body, skincare and home fragrance crafted from the world\'s rarest natural ingredients. Free shipping over ₹999.',
}

interface PageProps {
  searchParams: { category?: string; sub?: string; sort?: string }
}

async function getProducts(category?: string, sub?: string, sort?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .neq('hidden', true)

  if (sub) {
    query = query.eq('subcategory', sub)
  } else if (category) {
    query = query.eq('category', category)
  }

  if (sort === 'price-asc') query = query.order('price', { ascending: true })
  else if (sort === 'price-desc') query = query.order('price', { ascending: false })
  else if (sort === 'bestsellers') query = query.order('isBestseller', { ascending: false }).order('createdAt', { ascending: true })
  else query = query.order('createdAt', { ascending: true })

  const { data, error } = await query.range(0, 499)
  if (error) return []
  return (data || []) as Product[]
}

export default async function CollectionsPage({ searchParams }: PageProps) {
  const products = await getProducts(searchParams.category, searchParams.sub, searchParams.sort)

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero banner */}
      <div className="bg-forest-green pt-32 pb-16 px-6 text-center">
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold font-light mb-4">
          Saumara
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-cream leading-none mb-4">
          The Collection
        </h1>
        <p className="text-cream/60 font-light text-sm max-w-md mx-auto">
          Every product. Every ritual. Crafted from the world&apos;s rarest botanicals.
        </p>
      </div>

      {/* Products */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-16">
        <Suspense>
          <CollectionFilters total={products.length} />
        </Suspense>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-forest-green">No products found</p>
            <p className="text-text-medium font-light text-sm mt-3">Try a different filter</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  )
}
