import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ProductRow = {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  category: string
  subcategory: string | null
  imageUrl: string
  images: string[]
  ingredients: string
  sustainabilityInfo: string
  isBestseller: boolean
  isNew: boolean
  stock: number
  createdAt: string
}

export type OrderRow = {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: Record<string, unknown>
  items: unknown[]
  subtotal: number
  shipping: number
  total: number
  status: string
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  createdAt: string
}
