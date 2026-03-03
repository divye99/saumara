import Link from 'next/link'

export const metadata = {
  title: 'Shipping Policy | Saumara',
  description: 'Saumara shipping and delivery information for orders across India.',
}

export default function ShippingPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <section className="bg-forest-green py-28 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-light">Legal</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-cream">Shipping Policy</h1>
        <p className="text-cream/50 text-xs mt-4 font-light">Last updated: January 2025</p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
        <div className="prose-saumara space-y-12">

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Delivery Coverage</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Saumara delivers to all serviceable pin codes across India. At checkout, enter your pin code to confirm delivery availability. We currently do not offer international shipping, though we are working towards it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Shipping Timelines</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gold pl-6">
                <p className="text-forest-green font-light text-sm mb-1">Standard Delivery</p>
                <p className="text-text-medium font-light text-sm leading-relaxed">4–6 business days from dispatch. Available pan-India.</p>
              </div>
              <div className="border-l-2 border-gold pl-6">
                <p className="text-forest-green font-light text-sm mb-1">Express Delivery</p>
                <p className="text-text-medium font-light text-sm leading-relaxed">2–3 business days from dispatch. Available in metro cities (Mumbai, Delhi NCR, Bangalore, Chennai, Hyderabad, Kolkata, Pune).</p>
              </div>
              <div className="border-l-2 border-gold pl-6">
                <p className="text-forest-green font-light text-sm mb-1">Same-Day Delivery</p>
                <p className="text-text-medium font-light text-sm leading-relaxed">Available in select Mumbai and Delhi NCR pin codes for orders placed before 11 AM on business days. Subject to availability.</p>
              </div>
            </div>
            <p className="text-text-medium font-light text-sm leading-relaxed mt-5">
              Business days are Monday to Saturday, excluding public holidays. Orders placed on Sundays and public holidays are processed the following business day.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Shipping Charges</h2>
            <div className="bg-cream p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-medium font-light">Orders above ₹999</span>
                <span className="text-forest-green font-light">Free standard shipping</span>
              </div>
              <div className="w-full h-px bg-forest-green/10" />
              <div className="flex justify-between text-sm">
                <span className="text-text-medium font-light">Orders below ₹999</span>
                <span className="text-forest-green font-light">₹79 flat</span>
              </div>
              <div className="w-full h-px bg-forest-green/10" />
              <div className="flex justify-between text-sm">
                <span className="text-text-medium font-light">Express delivery</span>
                <span className="text-forest-green font-light">₹149 flat</span>
              </div>
              <div className="w-full h-px bg-forest-green/10" />
              <div className="flex justify-between text-sm">
                <span className="text-text-medium font-light">Cash on Delivery (COD)</span>
                <span className="text-forest-green font-light">Additional ₹49</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Order Processing</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Orders are typically processed and dispatched within 1–2 business days of payment confirmation. During peak periods (sale events, festive seasons) processing may take up to 3 business days. You will receive a dispatch confirmation email with your tracking details once your order ships.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Order Tracking</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Once dispatched, you will receive an SMS and email with your courier tracking number. You can track your order directly on the courier partner's website or app. Our primary logistics partners are Delhivery, Blue Dart, and Ekart.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Packaging</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Every Saumara order is packed with care in our signature recyclable packaging. We use minimal, FSC-certified materials and avoid single-use plastics wherever possible. Fragile items (candles, glass bottles) are wrapped in protective tissue and secured with biodegradable cushioning.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Damaged or Incorrect Orders</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              If your order arrives damaged or you have received an incorrect item, please contact us at <a href="mailto:hello@saumara.com" className="text-forest-green underline underline-offset-2">hello@saumara.com</a> within 48 hours of delivery with your order number and clear photographs of the issue. We will arrange a replacement or full refund at no additional cost to you.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Returns & Exchanges</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We accept returns on unopened, unused products within 7 days of delivery. Opened personal care products cannot be returned for hygiene reasons unless they are defective. To initiate a return, write to <a href="mailto:hello@saumara.com" className="text-forest-green underline underline-offset-2">hello@saumara.com</a> with your order details. Refunds are processed within 5–7 business days of us receiving the returned item.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Contact Us</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              For any shipping queries, write to us at <a href="mailto:hello@saumara.com" className="text-forest-green underline underline-offset-2">hello@saumara.com</a>. We aim to respond within 24 hours on business days.
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-cream flex gap-6 flex-wrap">
          <Link href="/privacy" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Terms of Service</Link>
          <Link href="/" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Back to Home</Link>
        </div>
      </section>
    </div>
  )
}
