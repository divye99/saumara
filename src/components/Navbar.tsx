'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Menu } from 'lucide-react'
import NavSidebar from '@/components/NavSidebar'

export default function Navbar() {
  const { totalItems, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const iconColor = scrolled ? 'text-forest-green' : 'text-cream'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-warm-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Left — hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className={`flex items-center gap-2.5 ${iconColor} transition-colors duration-300 hover:opacity-70`}
            >
              <Menu size={22} strokeWidth={1.5} />
              <span className="hidden md:block text-[11px] tracking-[0.25em] uppercase font-light">
                Menu
              </span>
            </button>

            {/* Center — logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span
                className={`font-serif text-2xl tracking-[0.3em] font-light transition-colors duration-300 ${iconColor}`}
              >
                SAUMARA
              </span>
            </Link>

            {/* Right — cart */}
            <button
              onClick={openCart}
              className={`relative ${iconColor} transition-colors duration-300 hover:opacity-70`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </nav>

      <NavSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
