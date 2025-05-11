// Importiamo GSAP e ScrollTrigger
const initGSAP = async () => {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  
  gsap.registerPlugin(ScrollTrigger);
  return gsap;
};

// Animazioni dell'header
export const initHeaderAnimations = async () => {
  const gsap = await initGSAP();

  // Animazione del logo
  gsap.from('.logo-container', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
  });

  // Animazione dei link di navigazione
  gsap.from('.nav-link', {
    duration: 0.8,
    y: -20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.3
  });
};

// Animazioni del footer
export const initFooterAnimations = async () => {
  const gsap = await initGSAP();

  // Animazione delle sezioni del footer
  gsap.from('.footer-section', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  });

  // Animazione dei social link
  gsap.from('.social-link', {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    delay: 0.5
  });
};

export const animateHeaderOnScroll = (headerSelector = '#main-header', heroSelector = '.hero') => {
  import('gsap').then(({ gsap }) => {
    const header = document.querySelector(headerSelector);
    const navLinks = header ? header.querySelectorAll('.nav-link') : [];
    const menuButton = header ? header.querySelector('button') : null;
    const smoothContent = document.getElementById('smooth-content');
    const hero = document.querySelector(heroSelector);
    const spacer = document.getElementById('header-spacer');

    console.log('Header:', header, 'Hero:', hero);
    if (!header || !hero) return;

    // Stato iniziale
    gsap.set(header, {
      backgroundColor: 'rgba(255,255,255,0)',
      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      backdropFilter: 'blur(0px)'
    });
    navLinks.forEach(link => gsap.set(link, { color: '#fff' }));
    if (menuButton) gsap.set(menuButton, { color: '#fff' });

    let isActive = false;
    function animateHeader(active) {
      console.log('animateHeader chiamata, active:', active);
      if (active === isActive) return;
      isActive = active;
      
      if (active) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    function getHeroBottom() {
      if (!hero) return 0;
      const rect = hero.getBoundingClientRect();
      // Se ScrollSmoother è attivo, somma smoother.scrollTop()
      if (window.ScrollSmoother && typeof window.ScrollSmoother.get === 'function' && window.ScrollSmoother.get()) {
        return rect.top + window.ScrollSmoother.get().scrollTop() + rect.height;
      }
      return rect.top + window.scrollY + rect.height;
    }

    function getScrollY() {
      if (window.ScrollSmoother && typeof window.ScrollSmoother.get === 'function' && window.ScrollSmoother.get()) {
        return window.ScrollSmoother.get().scrollTop();
      }
      if (smoothContent && smoothContent.scrollTop > 0) {
        return smoothContent.scrollTop;
      }
      return window.scrollY;
    }

    function onScroll() {
      const scrollY = getScrollY();
      const heroBottom = getHeroBottom();
      console.log('onScroll - scrollY:', scrollY, 'heroBottom:', heroBottom, 'headerHeight:', header.offsetHeight);
      animateHeader(scrollY >= heroBottom - header.offsetHeight);
    }

    if (smoothContent) {
      smoothContent.addEventListener('scroll', onScroll);
    }
    window.addEventListener('scroll', onScroll);

    setInterval(() => {
      onScroll();
    }, 50);

    onScroll();
  });
}; 