'use client'

import Link from 'next/link'
import HeroCanvas from '@/components/HeroCanvas'
import StatCounter from '@/components/StatCounter'

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-midnight/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-5xl">
        <p className="font-mono text-[13px] tracking-[0.3em] text-sky mb-6 animate-fadeUp">
          THE RISHIV INVESTMENTS
        </p>
        <h1 className="font-serif font-bold text-ice text-5xl md:text-7xl leading-tight animate-fadeUp">
          Where Capital
          <br />
          Finds Direction.
        </h1>
        <p className="font-sans font-light text-powder text-base md:text-lg mt-6 max-w-xl animate-fadeUp">
          Institutional investment strategies built for enduring growth and measured risk.
        </p>

        <div className="flex flex-wrap gap-4 mt-8 animate-fadeUp">
          <Link href="/services" className="btn-primary px-7 py-3 font-mono text-sm tracking-wide">
            Explore Our Services
          </Link>
          <Link href="/team" className="btn-ghost px-7 py-3 font-mono text-sm tracking-wide">
            Schedule a Consultation
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-12 max-w-2xl animate-fadeUp">
          <StatCounter value={2400} prefix="₹" suffix=" Cr+" label="AUM" />
          <StatCounter value={23} suffix="+" label="Years" />
          <StatCounter value={12000} suffix="+" label="Clients" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-7 h-7 text-sky animate-pulseDown"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}