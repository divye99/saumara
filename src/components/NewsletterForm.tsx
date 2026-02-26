'use client'

export default function NewsletterForm() {
  return (
    <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="bg-transparent border border-cream/20 px-4 py-3 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
      />
      <button
        type="submit"
        className="bg-gold text-white px-4 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Subscribe
      </button>
    </form>
  )
}
