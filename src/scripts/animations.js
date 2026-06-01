import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let _lenis = null;
let _globalsInited = false;
let _preloaderDone = false;
/** Evita listener duplicati su lenis (scroll nav) */
let _navScrollHandler = null;
/** bindHoverTargets una sola volta (delegation non necessaria se fisso) */
let _hoverBound = false;
/** Cleanup registrati a ogni init page (tilt card, magnetic) */
const _pageCleanups = [];

// ── LENIS ──────────────────────────────────
export function initLenis() {
  if (_lenis) return _lenis;
  _lenis = new Lenis({
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  _lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => _lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return _lenis;
}

// ── CURSOR ─────────────────────────────────
export function initCursor() {
  if (_globalsInited) return;
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.14, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.14, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3' });
  window.addEventListener('mousemove', e => {
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  });
}

function bindHoverTargets() {
  if (_hoverBound) return;
  _hoverBound = true;
  const sel = 'a, button, .team-card';
  document.addEventListener(
    'mouseover',
    e => {
      if (e.target.closest?.(sel)) document.body.classList.add('hovering');
    },
    true
  );
  document.addEventListener(
    'mouseout',
    e => {
      const from = e.target.closest?.(sel);
      const to = e.relatedTarget?.closest?.(sel);
      if (from && !to) document.body.classList.remove('hovering');
    },
    true
  );
}

// ── PARTICLE TRAIL ─────────────────────────
export function initParticles() {
  if (_globalsInited) return;
  let lastX = 0,
    lastY = 0,
    pTime = 0;
  window.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - pTime < 55) return;
    if (Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY) < 8) return;
    pTime = now;
    lastX = e.clientX;
    lastY = e.clientY;
    const p = document.createElement('div');
    Object.assign(p.style, {
      position: 'fixed',
      borderRadius: '50%',
      background: '#c9a227',
      pointerEvents: 'none',
      zIndex: '1',
      opacity: '0',
    });
    const s = Math.random() * 4 + 2;
    p.style.width = p.style.height = s + 'px';
    document.body.appendChild(p);
    gsap.set(p, { x: e.clientX, y: e.clientY });
    gsap.to(p, {
      opacity: 0.65,
      duration: 0.08,
      onComplete: () =>
        gsap.to(p, {
          y: `+=${Math.random() * 30 + 10}`,
          x: `+=${(Math.random() - 0.5) * 18}`,
          opacity: 0,
          scale: 0,
          duration: 0.65 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => p.remove(),
        }),
    });
  });
}

// ── STARS CANVAS ───────────────────────────
export function initStars() {
  if (_globalsInited) return;
  const cvs = document.getElementById('stars-canvas');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  if (!ctx) return;
  let stars = [],
    mx = 0,
    my = 0,
    at = 0;

  function build() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    stars = [];
    const n = Math.min(Math.floor((cvs.width * cvs.height) / 5800), 260);
    for (let i = 0; i < n; i++)
      stars.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        r: Math.random() * 1.3 + 0.2,
        ba: Math.random() * 0.6 + 0.2,
        sp: Math.random() * 0.006 + 0.001,
        ph: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.035,
      });
  }
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });
  window.addEventListener('resize', build);
  build();

  function shootingStar() {
    const sx = Math.random() * cvs.width,
      sy = Math.random() * cvs.height * 0.45;
    const angle = (35 + Math.random() * 20) * (Math.PI / 180),
      len = 80 + Math.random() * 120;
    gsap.to(
      { p: 0 },
      {
        p: 1,
        duration: 0.55 + Math.random() * 0.4,
        ease: 'power2.in',
        onUpdate: function () {
          const v = this.targets()[0].p;
          const tx = sx + Math.cos(angle) * len * v,
            ty = sy + Math.sin(angle) * len * v;
          const bx = tx - Math.cos(angle) * Math.min(len * 0.3, len * v),
            by = ty - Math.sin(angle) * Math.min(len * 0.3, len * v);
          const g = ctx.createLinearGradient(bx, by, tx, ty);
          g.addColorStop(0, 'rgba(201,162,39,0)');
          g.addColorStop(1, `rgba(232,200,74,${0.75 * (1 - v)})`);
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        },
      }
    );
  }
  setInterval(() => {
    if (Math.random() > 0.25) shootingStar();
  }, 3200);

  (function loop() {
    at += 0.012;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < stars.length; i++)
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x,
          dy = stars[i].y - stars[j].y,
          d = Math.sqrt(dx * dx + dy * dy);
        if (d < 88) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(201,162,39,${0.045 * (1 - d / 88)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    stars.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = cvs.width;
      if (s.x > cvs.width) s.x = 0;
      if (s.y < 0) s.y = cvs.height;
      if (s.y > cvs.height) s.y = 0;
      const mdx = s.x - mx,
        mdy = s.y - my,
        md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 110) {
        s.x += (mdx / md) * 0.45;
        s.y += (mdy / md) * 0.45;
      }
      const a = s.ba * (0.5 + 0.5 * Math.sin(at * s.sp * 50 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,162,39,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  })();
}

// ── NAV SCROLL ─────────────────────────────
export function initNav(lenis) {
  if (!lenis || _navScrollHandler) return;
  _navScrollHandler = ({ scroll }) => {
    document.getElementById('main-nav')?.classList.toggle('scrolled', scroll > 60);
  };
  lenis.on('scroll', _navScrollHandler);
}

// ── SPLIT TEXT ─────────────────────────────
function splitChars(el) {
  const text = el.textContent ?? '';
  el.innerHTML = '';
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = ch === ' ' ? 'sp' : 'char';
    s.textContent = ch;
    el.appendChild(s);
  });
  return el.querySelectorAll('.char');
}

// ── PRELOADER → HERO ENTRY ─────────────────
export function initPreloader(onComplete) {
  if (_preloaderDone) {
    onComplete?.();
    return;
  }
  const front = document.querySelector('.pl-front');
  const back = document.querySelector('.pl-back');
  const card = document.querySelector('.pl-card');
  if (!card) {
    _preloaderDone = true;
    onComplete?.();
    return;
  }
  gsap.set(front, { rotateY: 180 });
  gsap.timeline({ onComplete })
    .to('#pl-bar', { width: '100%', duration: 1.2, ease: 'power2.inOut' })
    .to(card, { rotateY: 180, duration: 1, ease: 'power3.inOut', transformPerspective: 900 }, '-=.1')
    .to(back, { opacity: 0, duration: 0.3 }, '-=.5')
    .to(front, { rotateY: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }, '-=.4')
    .to(card, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1 }, '+=.25')
    .to('#preloader', { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut' }, '+=.35')
    .set('#preloader', { display: 'none' })
    .call(() => {
      _preloaderDone = true;
    });
}

// ── HERO ENTRY (dopo preloader) ────────────
export function initHeroEntry() {
  const titleEl = document.getElementById('hero-title');
  // Pagine senza hero: la nav non viene animata dal timeline → resta a opacity 0 dal CSS
  if (!titleEl) {
    gsap.set(['.nav-logo', '.nav-link-wrap'], { opacity: 1, y: 0 });
    return;
  }
  const chars = splitChars(titleEl);

  gsap.set('#hero-date, .hero-btns', { y: 20 });

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.nav-logo', { opacity: 1, duration: 0.6 })
    .to('.nav-link-wrap', { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, '-=.3')
    .to('.corner-ornament', { opacity: 0.3, duration: 0.35, stagger: 0.08 }, '-=.4')
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7 }, '-=.2')
    .to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: { amount: 0.7, ease: 'power2.out' }, ease: 'back.out(1.4)' }, '-=.3')
    .to('#hero-sub', { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.9 }, '-=.3')
    .to('#hero-date', { opacity: 1, y: 0, duration: 0.6 }, '-=.4')
    .to(['.h-line-l', '.h-line-r'], { width: 80, duration: 0.7, ease: 'power2.inOut' }, '-=.3')
    .to('.hero-diamond', { scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=.4')
    .to('.hero-btns', { opacity: 1, y: 0, duration: 0.6 }, '-=.2')
    .to('.parallax-word', { opacity: 1, duration: 1 }, '-=.8');
}

// ── HERO PARALLAX ──────────────────────────
export function initHeroParallax() {
  if (!document.getElementById('hero')) return;
  gsap.to('#hero > *:not(#hero-parallax)', {
    y: 80,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
  });
  gsap.to('.parallax-word.top', {
    y: -130,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2.5 },
  });
  gsap.to('.parallax-word.bottom', {
    y: 130,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2.5 },
  });
}

// ── SECTION HEADINGS ───────────────────────
export function initSectionHeadings() {
  document.querySelectorAll('.section-heading').forEach(sh => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sh, start: 'top 78%', toggleActions: 'play none none none' } });
    const label = sh.querySelector('.sh-label');
    const rl = sh.querySelector('.reveal-line');
    const desc = sh.querySelector('.sh-desc');
    const gls = sh.querySelectorAll('.gr-line');
    const gst = sh.querySelector('.gr-star');
    if (label) tl.to(label, { opacity: 1, duration: 0.5 });
    if (rl) tl.to(rl, { y: 0, duration: 0.7, ease: 'power3.out' }, '-=.2');
    if (desc) tl.to(desc, { opacity: 1, duration: 0.6 }, '-=.3');
    if (gls.length) tl.to(gls, { scaleX: 1, duration: 0.6, stagger: 0.1 }, '-=.2');
    if (gst) tl.to(gst, { opacity: 1, duration: 0.35, ease: 'back.out(2)' }, '-=.3');
  });
}

// ── INFO CARDS ─────────────────────────────
export function initInfoCards() {
  const section = document.getElementById('info');
  if (!section) return;
  const cards = gsap.utils.toArray('.info-card');
  if (!cards.length) return;

  gsap.fromTo(
    cards,
    { y: 48, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
    },
  );
}

// ── TEAM CARDS ─────────────────────────────
export function initTeamCards() {
  const grid = document.querySelector('.teams-grid');
  if (!grid) return;
  gsap.from('.team-card', {
    opacity: 0,
    scale: 0.88,
    duration: 0.7,
    stagger: { amount: 1, from: 'start', ease: 'power2.out' },
    ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '.teams-grid', start: 'top 82%' },
  });

  const onMove = (card, e) => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    gsap.to(card, { rotateY: dx * 10, rotateX: -dy * 8, transformPerspective: 700, duration: 0.35, ease: 'power2.out', overwrite: true });
  };
  const onLeave = card => () =>
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,.7)', overwrite: true });

  document.querySelectorAll('.team-card').forEach(card => {
    const move = e => onMove(card, e);
    const leave = onLeave(card);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', leave);
    _pageCleanups.push(() => {
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', leave);
    });
  });
}

// ── STAT COUNTERS ──────────────────────────
export function initCounters() {
  gsap.from('.stat-item', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, scrollTrigger: { trigger: '#stats', start: 'top 75%' } });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = Number(el.dataset.target ?? '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () =>
        gsap.to(
          { v: 0 },
          {
            v: target,
            duration: 1.9,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = String(Math.round(this.targets()[0].v));
            },
          }
        ),
    });
  });
}

// ── MAGNETIC BUTTONS ───────────────────────
export function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    const onMove = e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.35, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.6)' });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    _pageCleanups.push(() => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    });
  });
}

export function initGlobals() {
  if (_globalsInited) return;
  initCursor();
  initParticles();
  initStars();
  bindHoverTargets();
  _globalsInited = true;
}

/**
 * Prima di reinizializzare animazioni (navigazione / View Transitions):
 * uccide tutti gli ScrollTrigger, tween orfani e listener pagina precedente.
 */
export function cleanupPageAnimations() {
  ScrollTrigger.getAll().forEach(st => st.kill());
  while (_pageCleanups.length) {
    const fn = _pageCleanups.pop();
    try {
      fn();
    } catch {
      /* ignore */
    }
  }
  gsap.killTweensOf('.team-card');
  gsap.killTweensOf('.magnetic');
  gsap.killTweensOf('.info-card');
  gsap.killTweensOf('.stat-item');
  document.body.classList.remove('hovering');
}

/** Solo per transizioni soft (es. View Transitions): azzera scroll prima dello swap DOM. */
export function resetLenisScroll() {
  if (!_lenis) return;
  try {
    _lenis.scrollTo(0, { immediate: true });
  } catch {
    /* ignore */
  }
}

export function initPageAnimations() {
  cleanupPageAnimations();
  bindHoverTargets();
  initHeroEntry();
  initHeroParallax();
  initSectionHeadings();
  initInfoCards();
  initTeamCards();
  initCounters();
  initMagneticButtons();
  ScrollTrigger.refresh();
}

