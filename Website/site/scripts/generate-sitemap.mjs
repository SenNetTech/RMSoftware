import { writeFileSync } from 'node:fs';
import { site } from '../app/site-content.ts';
import { services } from '../app/services-data.ts';
const routes = [
  '/',
  '/services/',
  ...services.map((s) => `/services/${s.slug}/`),
  '/contact/',
  '/privacy/',
];
writeFileSync(
  new URL('../public/sitemap.xml', import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((path) => `  <url><loc>${new URL(path, site.url).href}</loc></url>`).join('\n')}\n</urlset>\n`,
);
