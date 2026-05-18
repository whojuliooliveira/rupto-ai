import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Processo from "@/components/Processo";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rupto AI — Implementação de IA para Operações Empresariais</title>
        <meta name="description" content="A Rupto AI identifica onde seu negócio perde tempo e constrói os sistemas de IA que resolvem, do zero ao funcionando. Diagnóstico gratuito e sem compromisso." />
        <meta name="keywords" content="implementação de IA, inteligência artificial para empresas, sistemas de IA, agentes de IA, consultoria IA, IA nas operações, Rupto AI" />
        <meta name="author" content="Rupto AI" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ruptoai.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruptoai.com/" />
        <meta property="og:title" content="Rupto AI — Implementação de IA para Operações Empresariais" />
        <meta property="og:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas de IA que resolvem, do zero ao funcionando. Diagnóstico gratuito." />
        <meta property="og:image" content="https://ruptoai.com/og-image.png" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Rupto AI" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rupto AI — Implementação de IA para Operações Empresariais" />
        <meta name="twitter:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas de IA que resolvem, do zero ao funcionando." />
        <meta name="twitter:image" content="https://ruptoai.com/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rupto AI",
              url: "https://ruptoai.com",
              description: "Implementamos sistemas de IA nas operações de empresas — do diagnóstico ao funcionando.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Portuguese",
              },
              sameAs: [
                "https://www.linkedin.com/company/ruptoai/",
                "https://wa.me/5519992438604",
              ],
            }),
          }}
        />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <Processo />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
