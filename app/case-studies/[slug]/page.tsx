// app/case-studies/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const title = getMetafieldValue(study.metadata?.title) || study.title
  const summary = getMetafieldValue(study.metadata?.summary)
  const category = getMetafieldValue(study.metadata?.category)
  const challenge = getMetafieldValue(study.metadata?.challenge)
  const solution = getMetafieldValue(study.metadata?.solution)
  const result = getMetafieldValue(study.metadata?.result)
  const metric = getMetafieldValue(study.metadata?.key_metric)
  const image = study.metadata?.featured_image

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-4xl mx-auto">
        <Link href="/case-studies" className="font-mono text-xs text-sky hover:text-ice transition-colors">
          ← Back to Case Studies
        </Link>
        {category && (
          <p className="font-mono text-[13px] tracking-[0.3em] text-sky mt-8 mb-3">{category.toUpperCase()}</p>
        )}
        <h1 className="font-serif text-4xl md:text-6xl text-ice leading-tight mb-6">{title}</h1>
        <p className="font-sans font-light text-powder text-lg mb-10">{summary}</p>

        {image && (
          <img
            src={`${image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={400}
            className="w-full rounded-sm mb-12 object-cover"
          />
        )}

        {metric && (
          <div className="glass-card p-8 mb-10 text-center">
            <p className="font-serif text-4xl text-gold">{metric}</p>
            <p className="font-mono text-xs text-sky uppercase tracking-widest mt-2">Key Outcome</p>
          </div>
        )}

        <div className="space-y-10">
          {challenge && (
            <section>
              <h2 className="font-mono text-xs text-sky uppercase tracking-widest mb-3">The Challenge</h2>
              <p className="font-sans text-powder leading-relaxed">{challenge}</p>
            </section>
          )}
          {solution && (
            <section>
              <h2 className="font-mono text-xs text-sky uppercase tracking-widest mb-3">Our Solution</h2>
              <p className="font-sans text-powder leading-relaxed">{solution}</p>
            </section>
          )}
          {result && (
            <section>
              <h2 className="font-mono text-xs text-sky uppercase tracking-widest mb-3">The Result</h2>
              <p className="font-sans text-powder leading-relaxed">{result}</p>
            </section>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}