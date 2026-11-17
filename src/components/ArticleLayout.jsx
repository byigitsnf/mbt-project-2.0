import Toc from './Toc.jsx';

/** Two-column reading layout: sticky table of contents + long-form content. */
export default function ArticleLayout({ header, toc, children, after }) {
  return (
    <>
      {header}
      <div className="container reading">
        <aside className="reading__side">
          <Toc items={toc} />
        </aside>
        <article className="prose" aria-labelledby="page-title">
          {children}
          <p className="reading__top">
            <a href="#main">Back to top ↑</a>
          </p>
        </article>
      </div>
      {after}
    </>
  );
}
