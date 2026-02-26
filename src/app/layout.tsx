import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Saumara | Rituals for the Mindful Self',
  description: 'Premium bath, body, skincare and home fragrance. Crafted with the rarest natural ingredients. Delivered across India.',
  keywords: 'saumara, luxury skincare india, premium bath body, natural fragrance, sustainable beauty india',
  openGraph: {
    title: 'Saumara | Rituals for the Mindful Self',
    description: 'Premium bath, body, skincare and home fragrance for India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1C3A2E',
                color: '#F5F0E8',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.05em',
                borderRadius: '0',
                padding: '12px 20px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
