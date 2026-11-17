import images from '../data/images.json';

/**
 * Responsive image backed by the files that `npm run images` generates.
 * `src` is a key such as "m1-abrams/m1ip" (see src/data/images.json).
 * Width/height are always set so the layout does not jump while loading.
 */
export default function Img({ src, alt, sizes = '100vw', loading = 'lazy', fetchPriority, className }) {
  const meta = images[src];
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`Unknown image: ${src}`);
    return null;
  }
  const base = import.meta.env.BASE_URL;
  const url = (w) => `${base}img/${src}-${w}.webp`;
  const fallback = meta.widths[Math.min(1, meta.widths.length - 1)];
  return (
    <img
      src={url(fallback)}
      srcSet={meta.widths.map((w) => `${url(w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchpriority={fetchPriority}
      className={className}
    />
  );
}
