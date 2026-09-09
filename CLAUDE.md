# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server on http://localhost:3000 (Turbopack)
npm run build    # Production build (Turbopack)
npm run lint     # ESLint CLI, flat config (eslint.config.mjs)
```

No test suite is configured.

Docker alternative: `docker-compose up` (mounts source with hot reload, Node 24 Alpine).

## Architecture

**Next.js 16 App Router** on **React 19**, with a mix of Server and Client Components. No TypeScript — plain JavaScript throughout.

Turbopack is the bundler for both `dev` and `build` (the Next.js 16 default), and the **React Compiler** is enabled (`reactCompiler: true` in `next.config.mjs`). The compiler silently skips any component that breaks the rules of React, so the `react-hooks/*` errors ESLint reports are not cosmetic — a violation costs that component its auto-memoisation. In particular: no `setState` called synchronously in an effect body, no reading `ref.current` during render, and no writing to globals (`document.cookie`, …) from a render scope — hoist that into a module-level helper. Client-only values that would otherwise be resolved by a mount effect (platform sniffing, media queries) are read with `useSyncExternalStore` instead; see `NavigationBar.js` and `resume/page.js`.

### Routing & Rendering

- Pages under `src/app/` follow App Router conventions
- Blog pages are **Server Components** (the App Router default — no directive; do **not** add `'use server'`, which declares Server Actions and forbids non-async exports like `export const dynamic`). They read markdown files from `public/` via `fs.readFileSync`, parse YAML frontmatter with `gray-matter`, and render with `markdown-it`
- Interactive pages (home, resume) are **Client Components** (`'use client'`) using hooks
- Dynamic route: `src/app/blog/[post]/` — `params` is a Promise and must be awaited (Next.js 16 removed synchronous access)

### Internationalization

`next-intl` handles EN/FR. The locale is resolved once per request in `src/proxy.js` (the Next.js 16 replacement for `middleware.js` — the file, the exported function and the `skipProxyUrlNormalize`-style flags were all renamed; the `edge` runtime is not available there):

- **Resolution order:** `NEXT_LOCALE` cookie → `Accept-Language` header → `"en"`.
- The result is forwarded to Server Components as an `x-locale` request header, which `src/i18n/request.js` reads.
- `LanguageSwitcher` writes the cookie and calls `router.refresh()` to re-render the tree in the new language.

Because every page depends on that header, all pages render dynamically.

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

### Feature flags

`src/utils/featureFlags.js` holds site-wide switches. **The blog is currently off** (`BLOG_ENABLED = false`, since 2.1): the nav entry is filtered out, `/blog` and `/blog/<slug>` call `notFound()`, and the sitemap lists neither. The pages, `blogUtils.js` and `public/blog/` are all untouched — flipping the flag back to `true` is the only step needed to restore it.

### Content

Blog posts are markdown files in `public/blog/`, one post per **three files** (bilingual): `<slug>.md` holds language-invariant metadata (`author`, `image`, `created`, `updated`), while `<slug>.en.md` / `<slug>.fr.md` each hold the per-locale frontmatter (`title`, `description`, `tags`) plus the article body. All reads go through `src/utils/blogUtils.js` (never `fs` directly in pages) — it validates the slug against a whitelist (path-traversal safe), merges shared + locale metadata, and falls back to the other locale if one is missing. Dates are ISO (`YYYY-MM-DD`), formatted per-locale at render.

### SEO

- Default metadata in `src/app/layout.js`
- Page-specific metadata in each `page.js` via Next.js `metadata` export
- Dynamic sitemap at `src/app/sitemap.js`

### Deployment

Self-hosted Docker behind Traefik: `Dockerfile.prod` builds the `output: "standalone"` bundle (Node 24 Alpine, non-root runner, `node server.js`) and `docker-compose.prod.yml` wires the TLS routers for `www.dubillaudb.fr`. There is no CI workflow in this repository.

The site version shown in the footer is the last line of `public/version.txt` — append a line there when releasing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
