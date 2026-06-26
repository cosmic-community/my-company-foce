'use client'

interface NavDotsProps {
  active: number
  count: number
  onSelect: (idx: number) => void
}

export default function NavDots({ active, count, onSelect }: NavDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          aria-label={`Go to section ${idx + 1}`}
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active === idx
              ? 'bg-sky border-sky scale-125 shadow-[0_0_12px_#4FC3F7]'
              : 'bg-transparent border-powder/40 hover:border-sky'
          }`}
        />
      ))}
    </div>
  )
}