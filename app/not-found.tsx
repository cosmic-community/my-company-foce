import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-midnight flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[13px] tracking-[0.3em] text-sky mb-4">404</p>
      <h1 className="font-serif text-4xl md:text-6xl text-ice mb-6">Page Not Found</h1>
      <p className="font-sans text-powder mb-8 max-w-md">
        The page you&apos;re looking for has drifted off course.
      </p>
      <Link href="/" className="btn-primary px-7 py-3 font-mono text-sm tracking-wide">
        Return Home
      </Link>
    </main>
  )
}