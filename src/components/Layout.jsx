import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import EraBar from './EraBar.jsx';
import { eraFromPath } from '../data/eras.js';

const NAV = [
  { to: '/', label: 'Tanks', match: (p) => p === '/' || p.startsWith('/tanks/') },
  { to: '/history/', label: 'History', match: (p) => p.startsWith('/history') },
  { to: '/fundamentals/', label: 'Fundamentals', match: (p) => p.startsWith('/fundamentals') },
  { to: '/about/', label: 'About', match: (p) => p.startsWith('/about') },
];

function useTheme() {
  const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const read = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === 'dark' : Boolean(media?.matches);
  };
  const [dark, setDark] = useState(read);

  useEffect(() => {
    const onChange = () => setDark(read());
    media?.addEventListener('change', onChange);
    return () => media?.removeEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage may be blocked; the theme still applies for this visit */
    }
    setDark(!dark);
  };
  return [dark, toggle];
}

function Logo() {
  return (
    <svg aria-hidden="true" width="34" height="34" viewBox="0 0 32 32">
      <rect x="2" y="17" width="28" height="9" rx="4.5" fill="currentColor" />
      <rect x="8" y="10" width="13" height="7" rx="2" fill="currentColor" />
      <rect x="20" y="12" width="11" height="2.4" rx="1.2" fill="currentColor" />
      <circle cx="8" cy="21.5" r="1.6" fill="var(--bg)" />
      <circle cx="16" cy="21.5" r="1.6" fill="var(--bg)" />
      <circle cx="24" cy="21.5" r="1.6" fill="var(--bg)" />
    </svg>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, toggleTheme] = useTheme();
  const menuBtn = useRef(null);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Each era tints the whole site with its own accent colour (see the era tokens in global.css).
  const era = eraFromPath(pathname).id;
  useEffect(() => {
    if (era === 'modern') delete document.documentElement.dataset.era;
    else document.documentElement.dataset.era = era;
  }, [era]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="container site-header__bar">
          <Link to="/" className="brand" aria-label="MBT Project home">
            <Logo />
            <span>
              MBT<b>Project</b>
            </span>
          </Link>

          <button
            ref={menuBtn}
            type="button"
            className="icon-btn site-header__menu"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
            <span className="visually-hidden">Menu</span>
          </button>

          <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} aria-current={item.match(pathname) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="icon-btn site-header__theme" aria-pressed={dark} onClick={toggleTheme}>
            {dark ? (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
            <span className="visually-hidden">Dark theme</span>
          </button>
        </div>
      </header>
      <EraBar />

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <ScrollRestoration />

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div>
            <p className="site-footer__brand">
              MBT<b>Project</b>
            </p>
            <p>
              A guide to the main battle tanks in service today: their design, their variants and the history behind
              them. Compiled from publicly available sources.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <a href="https://github.com/byigitsnf/mbt-project">Original project on GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
