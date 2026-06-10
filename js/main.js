/* ============================================================
   Incisee ROTOMATIC — Global JavaScript Engine
   ============================================================ */

'use strict';

// ── Navbar: Scroll Effect & Mobile Toggle ──────────────────
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (!navbar) return;

  // Scroll-triggered glass effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalised = href.replace(/^\.\.\//, '/').replace(/^\.\//, '/');
    if (
      (currentPath.endsWith('/') && (normalised === '/' || normalised === '/index.html')) ||
      currentPath.endsWith(normalised.split('/').pop())
    ) {
      link.classList.add('active');
    }
  });
})();


// ── Scroll Reveal ──────────────────────────────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


// ── Counter Animation ──────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 2000) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  const step = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (eased * target).toFixed(1)
      : progress < 1 ? Math.round(eased * target) : target;
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix, 2200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}
initCounters();


// ── Smooth Parallax ───────────────────────────────────────
(function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.3;
          const offset = scrollY * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ── Hero Canvas (decorative accent lines) ──────────────────
function initHeroCanvas(canvasId) {
  // No-op — particle canvas removed in light theme
}


// ── Marquee / Logo Slider ──────────────────────────────────
function initMarquee(selector) {
  const tracks = document.querySelectorAll(selector);
  tracks.forEach(track => {
    // Clone content for seamless loop
    const clone = track.innerHTML;
    track.innerHTML += clone;
  });
}
initMarquee('.marquee__track');


// ── Tab System ────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll('[data-tab-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
}
initTabs();


// ── Accordion ─────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion__item').forEach(item => {
    const header = item.querySelector('.accordion__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
initAccordions();


// ── Hyphenated Word Break Protection ──────────────────────
(function protectHyphenatedWords() {
  function walk(node) {
    if (node.nodeType === 3) {
      node.textContent = node.textContent.replace(/(\w+)-(\w+)/g, (_, a, b) => a + '\u2011' + b);
    } else if (node.nodeType === 1 && !/^(script|style|textarea|noscript)$/i.test(node.tagName)) {
      for (let child = node.firstChild; child; child = child.nextSibling) walk(child);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => walk(document.body));
  } else {
    walk(document.body);
  }
})();

// ── Utility: Format number ─────────────────────────────────
window.IR = {
  formatNum: (n) => new Intl.NumberFormat('en-IN').format(n),
  initHeroCanvas,
  animateCounter,
};
