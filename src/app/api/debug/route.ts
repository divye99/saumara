import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT SET'

  // Mask password for security but show structure
  let maskedUrl = 'NOT SET'
  let urlAnalysis: Record<string, string> = {}

  if (dbUrl !== 'NOT SET') {
    try {
      const url = new URL(dbUrl)
      maskedUrl = `${url.protocol}//${url.username}:****@${url.hostname}:${url.port}${url.pathname}`
      urlAnalysis = {
        protocol: url.protocol,
        username: url.username,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        passwordLength: String(url.password.length),
        passwordHasExclamation: String(url.password.includes('!')),
        rawHasPercentEncoding: String(dbUrl.includes('%21')),
      }
    } catch (e: unknown) {
      maskedUrl = 'INVALID URL: ' + (e instanceof Error ? e.message : String(e))
    }
  }

  // Try actual DB connection
  let dbResult: string
  let productCount: number | null = null

  try {
    const { PrismaClient } = await import('@prisma/client')
    const testPrisma = new PrismaClient()
    productCount = await testPrisma.product.count()
    await testPrisma.$disconnect()
    dbResult = 'SUCCESS'
  } catch (e: unknown) {
    dbResult = 'ERROR: ' + (e instanceof Error ? e.message : String(e))
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    databaseUrl: maskedUrl,
    urlAnalysis,
    directUrl: process.env.DIRECT_URL ? 'SET (masked)' : 'NOT SET',
    dbConnection: dbResult,
    productCount,
    nodeVersion: process.version,
  })
}
