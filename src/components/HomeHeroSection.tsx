'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const

export default function HomeHeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        <Image
          src="https://res.cloudinary.com/dcgevdwcg/image/upload/v1772541807/Hero_Banner_Prompt_lmygmn.png"
          alt="Saumara — Rituals for the Mindful Self"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-green/60 via-forest-green/40 to-forest-green/70" />

      <div className="relative z-10 text-center text-cream px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-gold mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutQuart, delay: 0.1 }}
        >
          Premium Bath · Skincare · Home Fragrance
        </motion.p>
        <motion.h1
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutQuart, delay: 0.25 }}
        >
          Your Ritual
          <br />
          <em className="italic">Begins Here</em>
        </motion.h1>
        <motion.p
          className="text-cream/80 text-base md:text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutQuart, delay: 0.4 }}
        >
          Crafted from the world&apos;s rarest botanicals. Fully transparent ingredients. Radically sustainable.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutQuart, delay: 0.55 }}
        >
          <Link href="/collections/bath-body" className="btn-primary">
            Explore Collection
          </Link>
          <Link href="/about" className="border border-cream/50 text-cream px-8 py-3 text-sm tracking-widest uppercase font-light hover:bg-cream/10 transition-all duration-300">
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-cream/30"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
      </motion.div>
    </section>
  )
}
