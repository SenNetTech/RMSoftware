# RMSoftware

A responsive agency website built with React, Vinext, and Tailwind CSS.

## Development

Requires Node.js 22.13 or newer and npm.

```sh
npm install
npm run dev
```

Use the local address printed by the server.

```sh
npm run build
npm start
```

The production build exports static files to `dist/client`.

## Content and appearance

- `app/page.tsx`: services, business examples, process, and director profiles.
- `app/site-content.ts`: business email and optional international WhatsApp number. The email button opens the visitor's email application; this static site does not collect or store enquiries. A WhatsApp contact button appears only when a verified number is configured.
- `app/header.tsx`: desktop and keyboard-accessible mobile navigation.
- `app/globals.css`: shared design tokens and responsive styling. Light and dark themes follow `prefers-color-scheme` until the header toggle is used. The chosen theme is saved locally and applied before the page renders on future visits. Reduced-motion settings are respected.
- `app/layout.tsx`: document title, description, and fonts.
- The existing supplied logo is preserved in `public/images/logo.jpeg`. CSS adapts its display for each theme.

## Verification

```sh
npx tsc --noEmit
npx oxlint app
npm run build
```

The generated Shadcn catalog is retained. Browser visual and interaction testing has not been run.
