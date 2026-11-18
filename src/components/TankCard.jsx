import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import { hasProfile } from '../lib/content.js';

export default function TankCard({ tank }) {
  const { id, name, country, summary, cardImage, flag, introduced } = tank;
  const linked = hasProfile(tank);

  return (
    <article className="card">
      <div className="card__media">
        {cardImage ? (
          <Img src={cardImage} alt="" sizes="(min-width: 1200px) 380px, (min-width: 700px) 45vw, calc(100vw - 32px)" />
        ) : (
          <div className="card__placeholder">
            <svg aria-hidden="true" width="64" height="64" viewBox="0 0 32 32">
              <rect x="2" y="17" width="28" height="9" rx="4.5" fill="currentColor" />
              <rect x="8" y="10" width="13" height="7" rx="2" fill="currentColor" />
              <rect x="20" y="12" width="11" height="2.4" rx="1.2" fill="currentColor" />
            </svg>
            <span>Photo coming soon</span>
          </div>
        )}
      </div>
      <div className="card__body">
        <p className="origin">
          <Img src={flag} alt="" sizes="22px" className="flag" />
          <span>{country}</span>
          {introduced && <span className="origin__year">Introduced {introduced}</span>}
        </p>
        {/* h4: the cards sit under the period headings (h3) on the home page. */}
        <h4 className="card__title">{linked ? <Link to={`/tanks/${id}/`}>{name}</Link> : name}</h4>
        <p className="card__summary">{summary}</p>
        {linked ? (
          <span className="card__more" aria-hidden="true">
            Read profile <span className="card__arrow">→</span>
          </span>
        ) : (
          <span className="card__soon">Full profile coming soon</span>
        )}
      </div>
    </article>
  );
}
