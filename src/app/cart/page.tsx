'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-serif text-3xl font-light text-forest-green mb-4">Your ritual is empty</p>
          <Link href="/collections/bath-body" className="btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    )
  }

  // Cart state is fully represented in the CartDrawer + checkout;
  // if someone lands on /cart, just guide them to checkout.
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center pt-20">
      <div className="text-center space-y-4">
        <p className="font-serif text-3xl font-light text-forest-green">Your ritual is waiting</p>
        <p className="text-text-medium text-sm">
          You already have products in your ritual. Continue to checkout to complete your order.
        </p>
        <Link href="/checkout" className="btn-primary">
          Go to Checkout
        </Link>
      </div>
    </div>
  )
}

