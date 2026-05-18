import FadeUp from './ui/FadeUp'
import { StaggerContainer, StaggerItem } from './ui/StaggerContainer'
import { steps } from '@/data/processo'

export default function Processo() {
  return (
    <section id="processo" className="relative py-16 sm:py-20 md:py-28 scroll-mt-20 overflow-hidden" style={{ background: '#f7f8fa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>

      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(47,128,237,0.025) 0px, rgba(47,128,237,0.025) 1px, transparent 1px, transparent 40px)',
      }} />

      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(47,128,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10px', right: '-10px',
        width: 200, height: 200, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(47,128,237,0.12) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 80% 20%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 80% 20%, black 40%, transparent 100%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <FadeUp className="mb-10 sm:mb-16 text-center">
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1d6fd8', display: 'block', marginBottom: 14 }}>
            Como funciona
          </span>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Como a Rupto entra na sua empresa
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-16">
          {steps.map(s => (
            <StaggerItem key={s.num}>
              <div className="bg-white border border-black/[0.06] p-6 sm:p-8 flex flex-col relative hover:shadow-md hover:-translate-y-1 transition-[transform,box-shadow] duration-200 h-full group">
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6875rem', color: '#1d6fd8', fontWeight: 600, position: 'absolute', top: 20, right: 20 }}>{s.num}</span>
                <div className="w-10 h-10 border border-[#2f80ed]/30 bg-[#2f80ed] flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: '#0a0a0a', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.6875rem', color: '#1d6fd8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                  {s.subtitle}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#1d6fd8', fontSize: '0.625rem', marginTop: 4, flexShrink: 0 }}>▸</span>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9375rem', color: '#666', lineHeight: 1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
