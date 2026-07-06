"use strict";
function animateCounter(e, t, n = "", o = 2e3) {
  const a = performance.now(),
    r = t % 1 != 0,
    c = (s) => {
      const i = s - a,
        l = Math.min(i / o, 1),
        d = 1 - Math.pow(1 - l, 3),
        u = r ? (d * t).toFixed(1) : l < 1 ? Math.round(d * t) : t;
      ((e.textContent = u + n), l < 1 && requestAnimationFrame(c));
    };
  requestAnimationFrame(c);
}
function initCounters() {
  const e = document.querySelectorAll("[data-counter]");
  if (!e.length) return;
  const t = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        if (e.isIntersecting) {
          const n = e.target;
          (animateCounter(
            n,
            parseFloat(n.dataset.counter),
            n.dataset.suffix || "",
            2200,
          ),
            t.unobserve(n));
        }
      });
    },
    { threshold: 0.5 },
  );
  e.forEach((e) => t.observe(e));
}
function initHeroCanvas(e) {}
function initMarquee(e) {
  document.querySelectorAll(e).forEach((e) => {
    const t = e.innerHTML;
    e.innerHTML += t;
  });
}
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((e) => {
    const t = e.querySelectorAll("[data-tab]"),
      n = document.querySelectorAll("[data-tab-panel]");
    t.forEach((e) => {
      e.addEventListener("click", () => {
        const o = e.dataset.tab;
        (t.forEach((e) => e.classList.remove("active")),
          n.forEach((e) => e.classList.remove("active")),
          e.classList.add("active"),
          document
            .querySelector(`[data-tab-panel="${o}"]`)
            ?.classList.add("active"));
      });
    });
  });
}
function initAccordions() {
  document.querySelectorAll(".accordion__item").forEach((e) => {
    const t = e.querySelector(".accordion__header");
    t &&
      t.addEventListener("click", () => {
        const t = e.classList.contains("open");
        (document
          .querySelectorAll(".accordion__item")
          .forEach((e) => e.classList.remove("open")),
          t || e.classList.add("open"));
      });
  });
}
(!(function () {
  const e = document.querySelector(".navbar"),
    t = document.querySelector(".navbar__hamburger"),
    n = document.querySelector(".navbar__mobile");
  if (!e) return;
  const o = document.querySelector(".page-hero__bg-image"),
    a = document.querySelector(".page-hero"),
    r = o && a ? a.offsetTop + a.offsetHeight - e.offsetHeight : 20,
    c = () => {
      window.scrollY > r
        ? (e.classList.add("scrolled"), e.classList.remove("transparent"))
        : (e.classList.remove("scrolled"), e.classList.add("transparent"));
    };
  (window.addEventListener("scroll", c, { passive: !0 }),
    c(),
    t &&
      n &&
      (t.addEventListener("click", () => {
        const e = t.classList.toggle("open");
        (n.classList.toggle("open", e),
          (document.body.style.overflow = e ? "hidden" : ""));
      }),
      n.querySelectorAll("a").forEach((e) => {
        e.addEventListener("click", () => {
          (t.classList.remove("open"),
            n.classList.remove("open"),
            (document.body.style.overflow = ""));
        });
      })),
    document
      .querySelectorAll(".navbar__mobile-dropdown-header")
      .forEach((e) => {
        e.addEventListener("click", (e) => {
          if (!e.target.closest("a")) {
            e.currentTarget
              .closest(".navbar__mobile-dropdown")
              .classList.toggle("open");
          }
        });
      }));
  const s = window.location.pathname.replace(/\\/g, "/");
  document
    .querySelectorAll(".navbar__link, .navbar__mobile-link")
    .forEach((e) => {
      const t = e.getAttribute("href");
      if (!t) return;
      e.classList.remove("active");
      const n = t.replace(/^\.\.\//, "/").replace(/^\.\//, "/");
      ((s.endsWith("/") && ("/" === n || "/index.html" === n)) ||
        s.endsWith(n.split("/").pop())) &&
        e.classList.add("active");
    });
})(),
  (function () {
    const e = document.querySelectorAll("[data-reveal]");
    if (!e.length) return;
    const t = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          e.isIntersecting &&
            (e.target.classList.add("revealed"), t.unobserve(e.target));
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    e.forEach((e) => t.observe(e));
  })(),
  initCounters(),
  (function () {
    const e = document.querySelectorAll("[data-parallax]");
    if (
      !e.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let t = !1;
    window.addEventListener(
      "scroll",
      () => {
        t ||
          (requestAnimationFrame(() => {
            const n = window.scrollY;
            (e.forEach((e) => {
              const t = parseFloat(e.dataset.parallax) || 0.3,
                o = n * t;
              e.style.transform = `translateY(${o}px)`;
            }),
              (t = !1));
          }),
          (t = !0));
      },
      { passive: !0 },
    );
  })(),
  initMarquee(".marquee__track"),
  initTabs(),
  initAccordions(),
  (function () {
    function e(t) {
      if (3 === t.nodeType)
        t.textContent = t.textContent.replace(
          /(\w+)-(\w+)/g,
          (e, t, n) => t + "‑" + n,
        );
      else if (
        1 === t.nodeType &&
        !/^(script|style|textarea|noscript)$/i.test(t.tagName)
      )
        for (let n = t.firstChild; n; n = n.nextSibling) e(n);
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", () => e(document.body))
      : e(document.body);
  })(),
  (window.IR = {
    formatNum: (e) => new Intl.NumberFormat("en-IN").format(e),
    initHeroCanvas: initHeroCanvas,
    animateCounter: animateCounter,
    showCertificate: function () {
      let e = document.getElementById("iatf-modal");
      if (!e) {
        ((e = document.createElement("div")),
          (e.id = "iatf-modal"),
          (e.className = "cert-modal"),
          e.setAttribute("role", "dialog"),
          e.setAttribute("aria-modal", "true"),
          (e.innerHTML =
            '\n        <div class="cert-modal__backdrop"></div>\n        <div class="cert-modal__content">\n          <button class="cert-modal__close" aria-label="Close modal">&times;</button>\n          <div class="cert-modal__body">\n            <img src="images/IATF Quality Certificate.png" alt="IATF Quality Certificate" class="cert-modal__img">\n          </div>\n          <div class="cert-modal__footer">\n            <a href="images/IATF Quality Certificate.pdf" download class="btn btn-primary" style="display:inline-flex;align-items:center;gap:var(--sp-2);">\n              <span>📥 Download Official PDF</span>\n            </a>\n          </div>\n        </div>\n      '),
          document.body.appendChild(e));
        const t = () => {
          (e.classList.remove("open"), (document.body.style.overflow = ""));
        };
        (e.querySelector(".cert-modal__backdrop").addEventListener("click", t),
          e.querySelector(".cert-modal__close").addEventListener("click", t),
          window.addEventListener("keydown", (n) => {
            "Escape" === n.key && e.classList.contains("open") && t();
          }));
      }
      (e.classList.add("open"), (document.body.style.overflow = "hidden"));
    },
  }));
