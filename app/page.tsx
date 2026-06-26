import { getServices, getTestimonials } from '@/lib/cosmic'
import HomeExperience from '@/components/HomeExperience'

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ])

  return <HomeExperience services={services} testimonials={testimonials} />
}