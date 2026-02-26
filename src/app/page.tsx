export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import { Leaf, Recycle, Award, Heart } from 'lucide-react'

async function getBestsellers(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('isBestseller', true)
      .order('createdAt', { ascending: true })
      .limit(8)

    if (error) {
      console.error('Supabase error:', error)
      return []
    }
    return (data || []) as Product[]
  } catch {
    return []
  }
}

const collections = [
  {
    title: 'Bath & Body',
    subtitle: 'The Daily Ritual',
    description: 'Transform every shower into ceremony. Body washes, scrubs, oils and butters crafted from the world\'s most prized botanicals.',
    href: '/collections/bath-body',
    image: 'https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=800&q=80',
    color: 'from-forest-green/80',
  },
  {
    title: 'Skincare',
    subtitle: 'The Science of Ritual',
    description: 'Full ingredient transparency. Clinically proven actives. Natural origin formulas that honour both your skin and the earth.',
    href: '/collections/skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    color: 'from-deep-burgundy/80',
  },
  {
    title: 'Home Fragrance',
    subtitle: 'The Sacred Space',
    description: 'Your home deserves its own ritual. Candles, diffusers and incense that make every room a sanctuary.',
    href: '/collections/home-fragrance',
    image: 'https://images.unsplash.com/photo-1603006905003-be319992b18b?w=800&q=80',
    color: 'from-text-dark/80',
  },
]

const sustainabilityStats = [
  { icon: Recycle, value: '100%', label: 'Recyclable Packaging' },
  { icon: Leaf, value: '80%+', label: 'Natural Origin Ingredients' },
  { icon: Award, value: '0', label: 'Synthetic Preservatives' },
  { icon: Heart, value: '100%', label: 'Cruelty Free & Vegan' },
]

const instagramImages = [
  'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80',
  'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b2?w=400&q=80',
  'https://images.unsplash.com/photo-1585232350386-0b3c8674f56e?w=400&q=80',
]

export default async function HomePage() {
  const bestsellers = await getBestsellers()

  return (
    <div className="bg-warm-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&q=90"
            alt="Saumara — Rituals for the Mindful Self"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-green/60 via-forest-green/40 to-forest-green/70" />
        </div>
        <div className="relative z-10 text-center text-cream px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-8 animate-fade-in">
            Premium Bath · Skincare · Home Fragrance
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-8 animate-slide-up">
            Your Ritual
            <br />
            <em className="italic">Begins Here</em>
          </h1>
          <p className="text-cream/80 text-base md:text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed">
            Crafted from the world&apos;s rarest botanicals. Fully transparent ingredients. Radically sustainable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections/bath-body" className="btn-primary">
              Explore Collection
            </Link>
            <Link href="/about" className="border border-cream/50 text-cream px-8 py-3 text-sm tracking-widest uppercase font-light hover:bg-cream/10 transition-all duration-300">
              Our Story
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-cream/30 animate-pulse" />
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="py-24 px-6 text-center bg-cream">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle mb-6">The Saumara Promise</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-forest-green leading-tight mb-8">
            Every ritual tells a story.
            <br />
            <em className="italic">We make yours worth telling.</em>
          </h2>
          <p className="text-text-medium font-light leading-relaxed text-base">
            In a world of shortcuts, Saumara takes the long way. We source every ingredient with intention — from Kashmir&apos;s saffron fields to Morocco&apos;s argan forests, from Kerala&apos;s coconut groves to the Himalayan salt flats. Then we tell you exactly what&apos;s inside, and why.
          </p>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-4">Shop by Ritual</p>
          <h2 className="section-title text-forest-green">Choose Your Journey</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link key={col.href} href={col.href} className="group block relative overflow-hidden aspect-[3/4]">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${col.color} to-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
                <p className="text-xs tracking-widest uppercase text-gold mb-2">{col.subtitle}</p>
                <h3 className="font-serif text-3xl font-light mb-3">{col.title}</h3>
                <p className="text-cream/70 text-sm font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {col.description}
                </p>
                <span className="text-xs tracking-widest uppercase border-b border-cream/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-subtitle mb-4">Most Loved</p>
              <h2 className="section-title text-forest-green">Bestsellers</h2>
            </div>
            <Link href="/collections/bath-body" className="hidden md:block text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors border-b border-current pb-1">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* SUSTAINABILITY */}
      <section className="py-24 bg-forest-green text-cream" id="sustainability">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-6">Our Commitment</p>
              <h2 className="font-serif text-5xl font-light leading-tight mb-8">
                Beauty that
                <br />
                <em className="italic">gives back</em>
              </h2>
              <p className="text-cream/70 font-light leading-relaxed mb-8 text-base">
                Sustainability is not a marketing claim at Saumara — it is a design principle embedded in every decision we make, from ingredient sourcing to the last square centimetre of packaging. We will be carbon neutral by 2026. We are already cruelty-free, vegan, and truthful.
              </p>
              <Link href="/about#sustainability" className="border border-cream/30 text-cream px-8 py-3 text-xs tracking-widest uppercase hover:bg-cream/10 transition-all duration-300 inline-block">
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {sustainabilityStats.map(stat => (
                <div key={stat.label} className="text-center p-8 border border-cream/10 hover:border-gold/30 transition-colors duration-300">
                  <stat.icon size={28} className="text-gold mx-auto mb-4 stroke-1" />
                  <p className="font-serif text-4xl font-light text-gold mb-2">{stat.value}</p>
                  <p className="text-cream/60 text-xs tracking-wide leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY TEASER */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=800&q=80"
              alt="Saumara — Our Story"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-green/30 to-transparent" />
          </div>
          <div>
            <p className="section-subtitle mb-6">Our Story</p>
            <h2 className="font-serif text-5xl font-light text-forest-green leading-tight mb-6">
              Born from a
              <br />
              <em className="italic">dissatisfaction</em>
            </h2>
            <p className="text-text-medium font-light leading-relaxed mb-6 text-base">
              We looked at the luxury beauty landscape in India and found a gap — not in price points, but in honesty. Premium brands promising the world, delivering formulas full of synthetic fillers and marketing mythology.
            </p>
            <p className="text-text-medium font-light leading-relaxed mb-8 text-base">
              Saumara exists to be different. Premium, yes. But premium with proof. Every ingredient named. Every supplier known. Every claim earned.
            </p>
            <Link href="/about" className="btn-secondary inline-block">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* INGREDIENT PROMISE */}
      <section className="py-20 bg-cream px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Full Transparency</p>
            <h2 className="section-title text-forest-green">We Name Every Ingredient</h2>
            <p className="text-text-medium font-light mt-4 max-w-xl mx-auto">
              Not just INCI codes. Plain English. Sources included. Because you deserve to know exactly what you&apos;re putting on your skin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sourced Intentionally', desc: 'Every ingredient traced to its origin — with supplier names, farming practices and certifications available on request.', icon: '🌱' },
              { title: 'Formulated Honestly', desc: 'No filler ingredients. No synthetic preservatives. No claims we cannot back up with data. Just what works.', icon: '🔬' },
              { title: 'Packaged Responsibly', desc: '100% of our packaging is either recyclable, refillable or compostable. No compromise, no exception.', icon: '♻️' },
            ].map(item => (
              <div key={item.title} className="text-center p-8">
                <p className="text-4xl mb-6">{item.icon}</p>
                <h3 className="font-serif text-xl font-light text-forest-green mb-4">{item.title}</h3>
                <p className="text-text-medium text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-4">@saumara</p>
            <h2 className="section-title text-forest-green">The Ritual in the Wild</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {instagramImages.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer">
                <Image
                  src={img}
                  alt={`Saumara ritual ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-forest-green/0 group-hover:bg-forest-green/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE SHIPPING BANNER */}
      <section className="py-6 bg-gold text-white text-center">
        <p className="text-xs tracking-widest uppercase font-light">
          Free shipping on all orders above ₹2,000 · Carbon-neutral delivery across India
        </p>
      </section>
    </div>
  )
}
