import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Saumara',
  description: 'Terms and conditions governing use of the Saumara website and services.',
}

export default function TermsPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <section className="bg-forest-green py-28 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-light">Legal</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-cream">Terms of Service</h1>
        <p className="text-cream/50 text-xs mt-4 font-light">Last updated: January 2025</p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
        <div className="space-y-12">

          <div>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Welcome to Saumara. By accessing or using saumara.com (the &quot;Site&quot;) or purchasing our products, you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read them carefully. These Terms are governed by the laws of India, including the Consumer Protection Act, 2019 and the Information Technology Act, 2000.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">1. About Us</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Saumara is a premium Indian beauty and lifestyle brand selling bath, body, skincare and home fragrance products via our website saumara.com. For queries, contact us at <a href="mailto:divye2014@gmail.com" className="text-forest-green underline underline-offset-2">divye2014@gmail.com</a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">2. Eligibility</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              By using our Site, you confirm that you are at least 18 years of age and legally capable of entering into a binding contract under Indian law. If you are under 18, you may use our services only with the involvement of a parent or legal guardian.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">3. Products & Pricing</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              All prices displayed on our Site are in Indian Rupees (₹) and are inclusive of applicable GST. We reserve the right to change prices at any time without prior notice. Product descriptions, images and ingredient lists are provided in good faith and to the best of our knowledge.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We make every effort to display product colours and packaging accurately. However, your screen settings may cause slight variations from the actual product. Such variation does not constitute a defect.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">4. Orders & Payment</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              By placing an order, you make an offer to purchase the selected products. We reserve the right to accept or reject any order. An order confirmation email does not constitute acceptance — acceptance occurs when your order is dispatched.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              Payments are processed securely through Razorpay. We accept all major credit/debit cards, UPI, net banking, and popular wallets. Cash on Delivery is available on select pin codes for an additional fee of ₹49.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              In the event of a pricing error on our website, we will notify you before processing and give you the option to proceed at the correct price or cancel your order for a full refund.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">5. Cancellations</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              You may cancel your order within 12 hours of placing it by contacting us at <a href="mailto:divye2014@gmail.com" className="text-forest-green underline underline-offset-2">divye2014@gmail.com</a>. Once an order has been dispatched, it cannot be cancelled. For orders paid online, cancellation refunds are processed within 5–7 business days to the original payment method.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">6. Returns & Refunds</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              We accept returns on unused, unopened products in original packaging within 7 days of delivery. Opened personal care products cannot be returned for hygiene reasons unless they are faulty or misdescribed. This is in accordance with the Consumer Protection Act, 2019.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              To initiate a return, email <a href="mailto:divye2014@gmail.com" className="text-forest-green underline underline-offset-2">divye2014@gmail.com</a> with your order number, the item(s) you wish to return, and the reason for return. We will provide return instructions within 48 hours.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Refunds are processed within 5–7 business days of receiving the returned item and verifying its condition. Refunds are credited to the original payment method.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">7. Intellectual Property</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              All content on this Site — including but not limited to text, images, logos, product designs, and the Saumara name — is the intellectual property of Saumara and is protected under applicable Indian and international IP laws. You may not reproduce, distribute, or use any content without our prior written permission. Any unauthorised use constitutes infringement and may be subject to legal action.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">8. User Conduct</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-3">You agree not to:</p>
            <ul className="space-y-2 text-text-medium font-light text-sm leading-relaxed list-none pl-0">
              {[
                'Use the Site for any unlawful purpose or in violation of Indian law',
                'Submit false, fraudulent or misleading information',
                'Attempt to gain unauthorised access to any part of our systems',
                'Use automated tools to scrape or harvest data from our Site',
                'Post or transmit harmful, defamatory or offensive content',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">9. Limitation of Liability</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              To the maximum extent permitted under Indian law, Saumara shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Site or products. Our total liability to you for any claim shall not exceed the amount you paid for the product(s) in question. Nothing in these Terms limits our liability for death or personal injury caused by our negligence, or for fraud or fraudulent misrepresentation.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">10. Third-Party Links</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Our Site may contain links to third-party websites. These links are provided for convenience only. We have no control over, and accept no responsibility for, the content, privacy practices or terms of any third-party sites. Accessing third-party sites is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">11. Governing Law & Dispute Resolution</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our Site shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
            </p>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We encourage you to first contact us at <a href="mailto:divye2014@gmail.com" className="text-forest-green underline underline-offset-2">divye2014@gmail.com</a> to resolve any dispute informally before initiating formal proceedings.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">12. Changes to These Terms</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We reserve the right to modify these Terms at any time. Material changes will be communicated via email or a notice on our Site. Your continued use of our Site after changes take effect constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">13. Contact</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              For any questions about these Terms, write to us at <a href="mailto:divye2014@gmail.com" className="text-forest-green underline underline-offset-2">divye2014@gmail.com</a>.
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-cream flex gap-6 flex-wrap">
          <Link href="/privacy" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Privacy Policy</Link>
          <Link href="/shipping" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Shipping Policy</Link>
          <Link href="/" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Back to Home</Link>
        </div>
      </section>
    </div>
  )
}
