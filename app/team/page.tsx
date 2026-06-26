import { getTeamMembers, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/SiteFooter'

export default async function TeamPage() {
  const members = await getTeamMembers()

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <PageHeader
          eyebrow="OUR TEAM"
          title="The People Behind the Strategy"
          subtitle="Seasoned advisors with deep expertise across India's financial markets."
        />

        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => {
              const fullName = getMetafieldValue(member.metadata?.full_name) || member.title
              const role = getMetafieldValue(member.metadata?.role)
              const credentials = getMetafieldValue(member.metadata?.credentials)
              const bio = getMetafieldValue(member.metadata?.bio)
              const photo = member.metadata?.photo
              return (
                <div key={member.id} className="glass-card overflow-hidden">
                  {photo && (
                    <img
                      src={`${photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                      alt={fullName}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="font-serif text-xl text-ice">{fullName}</h2>
                    <p className="font-mono text-xs text-sky uppercase tracking-widest mt-1">{role}</p>
                    {credentials && (
                      <p className="font-sans text-xs text-powder/80 mt-2">{credentials}</p>
                    )}
                    <p className="font-sans text-sm text-powder leading-relaxed mt-4 line-clamp-4">{bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-powder font-sans">Team profiles coming soon.</p>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}