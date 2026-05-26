import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Processo from "@/components/Processo";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

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

const BASE = 'https://www.ruptoai.com'
const OG_IMAGE = `${BASE}/api/og-image`

export default function Home() {
  return (
    <>
      <Head>
        <title>Rupto AI — Sua operação funcionando sem depender de processo manual</title>
        <meta name="description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando. Diagnóstico gratuito, sem compromisso." />
        <meta name="author" content="Rupto AI" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE}/`} />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${BASE}/`} />
        <meta property="og:title"       content="Sua operação cresce, mas os processos não acompanham — Rupto AI" />
        <meta property="og:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando. Diagnóstico gratuito." />
        <meta property="og:image"       content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type"   content="image/svg+xml" />
        <meta property="og:locale"      content="pt_BR" />
        <meta property="og:site_name"   content="Rupto AI" />

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Sua operação cresce, mas os processos não acompanham — Rupto AI" />
        <meta name="twitter:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando." />
        <meta name="twitter:image"       content={OG_IMAGE} />

        {/* Structured Data — ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Rupto AI",
              url: BASE,
              description: "Identificamos onde sua operação perde tempo e construímos os sistemas que resolvem — do zero ao funcionando. Sem promessa, sem consultoria que some depois.",
              slogan: "Sua operação cresce, mas os processos não acompanham.",
              areaServed: "BR",
              availableLanguage: "Portuguese",
              priceRange: "$$",
              sameAs: ["https://www.linkedin.com/company/ruptoai/"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: "Portuguese",
                url: "https://wa.me/5519992438604",
              },
            }),
          }}
        />

        {/* Structured Data — FAQPage (aparece nos resultados do Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            }),
          }}
        />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <Processo />
        <CtaFinal />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
