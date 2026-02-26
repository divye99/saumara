'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const { totalItems, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/collections/bath-body', label: 'Bath & Body' },
    { href: '/collections/skincare', label: 'Skincare' },
    { href: '/collections/home-fragrance', label: 'Home Fragrance' },
    { href: '/about', label: 'Our Story' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-warm-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left nav links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.slice(0, 2).map(link => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span
                className={`font-serif text-2xl tracking-[0.3em] font-light transition-colors duration-300 ${
                  scrolled ? 'text-forest-green' : 'text-cream'
                }`}
              >
                SAUMARA
              </span>
            </Link>

            {/* Right nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.slice(2).map(link => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
              <button
                onClick={openCart}
                className="relative nav-link flex items-center gap-1"
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-4 ml-auto">
              <button onClick={openCart} className="relative" aria-label="Cart">
                <ShoppingBag size={20} className={scrolled ? 'text-forest-green' : 'text-cream'} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <X size={22} className={scrolled ? 'text-forest-green' : 'text-cream'} />
                ) : (
                  <Menu size={22} className={scrolled ? 'text-forest-green' : 'text-cream'} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-warm-white border-t border-cream px-6 py-8">
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-widest uppercase text-text-dark font-light"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
