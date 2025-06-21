// src/scripts/initHeader.js

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');
  const hero = document.querySelector('.hero'); // Assicurati che la hero abbia la classe .hero
  const spacer = document.getElementById('header-spacer');

  if (!header) {
    console.warn('Header element (#main-header) not found.');
    return;
  }

  const headerHeight = header.offsetHeight;

  function updateHeaderStickyState() {
    if (!hero) { // Se non c'è hero, rendi sticky dopo un po' di scroll
      if (window.scrollY > 200) {
        header.classList.add('sticky');
        if (spacer) spacer.style.height = `${headerHeight}px`;
      } else {
        header.classList.remove('sticky');
        if (spacer) spacer.style.height = '0px';
      }
      return;
    }

    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    
    // Diventa sticky quando il fondo della hero esce dalla viewport MENO l'altezza della header
    // O più semplicemente, quando la cima della finestra supera il fondo della hero meno l'altezza dell'header.
    // Per far sì che la header diventi sticky APPENA la hero esce:
    if (window.scrollY > hero.offsetHeight - headerHeight) {
      header.classList.add('sticky');
      if (spacer) spacer.style.height = `${headerHeight}px`;
    } else {
      header.classList.remove('sticky');
      if (spacer) spacer.style.height = '0px';
    }
  }

  window.addEventListener('scroll', updateHeaderStickyState);
  updateHeaderStickyState(); // Esegui al caricamento per stato iniziale corretto

  // --- Logica menu mobile (invariata) ---
  const menuBtn = header.querySelector('button.md\\:hidden');
  let mobileNav = document.querySelector('.mobile-nav'); // Cerca nel body se creato prima

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
    if(mobileNav) {
      mobileNav.classList.remove('translate-x-full');
      mobileNav.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeMobileNav() {
    if(mobileNav) {
      mobileNav.classList.remove('translate-x-0');
      mobileNav.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
  }

  menuBtn?.addEventListener('click', openMobileNav);
  mobileNav?.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && (target.classList.contains('close-mobile-nav') || target.classList.contains('nav-link'))) {
      closeMobileNav();
    }
  });
}); 