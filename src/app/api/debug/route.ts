import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NOT SET'

  // Try actual DB connection via Supabase
  let dbResult: string
  let productCount: number | null = null

  try {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    if (error) {
      dbResult = 'ERROR: ' + error.message + ' | Code: ' + error.code
    } else {
      productCount = count
      dbResult = 'SUCCESS'
    }
  } catch (e: unknown) {
    dbResult = 'EXCEPTION: ' + (e instanceof Error ? e.message : String(e))
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabaseUrl,
    anonKeyLength: anonKey !== 'NOT SET' ? anonKey.length : 0,
    anonKeyPrefix: anonKey !== 'NOT SET' ? anonKey.substring(0, 20) + '...' : 'NOT SET',
    dbConnection: dbResult,
    productCount,
    nodeVersion: process.version,
  })
}
