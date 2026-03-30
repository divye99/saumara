'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const categories = [
  {
    value: 'bath-body',
    label: 'Bath & Body',
    sub: [
      { value: 'body-wash', label: 'Body Wash' },
      { value: 'body-scrub', label: 'Body Scrub' },
      { value: 'body-lotion', label: 'Body Lotion' },
      { value: 'bath-salts', label: 'Bath Salts' },
      { value: 'body-oil', label: 'Body Oil' },
    ],
  },
  {
    value: 'skincare',
    label: 'Skincare',
    sub: [
      { value: 'face-serum', label: 'Face Serum' },
      { value: 'moisturiser', label: 'Moisturiser' },
      { value: 'face-mask', label: 'Face Mask' },
      { value: 'eye-cream', label: 'Eye Cream' },
      { value: 'face-oil', label: 'Face Oil' },
    ],
  },
  {
    value: 'home-fragrance',
    label: 'Home Fragrance',
    sub: [
      { value: 'candles', label: 'Candles' },
      { value: 'reed-diffuser', label: 'Reed Diffuser' },
      { value: 'room-spray', label: 'Room Spray' },
      { value: 'incense', label: 'Incense' },
    ],
  },
]

export default function CollectionFilters({ total }: { total: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const activeSub = searchParams.get('sub') || ''

  const activeSort = searchParams.get('sort') || 'featured'

  const setFilter = useCallback((category: string, sub?: string) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (sub) params.set('sub', sub)
    if (activeSort !== 'featured') params.set('sort', activeSort)
    router.push(`/collections?${params.toString()}`)
  }, [router, activeSort])

  const clearFilters = () => router.push('/collections')

  const setSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (sort === 'featured') params.delete('sort')
    else params.set('sort', sort)
    router.push(`/collections?${params.toString()}`)
  }

  const activecat = categories.find(c => c.value === activeCategory)

  return (
    <div className="mb-12">
      {/* Category tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={clearFilters}
          className={`px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-light border transition-all duration-300 ${
            !activeCategory
              ? 'bg-forest-green text-cream border-forest-green'
              : 'bg-transparent text-text-medium border-[#d4d0cb] hover:border-forest-green hover:text-forest-green'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-light border transition-all duration-300 ${
              activeCategory === cat.value
                ? 'bg-forest-green text-cream border-forest-green'
                : 'bg-transparent text-text-medium border-[#d4d0cb] hover:border-forest-green hover:text-forest-green'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subcategory pills */}
      {activecat && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activecat.sub.map(sub => (
            <button
              key={sub.value}
              onClick={() => setFilter(activecat.value, activeSub === sub.value ? undefined : sub.value)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-light border transition-all duration-300 ${
                activeSub === sub.value
                  ? 'bg-gold/20 text-forest-green border-gold'
                  : 'bg-transparent text-text-medium/70 border-[#d4d0cb]/60 hover:border-gold/50 hover:text-forest-green'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* Count + Sort row */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[11px] text-text-medium/60 font-light tracking-wide">
          {total} {total === 1 ? 'product' : 'products'}
          {activeCategory && ` in ${activecat?.label}`}
          {activeSub && ` · ${activecat?.sub.find(s => s.value === activeSub)?.label}`}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-medium font-light">Sort:</span>
          <select
            className="text-[11px] border border-cream px-3 py-2 bg-transparent text-text-medium focus:outline-none focus:border-forest-green"
            value={activeSort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="bestsellers">Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
