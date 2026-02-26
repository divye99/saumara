import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SAU-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      razorpayOrderId,
      razorpayPaymentId,
    } = body

    const orderNumber = generateOrderNumber()

    const { data, error } = await supabase
      .from('orders')
      .insert({
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items,
        subtotal,
        shipping,
        total,
        status: 'confirmed',
        razorpayOrderId,
        razorpayPaymentId,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order: data, orderNumber })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderNumber = searchParams.get('orderNumber')

  try {
    if (orderNumber) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('orderNumber', orderNumber)
        .single()

      if (error) return NextResponse.json({ order: null })
      return NextResponse.json({ order: data })
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
