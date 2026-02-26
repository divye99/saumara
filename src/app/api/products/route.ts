import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const bestseller = searchParams.get('bestseller')
  const limit = parseInt(searchParams.get('limit') || '100')

  try {
    if (slug) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) return NextResponse.json({ product: null }, { status: 404 })
      return NextResponse.json({ product: data })
    }

    let query = supabase.from('products').select('*').order('createdAt', { ascending: true }).limit(limit)

    if (category) query = query.eq('category', category)
    if (bestseller === 'true') query = query.eq('isBestseller', true)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ products: data || [] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
