'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} added to your ritual`)
  }

  return (
    <Link href={`/products/${product.slug}`} className="product-card block">
      <div className="relative overflow-hidden bg-cream aspect-[3/4]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-forest-green text-cream text-xs px-3 py-1 tracking-widest uppercase">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-burgundy text-cream text-xs px-3 py-1 tracking-widest uppercase">
              Bestseller
            </span>
          )}
        </div>
        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 bg-forest-green/90 text-cream py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
          <ShoppingBag size={14} />
          <button
            onClick={handleAddToCart}
            className="text-xs tracking-widest uppercase font-light w-full h-full"
          >
            Add to Ritual
          </button>
        </div>
      </div>
      <div className="pt-4 pb-2">
        <p className="text-xs text-gold tracking-widest uppercase mb-1 capitalize">
          {product.subcategory?.replace('-', ' ') || product.category.replace('-', ' ')}
        </p>
        <h3 className="font-serif text-base font-light text-text-dark leading-snug mb-2">
          {product.name}
        </h3>
        <p className="text-sm font-light text-text-medium">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  )
}
