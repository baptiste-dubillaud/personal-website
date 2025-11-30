# My Personal Website

Repository for the UI of my personal website.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Docker

Run the app with Docker for local development:

```cmd
docker build -t personal-website-dev -f dockerfile .
docker run --rm -p 3000:3000 -v %CD%:/app -v /app/node_modules personal-website-dev
```

Or via docker-compose:

```cmd
docker-compose up --build
```

## Metadata & SEO

- Site-wide defaults are defined in `src/app/layout.js`.
- The resume page defines specific metadata in `src/app/resume/page.js`.
- A sitemap is generated from `src/app/sitemap.js` and is referenced in `public/robots.txt`.

## Internationalization

Uses `next-intl` with messages in `src/i18n/messages/*`.
