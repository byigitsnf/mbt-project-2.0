import { Link, useParams } from 'react-router-dom';
import ArticleLayout from '../components/ArticleLayout.jsx';
import Blocks from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Img from '../components/Img.jsx';
import { buildToc, getTank, profiles, readingMinutes } from '../lib/content.js';
import { usePage } from '../lib/usePage.js';
import NotFound from './NotFound.jsx';

export default function TankPage() {
  const { slug } = useParams();
  const tank = getTank(slug);
  if (!tank) return <NotFound />;
  return <TankProfile key={tank.id} tank={tank} />;
}

function TankProfile({ tank }) {
  const { name, country, flag, heroImage, intro = [], features = [], blocks, historyLink, summary } = tank;
  usePage(name, summary);

  const index = profiles.indexOf(tank);
  const prev = profiles[index - 1];
  const next = profiles[index + 1];
  const toc = [{ id: 'key-specs', text: 'Key specifications', children: [] }, ...buildToc(blocks)];

  const header = (
    <header className="page-head">
      <div className="container">
        <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/#tanks', label: 'Tanks' }, { label: name }]} />
        <div className="tank-hero">
          <div className="tank-hero__text">
            <p className="origin">
              <Img src={flag} alt="" sizes="28px" className="flag flag--lg" />
              <span>{country}</span>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(blocks)} min read</span>
            </p>
            <h1 id="page-title" tabIndex={-1}>
              {name}
            </h1>
            {intro.map((p, i) => (
              <p key={i} className="lead" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {historyLink && (
              <p>
                <Link className="button ghost" to={historyLink}>
                  Read the history of the {name}
                </Link>
              </p>
            )}
          </div>
          {heroImage && (
            <Img
              src={heroImage}
              alt={`The ${name} main battle tank`}
              sizes="(min-width: 1000px) 560px, calc(100vw - 32px)"
              loading="eager"
              fetchPriority="high"
              className="tank-hero__img"
            />
          )}
        </div>
      </div>
    </header>
  );

  const pager = (
    <nav className="container pager" aria-label="More tanks">
      {prev && (
        <Link to={`/tanks/${prev.id}/`} rel="prev">
          <span className="pager__dir">← Previous</span>
          <span className="pager__name">{prev.name}</span>
        </Link>
      )}
      {next && (
        <Link to={`/tanks/${next.id}/`} rel="next" className="pager__next">
          <span className="pager__dir">Next →</span>
          <span className="pager__name">{next.name}</span>
        </Link>
      )}
    </nav>
  );

  return (
    <ArticleLayout header={header} toc={toc} after={pager}>
      <section className="specs" aria-labelledby="key-specs">
        <h2 id="key-specs">Key specifications</h2>
        <ul>
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>
      <Blocks blocks={blocks} />
    </ArticleLayout>
  );
}
