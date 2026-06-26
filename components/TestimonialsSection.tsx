'use client'

import Link from 'next/link'
import type { Testimonial } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-steel'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.343 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.slice(0, 3)

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 bg-gradient-to-b from-midnight via-deepblue to-midnight">
      <div className="text-center mb-14">
        <p className="font-mono text-[13px] tracking-[0.3em] text-sky mb-4">CLIENT VOICES</p>
        <h2 className="font-serif text-3xl md:text-5xl text-ice leading-tight">
          Trusted by Those
          <br />
          Who Build Legacies
        </h2>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {items.map((t) => {
            const name = getMetafieldValue(t.metadata?.client_name) || t.title
            const quote = getMetafieldValue(t.metadata?.quote)
            const company = getMetafieldValue(t.metadata?.company)
            const designation = getMetafieldValue(t.metadata?.designation)
            const rating = t.metadata?.rating ?? 5
            const photo = t.metadata?.photo
            return (
              <div key={t.id} className="glass-card p-7 flex flex-col">
                <Stars rating={typeof rating === 'number' ? rating : 5} />
                <p className="font-sans text-powder text-sm leading-relaxed mt-4 flex-1 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-sky/10">
                  {photo && (
                    <img
                      src={`${photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-serif text-ice text-sm">{name}</div>
                    <div className="font-mono text-[11px] text-sky uppercase tracking-wide">
                      {designation}
                      {company ? ` · ${company}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-powder font-sans">Client testimonials coming soon.</p>
      )}

      <div className="text-center mt-16">
        <p className="font-mono text-[11px] tracking-[0.25em] text-powder/70 mb-6">
          SEBI REGISTERED · AMFI ARN 318094 · IRDA APPROVED · TATA AIA SENIOR LIFE PLANNER
        </p>
        <Link href="/case-studies" className="btn-ghost px-7 py-3 font-mono text-sm tracking-wide">
          View Case Studies
        </Link>
      </div>
    </div>
  )
}