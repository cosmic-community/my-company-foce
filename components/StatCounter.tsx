'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export default function StatCounter({ value, prefix = '', suffix = '', label }: StatCounterProps) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const startTime = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, value])

  return (
    <div ref={ref} className="text-left">
      <div className="font-serif text-4xl md:text-5xl text-ice">
        {prefix}
        {display.toLocaleString('en-IN')}
        {suffix}
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-sky mt-2">{label}</div>
    </div>
  )
}