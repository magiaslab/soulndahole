import Lenis from '@studio-freight/lenis'

let lenis;

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

function initLenis() {
  // Distruggi l'istanza precedente se esiste
  if (lenis) {
    lenis.destroy();
  }

  lenis = new Lenis({
    lerp: 0.1, // Valore tra 0 e 1, più basso è più "liscio"
    smoothWheel: true,
  });

  // Gestione dei link di ancoraggio
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    });
  });

  requestAnimationFrame(raf);
}

// Esegui allo script al caricamento iniziale e dopo ogni cambio di pagina
document.addEventListener('astro:page-load', initLenis); 