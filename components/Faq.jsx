'use client'
import { useState, useRef } from 'react'
import FadeUp from './ui/FadeUp'

const f    = '"DM Sans", sans-serif'
const blue = '#2f80ed'
const ink  = '#0a0a0a'

const FAQS = [
  {
    q: 'A IA vai substituir minha equipe atual?',
    a: 'Não. Os sistemas são construídos para eliminar o trabalho braçal e as tarefas repetitivas, liberando sua equipe para focar no que realmente traz resultado: relacionamento, estratégia e fechamento.',
  },
  {
    q: 'Preciso ter conhecimento técnico para usar os sistemas?',
    a: 'Zero. Fazemos todo o mapeamento, o desenvolvimento e a integração nos bastidores. Sua equipe continua usando as ferramentas que já usa — WhatsApp, planilhas, CRM — só que de forma automatizada.',
  },
  {
    q: 'Quanto tempo leva pra ter o sistema funcionando?',
    a: 'Depende do que mapeamos no diagnóstico. Projetos simples ficam prontos em 2 a 3 semanas. Os mais complexos, de 4 a 8 semanas. Em todo caso, você sabe o prazo exato antes de fechar qualquer coisa.',
  },
  {
    q: 'Quanto custa?',
    a: 'Não existe pacote fixo — o valor depende do que faz sentido pra sua operação. O diagnóstico é gratuito e é nele que definimos o escopo. Só depois disso apresentamos o investimento, sem surpresa.',
  },
  {
    q: 'O Diagnóstico é realmente gratuito? O que vocês ganham com isso?',
    a: 'Sim, 100% gratuito. A única forma de garantirmos que podemos construir algo lucrativo pra você é mapeando sua operação primeiro. Se não houver gargalos com alto retorno, somos os primeiros a dizer.',
  },
]

function Item({ q, a, open, onToggle }) {
  const btnRef = useRef(null)

  function handleClick() {
    if (open && btnRef.current) {
      // ancora o botão na tela antes de fechar, evitando o salto
      const top = btnRef.current.getBoundingClientRect().top
      onToggle()
      requestAnimationFrame(() => {
        const newTop = btnRef.current?.getBoundingClientRect().top ?? top
        window.scrollBy({ top: newTop - top, behavior: 'instant' })
      })
    } else {
      onToggle()
    }
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      <button
        ref={btnRef}
        onClick={handleClick}
        aria-expanded={open}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', textAlign: 'left' }}
      >
        <span style={{ fontFamily: f, fontWeight: 700, fontSize: '1rem', color: ink, lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: blue, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
          </svg>
        </span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.2s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontFamily: f, fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, paddingBottom: 20, marginTop: 0 }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.07)', padding: '72px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        <FadeUp style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: f, fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: blue, display: 'block', marginBottom: 12 }}>
            Dúvidas frequentes
          </span>
          <h2 style={{ fontFamily: f, fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Perguntas que todo fundador faz
          </h2>
        </FadeUp>

        <div>
          {FAQS.map((item, i) => (
            <Item
              key={i}
              {...item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
