import Lenis from '@studio-freight/lenis'

let lenis;
let anchorListeners = [];

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

function initLenis() {
  // Distruggi l'istanza precedente se esiste
  if (lenis) {
    lenis.destroy();
  }

  // Rimuovi i listener precedenti
  anchorListeners.forEach(listener => {
    if (listener.element && listener.handler) {
      listener.element.removeEventListener('click', listener.handler);
    }
  });
  anchorListeners = [];

  lenis = new Lenis({
    lerp: 0.1, // Valore tra 0 e 1, più basso è più "liscio"
    smoothWheel: true,
  });

  // Gestione dei link di ancoraggio con cleanup
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const handler = function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    };
    
    anchor.addEventListener('click', handler);
    anchorListeners.push({ element: anchor, handler });
  });

  requestAnimationFrame(raf);
}

// Esegui allo script al caricamento iniziale e dopo ogni cambio di pagina
document.addEventListener('astro:page-load', initLenis);

// Cleanup quando la pagina viene scaricata
document.addEventListener('astro:before-preparation', () => {
  if (lenis) {
    lenis.destroy();
  }
  anchorListeners.forEach(listener => {
    if (listener.element && listener.handler) {
      listener.element.removeEventListener('click', listener.handler);
    }
  });
  anchorListeners = [];
}); 