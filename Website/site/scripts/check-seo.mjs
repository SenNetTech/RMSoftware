import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { site, contact } from '../app/site-content.ts';

// Check the deployable static output, including Vinext's metadata serialization.
const output = new URL('../dist/client/', import.meta.url);
const html = readFileSync(new URL('index.html', output), 'utf8');
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
assert.ok(head, 'The exported homepage must contain a head element');

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
    .map(([, key, value]) => [key, value.replaceAll('&amp;', '&')]));
}
const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag));
const meta = (key) => metas.filter((item) => item.name === key || item.property === key);
for (const [key, expected] of [
  ['description', site.description],
  ['og:title', site.title],
  ['og:description', site.description],
  ['og:url', site.url],
  ['og:type', 'website'],
  ['twitter:card', 'summary'],
  ['twitter:title', site.title],
  ['twitter:description', site.description],
]) {
  assert.equal(meta(key).length, 1, `${key} must appear exactly once in the head`);
  // Vinext may serialize an origin without its optional trailing slash.
  const actual = key === 'og:url' ? new URL(meta(key)[0].content).href : meta(key)[0].content;
  assert.equal(actual, expected, `${key} must match the site content`);
}
assert.equal([...head.matchAll(/<title\b/g)].length, 1, 'Use one page title');
assert.equal(head.match(/<title>([\s\S]*?)<\/title>/)?.[1].replaceAll('&amp;', '&'), site.title);
assert.deepEqual(links.filter((item) => item.rel === 'canonical').map((item) => new URL(item.href).href), [site.url]);
assert.ok(!meta('robots').some((item) => /noindex|none/i.test(item.content)), 'Homepage must be indexable');
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'Homepage must have one main heading');
assert.ok(html.includes('Custom software development'), 'Service context must be in the static HTML');

const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length, 1, 'Homepage must expose one structured-data graph');
const data = JSON.parse(scripts[0][1]);
assert.equal(data['@context'], 'https://schema.org');
const organization = data['@graph'].find((item) => item['@type'] === 'Organization');
const website = data['@graph'].find((item) => item['@type'] === 'WebSite');
const page = data['@graph'].find((item) => item['@type'] === 'WebPage');
assert.equal(organization.name, site.name);
assert.equal(organization.email, contact.email);
assert.equal(organization.url, site.url);
assert.equal(website.publisher['@id'], organization['@id']);
assert.equal(page.isPartOf['@id'], website['@id']);
assert.equal(page.url, site.url);
assert.ok(existsSync(new URL(`.${new URL(organization.logo).pathname}`, output)), 'Schema logo must exist in the output');

const robots = readFileSync(new URL('robots.txt', output), 'utf8');
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /^Allow: \/\s*$/im);
assert.ok(robots.includes(`Sitemap: ${new URL('/sitemap.xml', site.url).href}`));
const sitemap = readFileSync(new URL('sitemap.xml', output), 'utf8');
assert.match(sitemap, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url), [site.url]);
assert.match(readFileSync(new URL('404.html', output), 'utf8'), /noindex/i, '404 page must stay out of search');
console.log('SEO checks passed: metadata, canonical URL, structured data, sitemap, robots, and static content.');
