import type { ImageMetadata } from 'astro';
import ilFolle from '../assets/images/arcani/il-folle.jpeg';
import lImperatore from '../assets/images/arcani/l-imperatore.jpeg';
import gliAmanti from '../assets/images/arcani/gli-amanti.jpeg';
import ilCarro from '../assets/images/arcani/il-carro.jpeg';
import laGiustizia from '../assets/images/arcani/la-giustizia.jpeg';
import lEremita from '../assets/images/arcani/l-eremita.jpeg';
import lAppeso from '../assets/images/arcani/l-appeso.jpeg';
import laMorte from '../assets/images/arcani/la-morte.jpeg';
import ilDiavolo from '../assets/images/arcani/il-diavolo.jpeg';
import laTorre from '../assets/images/arcani/la-torre.jpeg';
import laLuna from '../assets/images/arcani/la-luna.jpeg';
import ilSole from '../assets/images/arcani/il-sole.jpeg';

export interface Arcano {
  id: number;
  slug: string;
  tarotNumber: string;
  tarotName: string;
  image: ImageMetadata;
  /** Slug squadra legacy (bestie); valorizzare quando associato ufficialmente. */
  teamSlug?: string;
}

/** Dodici Major Arcana — illustrazioni ufficiali VIII edizione. */
export const arcani: Arcano[] = [
  { id: 1, slug: 'il-folle', tarotNumber: '0', tarotName: 'Il Folle', image: ilFolle },
  { id: 2, slug: 'l-imperatore', tarotNumber: 'IV', tarotName: "L'Imperatore", image: lImperatore },
  { id: 3, slug: 'gli-amanti', tarotNumber: 'VI', tarotName: 'Gli Amanti', image: gliAmanti },
  { id: 4, slug: 'il-carro', tarotNumber: 'VII', tarotName: 'Il Carro', image: ilCarro },
  { id: 5, slug: 'la-giustizia', tarotNumber: 'VIII', tarotName: 'La Giustizia', image: laGiustizia },
  { id: 6, slug: 'l-eremita', tarotNumber: 'IX', tarotName: "L'Eremita", image: lEremita },
  { id: 7, slug: 'l-appeso', tarotNumber: 'XII', tarotName: "L'Appeso", image: lAppeso },
  { id: 8, slug: 'la-morte', tarotNumber: 'XIII', tarotName: 'La Morte', image: laMorte },
  { id: 9, slug: 'il-diavolo', tarotNumber: 'XV', tarotName: 'Il Diavolo', image: ilDiavolo },
  { id: 10, slug: 'la-torre', tarotNumber: 'XVI', tarotName: 'La Torre', image: laTorre },
  { id: 11, slug: 'la-luna', tarotNumber: 'XVIII', tarotName: 'La Luna', image: laLuna },
  { id: 12, slug: 'il-sole', tarotNumber: 'XIX', tarotName: 'Il Sole', image: ilSole },
];

export function arcanoLabel(arcano: Arcano): string {
  return `${arcano.tarotNumber} · ${arcano.tarotName}`;
}
