import { useEffect, useState } from 'react';

const WIDE = '(min-width: 1000px)';

/** "On this page" navigation: sticky sidebar on wide screens, collapsible on small ones. */
export default function Toc({ items }) {
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches);
  const [open, setOpen] = useState(wide);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const onChange = () => {
      setWide(mq.matches);
      setOpen(mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = items.flatMap((i) => [i.id, ...i.children.map((c) => c.id)]);
    const headings = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const link = (item) => (
    <a
      href={`#${item.id}`}
      aria-current={active === item.id ? 'location' : undefined}
      onClick={() => !wide && setOpen(false)}
    >
      {item.text}
    </a>
  );

  return (
    <nav className="toc" aria-labelledby="toc-title">
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>
          <span id="toc-title">On this page</span>
        </summary>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              {link(item)}
              {item.children.length > 0 && (
                <ol>
                  {item.children.map((c) => (
                    <li key={c.id}>{link(c)}</li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
