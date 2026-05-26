'use client'
import { useState } from 'react'

const WA_BASE = 'https://wa.me/5519992438604?text='
const f    = '"DM Sans", sans-serif'
const blue = '#2f80ed'
const ink  = '#0a0a0a'

const TEAM = [
  { value: 'autonomo', label: 'Só eu',    sub: 'Autônomo' },
  { value: '2-10',     label: '2 – 10',   sub: 'pessoas'  },
  { value: '10-50',    label: '10 – 50',  sub: 'pessoas'  },
  { value: '50+',      label: '50+',      sub: 'pessoas'  },
]

const inp = (err) => ({
  fontFamily: f, fontSize: '0.9375rem', color: ink,
  background: '#fff', width: '100%', boxSizing: 'border-box',
  border: `1.5px solid ${err ? '#e53e3e' : 'rgba(0,0,0,0.13)'}`,
  padding: '11px 14px', outline: 'none',
  minHeight: 46, transition: 'border-color 0.15s',
})

export default function CtaFinal() {
  const [form, setForm]       = useState({ nome: '', email: '', telefone: '', empresa: '', equipe: '' })
  const [errors, setErrors]   = useState({})
  const [result, setResult]   = useState(null) // 'qualified' | 'disqualified'
  const [loading, setLoading] = useState(false)

  function set(field, value) {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Obrigatório'

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    if (!form.email.trim()) e.email = 'Obrigatório'
    else if (!emailOk)      e.email = 'E-mail inválido'

    const telDigits = form.telefone.replace(/\D/g, '')
    if (!form.telefone.trim())      e.telefone = 'Obrigatório'
    else if (telDigits.length < 10) e.telefone = 'Número inválido'

    if (!form.empresa.trim()) e.empresa = 'Obrigatório'
    if (!form.equipe)         e.equipe  = 'Selecione'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:     form.nome,
          email:    form.email,
          telefone: form.telefone,
          empresa:  form.empresa,
          tamanho:  form.equipe,
        }),
      })
    } catch (_) {
      // salva no Notion em background, não bloqueia o fluxo
    }

    setLoading(false)

    if (form.equipe === 'autonomo') {
      setResult('disqualified')
      return
    }

    const msg = `Olá Julio! Acabei de preencher o formulário no site da Rupto AI e quero agendar meu Diagnóstico Gratuito.`
    window.open(WA_BASE + encodeURIComponent(msg), '_blank', 'noopener,noreferrer')
    setResult('qualified')
  }

  /* ── Tela: desqualificado (autônomo) ── */
  if (result === 'disqualified') return (
    <section id="agendar" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 520, textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 56, height: 56, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h2 style={{ fontFamily: f, fontWeight: 800, fontSize: '1.5rem', color: ink, letterSpacing: '-0.03em', marginBottom: 14 }}>
          Obrigado, {form.nome.split(' ')[0]}.
        </h2>
        <p style={{ fontFamily: f, color: '#555', fontSize: '1rem', lineHeight: 1.7 }}>
          Nossos sistemas são feitos pra operações com equipe. Assim que isso mudar, a Rupto é a primeira ligação que você faz.
        </p>
        <a href="https://www.linkedin.com/company/ruptoai/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f, fontSize: '0.875rem', color: blue, fontWeight: 600, display: 'inline-block', marginTop: 20 }}>
          Nos siga no LinkedIn →
        </a>
      </div>
    </section>
  )

  /* ── Tela: qualificado (WhatsApp aberto) ── */
  if (result === 'qualified') return (
    <section id="agendar" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 480, textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 56, height: 56, background: 'rgba(47,128,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="26" height="26" fill="none" stroke={blue} strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 style={{ fontFamily: f, fontWeight: 800, fontSize: '1.75rem', color: ink, letterSpacing: '-0.03em', marginBottom: 12 }}>
          Tudo certo, {form.nome.split(' ')[0]}!
        </h2>
        <p style={{ fontFamily: f, color: '#555', fontSize: '1rem', lineHeight: 1.65 }}>
          Sua aplicação foi aprovada. Abrimos uma conversa pra você — é só enviar a mensagem e escolher o melhor horário pro seu Diagnóstico.
        </p>
      </div>
    </section>
  )

  /* ── Form principal ── */
  return (
    <section
      id="agendar"
      className="scroll-mt-16"
      style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }} className="form-outer">

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* ── Esquerda: pitch ── */}
          <div>
            <span style={{ fontFamily: f, fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: blue, display: 'block', marginBottom: 14 }}>
              Diagnóstico Gratuito
            </span>
            <h2 style={{ fontFamily: f, fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: ink, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
              Agende seu Diagnóstico Operacional
            </h2>
            <p style={{ fontFamily: f, color: '#555', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 32, maxWidth: '42ch' }}>
              Preencha o formulário. Se sua operação tiver o perfil certo, entramos em contato na hora pra escolher o melhor horário.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { path: 'M5 13l4 4L19 7',                                                                                                                                                                                        text: '100% gratuito, sem compromisso'      },
                { path: 'M13 10V3L4 14h7v7l9-11h-7z',                                                                                                                                                                            text: 'Você fala direto com o fundador'     },
                { path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',      text: 'Seus dados não saem daqui'           },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, background: 'rgba(47,128,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" fill="none" stroke={blue} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.path}/></svg>
                  </div>
                  <span style={{ fontFamily: f, fontSize: '0.9rem', color: '#444' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Direita: card do form ── */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Nome */}
              <div>
                <label htmlFor="f-nome" style={{ fontFamily: f, fontWeight: 600, fontSize: '0.8125rem', color: errors.nome ? '#e53e3e' : '#333', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  Seu nome {errors.nome && <span style={{ fontWeight: 400 }}>{errors.nome}</span>}
                </label>
                <input id="f-nome" type="text" placeholder="João Silva"
                  value={form.nome} onChange={e => set('nome', e.target.value)}
                  style={inp(errors.nome)}
                  onFocus={e => { if (!errors.nome) e.target.style.borderColor = blue }}
                  onBlur={e => { if (!errors.nome) e.target.style.borderColor = 'rgba(0,0,0,0.13)' }}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="f-email" style={{ fontFamily: f, fontWeight: 600, fontSize: '0.8125rem', color: errors.email ? '#e53e3e' : '#333', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  Seu melhor e-mail {errors.email && <span style={{ fontWeight: 400 }}>{errors.email}</span>}
                </label>
                <input id="f-email" type="email" placeholder="joao@empresa.com"
                  value={form.email} onChange={e => set('email', e.target.value)}
                  style={inp(errors.email)}
                  onFocus={e => { if (!errors.email) e.target.style.borderColor = blue }}
                  onBlur={e => { if (!errors.email) e.target.style.borderColor = 'rgba(0,0,0,0.13)' }}
                />
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="f-tel" style={{ fontFamily: f, fontWeight: 600, fontSize: '0.8125rem', color: errors.telefone ? '#e53e3e' : '#333', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  Telefone (com DDD) {errors.telefone && <span style={{ fontWeight: 400 }}>{errors.telefone}</span>}
                </label>
                <input id="f-tel" type="tel" placeholder="(19) 99999-9999"
                  value={form.telefone} onChange={e => set('telefone', e.target.value)}
                  style={inp(errors.telefone)}
                  onFocus={e => { if (!errors.telefone) e.target.style.borderColor = blue }}
                  onBlur={e => { if (!errors.telefone) e.target.style.borderColor = 'rgba(0,0,0,0.13)' }}
                />
              </div>

              {/* Empresa */}
              <div>
                <label htmlFor="f-empresa" style={{ fontFamily: f, fontWeight: 600, fontSize: '0.8125rem', color: errors.empresa ? '#e53e3e' : '#333', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  Nome da empresa {errors.empresa && <span style={{ fontWeight: 400 }}>{errors.empresa}</span>}
                </label>
                <input id="f-empresa" type="text" placeholder="Empresa XYZ"
                  value={form.empresa} onChange={e => set('empresa', e.target.value)}
                  style={inp(errors.empresa)}
                  onFocus={e => { if (!errors.empresa) e.target.style.borderColor = blue }}
                  onBlur={e => { if (!errors.empresa) e.target.style.borderColor = 'rgba(0,0,0,0.13)' }}
                />
              </div>

              {/* Tamanho da equipe */}
              <div>
                <div style={{ fontFamily: f, fontWeight: 600, fontSize: '0.8125rem', color: errors.equipe ? '#e53e3e' : '#333', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Tamanho da equipe</span>
                  {errors.equipe && <span style={{ fontWeight: 400 }}>{errors.equipe}</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {TEAM.map(opt => {
                    const sel = form.equipe === opt.value
                    return (
                      <button key={opt.value} type="button" onClick={() => set('equipe', opt.value)}
                        aria-pressed={sel}
                        style={{ fontFamily: f, cursor: 'pointer', border: `1.5px solid ${sel ? blue : 'rgba(0,0,0,0.12)'}`, background: sel ? 'rgba(47,128,237,0.06)' : '#fff', padding: '9px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transition: 'all 0.15s' }}>
                        <span style={{ fontFamily: f, fontWeight: 700, fontSize: '0.9375rem', color: sel ? blue : ink, lineHeight: 1.2 }}>{opt.label}</span>
                        <span style={{ fontFamily: f, fontSize: '0.6875rem', color: sel ? blue : '#888', lineHeight: 1.2 }}>{opt.sub}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ fontFamily: f, fontWeight: 700, fontSize: '0.9375rem', color: '#fff', background: loading ? '#7aabf0' : blue, border: 'none', padding: '14px 20px', width: '100%', cursor: loading ? 'not-allowed' : 'pointer', minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'opacity 0.2s', marginTop: 4 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Verificando aplicação...
                  </>
                ) : (
                  <>
                    Quero meu Diagnóstico Gratuito
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontFamily: f, fontSize: '0.6875rem', color: '#bbb', textAlign: 'center', margin: 0 }}>
                Sem spam. Sem enrolação.
              </p>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .form-outer { padding: 32px 16px !important; }
        }
      `}</style>
    </section>
  )
}
