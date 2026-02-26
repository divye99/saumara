'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { CheckCircle } from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || 'SAU-XXXXX'

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center pt-20 px-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle size={64} className="text-forest-green stroke-1" />
        </div>
        <p className="section-subtitle mb-4">Order Confirmed</p>
        <h1 className="font-serif text-5xl font-light text-forest-green mb-6">
          Your ritual is on its way
        </h1>
        <p className="text-text-medium font-light leading-relaxed mb-4">
          Thank you for choosing Saumara. Your order{' '}
          <span className="font-medium text-forest-green">#{orderNumber}</span> has been confirmed.
        </p>
        <p className="text-text-medium font-light text-sm leading-relaxed mb-12">
          You will receive a confirmation email shortly with tracking details. Your ritual will arrive within 3–5 business days, packaged with intention.
        </p>

        <div className="bg-cream p-8 mb-12 text-left">
          <p className="text-xs tracking-widest uppercase text-gold mb-4">What happens next?</p>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Order Processing', desc: 'Your order is being carefully prepared in our facility.' },
              { step: '02', title: 'Quality Check', desc: 'Each product passes our rigorous quality inspection.' },
              { step: '03', title: 'Eco Packaging', desc: 'Wrapped beautifully in our 100% recyclable packaging.' },
              { step: '04', title: 'Delivery', desc: 'Shipped via carbon-neutral courier. Arrives in 3–5 days.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <span className="font-serif text-gold text-lg font-light flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-xs tracking-wide uppercase text-forest-green mb-1">{item.title}</p>
                  <p className="text-xs text-text-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/collections/bath-body" className="btn-secondary">
            Explore More Rituals
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="w-8 h-8 border border-forest-green/20 border-t-forest-green rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
