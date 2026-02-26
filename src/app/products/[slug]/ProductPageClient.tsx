'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { ShoppingBag, Leaf, Recycle, Award, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openSection, setOpenSection] = useState<string | null>('description')
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${product.name} added to your ritual`)
  }

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.imageUrl]

  const sections = [
    {
      key: 'description',
      title: 'The Ritual',
      content: product.description,
      note: null,
    },
    {
      key: 'ingredients',
      title: "What's Inside",
      content: product.ingredients,
      note: 'We list every ingredient. No hidden fillers. No mystery actives.',
    },
    {
      key: 'sustainability',
      title: 'Our Commitment',
      content: product.sustainabilityInfo,
      note: null,
    },
  ]

  return (
    <div className="bg-warm-white pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <Link
          href={`/collections/${product.category}`}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {product.category.replace('-', ' ')}
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="relative aspect-square overflow-hidden bg-cream mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isBestseller && (
                <div className="absolute top-6 left-6">
                  <span className="bg-burgundy text-cream text-xs px-4 py-2 tracking-widest uppercase">Bestseller</span>
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-6 right-6">
                  <span className="bg-forest-green text-cream text-xs px-4 py-2 tracking-widest uppercase">New</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === i ? 'border-forest-green' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="section-subtitle mb-3 capitalize">
              {product.subcategory?.replace(/-/g, ' ') || product.category.replace(/-/g, ' ')}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-forest-green leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-text-medium font-light leading-relaxed mb-6 text-base">
              {product.shortDescription}
            </p>
            <p className="font-serif text-3xl font-light text-forest-green mb-8">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-cream px-4 py-2">
                <Leaf size={14} className="text-forest-green" />
                <span className="text-xs tracking-wide text-forest-green">Natural Origin</span>
              </div>
              <div className="flex items-center gap-2 bg-cream px-4 py-2">
                <Recycle size={14} className="text-forest-green" />
                <span className="text-xs tracking-wide text-forest-green">Recyclable Pack</span>
              </div>
              <div className="flex items-center gap-2 bg-cream px-4 py-2">
                <Award size={14} className="text-forest-green" />
                <span className="text-xs tracking-wide text-forest-green">Cruelty Free</span>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-cream">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-text-medium hover:text-forest-green transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-sm border-x border-cream min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-text-medium hover:text-forest-green transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-3"
              >
                <ShoppingBag size={16} />
                Add to Ritual
              </button>
            </div>

            <p className="text-xs text-text-medium mb-8">
              Free shipping on orders over ₹2,000 · Delivered in 3–5 business days across India
            </p>

            {/* Accordion */}
            <div className="border-t border-cream">
              {sections.map(section => (
                <div key={section.key} className="border-b border-cream">
                  <button
                    onClick={() => toggle(section.key)}
                    className="flex items-center justify-between w-full py-5 text-left"
                  >
                    <span className="text-xs tracking-widest uppercase font-light text-forest-green">
                      {section.title}
                    </span>
                    {openSection === section.key
                      ? <ChevronUp size={16} className="text-text-medium flex-shrink-0" />
                      : <ChevronDown size={16} className="text-text-medium flex-shrink-0" />
                    }
                  </button>
                  {openSection === section.key && (
                    <div className="pb-6">
                      <p className="text-text-medium font-light leading-relaxed text-sm">{section.content}</p>
                      {section.note && (
                        <p className="text-gold text-xs mt-3 italic">{section.note}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
