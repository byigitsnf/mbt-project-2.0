import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

let firstRender = true;

/**
 * Per-page setup for a single-page app, so screen-reader and keyboard users
 * get the same cues as with a normal page load:
 *  - sets the document title and meta description
 *  - after navigating, moves focus to the #hash target or the page's <h1>,
 *    which screen readers then announce.
 * Scrolling (top of page, #hash target, back/forward position) is handled by
 * <ScrollRestoration /> in Layout.
 */
export function usePage(title, description) {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    document.title = title === 'MBT Project' ? title : `${title} · MBT Project`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    // On the initial page load the browser already handles focus and scrolling.
    if (firstRender) {
      firstRender = false;
      return;
    }
    // Back/forward restores the previous position; don't pull focus away from it.
    if (navType === 'POP') return;
    const target = (hash && document.getElementById(decodeURIComponent(hash.slice(1)))) || document.querySelector('h1');
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    // Only react to page changes; in-page #anchor jumps are handled natively.
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
}
