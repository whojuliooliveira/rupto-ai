'use client'
import { useEffect, useRef } from 'react'

export function StaggerContainer({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('stagger-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`stagger-container ${className}`}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <div className={`stagger-item ${className}`}>
      {children}
    </div>
  )
}
