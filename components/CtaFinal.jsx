import FadeUp from './ui/FadeUp'

const WA = 'https://wa.me/5519992438604?text=Vim%20pelo%20site%20da%20Rupto.%20Quero%20o%20diagn%C3%B3stico%20gratuito.'

export default function CtaFinal() {
  return (
    <section id="agendar" className="relative scroll-mt-20 overflow-hidden" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>

      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 2, background: '#2f80ed', pointerEvents: 'none' }} />

      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,128,237,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '-6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,128,237,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: 200, height: 200, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(47,128,237,0.12) 1px, transparent 1px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse 60% 60% at 80% 80%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 80% 80%, black 40%, transparent 100%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '-10px', left: '-10px', width: 180, height: 180, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(47,128,237,0.1) 1px, transparent 1px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse 60% 60% at 20% 20%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 20% 20%, black 40%, transparent 100%)' }} />

      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center text-center">

          <FadeUp className="mb-8 sm:mb-10 max-w-3xl">
            <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 5vw, 3.25rem)', color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1.25rem' }}>
              Descubra onde sua operação está travando
            </h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#444', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 600, marginBottom: 12 }}>
              Você sai do diagnóstico sabendo exatamente o que está custando tempo e dinheiro, e o que a gente constrói pra resolver
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center font-semibold text-sm text-white bg-[#2f80ed] px-8 py-4 hover:opacity-85 transition-opacity duration-200"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Diagnóstico Gratuito →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
