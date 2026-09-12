import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';

// Exercise the real link component without needing a router or browser session.
const source = readFileSync(
  new URL('../app/site-link.tsx', import.meta.url),
  'utf8',
);
const javascript = ts
  .transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  .outputText.replace(
    '"react/jsx-runtime"',
    JSON.stringify(import.meta.resolve('react/jsx-runtime')),
  );
const { default: SiteLink } = await import(
  `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`
);
for (const href of [
  '/',
  '/#solutions',
  '/#process',
  '/services/',
  '/services/custom-business-software/',
  '/contact/?service=Custom%20Business%20Software#project-form',
  '/privacy/',
  'mailto:info@rmsoftware.co.za',
]) {
  const element = SiteLink({ href, children: 'Continue' });
  assert.equal(
    element.type,
    'a',
    `${href}: must use native document navigation`,
  );
  assert.equal(
    element.props.href,
    href,
    `${href}: preserve destination, query and hash`,
  );
  assert.equal(
    element.props.onClick,
    undefined,
    `${href}: no router interception`,
  );
}
const click = () => {};
const custom = SiteLink({
  href: '/#solutions',
  onClick: click,
  target: '_blank',
  rel: 'noopener',
  download: 'notes',
  'data-purpose': 'consultation_click',
});
assert.equal(
  custom.props.onClick,
  click,
  'Preserve mobile menu closing and caller behaviour',
);
assert.equal(custom.props.target, '_blank');
assert.equal(custom.props.download, 'notes');
assert.equal(custom.props['data-purpose'], 'consultation_click');

// One shared policy must cover header, footer, service cards, CTAs and form links.
const app = new URL('../app/', import.meta.url);
for (const file of readdirSync(app, { recursive: true }).filter((file) =>
  /\.[cm]?[jt]sx?$/.test(file),
)) {
  const text = readFileSync(new URL(file.replaceAll('\\', '/'), app), 'utf8');
  assert.ok(
    !/from\s+['"]next\/link['"]/.test(text),
    `${file}: static site must not reintroduce RSC link navigation`,
  );
  assert.ok(
    !/router\.(?:push|replace)\(/.test(text),
    `${file}: avoid imperative RSC navigation`,
  );
}
console.log(
  'Navigation checks passed: native page/section links throughout the app; query strings, custom clicks, new tabs and custom attributes preserved.',
);
