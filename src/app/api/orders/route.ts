import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { supabase } from '@/lib/supabase'
import { createOrder, CreateOrderSchema } from '@/lib/orderService'

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const parsed = CreateOrderSchema.parse(json)

    const { order, orderNumber } = await createOrder(parsed)

    return NextResponse.json({ order, orderNumber })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 })
    }
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
