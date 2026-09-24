# RMSoftware

A business-focused software agency website for qualified enquiries. Built with React, Vinext and Tailwind CSS, using the existing RMSoftware identity and light/dark appearance.

## Development and verification

Requires Node.js 24.x and npm. Run `npm ci` if dependencies are missing, then `npm run dev`.

```sh
npx tsc --noEmit
npx oxlint app
npm run check:enquiry
npm run check:navigation
npm run build
npm run check:seo
```

The production build exports nine content routes and a 404 page to `dist/client`. The prebuild step regenerates the sitemap. SEO checks inspect the deployable HTML for unique metadata, canonical links, structured data, working internal links/anchors, enquiry labels and encoding. Enquiry checks validate input and complete email drafts; they never send messages.

Browser visual/interaction testing and field Core Web Vitals measurements have not been performed. Static rendering, local fonts, restrained client code, disabled link prefetch and reserved image dimensions support performance; they do not establish a measured score.

## Static page navigation

All page and section links use `app/site-link.tsx`, a native anchor wrapper. Vinext's client router requests exported `index.txt` RSC payloads, which the static Sites host serves as plain text. Its fallback can then send the browser to the data URL (for example `/index.txt#solutions`). Native document navigation targets the actual HTML routes and preserves fragment scrolling, service-selection queries, modifier clicks, browser history and new tabs. The regression check covers this policy across all application source files and exercises the real link component. Do not replace these anchors with `next/link` unless the deployed host's RSC navigation contract is fixed and verified.

## Content

- `app/page.tsx`: homepage conversion flow and explicitly illustrative solution examples. No client base has been established; do not present these as completed projects, or add invented testimonials, logos or results.
- `app/services-data.ts`: five service offers, deliverables, FAQ content and qualification options. `/services/` and `/services/[slug]/` expose dedicated pages.
- `app/contact/page.tsx` and `app/enquiry-form.tsx`: plain-language enquiry with name, company, work email, optional phone, the business situation, and optional project type and starting timeframe. The form does not request a budget.
- `app/site-content.ts`: canonical production origin, verified email and optional verified international WhatsApp number. Blank WhatsApp is intentionally hidden.
- `app/globals.css` and `app/site-styles.css`: shared brand tokens, responsive design, touch targets, focus states and reduced motion. Existing logo retained.
- `app/privacy/page.tsx`: enquiry and cookie information. Update it when providers or actual processing practices change.

## Enquiries and privacy

The form validates project details and prepares an email draft addressed to info@rmsoftware.co.za. Visitors open their email app or copy the complete enquiry, then review and send it themselves. The website clearly says that preparing a draft does not send the enquiry. Answers are not stored in browser storage or submitted to a form service.

The website has no analytics integration, event tracking or analytics consent banner. No enquiry or analytics environment variables or third-party accounts are required. Local appearance preferences remain available. Keep real environment files out of source control; the existing ignore rules remain in place.

## Deployment

Vercel: keep Root Directory `Website/site`, framework Other, build `npm run build`, output `dist/client`, and Node 24.x. `vercel.json` includes security headers. `public/_headers` supplies corresponding directives for hosts that support that convention; verify effective response headers after deployment.

Content-addressed files under `/_next/static/` receive a one-year immutable cache policy on Vercel. HTML retains the host's revalidation policy so releases can update promptly. An explicit HTML referrer policy also protects navigation metadata on hosts that do not apply custom response headers.

An authenticated HTTP audit of private Sites version 2 confirmed all nine pages and the homepage's referenced scripts, styles and fonts return 200, with a real 404 for an unknown route. The Sites static host did not apply `public/_headers` in that audit and returned revalidation caching for hashed assets. Consequently, those response-header and immutable-cache settings are prepared for Vercel, not verified on the private Sites host. This HTTP check does not verify browser rendering or interactions.

Sites: preserve `.openai/hosting.json` and its project ID. Publish only the validated static export through Sites. Existing Sites access is owner-private; changes here do not automatically publish the public RMSoftware domain.

## Search Console and launch dependencies

The canonical origin remains `https://www.rmsoftware.co.za/`. The existing Google verification file is retained. After deployment to that origin, verify ownership in Google Search Console, submit `/sitemap.xml`, and inspect the homepage and service pages. Local files do not establish account verification or indexing.

Pending business configuration: verified WhatsApp number if wanted. Real case studies and testimonials can replace the illustrative examples once evidence and permission are available. Public publication and measured conversion results are separate from implementation.
