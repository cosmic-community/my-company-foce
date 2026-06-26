// app/services/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getService, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const name = getMetafieldValue(service.metadata?.name) || service.title
  const desc = getMetafieldValue(service.metadata?.short_description)
  const content = getMetafieldValue(service.metadata?.content)
  const image = service.metadata?.featured_image

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-4xl mx-auto">
        <Link href="/services" className="font-mono text-xs text-sky hover:text-ice transition-colors">
          ← Back to Services
        </Link>
        <p className="font-mono text-[13px] tracking-[0.3em] text-sky mt-8 mb-3">SERVICE</p>
        <h1 className="font-serif text-4xl md:text-6xl text-ice leading-tight mb-6">{name}</h1>
        <p className="font-sans font-light text-powder text-lg mb-10">{desc}</p>

        {image && (
          <img
            src={`${image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={name}
            width={800}
            height={400}
            className="w-full rounded-sm mb-10 object-cover"
          />
        )}

        {content && (
          <div
            className="font-sans text-powder leading-relaxed prose-invert max-w-none [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
      <SiteFooter />
    </main>
  )
}