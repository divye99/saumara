import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error('Razorpay error:', error)
    // Return a mock order ID for testing without live keys
    return NextResponse.json({
      orderId: `order_mock_${Date.now()}`,
    })
  }
}
