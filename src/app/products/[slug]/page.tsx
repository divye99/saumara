import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'

export const dynamic = 'force-dynamic'

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return null
  return {
    ...product,
    images: product.images as string[],
    subcategory: product.subcategory ?? null,
    createdAt: product.createdAt.toISOString(),
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) notFound()
  return <ProductPageClient product={product} />
}
