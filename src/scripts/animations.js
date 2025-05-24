// Importiamo GSAP e ScrollTrigger
const initGSAP = async () => {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { ScrollSmoother } = await import('gsap/ScrollSmoother');
  
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Configura ScrollTrigger per lavorare con ScrollSmoother
  ScrollTrigger.config({
    ignoreMobileResize: true
  });

  // Crea ScrollSmoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });

  // Configura ScrollTrigger per usare il proxy di ScrollSmoother
  ScrollTrigger.scrollerProxy("#smooth-wrapper", {
    scrollTop(value) {
      if (arguments.length) {
        ScrollSmoother.get().scrollTop(value);
      }
      return ScrollSmoother.get().scrollTop();
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  // Aggiorna ScrollTrigger quando ScrollSmoother aggiorna
  ScrollSmoother.get().on("scroll", ScrollTrigger.update);

  return gsap;
};

// Animazioni del footer
export const initFooterAnimations = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not available for footer animations.');
    return;
  }
  gsap.from('.footer-section', {
    scrollTrigger: {
      trigger: 'footer', 
      scroller: "#smooth-wrapper", 
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
      // markers: {startColor: "orange", endColor: "purple"} 
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
  });
   console.log('Footer animations initialized.');
};

// Funzione per sticky header (ora non inizializza più GSAP/ScrollTrigger)
export const setupStickyHeaderScrollTrigger = (headerSelector = '#main-header', heroSelector = '.hero') => {
  const header = document.querySelector(headerSelector);
  const hero = document.querySelector(heroSelector);

  if (!header || !hero) {
    console.warn('Header or Hero element not found for sticky ScrollTrigger. Header:', header, 'Hero:', hero, 'Selectors:', headerSelector, heroSelector);
    return;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not available when setupStickyHeaderScrollTrigger is called. Ensure initSmoothScroll() has completed.');
    return;
  }

  ScrollTrigger.create({
    trigger: hero,
    start: () => `bottom ${header.offsetHeight}px`, 
    end: "max",
    toggleClass: { targets: header, className: "sticky" },
    markers: true, 
    scroller: "#smooth-wrapper", 
    onEnter: () => console.log('STICKY HEADER: Entered sticky state'),
    onLeaveBack: () => console.log('STICKY HEADER: Left sticky state (scrolled to top)'),
    onUpdate: self => {
      // console.log('STICKY HEADER: ScrollTrigger update, progress:', self.progress.toFixed(3), 'isActive:', self.isActive);
    }
  });
  console.log('Sticky header ScrollTrigger initialized for scroller #smooth-wrapper.');
};

// Funzione per animare la header
export function animateHeaderOnScroll(headerSelector = '#main-header', heroSelector = '#hero') {
  const header = document.querySelector(headerSelector);
  const navLinks = header?.querySelectorAll('.nav-link');
  const menuButton = header?.querySelector('button');
  const smoothContent = document.getElementById('smooth-content');
  const hero = document.querySelector(heroSelector);
  const spacer = document.getElementById('header-spacer');
  
  if (!header || !smoothContent || !hero) {
    console.error('Elementi necessari non trovati');
    return;
  }

  let isActive = false;

  function animateHeader(active) {
    if (active === isActive) return;
    isActive = active;
    
    if (active) {
      gsap.to(header, {
        backgroundColor: 'rgba(255,255,255,1)',
        boxShadow: '0 4px 24px -4px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.out'
      });
      navLinks.forEach(link => gsap.to(link, { color: '#374151', duration: 0.3 }));
      if (menuButton) gsap.to(menuButton, { color: '#374151', duration: 0.3 });
      if (spacer) gsap.to(spacer, { height: header.offsetHeight, duration: 0.5 });
    } else {
      gsap.to(header, {
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        backdropFilter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.out'
      });
      navLinks.forEach(link => gsap.to(link, { color: '#fff', duration: 0.3 }));
      if (menuButton) gsap.to(menuButton, { color: '#fff', duration: 0.3 });
      if (spacer) gsap.to(spacer, { height: 0, duration: 0.5 });
    }
  }

  // Crea ScrollTrigger per la header
  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scroller: '#smooth-wrapper',
    onEnter: () => animateHeader(true),
    onLeaveBack: () => animateHeader(false),
    onUpdate: (self) => {
      if (self.progress > 0) {
        animateHeader(true);
      } else {
        animateHeader(false);
      }
    }
  });

  // Aggiorna ScrollTrigger quando la finestra viene ridimensionata
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
} 