/* ============================================================
   MOKSHVERSE — Interactions v2 (no canvas stars, native cursor)
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

/* ── LOADER w/ live % counter ───────────────────────────── */
const loader = document.getElementById('loader');
const ldFill = document.querySelector('.ld-fill');
const ldPct  = document.querySelector('.ld-pct');
let pct = 0;
const ldTimer = setInterval(() => {
  pct += Math.random() * 16;
  if (pct >= 100) { pct = 100; clearInterval(ldTimer); }
  if (ldFill) ldFill.style.width = pct + '%';
  if (ldPct)  ldPct.textContent = Math.floor(pct) + '%';
}, 110);
window.addEventListener('load', () => {
  setTimeout(() => {
    pct = 100; clearInterval(ldTimer);
    if (ldFill) ldFill.style.width = '100%';
    if (ldPct)  ldPct.textContent = '100%';
    setTimeout(() => loader.classList.add('hidden'), 350);
  }, 1400);
});

/* ── SCROLL PROGRESS ────────────────────────────────────── */
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, { passive: true });

/* ── SOFT SPOTLIGHT (subtle, follows pointer) ───────────── */
const spl = document.getElementById('spl');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
if (!isTouch) {
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function rafSpl() {
    spl.style.background = `radial-gradient(circle 460px at ${mx}px ${my}px, rgba(233,200,132,.05) 0%, rgba(127,233,220,.025) 38%, transparent 72%)`;
    requestAnimationFrame(rafSpl);
  })();
}

/* ── NAV: scroll style + hide-on-down + mobile menu ─────── */
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('sc', y > 60);
  if (!document.body.classList.contains('menu-open')) {
    nav.classList.toggle('hide', y > lastY && y > 320);
  }
  lastY = y;
}, { passive: true });

const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => document.body.classList.remove('menu-open')));
}

/* ── MAGNETIC BUTTONS ───────────────────────────────────── */
if (!isTouch && !reduceMotion) {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * .25}px, ${y * .35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ── 3D TILT on glass cards ─────────────────────────────── */
if (!isTouch && !reduceMotion) {
  document.querySelectorAll('.gc').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(1100px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── GSAP HERO INTRO ────────────────────────────────────── */
if (window.gsap && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({ delay: 1.7 })
    .from('#h-logo',  { y: -70, opacity: 0, scale: .5, duration: 1.3, ease: 'elastic.out(1,.5)' })
    .from('#h-name',  { opacity: 0, y: 80, skewX: -5, duration: 1.2, ease: 'power4.out' }, '-=.3')
    .from('#h-verse', { opacity: 0, y: 24, letterSpacing: '60px', duration: 1, ease: 'power3.out' }, '-=.7')
    .from('#h-tag',   { opacity: 0, filter: 'blur(16px)', y: 16, duration: .9, ease: 'power3.out' }, '-=.4')
    .from('#h-desc',  { opacity: 0, y: 18, duration: .8, ease: 'power3.out' }, '-=.45')
    .from('#h-btn',   { opacity: 0, y: 30, scale: .85, duration: .9, ease: 'back.out(1.8)' }, '-=.4');
}

/* ── PARALLAX LOGO ──────────────────────────────────────── */
if (!reduceMotion) {
  const hLogo = document.getElementById('h-logo');
  window.addEventListener('scroll', () => {
    hLogo.style.transform = `translateY(${window.scrollY * .22}px)`;
  }, { passive: true });
}

/* ── SCROLL REVEAL (with guaranteed fallback) ───────────── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const rio = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); rio.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => rio.observe(el));
  // SAFETY NET: never let content stay invisible — reveal everything after 2.2s
  setTimeout(() => revealEls.forEach(el => el.classList.add('on')), 2200);
} else {
  // no observer / reduced motion → show immediately
  revealEls.forEach(el => el.classList.add('on'));
}

/* ── HERO GRID PULSE ────────────────────────────────────── */
if (!reduceMotion) {
  const ml = document.querySelectorAll('.ml line');
  let gf = 0;
  (function pulseGrid() {
    gf += .01;
    ml.forEach((l, i) => l.style.opacity = Math.max(.01, .055 + Math.sin(gf + i * .6) * .035));
    requestAnimationFrame(pulseGrid);
  })();
}

/* ── CONTACT FORM micro-feedback ────────────────────────── */
const form = document.querySelector('.form-wrap');
if (form) {
  const btn = form.querySelector('.btn-send');
  const txt = btn.querySelector('.bm-txt');
  const original = txt.textContent;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btn.classList.add('sent');
    txt.textContent = 'Message Sent ✓';
    setTimeout(() => { btn.classList.remove('sent'); txt.textContent = original; form.reset(); }, 2600);
  });
}
