import { animateHeaderOnScroll } from './animations.js';

window.addEventListener('DOMContentLoaded', () => {
  animateHeaderOnScroll('#main-header', '.hero');

  // Logica menu mobile
  const header = document.getElementById('main-header');
  const menuBtn = header?.querySelector('button.md\\:hidden');
  let mobileNav = header?.querySelector('.mobile-nav');

  // Se il markup mobile-nav non esiste, lo creo dinamicamente
  if (!mobileNav) {
    mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 translate-x-full md:hidden';
    mobileNav.innerHTML = `
      <a href="/" class="nav-link text-gray-900 text-2xl">Home</a>
      <a href="/about" class="nav-link text-gray-900 text-2xl">Chi Siamo</a>
      <a href="/services" class="nav-link text-gray-900 text-2xl">Servizi</a>
      <a href="/contact" class="nav-link text-gray-900 text-2xl">Contatti</a>
      <button class="close-mobile-nav absolute top-6 right-6 text-3xl">&times;</button>
    `;
    document.body.appendChild(mobileNav);
  }

  function openMobileNav() {
    mobileNav.classList.remove('translate-x-full');
    mobileNav.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('translate-x-0');
    mobileNav.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', openMobileNav);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-mobile-nav') || e.target.classList.contains('nav-link')) {
      closeMobileNav();
    }
  });
}); 