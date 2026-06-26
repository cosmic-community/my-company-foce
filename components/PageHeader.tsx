interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="text-center max-w-3xl mx-auto mb-16">
      <p className="font-mono text-[13px] tracking-[0.3em] text-sky mb-4">{eyebrow}</p>
      <h1 className="font-serif text-4xl md:text-6xl text-ice leading-tight">{title}</h1>
      {subtitle && <p className="font-sans font-light text-powder mt-5 text-lg">{subtitle}</p>}
    </header>
  )
}