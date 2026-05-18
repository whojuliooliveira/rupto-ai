'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const GRID = 48
const WA = 'https://wa.me/5519992438604?text=Vim%20pelo%20site%20da%20Rupto.%20Quero%20o%20diagn%C3%B3stico%20gratuito.'

export default function Hero() {
  const h1Ref      = useRef(null)
  const pRef       = useRef(null)
  const ctaRef     = useRef(null)
  const gridRef    = useRef(null)
  const contentRef = useRef(null)
  const sectionRef = useRef(null)
  const [gridOffsetY, setGridOffsetY] = useState(0)
  const [textZone,    setTextZone]    = useState(null)

  useEffect(() => {
    const els = [
      { el: h1Ref.current,  delay: 100 },
      { el: pRef.current,   delay: 250 },
      { el: ctaRef.current, delay: 380 },
    ]
    els.forEach(({ el, delay }) => {
      if (!el) return
      setTimeout(() => el.classList.add('fade-up-visible'), delay)
    })

    function alignGrid() {
      const nav = document.querySelector('nav')
      const el  = gridRef.current
      if (!nav || !el) return
      const navH   = nav.getBoundingClientRect().height
      const offset = navH % GRID
      el.style.backgroundPosition = `0px ${offset}px`
      setGridOffsetY(offset)
    }

    function measureText() {
      const content = contentRef.current
      const section = sectionRef.current
      if (!content || !section) return
      const cr = content.getBoundingClientRect()
      const sr = section.getBoundingClientRect()
      setTextZone({ x: cr.left - sr.left, y: cr.top - sr.top, w: cr.width, h: cr.height })
    }

    alignGrid(); measureText()
    window.addEventListener('resize', () => { alignGrid(); measureText() })
    return () => window.removeEventListener('resize', () => { alignGrid(); measureText() })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex flex-col justify-center items-center overflow-hidden"
      style={{ background: '#fff' }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div ref={gridRef} style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: `${GRID}px ${GRID}px`,
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, black 100%)',
        }} />
        <HeroCanvas gridOffsetY={gridOffsetY} textZone={textZone} />
      </div>

      <div ref={contentRef} className="relative z-10 w-full max-w-[92vw] sm:max-w-[680px] md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <h1
          ref={h1Ref}
          className="fade-up-init font-extrabold tracking-tight text-[#0a0a0a] mb-4 sm:mb-5 md:mb-8"
          style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          Sua operação cresce, mas os processos não acompanham
        </h1>

        <p
          ref={pRef}
          className="fade-up-init leading-relaxed mx-auto mb-8 sm:mb-10 md:mb-12"
          style={{ fontFamily: '"DM Sans", sans-serif', color: '#666', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '52ch' }}
        >
          Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando
        </p>

        <div ref={ctaRef} className="fade-up-init flex flex-col items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center font-semibold text-sm text-white bg-[#2f80ed] px-8 py-4 hover:opacity-85 transition-opacity duration-200"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Diagnóstico Gratuito →
          </a>
        </div>
      </div>
    </section>
  )
}
