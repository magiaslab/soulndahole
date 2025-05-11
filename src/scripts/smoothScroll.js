import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initSmoothScroll = async () => {
  // Registra i plugin
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

  // Crea lo scroll smoother
  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0.1,
    preventDefault: true,
    smoothScroll: {
      duration: 1.5,
      ease: 'power2.inOut'
    }
  });

  // Aggiorna ScrollTrigger quando lo scroll è completato
  smoother.effects('.parallax', {
    speed: 0.5,
    lag: 0.1
  });

  // Non usare smoother.on('scroll', ...) perché non esiste!
  // Se vuoi aggiornare ScrollTrigger, puoi usare:
  // ScrollTrigger.refresh();

  return smoother;
}; 