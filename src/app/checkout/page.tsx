'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: { color: string }
  handler: (response: RazorpayResponse) => void
  modal: { ondismiss: () => void }
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const shipping = subtotal > 2000 ? 0 : 199
  const total = subtotal + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)

    try {
      // Create Razorpay order
      const orderRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      const { orderId } = await orderRes.json()

      // Load Razorpay SDK
      const loaded = await loadRazorpay()
      if (!loaded) {
        toast.error('Payment gateway failed to load. Please try again.')
        setLoading(false)
        return
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: total * 100,
        currency: 'INR',
        name: 'Saumara',
        description: 'Rituals for the Mindful Self',
        order_id: orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#1C3A2E' },
        handler: async (response: RazorpayResponse) => {
          // Save order to DB
          const saveRes = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerName: form.name,
              customerEmail: form.email,
              customerPhone: form.phone,
              shippingAddress: {
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
              },
              items,
              subtotal,
              shipping,
              total,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          })
          const { orderNumber } = await saveRes.json()
          clearCart()
          router.push(`/order-confirmation?order=${orderNumber}`)
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-serif text-3xl font-light text-forest-green mb-4">Your ritual is empty</p>
          <a href="/collections/bath-body" className="btn-primary">Explore Collection</a>
        </div>
      </div>
    )
  }

  const inputClass = "w-full border border-cream px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-forest-green transition-colors placeholder-text-medium/50"

  return (
    <div className="bg-warm-white pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-serif text-4xl font-light text-forest-green mb-12">Complete Your Ritual</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleCheckout} className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-6">Contact Information</p>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-6">Shipping Address</p>
              <div className="space-y-4">
                <input
                  name="address"
                  type="text"
                  placeholder="Street Address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <input
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <select
                  name="state"
                  required
                  value={form.state}
                  onChange={handleChange}
                  className={`${inputClass} text-text-medium`}
                >
                  <option value="">Select State</option>
                  {['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold flex items-center justify-center gap-3 py-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                  Preparing your ritual...
                </>
              ) : (
                `Pay ₹${total.toLocaleString('en-IN')}`
              )}
            </button>
            <p className="text-xs text-center text-text-medium">
              Secured by Razorpay · 256-bit SSL encryption
            </p>
          </form>

          {/* Order Summary */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold mb-6">Your Ritual</p>
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-cream overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-forest-green text-cream text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-sm font-light text-forest-green">{item.product.name}</p>
                    <p className="text-xs text-text-medium capitalize mt-1">
                      {item.product.category.replace('-', ' ')}
                    </p>
                  </div>
                  <p className="text-sm font-light">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-cream pt-6 space-y-3">
              <div className="flex justify-between text-sm font-light">
                <span className="text-text-medium">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span className="text-text-medium">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-serif text-xl font-light text-forest-green border-t border-cream pt-3">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-cream space-y-3">
              <p className="text-xs tracking-widest uppercase text-forest-green">The Saumara Promise</p>
              <div className="space-y-2">
                {[
                  '3–5 day delivery across India',
                  'Carbon-neutral shipping',
                  'Easy 30-day returns',
                  '100% authentic, natural ingredients',
                ].map(p => (
                  <p key={p} className="text-xs text-text-medium flex items-center gap-2">
                    <span className="text-gold">✓</span> {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
