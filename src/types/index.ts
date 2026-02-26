export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  category: string
  subcategory?: string | null
  imageUrl: string
  images: string[]
  ingredients: string
  sustainabilityInfo: string
  isBestseller: boolean
  isNew: boolean
  stock: number
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: ShippingAddress
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  createdAt: string
}
