import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export const initSmoothScroll = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Necessario per Astro SSG/SSR, non esegue lato server
      return resolve(null);
    }

    // Assicurati che il DOM sia pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initialize());
    } else {
      initialize();
    }

    function initialize() {
      try {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          normalizeScroll: true,
        });

        const pinType = smoother.vars.effects || smoother.vars.smooth 
          ? "transform" 
          : "fixed";

        ScrollTrigger.scrollerProxy(smoother.wrapper, {
          scrollTop(value) {
            if (arguments.length) {
              smoother.scrollTop(value);
            }
            return smoother.scrollTop();
          },
          getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
          },
          pinType: pinType 
        });
        
        smoother.effects("img, .feature-card", { speed: "auto" }); 
        
        // Quando ScrollSmoother fa uno scroll, aggiorna ScrollTrigger
        // Questo è fondamentale per la sincronizzazione
        smoother.on("scroll", () => ScrollTrigger.update()); 

        // Quando tutti gli ScrollTriggers sono pronti o cambiano, fai un refresh
        ScrollTrigger.addEventListener("refreshInit", () => smoother.scrollTop(0)); // Resetta lo scroll al refresh
        ScrollTrigger.addEventListener("refresh", () => smoother.refresh()); // Sincronizza smoother con ScrollTrigger
        
        // Fai un refresh iniziale per assicurarti che le posizioni siano corrette
        ScrollTrigger.refresh();

        console.log('GSAP, ScrollSmoother, and ScrollTrigger initialized and configured.');
        resolve(smoother);
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
        reject(error);
      }
    }
  });
}; 