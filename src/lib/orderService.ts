import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const ShippingAddressSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().min(3),
})

const CartItemSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().int(),
    category: z.string(),
    subcategory: z.string().nullable().optional(),
    imageUrl: z.string().url(),
  }),
  quantity: z.number().int().min(1),
})

export const CreateOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(8),
  shippingAddress: ShippingAddressSchema,
  items: z.array(CartItemSchema).min(1),
  subtotal: z.number().int().nonnegative(),
  shipping: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  razorpayOrderId: z.string().optional().nullable(),
  razorpayPaymentId: z.string().optional().nullable(),
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SAU-${timestamp}-${random}`
}

export async function createOrder(input: CreateOrderInput) {
  const parsed = CreateOrderSchema.parse(input)

  const orderNumber = generateOrderNumber()

  const { data, error } = await supabase
    .from('orders')
    .insert({
      orderNumber,
      customerName: parsed.customerName,
      customerEmail: parsed.customerEmail,
      customerPhone: parsed.customerPhone,
      shippingAddress: parsed.shippingAddress,
      items: parsed.items,
      subtotal: parsed.subtotal,
      shipping: parsed.shipping,
      total: parsed.total,
      status: 'confirmed',
      razorpayOrderId: parsed.razorpayOrderId ?? null,
      razorpayPaymentId: parsed.razorpayPaymentId ?? null,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return { order: data, orderNumber }
}

