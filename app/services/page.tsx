import Link from 'next/link'
import { getServices, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/SiteFooter'

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <PageHeader
          eyebrow="OUR SERVICES"
          title="Investment Solutions"
          subtitle="A diversified suite of strategies across equity, debt, insurance, and alternates."
        />

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const name = getMetafieldValue(service.metadata?.name) || service.title
              const desc = getMetafieldValue(service.metadata?.short_description)
              const image = service.metadata?.featured_image
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="glass-card overflow-hidden group"
                >
                  {image && (
                    <img
                      src={`${image.imgix_url}?w=800&h=480&fit=crop&auto=format,compress`}
                      alt={name}
                      width={400}
                      height={240}
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="font-serif text-xl text-ice mb-2">{name}</h2>
                    <p className="font-sans text-sm text-powder leading-relaxed line-clamp-3">{desc}</p>
                    <span className="font-mono text-xs text-sky mt-4 inline-block group-hover:text-ice transition-colors">
                      Learn More →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-powder font-sans">No services available yet.</p>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}