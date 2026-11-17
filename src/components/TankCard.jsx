import { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import { hasProfile } from '../lib/content.js';

const motionOK = () =>
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches && navigator.connection?.saveData !== true;

export default function TankCard({ tank }) {
  const { id, name, country, summary, cardImage, flag, preview, introduced } = tank;
  const linked = hasProfile(tank);
  // The animated preview is only downloaded once the card is hovered or focused.
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if (!preview || !motionOK()) return;
    setLoaded(true);
    setPlaying(true);
  };
  const stop = () => setPlaying(false);

  return (
    <article className="card" onPointerEnter={start} onPointerLeave={stop} onFocus={start} onBlur={stop}>
      <div className="card__media">
        <Img src={cardImage} alt="" sizes="(min-width: 1200px) 380px, (min-width: 700px) 45vw, calc(100vw - 32px)" />
        {loaded && <img className="card__preview" src={preview} alt="" width="560" height="420" hidden={!playing} />}
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
