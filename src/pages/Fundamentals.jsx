import { Fragment } from 'react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Img from '../components/Img.jsx';
import { usePage } from '../lib/usePage.js';

const TOPICS = [
  {
    id: 'rha',
    title: 'Rolled homogeneous armour (RHA)',
    tag: 'Armour',
    links: [{ label: 'Rolled homogeneous armour', href: 'https://en.wikipedia.org/wiki/Rolled_homogeneous_armour' }],
    body: [
      'Rolled armour steel, also known as RHA (Rolled Homogeneous Armour), is the most common and basic armour steel used for tanks and armoured vehicles. It is produced by the Brinell 380 method. The power of an ammunition is measured by the thickness of armour steel it can penetrate. RHA has been used since the Second World War and is still in active use.',
      'RHA contains little carbon. Besides being easy to produce, the low carbon content gives good toughness (high energy absorption), weldability and impact resistance. Its purpose is to absorb the effects of penetration and blast damage.',
    ],
  },
  {
    id: 'composite',
    title: 'Composite armour',
    tag: 'Armour',
    links: [{ label: 'Composite armour', href: 'https://en.wikipedia.org/wiki/Composite_armour' }],
    body: [
      'Composite armour consists of layers of different materials such as metals, plastics, ceramics or air. It was invented when RHA steel was no longer enough against developing anti-tank weapons and ammunition. Although lighter and less bulky than RHA, it provides far superior protection.',
      'Every tank’s composite armour structure and materials are different. The armour is placed in the most exposed areas of the tank. The first tank to use composite armour was the Soviet T-64.',
    ],
  },
  {
    id: 'reactive',
    title: 'Reactive armour',
    tag: 'Armour',
    links: [{ label: 'Reactive armour', href: 'https://en.wikipedia.org/wiki/Reactive_armour' }],
    body: [
      'Reactive armour is built by placing explosives, plastic or polymer materials between two metal plates or composite blocks, compressed like a sandwich. Its main purpose is to disrupt an incoming armour-piercing round and absorb its energy, reducing the damage to the tank.',
      'Each type has its own strengths and weaknesses, but because the blocks are single-use they offer little protection against a second hit in the same place. ERA, SLERA, NERA and NxRA are the types most commonly used on tanks.',
    ],
  },
  {
    id: 'ammunition',
    title: 'HEAT, HESH and APFSDS ammunition',
    tag: 'Ammunition',
    links: [
      { label: 'HEAT', href: 'https://en.wikipedia.org/wiki/High-explosive_anti-tank' },
      { label: 'HESH', href: 'https://en.wikipedia.org/wiki/High-explosive_squash_head' },
      { label: 'APFSDS', href: 'https://en.wikipedia.org/wiki/Armour-piercing_fin-stabilized_discarding_sabot' },
    ],
    body: [
      'There are three main types of tank ammunition, based on either chemical or kinetic energy: HEAT, HESH and APFSDS.',
      <>
        <strong>HEAT</strong> rounds contain high explosives and penetrate armour with a shaped charge. When the tip hits
        the armour, the charge detonates and a focused jet of energy is driven through the hollow tip into the armour.
      </>,
      <>
        <strong>HESH</strong> rounds contain plastic explosive. On impact the round flattens against the armour and
        detonates, sending shock waves through it. Fragments break off the inside of the armour, injuring the crew and
        damaging equipment.
      </>,
      <>
        <strong>APFSDS</strong> rounds penetrate armour with kinetic energy. All the energy of the propellant accelerates a
        long, dart-shaped penetrator; the sabot falls away after leaving the barrel. The penetrator can be made of
        tungsten, hardened steel or depleted uranium, with tungsten the most common.
      </>,
      <>
        Tank guns also fire <strong>HE</strong> (high-explosive) rounds, which are used against infantry, light armoured
        vehicles and buildings rather than tanks.
      </>,
    ],
  },
];

export default function Fundamentals() {
  usePage(
    'Fundamentals',
    'The basics of main battle tank protection and firepower: RHA, composite and reactive armour, and HEAT, HESH and APFSDS ammunition.',
  );

  return (
    <>
      <header className="page-head">
        <div className="container split-head">
          <div>
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'Fundamentals' }]} />
            <p className="eyebrow page-head__eyebrow">Fundamentals</p>
            <h1 id="page-title" tabIndex={-1}>
              How a main battle tank fights and survives
            </h1>
            <p className="lead">
              Modern tanks, or main battle tanks, are versatile mobile weapons platforms. Their main armament is a
              large-calibre gun in a rotating turret, supported by machine guns and sometimes anti-tank guided missiles.
              Despite their armour and mobility they are vulnerable to anti-tank missiles, mines, artillery and air
              strikes, so they rarely operate alone and usually fight alongside other troops.
            </p>
          </div>
          <Img
            src="modernmbt/articles/fundamentals"
            alt="A main battle tank on exercise"
            sizes="(min-width: 1000px) 480px, calc(100vw - 32px)"
            loading="eager"
            className="split-head__img"
          />
        </div>
      </header>

      <div className="container">
        <nav className="jump" aria-label="Topics">
          <ul>
            {TOPICS.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>{t.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="topics">
          {TOPICS.map((t) => (
            <section key={t.id} id={t.id} className="topic" aria-labelledby={`${t.id}-h`}>
              <p className="chip">{t.tag}</p>
              <h2 id={`${t.id}-h`}>{t.title}</h2>
              <div className="prose">
                {t.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="topic__links">
                Learn more on Wikipedia:{' '}
                {t.links.map((l, i) => (
                  <Fragment key={l.href}>
                    {i > 0 && ', '}
                    <a href={l.href} hrefLang="en">
                      {l.label}
                    </a>
                  </Fragment>
                ))}
              </p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
