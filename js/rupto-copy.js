(function () {
  "use strict";

  const copy = {
    faq: [
      {
        question: "O que vocês fazem exatamente?",
        answer:
          "Entramos na sua operação comercial, identificamos onde você está perdendo venda e usamos IA pra resolver. Começando pelo gargalo que mais impacta seu faturamento.",
      },
      {
        question: "Quanto tempo leva pra ver resultado?",
        answer:
          "O diagnóstico leva de 5 a 7 dias úteis. A implementação do primeiro sistema acontece nos 10 a 15 dias seguintes. O tempo até o primeiro resultado depende da complexidade da operação e do gargalo identificado.",
      },
      {
        question: "Funciona pro meu tipo de empresa?",
        answer:
          "Se sua empresa tem processos de atendimento, qualificação, follow-up ou agendamento que dependem de pessoas pra funcionar, o diagnóstico vai mostrar exatamente onde a IA faz diferença pra você.",
      },
      {
        question: "Qual a diferença de vocês pra um chatbot ou ferramenta de IA?",
        answer:
          "A maioria das ferramentas é genérica e não conhece sua operação. A gente faz o diagnóstico antes de implementar qualquer coisa. É a diferença entre tomar um remédio aleatório e ir ao médico primeiro.",
      },
      {
        question: "Meu problema é muito específico. Vocês conseguem resolver?",
        answer:
          "Essa é justamente a razão do diagnóstico. Não vendemos solução pronta. Mapeamos seu problema e construímos sob medida pra ele.",
      },
      {
        question: "Quanto custa?",
        answer:
          "O diagnóstico é gratuito. A partir do que ele revelar, montamos uma proposta sob medida pra sua operação. Agende uma conversa pra entender melhor.",
      },
    ],
  };

  function textOf(element) {
    return (element && (element.innerText || element.textContent)
      ? element.innerText || element.textContent
      : "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findSection(pattern) {
    return Array.from(document.querySelectorAll("section")).find((section) =>
      pattern.test(textOf(section))
    );
  }

  function replaceExact(root, oldText, newText) {
    if (!root) return;
    Array.from(root.querySelectorAll("*")).forEach((element) => {
      if (element.children.length === 0 && textOf(element) === oldText) {
        element.textContent = newText;
      }
    });
  }

  function replaceContaining(root, fragment, newText) {
    if (!root) return;
    const candidates = Array.from(root.querySelectorAll("*")).filter(
      (element) =>
        element.children.length === 0 && textOf(element).includes(fragment)
    );
    if (candidates.length === 1) candidates[0].textContent = newText;
  }

  function bindCtas(root) {
    root.querySelectorAll("[data-rupto-scroll]").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        document
          .getElementById("lp-form")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function updateHero() {
    const hero = findSection(/DIAGNÓSTICO OPERACIONAL|DIAGNÓSTICO COMERCIAL/);
    if (!hero) return false;
    hero.dataset.ruptoCopy = "hero";
    hero.classList.add("rupto-hero-section");

    const shouldLoadVideo =
      !window.matchMedia("(max-width: 767px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !navigator.connection?.saveData;
    let video = null;

    if (shouldLoadVideo) {
      video = document.createElement("video");
      video.className = "rupto-hero-video";
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "none";
    }

    const overlay = document.createElement("div");
    overlay.className = "rupto-hero-overlay";

    const content = document.createElement("div");
    content.className = "rupto-hero";
    content.innerHTML = `
      <p class="rupto-eyebrow">DIAGNÓSTICO COMERCIAL · IA APLICADA A VENDAS E CRESCIMENTO</p>
      <h1>Sua empresa vende, mas <span class="rupto-accent">perde venda</span> todo dia por falta de estrutura.</h1>
      <p class="rupto-lead">Identificamos onde sua operação comercial está perdendo venda e usamos IA pra resolver, começando pelo gargalo que mais custa dinheiro.</p>
      <button class="rupto-cta" type="button" data-rupto-scroll>Agendar Diagnóstico <span aria-hidden="true">↗</span></button>
      <p class="rupto-support">Reunião de 30 min · Você sai sabendo exatamente onde está perdendo venda</p>
    `;

    hero.innerHTML = "";
    if (video) hero.appendChild(video);
    hero.appendChild(overlay);
    hero.appendChild(content);

    if (video) {
      const loadVideo = () => {
        if (video.dataset.loaded === "true") return;
        video.dataset.loaded = "true";
        const source = document.createElement("source");
        source.src = "/assets/video-header.mp4";
        source.type = "video/mp4";
        video.appendChild(source);
        video.load();
        video.play().catch(() => {});
      };
      const scheduleVideo = () => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(loadVideo, { timeout: 3500 });
        } else {
          window.setTimeout(loadVideo, 1800);
        }
      };
      if (document.readyState === "complete") scheduleVideo();
      else window.addEventListener("load", scheduleVideo, { once: true });
    }
    return true;
  }

  function updateProblem() {
    const section = findSection(/A maioria das empresas (está usando|implementa) IA do jeito errado/);
    if (!section) return;
    section.dataset.ruptoSection = "problem";
    const heading = section.querySelector("h2");
    if (heading)
      heading.innerHTML =
        'A maioria das empresas implementa IA <span class="rupto-accent">do jeito errado.</span>';

    [
      [
        "Elas contratam um chatbot. Assinam uma ferramenta nova. Automatizam um processo aleatório. E não muda nada.",
        "Compra um chatbot. Assina uma ferramenta nova. Automatiza um processo aleatório. E não muda nada.",
      ],
      [
        "Você sente que está apagando incêndios o dia inteiro, sem tempo para pensar estrategicamente.",
        "Você passa o dia apagando incêndio sem tempo pra pensar no que realmente importa.",
      ],
      ["Time sobrecarregado", "Time no limite"],
      [
        "Seu time está no limite, mas contratar mais pessoas não resolve, só aumenta o custo fixo.",
        "Contratar mais gente não resolve, só aumenta custo fixo. O problema está no processo, não no headcount.",
      ],
      ["Ferramentas sem resultado", "IA sem resultado"],
      [
        "Você já investiu em ferramentas de IA, automações e chatbots, mas não viu resultado real.",
        "Você já tentou chatbot, automação, ferramenta nova. Nada gerou resultado real porque ninguém mapeou o problema certo antes de implementar.",
      ],
      ["Atacando o lugar errado", "Mais lead não é a resposta"],
      [
        "Você acha que precisa de mais leads e tráfego, mas o problema pode estar em outro lugar.",
        "Você acha que precisa de mais lead e mais tráfego. Mas o problema pode estar no atendimento, no follow-up, ou no funil que vaza silenciosamente toda semana.",
      ],
    ].forEach(([oldText, newText]) => replaceExact(section, oldText, newText));
  }

  function updateHowItWorks() {
    const section = findSection(/Antes de implementar qualquer IA/);
    if (!section) return;
    const heading = section.querySelector("h2");
    if (heading)
      heading.innerHTML =
        'Antes de implementar qualquer IA, a gente descobre onde sua empresa está <span class="rupto-accent">perdendo venda.</span>';

    [
      [
        "Nosso método é simples: diagnóstico primeiro, implementação depois. Assim, cada real investido em IA vai direto para onde gera mais resultado.",
        "Diagnóstico primeiro. Implementação depois. Assim cada real investido vai direto pra onde gera resultado.",
      ],
      ["Diagnóstico Operacional", "AI Audit"],
      [
        "Entramos na sua operação e mapeamos cada processo com inteligência artificial. Identificamos o exato gargalo que está drenando mais tempo, dinheiro e energia do seu time.",
        "Entramos na sua operação comercial e mapeamos onde o processo está quebrando. Você sai com clareza sobre o gargalo que mais custa dinheiro, antes de qualquer implementação.",
      ],
      ["Mapeamento de Prioridades", "Priorização"],
      [
        "Organizamos os processos por nível de criticidade. Você descobre, com dados, qual problema resolver primeiro para ter o maior impacto no faturamento.",
        "Organizamos o que resolver primeiro com base no impacto direto no faturamento. Sem achismo, sem implementar coisa que não move o ponteiro.",
      ],
      ["Implementação de Agentes de IA", "Implementação com IA"],
      [
        "Criamos e implementamos agentes de IA sob medida para cada processo crítico. Começando pelo gargalo #1 e expandindo conforme os resultados aparecem.",
        "Montamos e operamos a solução sob medida pra cada gargalo identificado. Começando pelo mais crítico e expandindo conforme o resultado aparece.",
      ],
    ].forEach(([oldText, newText]) => replaceExact(section, oldText, newText));

    Array.from(section.querySelectorAll("*")).forEach((element) => {
      if (
        element.children.length === 0 &&
        textOf(element).startsWith("Isso não é teoria.")
      ) {
        element.remove();
      }
    });
  }

  function updateMarket() {
    const section = findSection(/MERCADO VS CLICKA|MERCADO VS RUPTO/);
    if (!section) return;
    replaceExact(section, "MERCADO VS CLICKA", "MERCADO VS RUPTO");
    const heading = section.querySelector("h2");
    if (heading)
      heading.innerHTML =
        'O mercado vende ferramenta. <span class="rupto-accent">A Rupto implementa inteligência.</span>';
    replaceExact(section, "O QUE O MERCADO FAZ", "O que o mercado faz:");
    replaceExact(section, "O QUE A CLICKA FAZ", "O que a Rupto faz:");

    const lists = section.querySelectorAll("ul");
    if (lists[0]) {
      lists[0].innerHTML =
        "<li>Vende solução genérica sem entender sua operação. IA de prateleira pra qualquer empresa. Você decide o que automatizar no escuro. Entrega e some.</li>";
    }
    if (lists[1]) {
      lists[1].innerHTML =
        "<li>Mapeia sua operação antes de propor qualquer coisa. IA sob medida pro seu gargalo específico. Mostra com dados o que priorizar. Fica responsável por continuar funcionando.</li>";
      lists[1].parentElement?.classList.add("rupto-market-card");
    }
  }

  function updateAudience() {
    const section = findSection(/Toda empresa que fatura tem gargalos|Se sua empresa tem processos que consomem tempo de funcionários/);
    if (!section) return;
    section.dataset.ruptoCopy = "audience";
    section.innerHTML = `
      <div class="rupto-audience">
        <p class="rupto-eyebrow">PARA QUEM É</p>
        <h2>Se sua empresa tem processos que consomem tempo de funcionários, tempo do dono e travam o crescimento, esse diagnóstico é pra você.</h2>
        <p class="rupto-audience-copy">Empresas que já vendem e querem vender mais com o mesmo time. Operações que dependem de atendimento, follow-up, qualificação ou agendamento. Donos que estão na operação quando deveriam estar no estratégico.</p>
        <button class="rupto-cta" type="button" data-rupto-scroll>Agendar Diagnóstico <span aria-hidden="true">↗</span></button>
        <p class="rupto-support">Reunião de 30 min · Você sai com clareza sobre seu gargalo número 1</p>
      </div>
    `;
  }

  function updateFounder() {
    const section =
      document.getElementById("lp-solution") ||
      findSection(/IA \+ Humano é melhor que só humano/);
    if (!section) return;
    section.remove();
  }

  function updatePanel() {
    const section = findSection(/SEU CONTROLE TOTAL/);
    if (!section) return;
    section.dataset.ruptoSection = "control";
    const heading = section.querySelector("h2");
    if (heading)
      heading.textContent = "Cada métrica, cada lead. Tudo num só painel.";
    Array.from(section.querySelectorAll("*")).forEach((element) => {
      if (
        element.children.length === 0 &&
        textOf(element) === "Tudo num só painel."
      ) {
        element.remove();
      }
    });
    replaceExact(
      section,
      "Visibilidade total sobre a operação do seu agente, em tempo real.",
      "Assim fica a visibilidade da sua operação comercial depois que a Rupto estrutura seu processo. Cada lead que entra, cada conversa ativa, cada follow-up pendente, em tempo real, sem você precisar abrir planilha ou perguntar pro vendedor o que está acontecendo."
    );
    section
      .querySelectorAll(".rounded-xl, .rounded-2xl")
      .forEach((card) => card.classList.add("rupto-control-card"));
  }

  function updateFaq() {
    const section = document.getElementById("faq");
    if (!section) return;
    const introHeading = section.querySelector("h2");
    if (introHeading)
      introHeading.innerHTML = 'Perguntas que empresários fazem <span class="rupto-accent">antes de agendar.</span>';
    const headings = Array.from(section.querySelectorAll("h3"));
    const buttons = Array.from(section.querySelectorAll("button"));

    copy.faq.forEach((item, index) => {
      if (headings[index]) headings[index].textContent = item.question;
      if (buttons[index]) {
        const heading = buttons[index].querySelector("h3");
        if (heading) heading.textContent = item.question;
      }
    });

    const answerTexts = Array.from(section.querySelectorAll("p")).filter(
      (paragraph) =>
        !/PERGUNTAS FREQUENTES|Perguntas que empresários/.test(textOf(paragraph))
    );
    copy.faq.forEach((item, index) => {
      if (answerTexts[index]) answerTexts[index].textContent = item.answer;
    });

  }

  function updateBooking() {
    const section = document.getElementById("lp-form");
    if (!section) return;
    replaceContaining(
      section,
      "Cada dia que esse gargalo continua ativo",
      "Cada dia que esse gargalo continua ativo, ele drena dinheiro, tempo e energia do seu time. Você não precisa de mais ferramenta, precisa de clareza sobre onde atacar primeiro."
    );
    replaceContaining(
      section,
      "Reunião de 30 min",
      "Reunião de 30 min · Você sai com clareza sobre seu gargalo número 1"
    );
    replaceExact(
      section,
      "Júlio Oliveira · Fundador",
      "Júlio Oliveira · Fundador Rupto AI"
    );
    replaceExact(
      section,
      "Julio Oliveira · Fundador",
      "Júlio Oliveira · Fundador Rupto AI"
    );
    section
      .querySelectorAll('a[href*="instagram.com/clicka"], a[href*="@clicka"]')
      .forEach((link) => link.remove());
    Array.from(section.querySelectorAll("*")).forEach((element) => {
      if (
        element.children.length === 0 &&
        /@clicka\.ia/i.test(textOf(element))
      ) {
        element.remove();
      }
    });
  }

  const linkedInSVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.34 3.1A2.16 2.16 0 1 1 5.34 7.42 2.16 2.16 0 0 1 5.34 3.1ZM3.47 8.86h3.74V20.9H3.47V8.86ZM9.55 8.86h3.58v1.65h.05c.5-.95 1.72-1.95 3.54-1.95 3.78 0 4.48 2.49 4.48 5.73v6.61h-3.73v-5.86c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1v5.96H9.55V8.86Z"></path></svg>`;

  function updateNavbarAndFooter() {
    document.querySelectorAll("nav img, header img, [role='dialog'] img, [data-radix-popper-content-wrapper] img").forEach((image) => {
      image.src = "/assets/rupto-logo.svg";
      image.alt = "Rupto AI";
    });

    document.querySelectorAll("nav *, header *, [role='dialog'] *").forEach((element) => {
      if (element.children.length === 0 && /^(CLICKA\.IA|Clicka\.IA|Clicka)$/i.test(textOf(element))) {
        element.textContent = "Rupto AI";
      }
    });

    document.querySelectorAll('nav a[href*="linkedin.com"], nav a[href*="instagram.com"], header a[href*="linkedin.com"], header a[href*="instagram.com"]').forEach((link) => {
      link.href = "https://www.linkedin.com/company/ruptoai/";
      link.setAttribute("aria-label", "LinkedIn da Rupto AI");
      link.innerHTML = linkedInSVG;
    });

    document.querySelectorAll('[role="dialog"] a[href*="linkedin.com"], [role="dialog"] a[href*="instagram.com"]').forEach((link) => {
      link.href = "https://www.linkedin.com/company/ruptoai/";
      link.setAttribute("aria-label", "LinkedIn da Rupto AI");
      link.innerHTML = linkedInSVG + " LinkedIn";
    });

    document.querySelectorAll("nav button, header button, [role='dialog'] button").forEach((button) => {
      const label = textOf(button);
      if (label === "Dashboard") { button.remove(); return; }
      if (/^Diagnóstico(?: Gratuito)?(?: · R\$197)?(?: →)?$/.test(label)) {
        button.textContent = "Diagnóstico Gratuito";
      }
    });

    const footer = document.querySelector("footer");
    if (!footer) return;
    footer.querySelectorAll("img").forEach((image) => {
      image.src = "/assets/rupto-logo.svg";
      image.alt = "Rupto AI";
    });
    footer.querySelectorAll("address").forEach((address) => address.remove());
    replaceExact(footer, "Clicka", "Rupto AI");
    replaceExact(
      footer,
      "Diagnóstico operacional e implementação de IA sob medida para empresas.",
      "IA aplicada a vendas e crescimento."
    );
    Array.from(footer.querySelectorAll("*")).forEach((element) => {
      if (element.children.length === 0 && /^© 2026 (Clicka|Rupto AI)/.test(textOf(element))) {
        element.textContent = "© 2026 Rupto AI · Todos os direitos reservados";
      }
      if (element.children.length === 0 && /@clicka\.ia/i.test(textOf(element))) {
        const toRemove = element.closest("a, li, p, span") || element;
        toRemove.remove();
      }
    });
    footer.querySelectorAll('a[href*="instagram.com"]').forEach((link) => link.remove());
    const linkedIn = Array.from(footer.querySelectorAll("a")).find(
      (link) => textOf(link) === "LinkedIn"
    );
    if (linkedIn) linkedIn.href = "https://www.linkedin.com/company/ruptoai/";
    const linkedInLinks = Array.from(footer.querySelectorAll('a[href*="linkedin.com"]'));
    linkedInLinks.slice(1).forEach((link) => link.remove());
  }

  function applyCopy() {
    if (document.documentElement.dataset.ruptoCopyV2 === "true") return true;
    if (!findSection(/DIAGNÓSTICO OPERACIONAL|DIAGNÓSTICO COMERCIAL/))
      return false;

    updateHero();
    updateProblem();
    updateHowItWorks();
    updateMarket();
    updateAudience();
    updateFounder();
    updatePanel();
    updateFaq();
    updateBooking();
    updateNavbarAndFooter();
    bindCtas(document);

    document.documentElement.dataset.ruptoCopyV2 = "true";
    return true;
  }

  function patchNode(node) {
    if (node.nodeType !== 1) return;

    node.querySelectorAll("img").forEach((img) => {
      img.loading = "lazy";
      img.decoding = "async";
      if (/clicka|lovable/i.test(img.src) || /clicka/i.test(img.alt) || !img.src || img.naturalWidth === 0) {
        img.src = "/assets/rupto-logo.svg";
        img.alt = "Rupto AI";
      }
    });

    node.querySelectorAll("*").forEach((el) => {
      if (el.children.length === 0 && /^(CLICKA\.IA|Clicka\.IA|Clicka)$/i.test(textOf(el))) {
        el.textContent = "Rupto AI";
      }
    });

    node.querySelectorAll("button").forEach((btn) => {
      const label = textOf(btn);
      if (label === "Dashboard") { btn.remove(); return; }
      if (/^Diagnóstico(?: · R\$197)?(?: Gratuito)?(?: →)?$/.test(label)) {
        btn.textContent = "Diagnóstico Gratuito";
      }
    });

    node.querySelectorAll('a[href*="instagram.com"], a[href*="linkedin.com"]').forEach((link) => {
      if (link.closest("footer") || link.closest("nav")) return;
      link.href = "https://www.linkedin.com/company/ruptoai/";
      link.setAttribute("aria-label", "LinkedIn da Rupto AI");
      link.innerHTML = linkedInSVG + "<span style='margin-left:6px'>LinkedIn</span>";
    });

    node.querySelectorAll("*").forEach((el) => {
      if (el.children.length === 0 && /@clicka\.ia/i.test(textOf(el))) {
        el.closest("a, li, span, p") ? el.closest("a, li, span, p").remove() : el.remove();
      }
    });
  }

  function start() {
    if (applyCopy()) {
      updateNavbarAndFooter();
    }
    const observer = new MutationObserver((mutations) => {
      applyCopy();
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => patchNode(node));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("error", function(e) {
    if (e.target.tagName === "IMG") {
      e.target.src = "/assets/rupto-logo.svg";
      e.target.alt = "Rupto AI";
    }
  }, true);

  start();
  document.addEventListener("DOMContentLoaded", start, { once: true });
  window.addEventListener("load", start, { once: true });
})();
