import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const order = await prisma.order.create({
      data: {
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
      },
    })

    return NextResponse.json({ order, orderNumber: order.orderNumber })
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
      const order = await prisma.order.findUnique({ where: { orderNumber } })
      return NextResponse.json({ order })
    }
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ orders })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
