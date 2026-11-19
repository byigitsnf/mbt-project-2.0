import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Img from '../components/Img.jsx';
import TankCard from '../components/TankCard.jsx';
import { countries, countriesOf, periodOf, periods, profiles, tanks } from '../lib/content.js';
import { usePage } from '../lib/usePage.js';

export default function Home() {
  usePage(
    'MBT Project',
    'A modern guide to the main battle tanks in service today: design, armament, protection, variants and history.',
  );

  // Filters live in the URL (?q=leo&country=Germany) so results can be shared and survive "back".
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const country = params.get('country') ?? '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tanks.filter((t) => (!term || t.name.toLowerCase().includes(term)) && (!country || countriesOf(t).includes(country)));
  }, [q, country]);

  // Split the visible tanks into periods, oldest first, each sorted by year; empty periods are hidden.
  const groups = useMemo(
    () =>
      periods
        .map((period) => ({
          period,
          items: visible.filter((t) => periodOf(t) === period).sort((a, b) => a.introduced - b.introduced || a.order - b.order),
        }))
        .filter((g) => g.items.length > 0),
    [visible],
  );

  // Announce the result count politely, after typing pauses.
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (!q && !country) return setStatus('');
    const id = setTimeout(() => setStatus(`Showing ${visible.length} of ${tanks.length} tanks`), 400);
    return () => clearTimeout(id);
  }, [visible.length, q, country]);

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <Img src="modernmbt/articles/home-hero" alt="" sizes="100vw" loading="eager" fetchPriority="high" className="hero__bg" />
        <div className="container hero__inner">
          <p className="eyebrow">An illustrated guide</p>
          <h1 id="page-title" tabIndex={-1}>
            Main battle tanks of the world
          </h1>
          <p className="lead">
            Explore {tanks.length} modern main battle tanks from {countries.length} countries: how they are armed and
            protected, how they evolved, and what sets each one apart.
          </p>
          <div className="hero__actions">
            <a className="button" href="#tanks">
              Browse the tanks
            </a>
            <Link className="button ghost" to="/history/">
              Read the history
            </Link>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>Tanks</dt>
              <dd>{tanks.length}</dd>
            </div>
            <div>
              <dt>Countries</dt>
              <dd>{countries.length}</dd>
            </div>
            {profiles.length > 0 && (
              <div>
                <dt>In-depth profiles</dt>
                <dd>{profiles.length}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section id="tanks" className="section container" aria-labelledby="tanks-title">
        <div className="section-head">
          <div>
            <h2 id="tanks-title">The tanks</h2>
            <p className="section-head__sub">Grouped by the year each tank entered service.</p>
          </div>

          <form className="filters" role="search" aria-label="Filter tanks" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="q">Search by name</label>
              <input
                id="q"
                type="search"
                placeholder="e.g. Leopard"
                autoComplete="off"
                value={q}
                onChange={(e) => update('q', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="country">Country</label>
              <select id="country" value={country} onChange={(e) => update('country', e.target.value)}>
                <option value="">All countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <p className="status" role="status" aria-live="polite">
          {status}
        </p>

        {visible.length > 0 ? (
          groups.map(({ period, items }) => (
            <section key={period.id} className="period" aria-labelledby={`period-${period.id}`}>
              <header className="period__head">
                <h3 id={`period-${period.id}`} className="period__title">
                  {period.title}
                </h3>
                <p className="period__years">{period.years}</p>
                {period.description && <p className="period__desc">{period.description}</p>}
                <p className="period__count">
                  {items.length} {items.length === 1 ? 'tank' : 'tanks'}
                </p>
              </header>
              <ul className="grid" role="list">
                {items.map((tank) => (
                  <li key={tank.id}>
                    <TankCard tank={tank} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="empty">
            <p>No tanks match your search.</p>
            <button type="button" className="button ghost" onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="section container explore" aria-labelledby="explore-title">
        <h2 id="explore-title">Go deeper</h2>
        <ul role="list">
          <li>
            <Link to="/history/">
              <span className="explore__kind">History</span>
              <strong>From Little Willie to the T-14</strong>
              <span>How the tank was born in the First World War and grew into today’s main battle tank.</span>
            </Link>
          </li>
          <li>
            <Link to="/history/nato/">
              <span className="explore__kind">History</span>
              <strong>NATO’s Cold War tanks</strong>
              <span>The stories behind the Abrams, Leopard 2, Challenger 2 and Leclerc.</span>
            </Link>
          </li>
          <li>
            <Link to="/fundamentals/">
              <span className="explore__kind">Fundamentals</span>
              <strong>Armour and ammunition</strong>
              <span>RHA, composite and reactive armour; HEAT, HESH and APFSDS rounds explained.</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
