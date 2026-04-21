/** Metadati condivisi SEO / JSON-LD — aggiorna date e luogo quando sono definitivi. */
export const SITE_URL = 'https://soulndahole.com';

export const DEFAULT_SEO_TITLE = "Soul 'n Da Hole 2026 — Tarocchi | Il richiamo degli arcani";
export const DEFAULT_SEO_DESCRIPTION =
  "VIII edizione del torneo streetball 5×5 in Toscana. Tema Tarocchi: squadre archetipiche, programma e albo d'oro delle edizioni passate.";

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: "Soul 'n Da Hole",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "Torneo streetball 5x5 in Toscana. VIII edizione 2026, tema Tarocchi: squadre, programma e albo d'oro.",
  sameAs: [
    'https://www.instagram.com/soulndahole',
    'https://www.facebook.com/soulndahole',
    'https://www.tiktok.com/@soulndahole',
  ],
} as const;

/** VIII edizione 2026 — date indicative (luglio); confermare quando ufficiali. */
export const mainEvent = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: "Soul 'n Da Hole 2026 — Tarocchi",
  description:
    'Torneo streetball 5x5, VIII edizione. Tema: i Tarocchi. San Vincenzo (LI), playground Rodari.',
  startDate: '2026-07-03T19:00:00+02:00',
  endDate: '2026-07-06T23:59:00+02:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: `${SITE_URL}/logo.svg`,
  location: {
    '@type': 'Place',
    name: 'Playground Rodari',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Aurelia Sud',
      addressLocality: 'San Vincenzo',
      addressRegion: 'LI',
      postalCode: '57027',
      addressCountry: 'IT',
    },
  },
  organizer: { '@id': `${SITE_URL}/#organization` },
  performer: { '@id': `${SITE_URL}/#organization` },
} as const;

export function buildWebPageJsonLd(opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      '@type': 'WebSite',
      name: "Soul 'n Da Hole",
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  };
}
