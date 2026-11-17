import { Link } from 'react-router-dom';
import { usePage } from '../lib/usePage.js';

export default function NotFound() {
  usePage('Page not found', 'The page you were looking for does not exist.');
  return (
    <div className="container not-found">
      <p className="eyebrow">Error 404</p>
      <h1 id="page-title" tabIndex={-1}>
        Page not found
      </h1>
      <p className="lead">The page may have moved when the site was rebuilt. Try the tank list instead.</p>
      <p>
        <Link className="button" to="/">
          Back to all tanks
        </Link>
      </p>
    </div>
  );
}
