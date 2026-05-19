'use client'
import { useEffect, useRef, useState } from 'react'

export default function FadeIn({ children, className, animationClass = 'animate-fade-in', hideUntilVisible = true }: { children: React.ReactNode; className?: string; animationClass?: string; hideUntilVisible?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={visible ? `${animationClass} ${className ?? ''}` : `${hideUntilVisible ? 'opacity-0' : ''} ${className ?? ''}`}>
      {children}
    </div>
  )
}
