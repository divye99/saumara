/**
 * update-product-images.ts
 *
 * Bulk-updates the imageUrl field for all products in Supabase.
 *
 * Usage:
 *   npx ts-node --project tsconfig.scripts.json scripts/update-product-images.ts scripts/product-images.csv
 *
 * CSV format (header row required):
 *   slug,imageUrl
 *   ritual-of-sakura-body-wash,https://res.cloudinary.com/dcgevdwcg/image/upload/...
 *   ...
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local   ← get from Supabase dashboard → Settings → API
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load .env.local manually (ts-node doesn't auto-load it)
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('❌  .env.local not found. Make sure you run this from the project root.')
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌  Missing env vars. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

interface Row {
  slug: string
  imageUrl: string
}

function parseCSV(filePath: string): Row[] {
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8')
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean)

  if (lines.length < 2) {
    console.error('❌  CSV must have a header row and at least one data row.')
    process.exit(1)
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim())
  const slugIdx = header.indexOf('slug')
  const urlIdx = header.indexOf('imageurl')

  if (slugIdx === -1 || urlIdx === -1) {
    console.error('❌  CSV must have "slug" and "imageUrl" columns (case-insensitive)')
    process.exit(1)
  }

  return lines.slice(1).map((line, i) => {
    const cols = line.split(',')
    const slug = cols[slugIdx]?.trim()
    const imageUrl = cols[urlIdx]?.trim()

    if (!slug || !imageUrl) {
      console.warn(`⚠️   Row ${i + 2}: missing slug or imageUrl — skipping`)
      return null
    }
    return { slug, imageUrl }
  }).filter((row): row is Row => row !== null)
}

async function main() {
  const csvPath = process.argv[2]

  if (!csvPath) {
    console.error('Usage: npx ts-node --project tsconfig.scripts.json scripts/update-product-images.ts <path-to-csv>')
    process.exit(1)
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌  File not found: ${csvPath}`)
    process.exit(1)
  }

  const rows = parseCSV(csvPath)
  console.log(`\n🚀  Updating ${rows.length} products in Supabase...\n`)

  let success = 0
  let failed = 0

  for (const { slug, imageUrl } of rows) {
    const { error } = await supabase
      .from('products')
      .update({ imageUrl })
      .eq('slug', slug)

    if (error) {
      console.error(`❌  ${slug}: ${error.message}`)
      failed++
    } else {
      console.log(`✅  ${slug}`)
      success++
    }
  }

  console.log(`\n─────────────────────────────`)
  console.log(`✅  Updated:  ${success} products`)
  if (failed > 0) console.log(`❌  Failed:   ${failed} products`)
  console.log(`─────────────────────────────\n`)

  if (failed > 0) process.exit(1)
}

main()
