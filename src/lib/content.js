// All site content lives in src/data/*.json and is bundled at build time.

const tankModules = import.meta.glob('../data/tanks/*.json', { eager: true, import: 'default' });
const articleModules = import.meta.glob('../data/articles/*.json', { eager: true, import: 'default' });

const idFromPath = (p) => p.split('/').pop().replace(/\.json$/, '');

/** Every tank, in the order of the original site. */
export const tanks = Object.entries(tankModules)
  .map(([p, data]) => ({ id: idFromPath(p), ...data }))
  .sort((a, b) => a.order - b.order);

/** A tank has a full profile page when it has content blocks. */
export const hasProfile = (tank) => Boolean(tank.blocks?.length);

export const profiles = tanks.filter(hasProfile);

/**
 * Periods the home page groups the tanks into, by the year each tank was introduced
 * (the `introduced` field). Tanks introduced before 1991 are Cold War designs still in
 * service, so they count as "Remnants of the Cold War" too.
 */
export const periods = [
  {
    id: 'cold-war-remnants',
    title: 'Remnants of the Cold War',
    years: '1991–2000',
    until: 2000,
    description:
      'Designed for a clash between NATO and the Warsaw Pact that never came, these tanks reached service as the Cold War ended and still form the backbone of many armies.',
  },
  {
    id: 'new-millennium',
    title: 'A New Millennium',
    years: '2000–2020',
    until: 2019,
    description:
      'Two decades of peacekeeping and counter-insurgency taught tanks to survive mines, roadside bombs and city streets, while more nations began building designs of their own.',
  },
  {
    id: 'modern-warfare',
    title: 'Modern Warfare',
    years: '2020–today',
    until: Infinity,
    description:
      'Drones, loitering munitions and networked sensors have reshaped the battlefield; the newest tanks answer with active protection systems, digital crew stations and a new generation of guns.',
  },
];

export const periodOf = (tank) => periods.find((p) => tank.introduced <= p.until);

/** The countries a tank belongs to: its `countries` list for joint designs, otherwise just `country`. */
export const countriesOf = (tank) => tank.countries ?? [tank.country];

export const countries = [...new Set(tanks.flatMap(countriesOf))].sort();

export const getTank = (id) => profiles.find((t) => t.id === id);

export const getArticle = (id) => articleModules[`../data/articles/${id}.json`];

/** Two-level table of contents built from h2/h3 blocks. */
export function buildToc(blocks) {
  const toc = [];
  for (const b of blocks) {
    if (b.type !== 'heading') continue;
    if (b.level === 2 || toc.length === 0) toc.push({ id: b.id, text: b.text, children: [] });
    else toc[toc.length - 1].children.push({ id: b.id, text: b.text });
  }
  return toc;
}

export function readingMinutes(blocks) {
  const words = blocks
    .map((b) => (b.type === 'paragraph' ? b.html : b.type === 'list' ? b.items.join(' ') : ''))
    .join(' ')
    .replace(/<[^>]+>/g, '')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
