'use client'
import { useEffect, useRef } from 'react'

export default function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`
          el.classList.add('fade-up-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-up-init ${className}`}>
      {children}
    </div>
  )
}
