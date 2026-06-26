'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-sm bg-midnight/40 border-b border-sky/10">
      <Link href="/" className="flex items-center gap-3">
        <span className="font-serif text-2xl font-bold text-gold tracking-wide">RS</span>
        <span className="hidden sm:block font-serif text-lg text-ice tracking-widest">
          THE RISHIV <span className="text-gold">INVESTMENTS</span>
        </span>
      </Link>
      <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
        <Link href="/services" className="text-powder hover:text-sky transition-colors hidden md:inline">
          Services
        </Link>
        <Link href="/team" className="text-powder hover:text-sky transition-colors hidden md:inline">
          Team
        </Link>
        <Link href="/case-studies" className="text-powder hover:text-sky transition-colors hidden md:inline">
          Insights
        </Link>
        <Link
          href="/services"
          className="btn-ghost px-4 py-2 text-xs"
        >
          Connect
        </Link>
      </div>
    </nav>
  )
}