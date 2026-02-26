# Saumara — Rituals for the Mindful Self

Premium bath, body, skincare and home fragrance e-commerce platform built for India.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL via Supabase + Prisma ORM
- **Payments**: Razorpay
- **Hosting**: Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your values in `.env.local`.

### 3. Push database schema

```bash
npm run db:push
```

### 4. Seed the database (60 products)

```bash
npm run db:seed
```

### 5. Run development server

```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `RAZORPAY_KEY_ID` | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Key ID (client-side) |
| `NEXT_PUBLIC_APP_URL` | App URL |

## Pages

- `/` — Homepage
- `/collections/bath-body` — Bath & Body collection
- `/collections/skincare` — Skincare collection
- `/collections/home-fragrance` — Home Fragrance collection
- `/products/[slug]` — Product detail page
- `/checkout` — Checkout with Razorpay
- `/order-confirmation` — Order confirmation
- `/about` — Brand story & sustainability

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables
4. Deploy
5. After first deploy, run seed via Vercel Functions or Supabase SQL editor
