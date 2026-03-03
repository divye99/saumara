import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Saumara',
  description: 'How Saumara collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <section className="bg-forest-green py-28 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-light">Legal</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-cream">Privacy Policy</h1>
        <p className="text-cream/50 text-xs mt-4 font-light">Last updated: January 2025</p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
        <div className="space-y-12">

          <div>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Saumara (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Policy explains how we collect, use, store, and share your personal information when you use our website saumara.com or purchase our products. It is compliant with India's Information Technology Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Information We Collect</h2>
            <div className="space-y-5">
              <div>
                <p className="text-forest-green font-light text-sm mb-2">Information you provide directly</p>
                <ul className="space-y-2 text-text-medium font-light text-sm leading-relaxed list-none pl-0">
                  {['Name, email address and phone number when you create an account or place an order', 'Delivery address and billing information', 'Payment information processed securely through Razorpay (we do not store card details)', 'Messages and queries submitted via contact forms', 'Email address if you subscribe to The Ritual Letter'].map(item => (
                    <li key={item} className="flex gap-3">
                      <span className="text-gold mt-1 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-forest-green font-light text-sm mb-2">Information collected automatically</p>
                <ul className="space-y-2 text-text-medium font-light text-sm leading-relaxed list-none pl-0">
                  {['IP address, browser type and device information', 'Pages visited, time spent and clickstream data', 'Cookies and similar tracking technologies (see Cookie Policy below)', 'Order history and browsing behaviour on our site'].map(item => (
                    <li key={item} className="flex gap-3">
                      <span className="text-gold mt-1 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">How We Use Your Information</h2>
            <ul className="space-y-2 text-text-medium font-light text-sm leading-relaxed list-none pl-0">
              {[
                'To process and fulfil your orders, and send you order confirmations and shipping updates',
                'To respond to your customer service queries',
                'To send The Ritual Letter (if you have subscribed) — you can unsubscribe at any time',
                'To personalise your experience and show you relevant products',
                'To improve our website, products and services',
                'To detect and prevent fraud and security issues',
                'To comply with our legal obligations under Indian law',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Sharing Your Information</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              We do not sell, rent or trade your personal information. We share it only with trusted third parties who help us operate our business:
            </p>
            <div className="space-y-4">
              {[
                { party: 'Razorpay', purpose: 'Secure payment processing. Governed by Razorpay\'s Privacy Policy.' },
                { party: 'Delhivery / Blue Dart / Ekart', purpose: 'Order fulfilment and last-mile delivery.' },
                { party: 'Supabase', purpose: 'Secure database hosting for order and account data.' },
                { party: 'Vercel', purpose: 'Website hosting and infrastructure.' },
                { party: 'Legal authorities', purpose: 'Where required by Indian law or court order.' },
              ].map(({ party, purpose }) => (
                <div key={party} className="border-l-2 border-gold pl-6">
                  <p className="text-forest-green font-light text-sm">{party}</p>
                  <p className="text-text-medium font-light text-sm">{purpose}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Cookie Policy</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              We use cookies and similar technologies to enhance your experience on our website. Cookies are small text files stored on your device.
            </p>
            <div className="space-y-3">
              {[
                { type: 'Essential cookies', desc: 'Required for core website functions (cart, checkout, login). Cannot be disabled.' },
                { type: 'Analytics cookies', desc: 'Help us understand how visitors use our site so we can improve it.' },
                { type: 'Marketing cookies', desc: 'Used to show you relevant ads on third-party platforms. You can opt out.' },
              ].map(({ type, desc }) => (
                <div key={type} className="bg-cream p-5">
                  <p className="text-forest-green text-sm font-light mb-1">{type}</p>
                  <p className="text-text-medium text-sm font-light">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Data Security</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We implement industry-standard security measures including SSL/TLS encryption, secure data storage, and restricted access controls. Payment data is processed by Razorpay and is PCI-DSS compliant — we never store your full card details on our servers. While we take every reasonable precaution, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Data Retention</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We retain your personal data for as long as your account is active or as needed to provide services. Order data is kept for 7 years as required by Indian tax regulations. You may request deletion of your account and associated data by contacting us, subject to our legal obligations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Your Rights</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm mb-4">
              Under the Digital Personal Data Protection Act, 2023, you have the right to:
            </p>
            <ul className="space-y-2 text-text-medium font-light text-sm leading-relaxed list-none pl-0">
              {[
                'Access the personal data we hold about you',
                'Correct inaccurate or incomplete data',
                'Erase your data (right to be forgotten), subject to legal obligations',
                'Withdraw consent at any time for processing based on consent',
                'Nominate a person to exercise these rights on your behalf',
                'Raise a grievance with our Grievance Officer',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-medium font-light leading-relaxed text-sm mt-4">
              To exercise any of these rights, contact our Grievance Officer at <a href="mailto:privacy@saumara.com" className="text-forest-green underline underline-offset-2">privacy@saumara.com</a>. We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Children's Privacy</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Changes to This Policy</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              We may update this Privacy Policy from time to time. Material changes will be notified via email or a prominent notice on our website. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light text-forest-green mb-4">Contact & Grievance Officer</h2>
            <p className="text-text-medium font-light leading-relaxed text-sm">
              For any privacy-related questions or to exercise your rights, contact our Grievance Officer:<br /><br />
              <strong className="font-light text-forest-green">Email:</strong> <a href="mailto:privacy@saumara.com" className="text-forest-green underline underline-offset-2">privacy@saumara.com</a><br />
              <strong className="font-light text-forest-green">Response time:</strong> Within 30 days of receipt
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-cream flex gap-6 flex-wrap">
          <Link href="/shipping" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Shipping Policy</Link>
          <Link href="/terms" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Terms of Service</Link>
          <Link href="/" className="text-xs tracking-widest uppercase text-text-medium hover:text-forest-green transition-colors">Back to Home</Link>
        </div>
      </section>
    </div>
  )
}
