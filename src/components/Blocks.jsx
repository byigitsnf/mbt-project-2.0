import { useNavigate } from 'react-router-dom';
import Img from './Img.jsx';

/**
 * Renders the content blocks stored in the JSON files.
 * Paragraph HTML comes from our own data files (links and <strong> only).
 */
export default function Blocks({ blocks }) {
  const navigate = useNavigate();

  // Internal links inside paragraph HTML should use client-side routing.
  const onClick = (e) => {
    const a = e.target.closest('a');
    const href = a?.getAttribute('href');
    if (!href || !href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    // Only real <a> clicks are handled here; pressing Enter on a link also fires "click".
    <div className="blocks" onClick={onClick}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return b.level === 2 ? <h2 key={i} id={b.id}>{b.text}</h2> : <h3 key={i} id={b.id}>{b.text}</h3>;
          case 'paragraph':
            return <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
          case 'list':
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );
          case 'figure':
            return (
              <figure key={i}>
                <Img src={b.image} alt={b.alt} sizes="(min-width: 1100px) 760px, calc(100vw - 32px)" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
