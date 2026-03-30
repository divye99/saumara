'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ArrowRight } from 'lucide-react'

const categories = [
  {
    label: 'Bath & Body',
    href: '/collections/bath-body',
    sub: [
      { label: 'Body Wash', slug: 'body-wash' },
      { label: 'Body Scrub', slug: 'body-scrub' },
      { label: 'Body Lotion', slug: 'body-lotion' },
      { label: 'Bath Salts', slug: 'bath-salts' },
      { label: 'Body Oil', slug: 'body-oil' },
    ],
  },
  {
    label: 'Skincare',
    href: '/collections/skincare',
    sub: [
      { label: 'Face Serum', slug: 'face-serum' },
      { label: 'Moisturiser', slug: 'moisturiser' },
      { label: 'Face Mask', slug: 'face-mask' },
      { label: 'Eye Cream', slug: 'eye-cream' },
      { label: 'Face Oil', slug: 'face-oil' },
    ],
  },
  {
    label: 'Home Fragrance',
    href: '/collections/home-fragrance',
    sub: [
      { label: 'Candles', slug: 'candles' },
      { label: 'Reed Diffuser', slug: 'reed-diffuser' },
      { label: 'Room Spray', slug: 'room-spray' },
      { label: 'Incense', slug: 'incense' },
    ],
  },
]

const extras = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: 'mailto:divye2014@gmail.com' },
]

interface NavSidebarProps {
  open: boolean
  onClose: () => void
}

export default function NavSidebar({ open, onClose }: NavSidebarProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (label: string) => {
    setExpanded(prev => (prev === label ? null : label))
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-forest-green/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[340px] max-w-[85vw] bg-warm-white z-50 flex flex-col overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-cream">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-xl tracking-[0.3em] font-light text-forest-green"
              >
                SAUMARA
              </Link>
              <button
                onClick={onClose}
                className="text-text-medium hover:text-forest-green transition-colors"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Categories */}
            <div className="flex-1 px-8 py-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-light">
                  Collections
                </p>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="text-[10px] tracking-[0.15em] uppercase text-text-medium font-light hover:text-forest-green transition-colors border-b border-current pb-0.5"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-0">
                {categories.map(cat => (
                  <div key={cat.label} className="border-b border-cream/60">
                    {/* Category row */}
                    <div className="flex items-center justify-between py-4">
                      <Link
                        href={cat.href}
                        onClick={onClose}
                        className="font-serif text-lg font-light text-forest-green hover:text-medium-green transition-colors"
                      >
                        {cat.label}
                      </Link>
                      <button
                        onClick={() => toggle(cat.label)}
                        className="text-text-medium hover:text-forest-green transition-colors p-1"
                        aria-label={expanded === cat.label ? 'Collapse' : 'Expand'}
                      >
                        {expanded === cat.label
                          ? <Minus size={14} strokeWidth={1.5} />
                          : <Plus size={14} strokeWidth={1.5} />
                        }
                      </button>
                    </div>

                    {/* Subcategories */}
                    <AnimatePresence>
                      {expanded === cat.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 space-y-3 pl-2">
                            {cat.sub.map(sub => (
                              <Link
                                key={sub.slug}
                                href={`${cat.href}?sub=${sub.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 text-[13px] text-text-medium font-light hover:text-forest-green transition-colors tracking-wide group"
                              >
                                <span className="w-3 h-px bg-text-medium/30 group-hover:bg-forest-green/50 transition-colors" />
                                {sub.label}
                              </Link>
                            ))}
                            <Link
                              href={cat.href}
                              onClick={onClose}
                              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-gold font-light hover:text-forest-green transition-colors mt-2"
                            >
                              View All <ArrowRight size={11} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Extra links */}
              <div className="mt-10 space-y-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-light mb-4">
                  Explore
                </p>
                {extras.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block text-[13px] tracking-widest uppercase text-text-dark font-light hover:text-forest-green transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-cream">
              <p className="text-[10px] tracking-[0.2em] uppercase text-text-medium/40 font-light">
                Premium Bath · Skincare · Home Fragrance
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
