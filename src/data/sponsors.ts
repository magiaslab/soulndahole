import type { ImageMetadata } from 'astro';
import impresaEdilePaoloPieraccini from '../assets/images/sponsor/704005032_18327610066264526_2716697780566414113_n.jpg';
import fcTermoidraulica from '../assets/images/sponsor/706437017_18327466876264526_7661686454790809564_n.jpg';
import molo20 from '../assets/images/sponsor/707269380_18327738685264526_6888515026063002766_n.jpg';
import fisiomedica from '../assets/images/sponsor/710638089_18327886702264526_3849397793209116656_n.jpg';

export interface Sponsor {
  name: string;
  image: ImageMetadata;
}

/** Top sponsor VIII edizione 2026. */
export const sponsors: Sponsor[] = [
  { name: 'Impresa Edile Paolo Pieraccini', image: impresaEdilePaoloPieraccini },
  { name: 'FC Termoidraulica', image: fcTermoidraulica },
  { name: 'Molo 20 — Cocktail Bar & Ristorantino', image: molo20 },
  { name: 'Fisiomedica Fisioterapia', image: fisiomedica },
];

export function sponsorsForGallery() {
  return sponsors.map((s) => ({
    src: s.image.src,
    alt: s.name,
  }));
}
