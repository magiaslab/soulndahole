/** Rosa, gironi dettagliati e nomi squadra non ancora pubblicati. */
export const TEAMS_ROSTER_PUBLIC = false;

export const SITE_EDITION = {
  year: 2026,
  roman: 'VIII',
  theme: 'Tarocchi',
  tagline: 'Il Giudizio degli Arcani',
} as const;

export type EventDay = {
  weekday: string;
  dayMonth: string;
  /** Es. «Giovedì 2 luglio 2026» */
  label: string;
  iso: string;
  finals?: boolean;
};

/** Dati dalla locandina ufficiale VIII edizione (2-3-4-5 luglio 2026, 19-24). */
export const EVENT_OFFICIAL = {
  year: SITE_EDITION.year,
  datesLabel: '2 · 3 · 4 · 5 Luglio 2026',
  datesShort: '2-3-4-5 Luglio 2026',
  timeLabel: 'Dalle 19 alle 24',
  timeShort: '19:00 – 24:00',
  locationLabel: 'Via Aurelia Sud, San Vincenzo (LI)',
  venueName: 'Playground Rodari',
  days: [
    {
      weekday: 'Giovedì',
      dayMonth: '2 luglio',
      label: 'Giovedì 2 luglio 2026',
      iso: '2026-07-02',
    },
    {
      weekday: 'Venerdì',
      dayMonth: '3 luglio',
      label: 'Venerdì 3 luglio 2026',
      iso: '2026-07-03',
    },
    {
      weekday: 'Sabato',
      dayMonth: '4 luglio',
      label: 'Sabato 4 luglio 2026',
      iso: '2026-07-04',
    },
    {
      weekday: 'Domenica',
      dayMonth: '5 luglio',
      label: 'Domenica 5 luglio 2026',
      iso: '2026-07-05',
      finals: true,
    },
  ] satisfies EventDay[],
} as const;

/** Riga riepilogo per hero, SEO e card informative. */
export const EVENT_SUMMARY =
  `${EVENT_OFFICIAL.datesShort}, ${EVENT_OFFICIAL.timeLabel.toLowerCase()}, ${EVENT_OFFICIAL.locationLabel}`;

export const EVENT_FINALS_DAY = EVENT_OFFICIAL.days[3];

/** Modulo iscrizione squadre VIII edizione (JotForm). */
export const REGISTRATION_FORM_URL = 'https://form.jotform.com/261400515669355';
