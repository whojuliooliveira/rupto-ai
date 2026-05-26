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
