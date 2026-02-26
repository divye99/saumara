export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import SortSelect from './SortSelect'

interface PageProps {
  params: { category: string }
  searchParams: { sort?: string; sub?: string }
}

const categoryConfig: Record<string, { title: string; description: string; hero: string }> = {
  'bath-body': {
    title: 'Bath & Body',
    description: 'Transform every shower and bath into a ceremony of self-care. From exfoliating scrubs to nourishing body oils — each product crafted from the world\'s most prized botanicals.',
    hero: 'https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=1400&q=80',
  },
  'skincare': {
    title: 'Skincare',
    description: 'Full ingredient transparency. Clinically proven actives. Natural-origin formulas that deliver visible results while honouring the earth. Skincare you can trust, completely.',
    hero: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1400&q=80',
  },
  'home-fragrance': {
    title: 'Home Fragrance',
    description: 'Your home is your most personal sanctuary. Our candles, diffusers and incense transform every room into a place of intention — fragrant, calm, and entirely yours.',
    hero: 'https://images.unsplash.com/photo-1603006905003-be319992b18b?w=1400&q=80',
  },
}

async function getProducts(category: string, sort?: string, sub?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .eq('category', category)

  if (sub) query = query.eq('subcategory', sub)

  if (sort === 'price-asc') query = query.order('price', { ascending: true })
  else if (sort === 'price-desc') query = query.order('price', { ascending: false })
  else query = query.order('createdAt', { ascending: true })

  const { data, error } = await query
  if (error) {
    console.error('Supabase error:', error)
    return []
  }
  return (data || []) as Product[]
}

async function getSubcategories(category: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('subcategory')
    .eq('category', category)
    .not('subcategory', 'is', null)

  if (error || !data) return []

  const unique = [...new Set(data.map((r: { subcategory: string | null }) => r.subcategory).filter((s): s is string => s !== null))]
  return unique
}


export default async function CollectionPage({ params, searchParams }: PageProps) {
  const config = categoryConfig[params.category]
  if (!config) notFound()

  const [products, subcategories] = await Promise.all([
    getProducts(params.category, searchParams.sort, searchParams.sub),
    getSubcategories(params.category),
  ])

  return (
    <div className="bg-warm-white">
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-green/80 via-forest-green/40 to-transparent" />
        <div className="relative z-10 px-6 lg:px-12 pb-12 max-w-7xl w-full mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-light text-cream mb-3">
            {config.title}
          </h1>
          <p className="text-cream/70 font-light max-w-xl text-sm leading-relaxed">
            {config.description}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-cream sticky top-20 bg-warm-white/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            <a
              href={`/collections/${params.category}`}
              className={`text-xs px-4 py-2 tracking-wide uppercase border transition-colors ${
                !searchParams.sub
                  ? 'bg-forest-green text-cream border-forest-green'
                  : 'border-cream text-text-medium hover:border-forest-green'
              }`}
            >
              All
            </a>
            {subcategories.map(sub => (
              <a
                key={sub}
                href={`/collections/${params.category}?sub=${sub}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                className={`text-xs px-4 py-2 tracking-wide uppercase border transition-colors capitalize ${
                  searchParams.sub === sub
                    ? 'bg-forest-green text-cream border-forest-green'
                    : 'border-cream text-text-medium hover:border-forest-green'
                }`}
              >
                {sub.replace('-', ' ')}
              </a>
            ))}
          </div>
          <SortSelect currentSort={searchParams.sort} category={params.category} currentSub={searchParams.sub} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-xs text-text-medium mb-8 tracking-wide">
          {products.length} products
        </p>
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-forest-green">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
