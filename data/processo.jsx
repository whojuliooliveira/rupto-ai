export const steps = [
  {
    num: '01',
    title: 'Mapear',
    subtitle: 'Decidir o que vale resolver antes de construir qualquer coisa',
    bullets: [
      'Conversamos com você e seu time pra entender os gargalos reais',
      'Identificamos as oportunidades de maior impacto',
      'Priorizamos o que resolve mais rápido com menos esforço',
      'Você sai sabendo exatamente o que construir primeiro',
    ],
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Construir',
    subtitle: 'Construído certo pra funcionar desde o primeiro dia',
    bullets: [
      'Planejamos e desenvolvemos os sistemas do zero',
      'Integramos nas ferramentas que você já usa',
      'Testamos em ambiente real antes de colocar pra rodar',
      'Você recebe o sistema funcionando, não uma promessa',
    ],
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="square" strokeLinejoin="miter" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Adotar',
    subtitle: 'Fazer o sistema virar parte de como o trabalho acontece',
    bullets: [
      'Treinamos seu time pra usar o que foi construído',
      'Acompanhamos os primeiros dias de uso',
      'Refinamos conforme sua operação evolui',
      'Você nunca fica sozinho depois da entrega',
    ],
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
]
