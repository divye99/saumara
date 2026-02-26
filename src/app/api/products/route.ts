import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const bestseller = searchParams.get('bestseller')
  const limit = parseInt(searchParams.get('limit') || '100')

  try {
    if (slug) {
      const product = await prisma.product.findUnique({ where: { slug } })
      if (!product) return NextResponse.json({ product: null }, { status: 404 })
      return NextResponse.json({
        product: {
          ...product,
          images: product.images as string[],
          createdAt: product.createdAt.toISOString(),
        },
      })
    }

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (bestseller === 'true') where.isBestseller = true

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      products: products.map(p => ({
        ...p,
        images: p.images as string[],
        createdAt: p.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
