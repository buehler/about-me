/*
 * Progressive enhancements for the site. Everything works without JavaScript;
 * this file adds the theme toggle, mobile menu, publication filters, BibTeX
 * copy button and – when the visitor has not asked for reduced motion –
 * subtle GSAP animations.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const hasGsap = typeof window.gsap !== 'undefined';
  const motionOK = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;

  /* ---------- Theme toggle: an explicit choice is stored, otherwise follow the OS ---------- */
  const prefersDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  $$('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const current = root.dataset.theme || (prefersDark() ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    }));

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('[data-menu]');
  const navLinks = $('#nav-links');
  if (menuBtn && navLinks) {
    const setOpen = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      navLinks.classList.toggle('is-open', open);
    };
    menuBtn.addEventListener('click', () => setOpen(menuBtn.getAttribute('aria-expanded') !== 'true'));
    navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Nav border once scrolled ---------- */
  const nav = $('[data-nav]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Highlight the section currently in view ---------- */
  const sectionLinks = $$('.nav-links a[href^="#"]');
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map(sectionLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((a) => a.classList.remove('is-current'));
        byId.get(entry.target.id)?.classList.add('is-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Publication filters (animated with GSAP Flip when available) ---------- */
  const filterButtons = $$('[data-filter]');
  const cards = $$('[data-kind]');
  filterButtons.forEach((btn) => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    const apply = () => cards.forEach((card) => { card.hidden = filter !== 'all' && card.dataset.kind !== filter; });

    if (hasGsap && window.Flip && motionOK()) {
      // Cards that have not scrolled into view yet are still faded out; show
      // them now so the filtered list is complete.
      gsap.set(cards, { opacity: 1, y: 0 });
      const state = Flip.getState(cards);
      apply();
      Flip.from(state, {
        duration: 0.55,
        ease: 'power3.inOut',
        absolute: true,
        nested: true,
        prune: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25, ease: 'power1.in' }),
        onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh(),
      });
    } else {
      apply();
    }
  }));

  /* ---------- Copy BibTeX ---------- */
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const source = $(btn.dataset.copy);
    const label = $('[data-label]', btn);
    const original = label ? label.textContent : '';
    try {
      await navigator.clipboard.writeText(source.textContent);
      btn.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents(source);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      if (label) label.textContent = 'Press Ctrl/⌘ + C';
    }
    setTimeout(() => { btn.classList.remove('is-copied'); if (label) label.textContent = original; }, 2000);
  }));

  /* ---------- Motion ---------- */
  if (!hasGsap) {
    root.classList.remove('anim-pending');
    return;
  }

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (window.Flip) gsap.registerPlugin(Flip);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const heroItems = $$('[data-hero]');
    const photo = $('[data-hero-photo]');
    const badge = $('[data-hero-badge]');
    const reveals = $$('[data-reveal]');

    // Take over from the CSS pre-hide. Only opacity is animated (never
    // visibility), so links inside not-yet-revealed content stay reachable
    // with the keyboard; focusing such content reveals it immediately.
    gsap.set(heroItems, { opacity: 0, y: 22 });
    if (photo) gsap.set(photo, { opacity: 0, y: 28, scale: 0.97 });
    if (badge) gsap.set(badge, { opacity: 0, y: 12 });
    gsap.set(reveals, { opacity: 0, y: 26 });
    root.classList.remove('anim-pending');

    const revealOnFocus = (e) => {
      const el = e.target.closest('[data-reveal]');
      if (el && gsap.getProperty(el, 'opacity') < 1) gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
    };
    document.addEventListener('focusin', revealOnFocus);

    // Hero entrance: one short, staggered sequence.
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro.to(heroItems, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 });
    if (photo) intro.to(photo, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, 0.15);
    if (badge) intro.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, '-=0.45');

    if (!window.ScrollTrigger) {
      gsap.to(reveals, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 });
      return;
    }

    // Content fades up once as it enters the viewport.
    ScrollTrigger.batch(reveals, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });

    // Journey: the accent line grows with scroll progress through the timeline.
    const timeline = $('[data-timeline]');
    const progress = $('[data-timeline-progress]');
    if (timeline && progress) {
      gsap.fromTo(progress, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      });
    }

    // Gentle depth on the portrait while the hero scrolls away.
    if (photo) {
      gsap.to(photo, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: photo, start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // Re-measure once web fonts have settled.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('focusin', revealOnFocus);
      root.classList.remove('anim-pending');
    };
  });

  // Reduced motion: make sure nothing stays hidden.
  mm.add('(prefers-reduced-motion: reduce)', () => {
    root.classList.remove('anim-pending');
    gsap.set('[data-hero], [data-hero-photo], [data-hero-badge], [data-reveal]', { clearProps: 'all' });
  });
})();
