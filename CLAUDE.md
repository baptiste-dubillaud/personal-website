# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server on http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals)
```

No test suite is configured.

Docker alternative: `docker-compose up` (mounts source with hot reload, Node 18 Alpine).

## Architecture

**Next.js 14 App Router** with a mix of Server and Client Components. No TypeScript — plain JavaScript throughout.

### Routing & Rendering

- Pages under `src/app/` follow App Router conventions
- Blog pages are **Server Components** (the App Router default — no directive; do **not** add `'use server'`, which declares Server Actions and forbids non-async exports like `export const dynamic`). They read markdown files from `public/` via `fs.readFileSync`, parse YAML frontmatter with `gray-matter`, and render with `markdown-it`
- Interactive pages (home, resume) are **Client Components** (`'use client'`) using hooks
- Dynamic route: `src/app/blog/[post]/`

### Internationalization

`next-intl` handles EN/FR with two-layer locale detection:
- **Client:** `ClientIntlProvider.js` reads localStorage → falls back to `navigator.language` → defaults to `"en"`. Dynamically imports `src/i18n/messages/{locale}.json`.
- **Server:** `src/i18n/request.js` reads from request headers.

All user-facing strings live in `src/i18n/messages/en.json` and `fr.json`. Components use `useTranslations()`. Resume content (experiences, education) is fully driven by these translation files.

### Styling

**CSS Modules + CSS Variables only** — no Tailwind, no utility framework.

- Global design tokens in `src/app/globals.css`: orange/beige palette (`--color-orange: rgb(255, 68, 0)`, `--color-background: rgb(236, 226, 210)`), 10 opacity variants for orange, `--base-container-height: calc(100dvh - 188px)`
- Each component/page has a co-located `*.module.css` file

### Animations

**Framer Motion** (`framer-motion` + `motion` packages) is used in three files:

- **`src/app/page.js`** — on-mount hero sequence (character-by-character name reveal, spring profile picture, staggered fade-ins). All above-the-fold; delay-based is correct here.
- **`src/components/core/navigationBar/NavigationBar.js`** — on-mount typewriter effect and nav link stagger. No changes needed.
- **`src/app/resume/page.js`** — scroll-triggered via `whileInView`. Two shared variants drive all section animations:
  ```js
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  ```
  The container gets `whileInView="visible" viewport={{ once: true }}`, children get `variants={itemVariants}` only — no individual `whileInView`. Follow this pattern for any new animated content on the resume page.

### Component Structure

```
src/components/
├── core/          # Layout: NavigationBar (with typewriter + LanguageSwitcher), Footer
├── common/        # RichText (safe renderer for <bold> tags), NavigationButton, icons
└── providers/     # ClientIntlProvider
```

`RichText.js` is the safe way to render strings that contain `<bold>` markup — use it instead of `dangerouslySetInnerHTML` for translated content.

### Content

Blog posts are markdown files in `public/blog/`, one post per **three files** (bilingual): `<slug>.md` holds language-invariant metadata (`author`, `image`, `created`, `updated`), while `<slug>.en.md` / `<slug>.fr.md` each hold the per-locale frontmatter (`title`, `description`, `tags`) plus the article body. All reads go through `src/utils/blogUtils.js` (never `fs` directly in pages) — it validates the slug against a whitelist (path-traversal safe), merges shared + locale metadata, and falls back to the other locale if one is missing. Dates are ISO (`YYYY-MM-DD`), formatted per-locale at render.

### SEO

- Default metadata in `src/app/layout.js`
- Page-specific metadata in each `page.js` via Next.js `metadata` export
- Dynamic sitemap at `src/app/sitemap.js`

### Deployment

GitHub Actions deploys to **Azure Static Web Apps** on push to `main` (see `.github/workflows/`).
