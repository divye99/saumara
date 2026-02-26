'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, closeCart, totalItems } = useCart()

  const shipping = subtotal > 2000 ? 0 : 199
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 cart-overlay z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-warm-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-cream">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-forest-green" />
                <span className="font-serif text-lg font-light text-forest-green">
                  Your Ritual ({totalItems})
                </span>
              </div>
              <button onClick={closeCart} className="text-text-medium hover:text-forest-green transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <ShoppingBag size={48} className="text-cream stroke-1" />
                  <div>
                    <p className="font-serif text-2xl font-light text-forest-green mb-2">Your ritual awaits</p>
                    <p className="text-text-medium text-sm">Add products to begin your Saumara ritual.</p>
                  </div>
                  <button onClick={closeCart} className="btn-primary">
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-cream">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm font-light text-forest-green leading-tight mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-text-medium mb-3 capitalize">
                          {item.product.category.replace('-', ' ')}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-cream hover:border-forest-green transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-cream hover:border-forest-green transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-light text-forest-green">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-text-medium hover:text-burgundy transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream px-8 py-6 space-y-4">
                <div className="flex justify-between text-xs text-text-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-text-medium">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gold">
                    Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-serif text-lg font-light text-forest-green border-t border-cream pt-4">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full btn-primary text-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full btn-secondary text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
