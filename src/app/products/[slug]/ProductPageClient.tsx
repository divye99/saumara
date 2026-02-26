'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { ShoppingBag, Heart, ChevronDown, ChevronRight, Leaf, Recycle, Award, Wind, Droplets } from 'lucide-react'
import toast from 'react-hot-toast'

const categoryLabel: Record<string, string> = {
  'bath-body': 'Bath & Body',
  'skincare': 'Skincare',
  'home-fragrance': 'Home Fragrance',
}

const usps = [
  { icon: Leaf, label: '80%+ Natural' },
  { icon: Recycle, label: 'Recyclable Pack' },
  { icon: Award, label: 'Cruelty Free' },
  { icon: Wind, label: 'Vegan' },
  { icon: Droplets, label: 'No Parabens' },
]

export default function ProductPageClient({
  product,
  relatedProducts = [],
}: {
  product: Product
  relatedProducts?: Product[]
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openSection, setOpenSection] = useState<string | null>('description')
  const [wishlisted, setWishlisted] = useState(false)
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

  // Pull first ingredient phrase for "Key ingredient" line (Rituals-style)
  const keyIngredient = product.ingredients
    ? product.ingredients.split('\n')[0]?.split(',')[0]?.split('.')[0]?.trim() || ''
    : ''

  const sections: Array<{ key: string; title: string; content: string; note?: string }> = [
    {
      key: 'description',
      title: 'The Ritual',
      content: product.description,
    },
    {
      key: 'howto',
      title: 'How To Use',
      content: `Apply a generous amount to damp skin. Massage in circular motions to work into a rich lather. Rinse thoroughly with warm water. For best results, use daily as part of your morning or evening ritual. Follow with a matching body lotion to seal in moisture and fragrance.`,
    },
    {
      key: 'ingredients',
      title: "What's Inside",
      content: product.ingredients,
      note: 'We name every ingredient. No hidden fillers. No mystery actives.',
    },
    {
      key: 'sustainability',
      title: 'Our Commitment',
      content: product.sustainabilityInfo,
    },
  ]

  return (
    <div className="bg-warm-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-text-medium flex-wrap">
          <Link href="/" className="hover:text-forest-green transition-colors">Home</Link>
          <ChevronRight size={10} className="text-text-medium/40 flex-shrink-0" />
          <Link href={`/collections/${product.category}`} className="hover:text-forest-green transition-colors">
            {categoryLabel[product.category] || product.category}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight size={10} className="text-text-medium/40 flex-shrink-0" />
              <span className="text-text-medium/60 capitalize">{product.subcategory.replace(/-/g, ' ')}</span>
            </>
          )}
          <ChevronRight size={10} className="text-text-medium/40 flex-shrink-0" />
          <span className="text-forest-green font-light truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      {/* ── Main grid ── */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

          {/* ──── LEFT: Image gallery ──── */}
          <div className="lg:w-[58%] xl:w-[60%] flex-shrink-0">
            {/* desktop: thumbnails on LEFT, main image on RIGHT — Rituals-style flex-row-reverse */}
            <div className="flex flex-row-reverse gap-3">

              {/* Main image */}
              <div className="flex-1">
                <div className="relative aspect-square bg-cream overflow-hidden">
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  {product.isBestseller && (
                    <div className="absolute top-5 left-5 z-10">
                      <span className="bg-white text-forest-green text-[10px] px-3 py-1.5 tracking-[0.15em] uppercase font-light shadow-sm">
                        Bestseller
                      </span>
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-5 right-5 z-10">
                      <span className="bg-forest-green text-cream text-[10px] px-3 py-1.5 tracking-[0.15em] uppercase font-light">
                        New
                      </span>
                    </div>
                  )}
                </div>
                {/* Mobile-only: thumbnails below the image */}
                {images.length > 1 && (
                  <div className="flex lg:hidden gap-2 mt-3">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-16 h-16 flex-shrink-0 overflow-hidden border transition-all duration-200 ${
                          selectedImage === i ? 'border-forest-green' : 'border-transparent opacity-50 hover:opacity-80'
                        }`}
                      >
                        <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop vertical thumbnail strip on the LEFT */}
              {images.length > 1 && (
                <div className="hidden lg:flex flex-col gap-2 w-[70px] flex-shrink-0">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-[70px] h-[70px] overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                        selectedImage === i
                          ? 'border-forest-green opacity-100'
                          : 'border-transparent opacity-40 hover:opacity-70'
                      }`}
                    >
                      <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="70px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ──── RIGHT: Product info (sticky panel) ──── */}
          <div className="lg:w-[42%] xl:w-[40%] lg:sticky lg:top-24 lg:self-start flex flex-col">

            {/* Sub-collection label — gold, tiny caps */}
            <p className="text-[11px] tracking-[0.22em] uppercase font-light text-gold mb-2">
              {product.subcategory
                ? product.subcategory.replace(/-/g, ' ')
                : categoryLabel[product.category] || product.category}
            </p>

            {/* Product name — large serif */}
            <h1 className="font-serif text-[2rem] md:text-[2.5rem] font-light text-forest-green leading-[1.15] mb-3">
              {product.name}
            </h1>

            {/* Size descriptor — Rituals always shows this */}
            <p className="text-[12px] text-text-medium font-light tracking-wide mb-5 pb-5 border-b border-cream">
              {product.category === 'home-fragrance' ? '180 ml' : '200 ml'}
            </p>

            {/* Key ingredient inline — Rituals-signature */}
            {keyIngredient && (
              <div className="flex items-start gap-2 mb-5">
                <span className="text-[11px] tracking-[0.12em] uppercase text-text-dark font-medium whitespace-nowrap mt-0.5">
                  Key ingredient:
                </span>
                <span className="text-[13px] text-text-medium font-light italic leading-snug">{keyIngredient}</span>
              </div>
            )}

            {/* Short description */}
            <p className="text-[13px] text-text-medium font-light leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-[1.8rem] font-light text-forest-green">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-text-medium/70 font-light">Incl. of all taxes</span>
            </div>

            {/* Qty row + Add to Bag + Wishlist */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] tracking-widest uppercase text-text-medium font-light">Qty</span>
                <div className="flex items-center border border-[#d4d0cb]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-11 flex items-center justify-center text-text-medium hover:text-forest-green transition-colors text-xl font-light"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 h-11 flex items-center justify-center text-[13px] border-x border-[#d4d0cb]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-11 flex items-center justify-center text-text-medium hover:text-forest-green transition-colors text-xl font-light"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-forest-green text-cream flex items-center justify-center gap-2.5 py-4 text-[11px] tracking-[0.22em] uppercase font-light hover:bg-medium-green transition-colors duration-300 active:scale-[0.98]"
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Add to Bag
                </button>
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`w-[50px] flex items-center justify-center border transition-all duration-200 ${
                    wishlisted ? 'border-burgundy bg-burgundy/5' : 'border-[#d4d0cb] hover:border-forest-green'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={17}
                    strokeWidth={1.5}
                    className={wishlisted ? 'fill-burgundy text-burgundy' : 'text-text-medium'}
                  />
                </button>
              </div>
            </div>

            {/* Delivery strip */}
            <div className="flex items-center gap-2.5 py-3.5 border-y border-cream mb-7">
              {/* simple truck SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest-green flex-shrink-0">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <p className="text-[11px] text-text-medium font-light leading-snug">
                Free delivery on orders over{' '}
                <span className="text-forest-green font-medium">₹2,000</span>
                {' · '}Delivered in 3–5 business days across India
              </p>
            </div>

            {/* USP icon strip */}
            <div className="flex items-start justify-between gap-1 mb-8 pb-7 border-b border-cream">
              {usps.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 min-w-[48px]">
                  <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center">
                    <Icon size={14} className="text-forest-green" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] tracking-[0.06em] uppercase text-text-medium font-light text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-cream">
              {sections.map(section => (
                <div key={section.key} className="border-b border-cream">
                  <button
                    onClick={() => toggle(section.key)}
                    className="flex items-center justify-between w-full py-[17px] text-left group"
                  >
                    <span className="text-[11px] tracking-[0.18em] uppercase font-light text-forest-green group-hover:text-medium-green transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className={`text-text-medium/60 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openSection === section.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openSection === section.key ? 'max-h-[800px] pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-[13px] text-text-medium font-light leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                    {section.note && (
                      <p className="text-gold text-[11px] mt-3 italic tracking-wide">{section.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Complete Your Ritual ── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-cream py-20 bg-[#F8F5F0]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-light mb-3">
                You May Also Love
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-forest-green">
                Complete Your Ritual
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map(p => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-square bg-cream overflow-hidden mb-4">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {p.isBestseller && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-white text-forest-green text-[9px] px-2 py-1 tracking-widest uppercase">
                          Bestseller
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gold font-light mb-1.5">
                    {p.subcategory?.replace(/-/g, ' ') || categoryLabel[p.category]}
                  </p>
                  <h3 className="font-serif text-[1rem] font-light text-forest-green leading-snug mb-2 group-hover:text-medium-green transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[13px] text-text-medium font-light">
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand strip */}
      <div className="py-7 bg-forest-green text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-cream/50 font-light">
          Crafted with intention · Delivered across India · 100% cruelty free & vegan
        </p>
      </div>

    </div>
  )
}
