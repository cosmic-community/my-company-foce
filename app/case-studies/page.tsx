import Link from 'next/link'
import { getCaseStudies, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/SiteFooter'

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies()

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <PageHeader
          eyebrow="INSIGHTS"
          title="Case Studies"
          subtitle="Real outcomes from disciplined, research-led investment strategies."
        />

        {studies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studies.map((study) => {
              const title = getMetafieldValue(study.metadata?.title) || study.title
              const summary = getMetafieldValue(study.metadata?.summary)
              const category = getMetafieldValue(study.metadata?.category)
              const metric = getMetafieldValue(study.metadata?.key_metric)
              const image = study.metadata?.featured_image
              return (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="glass-card overflow-hidden group"
                >
                  {image && (
                    <img
                      src={`${image.imgix_url}?w=1000&h=560&fit=crop&auto=format,compress`}
                      alt={title}
                      width={500}
                      height={280}
                      className="w-full h-52 object-cover"
                    />
                  )}
                  <div className="p-7">
                    {category && (
                      <span className="font-mono text-[11px] text-sky uppercase tracking-widest">
                        {category}
                      </span>
                    )}
                    <h2 className="font-serif text-2xl text-ice mt-2 mb-3">{title}</h2>
                    <p className="font-sans text-sm text-powder leading-relaxed line-clamp-3">{summary}</p>
                    {metric && (
                      <p className="font-serif text-gold text-lg mt-4">{metric}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-powder font-sans">Case studies coming soon.</p>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}