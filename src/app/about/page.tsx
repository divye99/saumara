import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Recycle, Award, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: Leaf, title: 'Natural First', desc: 'Every formula begins with nature. We start with the most effective natural ingredients and add science only where nature needs help.' },
    { icon: Recycle, title: 'Planet Conscious', desc: '100% recyclable packaging. Carbon-neutral shipping. We are on track to be fully carbon neutral by 2026.' },
    { icon: Award, title: 'Radically Transparent', desc: 'We name every ingredient in plain English. We tell you where it comes from. We tell you why it is there. No hidden anything.' },
    { icon: Heart, title: 'Cruelty Free', desc: 'Not tested on animals. Never. Every product is vegan or ethically animal-derived (like beeswax) with certified humane sourcing.' },
    { icon: Globe, title: 'Fair Trade Sourced', desc: 'From Kashmir saffron to Moroccan argan oil, we pay above fair-trade premiums and know every farmer by name.' },
  ]

  const ingredients = [
    { name: 'Kashmiri Saffron', source: 'Kashmir, India', benefit: 'Brightening, anti-inflammatory, ultra-luxurious' },
    { name: 'Argan Oil', source: 'Essaouira, Morocco', benefit: 'Deep nourishment, anti-aging, exceptional softening' },
    { name: 'Oud Wood', source: 'Assam, India & Arabian Peninsula', benefit: 'Fragrance, antimicrobial, deeply warming' },
    { name: 'Mysore Sandalwood', source: 'Karnataka, India', benefit: 'Calming, brightening, rich fixative scent' },
    { name: 'Bakuchiol', source: 'Rajasthan, India', benefit: 'Natural retinol alternative, firming, anti-aging' },
    { name: 'Vetiver Root', source: 'Rajasthan, India', benefit: 'Grounding, healing, deeply moisturising' },
    { name: 'Coconut Oil', source: 'Kerala, India', benefit: 'Moisturising, antibacterial, skin barrier support' },
    { name: 'Bulgarian Rose', source: 'Kazanlak Valley, Bulgaria', benefit: 'Brightening, hydrating, anti-aging' },
  ]

  return (
    <div className="bg-warm-white">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556228578-0d85751bab9b?w=1600&q=80"
            alt="Saumara — Our Story"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-green/70 via-forest-green/50 to-forest-green/80" />
        </div>
        <div className="relative z-10 text-center text-cream px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-8">Our Story</p>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-none mb-8">
            Born from
            <br />
            <em className="italic">Honesty</em>
          </h1>
          <p className="text-cream/80 text-lg font-light max-w-xl mx-auto leading-relaxed">
            We built Saumara because we believed Indian consumers deserved better — premium products with real ingredients, real sourcing, and real results.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle mb-6">The Beginning</p>
            <h2 className="font-serif text-5xl font-light text-forest-green leading-tight mb-8">
              A question no one
              <br />
              <em className="italic">wanted to answer</em>
            </h2>
            <div className="space-y-5 text-text-medium font-light leading-relaxed">
              <p>
                It started with a simple question: what is actually in the luxury body products we were spending thousands of rupees on? When we tried to find out, we discovered most brands would rather not say.
              </p>
              <p>
                Not Saumara. We built this brand on the radical premise that you deserve to know exactly what you are putting on your skin — in plain language, not INCI codes, with the source included.
              </p>
              <p>
                Every product in our collection tells you its ingredients, where they come from, why they are there, and what the evidence says they do. No mythology. No inflated claims. Just beauty, honestly told.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80"
              alt="Saumara ingredients"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">What We Stand For</p>
            <h2 className="section-title text-forest-green">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(value => (
              <div key={value.title} className="bg-warm-white p-8">
                <value.icon size={28} className="text-gold mb-6 stroke-1" />
                <h3 className="font-serif text-xl font-light text-forest-green mb-3">{value.title}</h3>
                <p className="text-text-medium text-sm font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 bg-forest-green text-cream px-6 lg:px-12" id="sustainability">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-gold mb-4">Environmental Commitment</p>
            <h2 className="font-serif text-5xl font-light">Our Planet Promise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { year: '2024', title: '100% Recyclable Packaging', desc: 'Every piece of packaging we use today is either recyclable, refillable, or compostable.' },
              { year: '2025', title: 'Carbon Neutral Shipping', desc: 'All deliveries offset through verified Indian reforestation and renewable energy projects.' },
              { year: '2026', title: 'Carbon Neutral Operations', desc: 'Full operational carbon neutrality — manufacturing, offices, supply chain, all of it.' },
            ].map(item => (
              <div key={item.year} className="border border-cream/20 p-8 hover:border-gold/40 transition-colors">
                <p className="font-serif text-gold text-3xl font-light mb-4">{item.year}</p>
                <h3 className="text-xs tracking-widest uppercase text-cream mb-4">{item.title}</h3>
                <p className="text-cream/60 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto" id="ingredients">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-4">Full Transparency</p>
          <h2 className="section-title text-forest-green">Key Ingredients</h2>
          <p className="text-text-medium font-light mt-4 max-w-xl mx-auto text-sm">
            The most important ingredients in our formulas — where they come from, and what they do.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ingredients.map(ing => (
            <div key={ing.name} className="flex items-start gap-6 p-6 border border-cream hover:border-gold/30 transition-colors">
              <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-2" />
              <div>
                <h3 className="font-serif text-lg font-light text-forest-green mb-1">{ing.name}</h3>
                <p className="text-xs tracking-wide text-gold mb-2">{ing.source}</p>
                <p className="text-text-medium text-sm font-light">{ing.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-5xl font-light text-forest-green mb-6">
            Begin your ritual
          </h2>
          <p className="text-text-medium font-light mb-12 text-base leading-relaxed">
            Premium, honest, sustainable beauty. Delivered across India with care.
          </p>
          <Link href="/collections/bath-body" className="btn-primary">
            Explore the Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
