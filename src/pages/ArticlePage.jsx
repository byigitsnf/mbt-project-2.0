import { Link } from 'react-router-dom';
import ArticleLayout from '../components/ArticleLayout.jsx';
import Blocks from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { buildToc, getArticle, readingMinutes } from '../lib/content.js';
import { usePage } from '../lib/usePage.js';

const PAGES = {
  history: {
    crumbs: [{ to: '/', label: 'Home' }, { label: 'History' }],
    more: (
      <p className="page-head__more">
        Continue with <Link to="/history/nato/">the history of NATO main battle tanks</Link>.
      </p>
    ),
  },
  nato: {
    crumbs: [{ to: '/', label: 'Home' }, { to: '/history/', label: 'History' }, { label: 'NATO tanks' }],
  },
};

/** The history articles stored in src/data/articles/. */
export default function ArticlePage({ id }) {
  const { title, description, blocks } = getArticle(id);
  const { crumbs, more } = PAGES[id];
  usePage(title, description);

  const header = (
    <header className="page-head">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow page-head__eyebrow">History · {readingMinutes(blocks)} min read</p>
        <h1 id="page-title" tabIndex={-1}>
          {title}
        </h1>
        <p className="lead">{description}</p>
        {more}
      </div>
    </header>
  );

  return (
    <ArticleLayout header={header} toc={buildToc(blocks)}>
      <Blocks blocks={blocks} />
    </ArticleLayout>
  );
}
