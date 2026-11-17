// The eras shown in the era selector, oldest first.
// Only the Modern Era has content so far; the others show a "work in progress" page.
export const ERAS = [
  {
    id: 'ww1',
    name: 'WWI Era',
    years: '1914–1918',
    wip: true,
    summary:
      'The first tanks: slow, unreliable machines built to cross trenches and barbed wire on the Western Front.',
    planned: [
      { name: 'Mark I', country: 'United Kingdom' },
      { name: 'Renault FT', country: 'France' },
      { name: 'Saint-Chamond', country: 'France' },
      { name: 'A7V', country: 'Germany' },
    ],
  },
  {
    id: 'pre-war',
    name: 'Pre-War Era',
    years: '1919–1938',
    wip: true,
    summary:
      'Between the wars, armies experimented with light, medium and multi-turret designs and argued over how tanks should fight.',
    planned: [
      { name: 'Vickers 6-Ton', country: 'United Kingdom' },
      { name: 'T-26', country: 'Soviet Union' },
      { name: 'Char B1', country: 'France' },
      { name: 'Panzer I', country: 'Germany' },
    ],
  },
  {
    id: 'ww2',
    name: 'WWII Era',
    years: '1939–1945',
    wip: true,
    summary:
      'Armour, guns and production numbers grew rapidly as tanks became the centre of combined-arms warfare.',
    planned: [
      { name: 'T-34', country: 'Soviet Union' },
      { name: 'Panzer IV', country: 'Germany' },
      { name: 'M4 Sherman', country: 'United States' },
      { name: 'Tiger I', country: 'Germany' },
    ],
  },
  {
    id: 'post-war',
    name: 'Post-War Era',
    years: '1946–1954',
    wip: true,
    summary:
      'Lessons from the war produced the first "universal" tanks, the direct ancestors of the main battle tank.',
    planned: [
      { name: 'Centurion', country: 'United Kingdom' },
      { name: 'T-54', country: 'Soviet Union' },
      { name: 'M47 Patton', country: 'United States' },
      { name: 'AMX-13', country: 'France' },
    ],
  },
  {
    id: 'cold-war',
    name: 'Cold War Era',
    years: '1955–1990',
    wip: true,
    summary:
      'NATO and the Warsaw Pact raced to field better guns, composite armour and fire control: the first true main battle tanks.',
    planned: [
      { name: 'Leopard 1', country: 'Germany' },
      { name: 'M60', country: 'United States' },
      { name: 'T-62', country: 'Soviet Union' },
      { name: 'Chieftain', country: 'United Kingdom' },
    ],
  },
  {
    id: 'modern',
    name: 'Modern Era',
    years: '1991–today',
    wip: false,
  },
];

export const eraPath = (era) => (era.id === 'modern' ? '/' : `/eras/${era.id}/`);

/** Era for a URL path. Everything outside /eras/ belongs to the Modern Era. */
export function eraFromPath(pathname) {
  const m = pathname.match(/^\/eras\/([^/]+)/);
  return (m && ERAS.find((e) => e.id === m[1] && e.wip)) || ERAS[ERAS.length - 1];
}

export const getWipEra = (id) => ERAS.find((e) => e.id === id && e.wip);
