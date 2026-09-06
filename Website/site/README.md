# RM Software

A responsive, single-page agency website built with React, Vinext, and Tailwind CSS.

## Run locally

Requires Node.js 22.13 or newer and npm. In this directory:

```sh
npm install
npm run dev
```

Open the local address printed by the server (normally http://localhost:3000).

```sh
npm run build
npm start
```

The production build exports static files to `dist/client`. No database, email service, account, or hosted deployment is configured.

## Content

- Edit page copy, services, and process steps in `app/page.tsx`.
- Edit navigation in `app/header.tsx` and design tokens/layouts in `app/globals.css`.
- The original supplied logo remains in `../Images/Logo.jpeg`; `public/images/logo.jpeg` is an unchanged copy. CSS clips its surrounding whitespace without modifying the image. The favicon embeds the same artwork.
- The contact section intentionally says “Business email coming soon.” Before launch, replace it with the actual business email and a corresponding `mailto:` link.

## Checks

```sh
npx tsc --noEmit
npx oxlint app
npm run build
```

The scaffold also includes an unused Shadcn component catalog. Full-repository `npm run lint` currently reports pre-existing issues in those generated components and their hook; the authored app is checked separately. Browser interaction and visual tests have not been run.
