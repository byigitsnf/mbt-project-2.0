import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { usePage } from '../lib/usePage.js';
import { tanks } from '../lib/content.js';

// Tanks whose card photo needs an attribution (set `photoCredit` in the tank's JSON file).
const credited = tanks.filter((t) => t.photoCredit);

export default function About() {
  usePage('About', 'What MBT Project is, where its information comes from, and how the site was built.');
  const base = import.meta.env.BASE_URL;

  return (
    <div className="container about">
      <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'About' }]} />
      <h1 id="page-title" tabIndex={-1}>
        About MBT Project
      </h1>
      <div className="about__grid">
        <div className="prose">
          <p className="lead">
            MBT Project is made for tank enthusiasts and anyone interested in the defence industry. It covers the main
            battle tanks in service today and connects them to their past and future.
          </p>
          <p>
            The information on this site has been compiled from publicly available sources. It started as a university
            assignment and has been rebuilt as a faster, responsive and accessible website with React.
          </p>
          <h2>Accessibility</h2>
          <ul>
            <li>Works with keyboard only: every link and control is reachable and has a visible focus outline.</li>
            <li>Built with semantic landmarks and headings, a “skip to content” link and an on-page table of contents.</li>
            <li>When you move between pages, focus moves to the new page’s heading so screen readers announce it.</li>
            <li>Follows your system light/dark preference, and has a manual theme switch.</li>
            <li>Animations play only on request and are turned off if you prefer reduced motion.</li>
            <li>Text meets WCAG AA contrast and the layout adapts from phones to wide screens and up to 400% zoom.</li>
          </ul>
          {credited.length > 0 && (
            <>
              <h2>Photo credits</h2>
              <ul>
                {credited.map(({ id, name, photoCredit: c }) => (
                  <li key={id}>
                    {name}: <a href={c.source}>photo</a> by {c.author},{' '}
                    {c.licenseUrl ? <a href={c.licenseUrl}>{c.license}</a> : c.license}, via Wikimedia Commons.
                  </li>
                ))}
              </ul>
            </>
          )}
          <p>Thanks for visiting!</p>
        </div>
        <picture>
          <source srcSet={`${base}previews/about.webp`} type="image/webp" media="(prefers-reduced-motion: no-preference)" />
          <img
            src={`${base}img/modernmbt/articles/about-still-480.webp`}
            alt="A tank firing its main gun"
            width="640"
            height="301"
            className="about__anim"
          />
        </picture>
      </div>
    </div>
  );
}
