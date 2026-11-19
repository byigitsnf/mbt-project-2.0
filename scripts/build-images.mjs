// Turns every photo in source-images/ into responsive WebP files in
// public/img/ and writes src/data/images.json (sizes for each image).
// Already-generated files are skipped, so re-runs are fast.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'source-images');
const OUT = path.join(ROOT, 'public/img');
const MANIFEST = path.join(ROOT, 'src/data/images.json');

const WIDTHS = [480, 960, 1600];
const FLAG_WIDTHS = [48, 96];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) yield full;
  }
}

const manifest = {};
let made = 0;

for (const file of walk(SRC)) {
  const key = path.relative(SRC, file).replaceAll('\\', '/').replace(/\.[^.]+$/, '');
  // Buffer input avoids Windows file locks.
  const input = fs.readFileSync(file);
  const meta = await sharp(input).rotate().metadata();
  const portrait = (meta.orientation ?? 1) >= 5;
  const width = portrait ? meta.height : meta.width;
  const height = portrait ? meta.width : meta.height;

  const wanted = key.split('/').includes('flags') ? FLAG_WIDTHS : WIDTHS;
  let widths = wanted.filter((w) => w < width);
  if (widths.length < wanted.length) widths.push(Math.min(width, wanted[wanted.length - 1]));
  widths = [...new Set(widths)];

  fs.mkdirSync(path.join(OUT, path.dirname(key)), { recursive: true });
  for (const w of widths) {
    const out = path.join(OUT, `${key}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(file).mtimeMs) continue;
    await sharp(input).rotate().resize({ width: w }).webp({ quality: 76 }).toFile(out);
    made++;
  }
  manifest[key] = { w: width, h: height, widths };
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
console.log(`images: ${Object.keys(manifest).length} sources, ${made} new files`);
