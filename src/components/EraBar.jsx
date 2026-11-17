import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ERAS, eraFromPath, eraPath } from '../data/eras.js';

/** Row of era links shown under the header. Choosing an era switches the whole site. */
export default function EraBar() {
  const { pathname } = useLocation();
  const current = eraFromPath(pathname);
  const list = useRef(null);

  // On narrow screens the row scrolls sideways; keep the current era in view.
  useEffect(() => {
    const center = () => {
      const box = list.current;
      const el = box?.querySelector('[aria-current]');
      if (!box || !el || box.scrollWidth <= box.clientWidth) return;
      box.scrollLeft = el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2;
    };
    center();
    // Widths change once the web fonts load, so measure again then.
    document.fonts?.ready.then(center);
  }, [current.id]);

  return (
    <nav className="era-bar" aria-label="Era">
      <div className="container era-bar__inner">
        <ul ref={list} className="era-bar__list">
          {ERAS.map((era) => {
            const to = eraPath(era);
            const active = era.id === current.id;
            return (
              <li key={era.id}>
                <Link
                  to={to}
                  className="era-link"
                  aria-current={active ? (pathname === to ? 'page' : 'true') : undefined}
                >
                  <span className="era-link__name">{era.name}</span>
                  <span className="era-link__meta">
                    <span className="era-link__years">{era.years}</span>
                    {era.wip && <span className="wip-badge">Work in progress</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
