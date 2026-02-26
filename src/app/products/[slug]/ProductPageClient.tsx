'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { ShoppingBag, Heart, ChevronDown, ChevronRight, Leaf, Recycle, Award, Wind, Droplets, ArrowRight } from 'lucide-react'
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

  // Build ingredient spotlights from the product's actual ingredient list
  // Map common ingredients to their botanical images and benefit copy
  const ingredientData: Record<string, { image: string; source: string; benefit: string }> = {
    'Cherry Blossom Extract': {
      image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc06?w=800&q=80',
      source: 'Prunus serrulata · Japan',
      benefit: 'The cherry blossom has long been revered in Japanese culture as a symbol of renewal. Rich in antioxidants and flavonoids, it protects the skin from environmental stressors while imparting a luminous, petal-soft radiance.',
    },
    'Rice Milk Protein': {
      image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80',
      source: 'Oryza sativa · Japan & India',
      benefit: 'Fermented rice water — a centuries-old Japanese beauty secret — delivers a concentrated dose of amino acids, vitamins B and E, and minerals that plump, hydrate, and visibly brighten skin over time.',
    },
    'Jojoba Oil': {
      image: 'https://images.unsplash.com/photo-1611073615830-9efadee73d65?w=800&q=80',
      source: 'Simmondsia chinensis · Rajasthan, India',
      benefit: 'Technically a liquid wax, jojoba mimics the skin\'s own sebum almost perfectly. It regulates oil production, delivers deep moisture without clogging pores, and leaves a silky, non-greasy finish.',
    },
    'White Lotus Extract': {
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
      source: 'Nelumbo nucifera · Kashmir, India',
      benefit: 'Sacred in Ayurvedic tradition, white lotus is prized for its astringent and brightening properties. It helps minimise pores, refine skin texture, and restore an even, luminous tone.',
    },
    'Sandalwood Essential Oil': {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      source: 'Santalum album · Karnataka, India',
      benefit: 'Steam-distilled from sustainably harvested heartwood, Indian sandalwood essential oil is among the world\'s most precious ingredients. Anti-inflammatory, deeply moisturising, and ineffably calming.',
    },
    'Oud Essential Oil': {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      source: 'Aquilaria agallocha · Assam, India',
      benefit: 'Formed when Aquilaria trees produce a resin in response to infection, oud is one of the rarest and most valuable ingredients in perfumery. Warm, complex, and deeply grounding.',
    },
    'Rose Hip Oil': {
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',
      source: 'Rosa canina · Himachal Pradesh, India',
      benefit: 'Cold-pressed from the seeds of wild rose hips, this oil is extraordinarily rich in essential fatty acids, vitamin C, and trans-retinoic acid — the natural precursor to retinol that visibly reduces fine lines.',
    },
    'Coconut Soy Wax Blend': {
      image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&q=80',
      source: 'Cocos nucifera & Glycine soja · Kerala, India',
      benefit: 'Our proprietary coconut-soy wax blend burns 30% longer and cleaner than paraffin, releasing fragrance more evenly and leaving no black soot. 100% renewable, biodegradable, and kind to air quality.',
    },
    'Vitamin E': {
      image: 'https://images.unsplash.com/photo-1556228720-da79c7e3e1eb?w=800&q=80',
      source: 'Tocopherol · Natural origin',
      benefit: 'A powerful fat-soluble antioxidant that shields the skin\'s lipid barrier from oxidative damage. Works synergistically with vitamin C to brighten, protect, and maintain a youthful, supple texture.',
    },
    'Glycerin': {
      image: 'https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=800&q=80',
      source: 'Plant-derived · Vegetable origin',
      benefit: 'A humectant that draws moisture from the environment directly into the skin. Plant-derived glycerin forms an invisible protective layer that keeps skin soft, plump, and hydrated for hours.',
    },
    'Hyaluronic Acid': {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      source: 'Biotechnological origin · Vegan',
      benefit: 'Each molecule holds up to 1,000 times its weight in water. A single application visibly plumps fine lines, restores skin volume, and leaves the complexion dewy and supple — without a single drop of oil.',
    },
    'Niacinamide': {
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
      source: 'Vitamin B3 · Natural origin',
      benefit: 'One of skincare\'s most studied actives. Niacinamide visibly reduces pores, fades pigmentation, strengthens the barrier, and regulates sebum production — making it universally beneficial for all skin types.',
    },
  }

  // Parse ingredients and find spotlight data for the top 2–3
  const parsedIngredients = product.ingredients
    ? product.ingredients.split(',').map(s => s.trim().replace(/\(.*?\)/g, '').trim())
    : []

  const keyIngredients = parsedIngredients
    .filter(name => ingredientData[name])
    .slice(0, 2)
    .map(name => ({ name, ...ingredientData[name] }))

  // Category hero images for editorial sections
  const categoryHeroImages: Record<string, string[]> = {
    'bath-body': [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=90',
      'https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=1400&q=90',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1400&q=90',
    ],
    'skincare': [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1400&q=90',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1400&q=90',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=90',
    ],
    'home-fragrance': [
      'https://images.unsplash.com/photo-1603006905003-be319992b18b?w=1400&q=90',
      'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=1400&q=90',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90',
    ],
  }
  const heroImgs = categoryHeroImages[product.category] || categoryHeroImages['bath-body']

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

      {/* ═══════════════════════════════════════════════════════
          BELOW THE FOLD — Rich editorial sections
      ═══════════════════════════════════════════════════════ */}

      {/* ── 1. Full-bleed Hero Editorial ── */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src={heroImgs[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-green/80 via-forest-green/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1320px] mx-auto px-8 lg:px-16 w-full">
            <div className="max-w-lg">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold font-light mb-6">
                The story behind
              </p>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-cream leading-[1.1] mb-6">
                {product.name.split(' ').slice(0, 3).join(' ')}
                <br />
                <em className="italic text-cream/80">
                  {product.name.split(' ').slice(3).join(' ') || 'Ritual'}
                </em>
              </h2>
              <p className="text-cream/80 font-light text-[15px] leading-relaxed max-w-md">
                {product.description.substring(0, 180).trim()}…
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. How To Use — numbered steps ── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-light mb-3">Your ritual</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-forest-green">How To Use</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-[#ddd8ce]">
            {[
              {
                step: '01',
                title: 'Apply',
                text: product.category === 'home-fragrance'
                  ? 'Remove the stopper and insert the reeds. Allow 30 minutes for the fragrance to travel up the reeds before the first use.'
                  : product.category === 'skincare'
                  ? 'Apply a few drops or a pea-sized amount to clean, dry skin. Use morning and evening for best results.'
                  : 'Squeeze a generous amount onto damp skin or a loofah. The formula activates with water.',
                icon: '①',
              },
              {
                step: '02',
                title: product.category === 'home-fragrance' ? 'Diffuse' : 'Massage',
                text: product.category === 'home-fragrance'
                  ? 'Turn the reeds every few days to refresh the scent. Keep away from direct sunlight and drafts for longer lasting fragrance.'
                  : product.category === 'skincare'
                  ? 'Massage gently in upward, circular motions until fully absorbed. Pat — do not rub — around the eye area.'
                  : 'Work into a rich, creamy lather using circular motions. Spend a full minute in the ritual — let the fragrance envelop you.',
                icon: '②',
              },
              {
                step: '03',
                title: product.category === 'home-fragrance' ? 'Layer' : 'Rinse & Seal',
                text: product.category === 'home-fragrance'
                  ? 'Pair with our matching body fragrance and scented candle to create a complete sensory atmosphere in your space.'
                  : product.category === 'skincare'
                  ? 'Layer with your SPF in the morning, or follow with our facial oil in the evening to seal in the active ingredients.'
                  : 'Rinse thoroughly with warm water. Pat skin dry and immediately follow with the matching body lotion — the fragrance notes amplify together.',
                icon: '③',
              },
            ].map((s) => (
              <div key={s.step} className="bg-cream p-10 lg:p-14 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-6">
                  <span className="font-serif text-gold text-2xl font-light">{s.step}</span>
                </div>
                <h3 className="font-serif text-xl font-light text-forest-green mb-4">{s.title}</h3>
                <p className="text-[13px] text-text-medium font-light leading-relaxed max-w-[260px]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Ingredient Spotlights ── */}
      {keyIngredients.length > 0 && (
        <section className="py-20 lg:py-28 bg-warm-white">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-light mb-3">Pure. Proven. Named.</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-forest-green">The Ingredients</h2>
              <p className="text-[13px] text-text-medium font-light mt-4 max-w-lg mx-auto leading-relaxed">
                We source every ingredient with intention. Below is what makes this formula exceptional — and why.
              </p>
            </div>
            <div className="space-y-0">
              {keyIngredients.map((ing, i) => (
                <div
                  key={ing.name}
                  className={`grid grid-cols-1 md:grid-cols-2 min-h-[420px] ${i % 2 === 1 ? 'md:flex md:flex-row-reverse' : ''}`}
                >
                  {/* Image side */}
                  <div className="relative min-h-[300px] md:min-h-[420px] overflow-hidden bg-cream">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={`absolute inset-0 ${i % 2 === 1 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-forest-green/20 to-transparent`} />
                  </div>
                  {/* Text side */}
                  <div className={`bg-[#F2EDE5] flex flex-col justify-center px-10 lg:px-16 py-14 ${i % 2 === 1 ? 'md:pl-16 md:pr-10' : ''}`}>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-light mb-4">
                      Key ingredient
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-forest-green leading-tight mb-5">
                      {ing.name}
                    </h3>
                    <p className="text-[13px] text-text-medium/70 font-light italic mb-6 tracking-wide">
                      {ing.source}
                    </p>
                    <p className="text-[14px] text-text-medium font-light leading-relaxed max-w-md">
                      {ing.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Full-bleed Dark Sustainability Section ── */}
      <section className="relative overflow-hidden bg-forest-green py-24 lg:py-32">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A96E 1px, transparent 1px), radial-gradient(circle at 80% 20%, #C9A96E 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-gold font-light mb-6">
                Our responsibility
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-[1.1] mb-8">
                Beautiful
                <br />
                <em className="italic text-cream/70">by design</em>
              </h2>
              <p className="text-cream/70 font-light leading-relaxed text-[14px] mb-8 max-w-md">
                {product.sustainabilityInfo}
              </p>
              <Link
                href="/about#sustainability"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-gold font-light border-b border-gold/40 pb-1 hover:border-gold transition-colors"
              >
                Our sustainability promise <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '80%+', label: 'Natural origin ingredients' },
                { value: '100%', label: 'Cruelty free & vegan' },
                { value: '0', label: 'Synthetic preservatives' },
                { value: '100%', label: 'Recyclable packaging' },
              ].map(stat => (
                <div key={stat.label} className="border border-cream/10 p-8 hover:border-gold/30 transition-colors duration-500">
                  <p className="font-serif text-4xl font-light text-gold mb-2">{stat.value}</p>
                  <p className="text-cream/50 text-[11px] tracking-wide uppercase font-light leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Second editorial full-bleed image ── */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={heroImgs[1] || heroImgs[0]}
          alt={`${product.name} — ritual`}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-green/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-16">
          <div className="max-w-[1320px] mx-auto">
            <p className="font-serif text-2xl md:text-3xl font-light text-cream/90 max-w-xl leading-relaxed">
              &ldquo;{product.shortDescription}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Complete Your Ritual — Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#F8F5F0]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-light mb-3">
                  Complete the ritual
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-forest-green">
                  You May Also Love
                </h2>
              </div>
              <Link
                href={`/collections/${product.category}`}
                className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors border-b border-current pb-0.5"
              >
                View all <ArrowRight size={11} />
              </Link>
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
                        <span className="bg-white text-forest-green text-[9px] px-2 py-1 tracking-widest uppercase shadow-sm">
                          Bestseller
                        </span>
                      </div>
                    )}
                    {/* Quick add overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-forest-green/90 text-cream text-[10px] tracking-[0.2em] uppercase py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-light">
                      View Product
                    </div>
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

      {/* ── 7. Brand strip ── */}
      <div className="py-8 bg-forest-green text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-cream/50 font-light">
          Crafted with intention · Delivered across India · 100% cruelty free & vegan
        </p>
      </div>

    </div>
  )
}
