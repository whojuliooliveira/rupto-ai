'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed top-0 w-full z-50"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(47,128,237,0.15)' : '1px solid rgba(0,0,0,0.07)',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-3 md:py-4 flex items-center justify-between">
        <a href="#" aria-label="Rupto AI — Página inicial" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img src="/Logo.svg" alt="" aria-hidden="true" style={{ height: 28, width: 'auto' }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#0a0a0a', fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>
            Rupto AI
          </span>
        </a>

        <a
          href="#agendar"
          aria-label="Agendar diagnóstico gratuito"
          className="hidden md:inline-flex items-center min-h-[44px] border border-[#2f80ed] text-[#2f80ed] bg-transparent px-7 py-3 font-semibold text-sm hover:bg-[#2f80ed] hover:text-white transition-colors duration-200 shrink-0"
          style={{ fontFamily: '"DM Sans", sans-serif', touchAction: 'manipulation' }}
        >
          Diagnóstico Gratuito →
        </a>
      </div>
    </nav>
  )
}
