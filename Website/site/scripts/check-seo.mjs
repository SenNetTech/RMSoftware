import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { site, contact } from '../app/site-content.ts';
import { services } from '../app/services-data.ts';
const output = new URL('../dist/client/', import.meta.url);
const routes = [
  '/',
  '/services/',
  ...services.map((s) => `/services/${s.slug}/`),
  '/contact/',
  '/privacy/',
];
const decode = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"');
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      decode(value),
    ]),
  );
}
function readRoute(path) {
  return readFileSync(
    new URL(`${path.replace(/^\//, '')}index.html`, output),
    'utf8',
  );
}
const htmlByRoute = new Map(routes.map((path) => [path, readRoute(path)]));
const titles = new Set();
const descriptions = new Set();
for (const [path, html] of htmlByRoute) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, `${path}: head exists`);
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const meta = (key) =>
    metas.filter((item) => item.name === key || item.property === key);
  assert.deepEqual(
    meta('referrer').map((item) => item.content),
    ['strict-origin-when-cross-origin'],
    `${path}: explicit referrer policy`,
  );
  for (const key of [
    'description',
    'og:title',
    'og:description',
    'og:url',
    'og:type',
    'twitter:title',
    'twitter:description',
    'twitter:card',
  ]) {
    assert.equal(meta(key).length, 1, `${path}: exactly one ${key}`);
    assert.ok(meta(key)[0].content, `${path}: non-empty ${key}`);
  }
  const titleMatches = [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  assert.equal(titleMatches.length, 1, `${path}: one title`);
  const title = decode(titleMatches[0][1]);
  const description = meta('description')[0].content;
  assert.ok(!titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  descriptions.add(description);
  assert.equal(
    meta('og:title')[0].content,
    title,
    `${path}: matching social title`,
  );
  assert.equal(
    meta('twitter:description')[0].content,
    description,
    `${path}: matching Twitter description`,
  );
  assert.equal(
    meta('og:description')[0].content,
    description,
    `${path}: matching Open Graph description`,
  );
  assert.equal(
    new URL(meta('og:url')[0].content).href,
    new URL(path, site.url).href,
  );
  assert.deepEqual(
    links
      .filter((item) => item.rel === 'canonical')
      .map((item) => new URL(item.href).href),
    [new URL(path, site.url).href],
  );
  assert.ok(
    !meta('robots').some((item) => /noindex|none/i.test(item.content)),
    `${path}: indexable`,
  );
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one h1`);
  assert.ok(
    !/[\u00c2\u00c3]|\u00e2[\u0080-\u00bf\u20ac\u2020]/.test(html),
    `${path}: no encoding corruption`,
  );
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/gi)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(decode(href), new URL(path, site.url));
    if (!target.pathname.endsWith('/') && target.pathname.includes('.')) {
      assert.ok(
        existsSync(new URL(`.${target.pathname}`, output)),
        `Missing asset ${target.pathname}`,
      );
      continue;
    }
    const route = `${target.pathname.replace(/\/$/, '')}/`;
    assert.ok(htmlByRoute.has(route), `${path}: destination ${route} exists`);
    if (target.hash)
      assert.ok(
        htmlByRoute.get(route).includes(`id="${target.hash.slice(1)}"`),
        `${path}: anchor ${href} exists`,
      );
  }
  const jsonScripts = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const [, text] of jsonScripts)
    assert.equal(JSON.parse(text)['@context'], 'https://schema.org');
  if (path === '/') {
    assert.equal(title, site.title);
    assert.equal(description, site.description);
    assert.equal(jsonScripts.length, 1);
    const graph = JSON.parse(jsonScripts[0][1])['@graph'];
    const org = graph.find((item) => item['@type'] === 'Organization');
    assert.equal(org.email, contact.email);
    assert.equal(org.url, site.url);
    assert.ok(existsSync(new URL(`.${new URL(org.logo).pathname}`, output)));
    assert.ok(html.includes('Custom software development'));
    assert.ok(html.includes('not completed client projects'));
  }
  if (path.startsWith('/services/') && path !== '/services/') {
    assert.equal(jsonScripts.length, 1);
    const graph = JSON.parse(jsonScripts[0][1])['@graph'];
    assert.equal(
      graph.find((item) => item['@type'] === 'Service').url,
      new URL(path, site.url).href,
    );
    assert.equal(
      graph.find((item) => item['@type'] === 'BreadcrumbList').itemListElement
        .length,
      3,
    );
  }
}
const contactHtml = htmlByRoute.get('/contact/');
for (const field of [
  'name',
  'company',
  'email',
  'phone',
  'problem',
  'projectType',
  'budget',
  'timeline',
]) {
  assert.ok(
    contactHtml.includes(`name="${field}"`),
    `Contact includes ${field}`,
  );
  assert.ok(contactHtml.includes(`for="${field}"`), `Contact labels ${field}`);
}
const robots = readFileSync(new URL('robots.txt', output), 'utf8');
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /^Allow: \/\s*$/im);
assert.ok(
  robots.includes(`Sitemap: ${new URL('/sitemap.xml', site.url).href}`),
);
const sitemap = readFileSync(new URL('sitemap.xml', output), 'utf8');
assert.match(
  sitemap,
  /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/,
);
assert.deepEqual(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url).sort(),
  routes.map((path) => new URL(path, site.url).href).sort(),
);
assert.match(readFileSync(new URL('404.html', output), 'utf8'), /noindex/i);
console.log(
  `SEO checks passed on ${routes.length} routes: unique metadata, canonical URLs, structured data, internal links, anchors, enquiry labels, sitemap and encoding.`,
);
