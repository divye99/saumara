import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-green text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl tracking-[0.3em] font-light mb-4">SAUMARA</p>
            <p className="text-cream/60 text-xs leading-relaxed font-light">
              Rituals for the mindful self. Premium bath, body and home fragrance, crafted with the rarest natural ingredients. Delivered across India.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="mailto:hello@saumara.com" className="text-cream/60 hover:text-gold transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold mb-6 font-light">Collections</p>
            <ul className="space-y-3">
              {[
                { href: '/collections/bath-body', label: 'Bath & Body' },
                { href: '/collections/skincare', label: 'Skincare' },
                { href: '/collections/home-fragrance', label: 'Home Fragrance' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/60 text-xs hover:text-cream transition-colors tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold mb-6 font-light">Company</p>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/about#sustainability', label: 'Sustainability' },
                { href: '/about#ingredients', label: 'Our Ingredients' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/60 text-xs hover:text-cream transition-colors tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold mb-6 font-light">The Ritual Letter</p>
            <p className="text-cream/60 text-xs mb-4 leading-relaxed">
              Beauty wisdom, new arrivals, and rituals for the considered life.
            </p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent border border-cream/20 px-4 py-3 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-white px-4 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">© 2024 Saumara. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">Terms of Service</a>
            <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">Shipping Policy</a>
          </div>
          <p className="text-cream/40 text-xs">Made with intention in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
