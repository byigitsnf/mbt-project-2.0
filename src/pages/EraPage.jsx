import { Link, useParams } from 'react-router-dom';
import { usePage } from '../lib/usePage.js';
import { tanks } from '../lib/content.js';
import { ERAS, eraPath, getWipEra } from '../data/eras.js';
import NotFound from './NotFound.jsx';

export default function EraPage() {
  const { eraId } = useParams();
  const era = getWipEra(eraId);
  usePage(era ? era.name : 'Page not found', era?.summary);
  if (!era) return <NotFound />;

  const i = ERAS.indexOf(era);
  const prev = ERAS[i - 1];
  const next = ERAS[i + 1];

  return (
    <>
      <section className="era-hero" aria-labelledby="page-title">
        <div className="container">
          <p className="eyebrow">{era.years}</p>
          <h1 id="page-title" tabIndex={-1}>
            {era.name}
          </h1>
          <p className="wip-badge wip-badge--large">Work in progress</p>
          <p className="lead">{era.summary}</p>
        </div>
      </section>

      <div className="container section era-body">
        <section aria-labelledby="era-planned">
          <h2 id="era-planned">Planned for this era</h2>
          <p className="era-body__note">These tanks will get their own profiles once this section is written.</p>
          <ul className="era-planned">
            {era.planned.map((t) => (
              <li key={t.name}>
                <span className="era-planned__name">{t.name}</span>
                <span className="era-planned__country">{t.country}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="era-callout" aria-labelledby="era-callout-title">
          <h2 id="era-callout-title">Ready to read now</h2>
          <p>
            The Modern Era covers {tanks.length} main battle tanks in service today, a history of tank development and
            a guide to armour and ammunition.
          </p>
          <p>
            <Link className="button" to="/">
              Explore the Modern Era
            </Link>
          </p>
        </aside>
      </div>

      <nav className="container pager" aria-label="Other eras">
        {prev && (
          <Link to={eraPath(prev)} rel="prev">
            <span className="pager__dir">← Earlier era</span>
            <span className="pager__name">{prev.name}</span>
          </Link>
        )}
        {next && (
          <Link to={eraPath(next)} rel="next" className="pager__next">
            <span className="pager__dir">Later era →</span>
            <span className="pager__name">{next.name}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
