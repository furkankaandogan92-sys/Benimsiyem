/* ==========================================================================
   kaanqnw.com — script.js
   Sayfa geçişleri · Mobil menü · Scroll reveal · Yazma efekti · Sayaçlar
   Fare ışığı · Kart eğimi · Proje filtreleme · Canlı saat
   Bağımlılık yok (vanilla JS).
   ========================================================================== */

(() => {
  "use strict";

  const $  = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- 1. Header: kaydırınca stil değişimi ---------- */
  const header = $("#siteHeader");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 2. Mobil menü ---------- */
  const toggle = $(".nav-toggle");
  const menu = $("#navMenu");

  const setMenu = (open) => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    menu.classList.toggle("open", open);
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", () => setMenu(false));
  }

  /* ---------- 3. Sayfa geçiş animasyonu ---------- */
  const isInternalPageLink = (a) => {
    if (!a || !a.href) return false;
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname) return false; // aynı sayfa / hash
    return true;
  };

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest("a");
    if (!isInternalPageLink(link)) return;

    e.preventDefault();
    const href = link.href;
    setMenu(false);

    if (prefersReducedMotion) {
      window.location.href = href;
      return;
    }
    document.body.classList.add("is-leaving");
    window.setTimeout(() => { window.location.href = href; }, 300);
  });

  // Geri/ileri (bfcache) ile dönüldüğünde geçiş sınıfını temizle
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("is-leaving");
  });

  /* ---------- 4. Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 5. Yazma efekti ---------- */
  const typedEl = $("[data-typed]");
  if (typedEl) {
    const words = (typedEl.dataset.typed || "").split("|").map((w) => w.trim()).filter(Boolean);

    if (prefersReducedMotion || words.length === 0) {
      typedEl.textContent = words[0] || "";
    } else {
      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const word = words[wordIndex];
        typedEl.textContent = word.slice(0, charIndex);

        let delay = deleting ? 38 : 85;

        if (!deleting && charIndex === word.length) {
          delay = 1700;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 380;
        } else {
          charIndex += deleting ? -1 : 1;
        }
        window.setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ---------- 6. Sayaç animasyonu ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const countObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => countObserver.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- 7. Yetenek çubukları (yüzde sayısı) ---------- */
  $$("[data-skill]").forEach((item) => {
    const bar = $(".bar", item);
    const value = parseInt(item.dataset.skill, 10);
    if (bar) bar.style.setProperty("--w", value + "%");
  });

  /* ---------- 8. Fare takip eden ışık ---------- */
  const glow = $(".cursor-glow");
  if (glow && hasFinePointer && !prefersReducedMotion) {
    let targetX = -999, targetY = -999, ticking = false;
    window.addEventListener("pointermove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          glow.style.setProperty("--cx", targetX + "px");
          glow.style.setProperty("--cy", targetY + "px");
          ticking = false;
        });
      }
    }, { passive: true });
  }

  /* ---------- 9. Cam kart ışığı + hafif 3D eğim ---------- */
  if (hasFinePointer) {
    $$(".glass").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");

        if (card.classList.contains("tilt") && !prefersReducedMotion) {
          const rx = ((y / rect.height) - 0.5) * -6;
          const ry = ((x / rect.width) - 0.5) * 6;
          card.style.setProperty("--rx", rx.toFixed(2) + "deg");
          card.style.setProperty("--ry", ry.toFixed(2) + "deg");
        }
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- 10. Proje filtreleme ---------- */
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project[data-category]");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        let order = 0;
        projectCards.forEach((card) => {
          const match = filter === "all" || card.dataset.category.split(" ").includes(filter);
          card.classList.toggle("is-hidden", !match);
          card.classList.remove("fade-in");

          if (match) {
            // Animasyonu yeniden tetiklemek için reflow
            void card.offsetWidth;
            card.style.animationDelay = order * 70 + "ms";
            card.classList.add("fade-in");
            order++;
          }
        });
      });
    });
  }

  /* ---------- 11. Canlı saat (Türkiye saati) ---------- */
  const clockEls = $$("[data-clock]");
  if (clockEls.length) {
    const formatter = new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul"
    });
    const updateClock = () => {
      const now = formatter.format(new Date());
      clockEls.forEach((el) => { el.textContent = now; });
    };
    updateClock();
    window.setInterval(updateClock, 1000);
  }

  /* ---------- 12. Footer yıl ---------- */
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
