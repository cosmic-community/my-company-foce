import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-sky/10 bg-midnight py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-2xl font-bold text-gold">RS</span>
            <span className="font-serif text-lg text-ice tracking-widest">
              THE RISHIV <span className="text-gold">INVESTMENTS</span>
            </span>
          </div>
          <p className="font-sans text-sm text-powder max-w-md leading-relaxed">
            Institutional investment strategies built for enduring growth and measured risk.
            23 years of experience in equity, mutual funds, insurance, and alternate investments.
          </p>
        </div>
        <div className="flex gap-12 font-mono text-xs uppercase tracking-widest">
          <div className="flex flex-col gap-3">
            <Link href="/services" className="text-powder hover:text-sky transition-colors">Services</Link>
            <Link href="/team" className="text-powder hover:text-sky transition-colors">Team</Link>
            <Link href="/case-studies" className="text-powder hover:text-sky transition-colors">Case Studies</Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-sky/10 font-mono text-[11px] text-powder/60 tracking-wide">
        SEBI REGISTERED · AMFI ARN 318094 · IRDA APPROVED · © {new Date().getFullYear()} THE RISHIV INVESTMENTS
      </div>
    </footer>
  )
}