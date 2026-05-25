import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Processo from "@/components/Processo";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rupto AI — Sua operação funcionando sem depender de processo manual</title>
        <meta name="description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando. Diagnóstico gratuito, sem compromisso." />
        <meta name="keywords" content="diagnóstico operacional, sistemas para empresas, processos manuais, operação eficiente, Rupto AI, gargalo operacional, sistemas sob medida" />
        <meta name="author" content="Rupto AI" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ruptoai.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruptoai.com/" />
        <meta property="og:title" content="Sua operação cresce, mas os processos não acompanham — Rupto AI" />
        <meta property="og:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando. Diagnóstico gratuito." />
        <meta property="og:image" content="https://ruptoai.com/og-image.png" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Rupto AI" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sua operação cresce, mas os processos não acompanham — Rupto AI" />
        <meta name="twitter:description" content="Identificamos onde seu negócio perde tempo e construímos os sistemas que resolvem, do zero ao funcionando." />
        <meta name="twitter:image" content="https://ruptoai.com/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Rupto AI",
              url: "https://ruptoai.com",
              description: "Identificamos onde sua operação perde tempo e construímos os sistemas que resolvem — do zero ao funcionando. Sem promessa, sem consultoria que some depois.",
              slogan: "Sua operação cresce, mas os processos não acompanham.",
              areaServed: "BR",
              availableLanguage: "Portuguese",
              priceRange: "$$",
              sameAs: [
                "https://www.linkedin.com/company/ruptoai/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                contactOption: "TollFree",
                availableLanguage: "Portuguese",
                url: "https://wa.me/5519992438604?text=Vim%20pelo%20site%20da%20Rupto.%20Quero%20o%20diagn%C3%B3stico%20gratuito.",
              },
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
