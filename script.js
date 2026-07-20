/**
 * PEDRO SILVEIRA — PORTFÓLIO
 * Scripts da página
 *
 * 1. revealOnScroll        — anima créditos e experiências ao entrarem na tela
 * 2. enableSmoothNav       — scroll suave nos links da navegação, respeitando
 *                            a altura da nav fixa no topo
 * 3. enableMobileNavToggle — abre/fecha o menu hambúrguer em tela cheia (mobile)
 */

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  enableSmoothNav();
  enableMobileNavToggle();
});

/**
 * Controla o botão hambúrguer e o overlay de menu em tela cheia no mobile:
 * abre/fecha ao clicar no botão, e fecha ao clicar em qualquer link do menu.
 */
function enableMobileNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  if (!toggle || !overlay) return;

  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('nav-open'));
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/**
 * Observa os blocos de crédito e experiência e adiciona a classe
 * "visible" (com um pequeno atraso entre eles) assim que entram
 * no viewport, disparando a animação de fade-in definida no CSS.
 */
function revealOnScroll() {
  const selectors = '.credit, .credit-film, .exp-item';
  const elements = document.querySelectorAll(selectors);

  const DELAY_BETWEEN_ITEMS_MS = 60;
  const VISIBILITY_THRESHOLD = 0.08;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * DELAY_BETWEEN_ITEMS_MS);

      observer.unobserve(entry.target);
    });
  }, { threshold: VISIBILITY_THRESHOLD });

  elements.forEach((el) => observer.observe(el));
}

/**
 * Intercepta cliques em links internos (href="#id") para rolar
 * suavemente até a seção, descontando a altura da nav fixa.
 */
function enableSmoothNav() {
  const NAV_OFFSET_EXTRA_PX = 12;
  const nav = document.querySelector('nav');
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top
        + window.scrollY
        - navHeight
        - NAV_OFFSET_EXTRA_PX;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}
