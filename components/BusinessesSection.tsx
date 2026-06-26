'use client'

import Link from 'next/link'
import type { Service } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import BusinessCardCanvas from '@/components/BusinessCardCanvas'

interface BusinessesSectionProps {
  services: Service[]
}

const scenes: Array<'torus' | 'ribbon' | 'morph' | 'orbit'> = ['torus', 'ribbon', 'morph', 'orbit']

const fallback = [
  {
    title: 'Wealth Management',
    description: 'Bespoke portfolio strategies for high-net-worth individuals and families.',
    slug: 'wealth-management',
  },
  {
    title: 'Mutual Funds & SIP',
    description: 'AMFI-certified guidance across equity, debt and hybrid fund categories.',
    slug: 'mutual-funds',
  },
  {
    title: 'Private Equity',
    description: 'Access to alternate investment funds and curated private opportunities.',
    slug: 'private-equity',
  },
  {
    title: 'Insurance & Risk',
    description: 'IRDA-approved life and risk solutions tailored to your goals.',
    slug: 'insurance-risk',
  },
]

export default function BusinessesSection({ services }: BusinessesSectionProps) {
  const cards = services.length > 0 ? services.slice(0, 4) : []

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 bg-gradient-to-b from-midnight via-navy to-midnight">
      <div className="text-center mb-14">
        <p className="font-mono text-[13px] tracking-[0.3em] text-sky mb-4">OUR BUSINESSES</p>
        <h2 className="font-serif text-3xl md:text-5xl text-ice leading-tight">
          A Diversified Portfolio
          <br />
          of Financial Expertise
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
        {cards.length > 0
          ? cards.map((service, idx) => {
              const title = getMetafieldValue(service.metadata?.name) || service.title
              const desc = getMetafieldValue(service.metadata?.short_description)
              return (
                <div key={service.id} className="glass-card overflow-hidden flex flex-col">
                  <div className="h-40 w-full">
                    <BusinessCardCanvas scene={scenes[idx % 4] ?? 'torus'} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-ice mb-2">{title}</h3>
                    <p className="font-sans text-sm text-powder leading-relaxed flex-1 line-clamp-2">
                      {desc}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-mono text-xs text-sky mt-4 hover:text-ice transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              )
            })
          : fallback.map((card, idx) => (
              <div key={card.slug} className="glass-card overflow-hidden flex flex-col">
                <div className="h-40 w-full">
                  <BusinessCardCanvas scene={scenes[idx % 4] ?? 'torus'} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-ice mb-2">{card.title}</h3>
                  <p className="font-sans text-sm text-powder leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <Link
                    href="/services"
                    className="font-mono text-xs text-sky mt-4 hover:text-ice transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}