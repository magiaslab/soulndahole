import { EVENT_OFFICIAL, EVENT_SUMMARY, SITE_EDITION } from '../config/site';

export { EVENT_SUMMARY };

/** Metadati condivisi SEO / JSON-LD. */
export const SITE_URL = 'https://soulndahole.com';

const tagline = SITE_EDITION.tagline;

export const DEFAULT_SEO_TITLE = `Soul 'n Da Hole 2026 — Tarocchi | ${tagline}`;
export const DEFAULT_SEO_DESCRIPTION =
  `VIII edizione del torneo streetball 5×5. ${tagline}: ${EVENT_SUMMARY}.`;

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: "Soul 'n Da Hole",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    `Torneo streetball 5x5 in Toscana. VIII edizione 2026, tema Tarocchi — ${tagline}.`,
  sameAs: [
    'https://www.instagram.com/soulndahole',
    'https://www.facebook.com/soulndahole',
    'https://www.tiktok.com/@soulndahole',
  ],
} as const;

export const mainEvent = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: `Soul 'n Da Hole 2026 — ${tagline}`,
  description:
    `Torneo streetball 5x5, VIII edizione. Tema: i Tarocchi — ${tagline}. ${EVENT_SUMMARY}. ${EVENT_OFFICIAL.venueName}.`,
  startDate: '2026-07-02T19:00:00+02:00',
  endDate: '2026-07-05T24:00:00+02:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: `${SITE_URL}/locandina-og.jpg`,
  location: {
    '@type': 'Place',
    name: EVENT_OFFICIAL.venueName,
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
