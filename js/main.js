(function () {
  "use strict";

  function initMobileMenu() {
    const toggle = document.getElementById("navbar-menu-toggle");
    const panel = document.getElementById("navbar-mobile-panel");
    if (!toggle || !panel) return;
    toggle.addEventListener("click", function () {
      panel.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    panel.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("click", function () {
        panel.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((el) => observer.observe(el));
  }

  function initStepsTimeline() {
    const timeline = document.querySelector("[data-steps-timeline]");
    if (!timeline) return;

    const track = timeline.querySelector(".steps-track");
    const steps = Array.from(timeline.querySelectorAll(".step"));
    const nextSection = document.querySelector('[data-rupto-section="market"]');
    if (!track || steps.length === 0 || !nextSection) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      timeline.style.setProperty("--timeline-progress", "1");
      steps.forEach((step) => step.classList.add("is-active"));
      return;
    }

    let animationFrame = null;

    function updateTimeline() {
      animationFrame = null;

      const trackRect = track.getBoundingClientRect();
      const lineY = Math.min(
        window.innerHeight * 0.94,
        window.innerHeight - 24
      );
      const scrollPosition = window.scrollY;
      const trackTop = trackRect.top + scrollPosition;
      const nextSectionTop =
        nextSection.getBoundingClientRect().top + scrollPosition;
      const startScroll = trackTop - lineY;
      const completionY = window.innerHeight * 0.18;
      const endScroll = nextSectionTop - completionY;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (scrollPosition - startScroll) /
            Math.max(1, endScroll - startScroll)
        )
      );
      const activationY =
        trackRect.top + trackRect.height * progress + 80;

      timeline.style.setProperty("--timeline-progress", progress.toFixed(4));

      steps.forEach((step, index) => {
        const icon = step.querySelector(".step-icon");
        if (!icon) return;
        const iconRect = icon.getBoundingClientRect();
        const iconCenter = iconRect.top + iconRect.height / 2;
        step.classList.toggle(
          "is-active",
          index === 0 || iconCenter <= activationY
        );
      });
    }

    function requestTimelineUpdate() {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateTimeline);
    }

    window.addEventListener("scroll", requestTimelineUpdate, {
      passive: true,
    });
    window.addEventListener("touchmove", requestTimelineUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestTimelineUpdate);
    updateTimeline();
  }

  function initFaqAccordion() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const button = item.querySelector(".faq-question");
      if (!button) return;
      button.addEventListener("click", function () {
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((openItem) => {
          if (openItem !== item) openItem.classList.remove("open");
        });
        item.classList.toggle("open", !wasOpen);
        button.setAttribute("aria-expanded", String(!wasOpen));
      });
    });
  }

  function scrollToBooking() {
    const target = document.getElementById("lp-form");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  function initCtaButtons() {
    document.querySelectorAll("[data-scroll-lp]").forEach((button) => {
      button.addEventListener("click", scrollToBooking);
    });
  }

  function initCal() {
    if (window.Cal) return;
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "site", { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
  }

  let calMounted = false;
  function mountCal() {
    if (calMounted) return;
    const div = document.getElementById("my-cal-inline-site");
    if (!div) return;
    calMounted = true;
    initCal();
    Cal.ns.site("inline", {
      elementOrSelector: "#my-cal-inline-site",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "whojuliooliveira/site",
    });
    Cal.ns.site("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        dark: {
          "cal-brand": "#2563eb",
          "cal-brand-emphasis": "#1d4ed8",
          "cal-brand-text": "#ffffff",
        },
      },
    });
  }

  function observeCalSection() {
    const section = document.getElementById("lp-form");
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      mountCal();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        mountCal();
      },
      { rootMargin: "1200px 0px" }
    );
    observer.observe(section);
  }

  function init() {
    initMobileMenu();
    initScrollReveal();
    initStepsTimeline();
    initFaqAccordion();
    initCtaButtons();
    observeCalSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-scroll-lp]")) return;
    mountCal();
  });
})();
