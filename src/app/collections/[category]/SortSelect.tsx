'use client'

interface SortSelectProps {
  currentSort?: string
  category: string
  currentSub?: string
}

export default function SortSelect({ currentSort, category, currentSub }: SortSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href)
    url.searchParams.set('sort', e.target.value)
    if (currentSub) url.searchParams.set('sub', currentSub)
    window.location.href = url.toString()
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-medium">Sort:</span>
      <select
        className="text-xs border border-cream px-3 py-2 bg-transparent text-text-medium focus:outline-none focus:border-forest-green"
        defaultValue={currentSort || 'featured'}
        onChange={handleChange}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
}
