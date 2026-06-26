'use client'

import { useEffect, useState } from 'react'
import type { Service, Testimonial } from '@/types'
import Navbar from '@/components/Navbar'
import NavDots from '@/components/NavDots'
import HeroSection from '@/components/HeroSection'
import BusinessesSection from '@/components/BusinessesSection'
import TestimonialsSection from '@/components/TestimonialsSection'

interface HomeExperienceProps {
  services: Service[]
  testimonials: Testimonial[]
}

const sectionIds = ['hero', 'businesses', 'testimonials']

export default function HomeExperience({ services, testimonials }: HomeExperienceProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (idx: number) => {
    const el = document.getElementById(sectionIds[idx] ?? 'hero')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative">
      <Navbar />
      <NavDots active={active} count={sectionIds.length} onSelect={scrollTo} />
      <div className="snap-container">
        <section id="hero" className="snap-section">
          <HeroSection />
        </section>
        <section id="businesses" className="snap-section">
          <BusinessesSection services={services} />
        </section>
        <section id="testimonials" className="snap-section">
          <TestimonialsSection testimonials={testimonials} />
        </section>
      </div>
    </main>
  )
}