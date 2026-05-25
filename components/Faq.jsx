'use client'
import { useState } from 'react'
import FadeUp from './ui/FadeUp'

const f    = '"DM Sans", sans-serif'
const blue = '#2f80ed'
const ink  = '#0a0a0a'

const FAQS = [
  {
    q: 'A IA vai substituir minha equipe atual?',
    a: 'Não. Nossas infraestruturas são construídas para substituir o "trabalho braçal" e as tarefas repetitivas, liberando sua equipe para focar no que realmente traz lucro: relacionamento, estratégia e fechamento de vendas.',
  },
  {
    q: 'Preciso ter conhecimento técnico para usar os sistemas?',
    a: 'Zero. Nós fazemos todo o mapeamento, o desenvolvimento complexo e a integração nos bastidores. Sua equipe continuará usando as ferramentas que já usa — como WhatsApp, planilhas ou o seu CRM atual — mas de forma automatizada.',
  },
  {
    q: 'Como funciona se o sistema apresentar algum problema?',
    a: 'A fase 03 do nosso método (Adotar) garante que você nunca fique sozinho. Monitoramos o sistema nos primeiros dias de uso e oferecemos suporte contínuo para refinar a infraestrutura conforme a sua empresa cresce.',
  },
  {
    q: 'O Diagnóstico é realmente gratuito? O que vocês ganham com isso?',
    a: 'Sim, 100% gratuito. Fazemos isso porque a única forma de garantirmos que podemos construir uma infraestrutura lucrativa para você é mapeando sua operação primeiro. Se não houver gargalos que a IA possa resolver com alto retorno, nós seremos os primeiros a dizer.',
  },
]

function Item({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
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
          {FAQS.map((item, i) => <Item key={i} {...item} defaultOpen={i === 0} />)}
        </div>

      </div>
    </section>
  )
}
