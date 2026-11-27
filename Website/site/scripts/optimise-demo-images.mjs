// One-off helper: converts generated concept screenshots into optimised WebP.
// Usage: node scripts/optimise-demo-images.mjs <folder-with-source-images>
// Source files must be named <slug>.jpg or <slug>.png (see app/demos-data.ts).
import { mkdirSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const source = process.argv[2];
if (!source) {
  console.error('Pass the folder that contains the source images.');
  process.exit(1);
}
const output = new URL('../public/images/demos/', import.meta.url);
mkdirSync(output, { recursive: true });

for (const file of readdirSync(source).filter((name) => /\.(jpe?g|png)$/i.test(name))) {
  const { name } = parse(file);
  const image = sharp(join(source, file));
  const { width, height } = await image.metadata();
  const portrait = height > width;
  const info = await image
    .resize({ width: portrait ? 800 : 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(new URL(`${name}.webp`, output).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
