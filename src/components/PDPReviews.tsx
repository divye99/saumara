'use client'

import { Star } from 'lucide-react'
import AnimateOnView from '@/components/AnimateOnView'

interface Review {
  name: string
  location: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
}

const seededReviews: Record<string, Review[]> = {
  'ritual-of-sakura-body-wash': [
    {
      name: 'Priya M.',
      location: 'Mumbai',
      rating: 5,
      date: 'March 2025',
      title: 'The best body wash I have ever used',
      body: 'The cherry blossom scent is absolutely divine — not synthetic at all, genuinely floral and soft. My skin feels incredibly hydrated after every shower, which I never expected from a body wash. I have been searching for something like this for years. Worth every rupee.',
      verified: true,
    },
    {
      name: 'Radhika S.',
      location: 'Bangalore',
      rating: 5,
      date: 'February 2025',
      title: 'Finally — a luxury body wash that delivers',
      body: 'I was sceptical of Indian brands at this price point, but Saumara completely changed my mind. The lather is rich without stripping my skin, the fragrance lingers for hours, and knowing exactly what is inside makes it so much more special. I have already ordered a second bottle.',
      verified: true,
    },
    {
      name: 'Aishwarya K.',
      location: 'Delhi',
      rating: 5,
      date: 'March 2025',
      title: 'My shower now feels like a spa ritual',
      body: 'The rice milk protein really works — my skin feels plumper and softer after just a week. The packaging is beautiful and the product smells like something you would find at a five-star hotel. My whole family has started using it now. Highly recommend.',
      verified: true,
    },
    {
      name: 'Mehak R.',
      location: 'Hyderabad',
      rating: 4,
      date: 'January 2025',
      title: 'Genuinely impressed by the ingredients',
      body: 'I appreciate that Saumara names every ingredient in plain English. The jojoba oil is noticeable — skin is visibly softer and not dry at all after showering. The scent could last slightly longer on the skin, but the overall experience is exceptional for an Indian brand.',
      verified: true,
    },
    {
      name: 'Tanvi P.',
      location: 'Pune',
      rating: 5,
      date: 'February 2025',
      title: 'A small luxury that makes every day better',
      body: 'This body wash has completely transformed my morning routine. I look forward to my shower now. The cherry blossom and rice milk combination is so elegant — it feels indulgent but clean at the same time. No nasty chemicals, no guilt. Just a beautiful ritual.',
      verified: true,
    },
  ],
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-gold text-gold' : 'text-cream'}
          strokeWidth={1}
        />
      ))}
    </div>
  )
}

export default function PDPReviews({ slug }: { slug: string }) {
  const reviews = seededReviews[slug]
  if (!reviews || reviews.length === 0) return null

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const fiveStarCount = reviews.filter(r => r.rating === 5).length

  return (
    <AnimateOnView>
      <section className="py-20 lg:py-28 bg-warm-white border-t border-cream">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-light mb-3">
                Customer Reviews
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-forest-green">
                What Our Customers Say
              </h2>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="font-serif text-5xl font-light text-forest-green">{avg.toFixed(1)}</p>
                <StarRow rating={Math.round(avg)} />
                <p className="text-[11px] text-text-medium font-light mt-1">{reviews.length} reviews</p>
              </div>
              <div className="w-px h-16 bg-cream hidden md:block" />
              <div className="hidden md:block">
                <p className="text-[13px] text-text-medium font-light">{fiveStarCount} of {reviews.length} customers</p>
                <p className="text-[13px] text-text-medium font-light">rated this <span className="text-forest-green font-medium">5 stars</span></p>
              </div>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-cream p-8 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <StarRow rating={review.rating} />
                  {review.verified && (
                    <span className="text-[10px] tracking-wide uppercase text-forest-green/60 font-light">
                      Verified
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base font-light text-forest-green leading-snug">
                  {review.title}
                </h3>
                <p className="text-[13px] text-text-medium font-light leading-relaxed flex-1">
                  {review.body}
                </p>
                <div className="pt-4 border-t border-cream/60 flex items-center justify-between">
                  <p className="text-[11px] tracking-wide text-text-dark font-light">
                    {review.name}
                    <span className="text-text-medium/60"> · {review.location}</span>
                  </p>
                  <p className="text-[11px] text-text-medium/50 font-light">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimateOnView>
  )
}
