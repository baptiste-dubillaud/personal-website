# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server on http://localhost:3000 (Turbopack)
npm run build    # Production build (Turbopack)
npm run lint     # ESLint CLI, flat config (eslint.config.mjs)
```

No test suite is configured.

Docker alternative: `docker compose up --build` (mounts source with hot reload, Node 24 Alpine).

**Always pass `--build`.** The dev compose file mounts `/app/node_modules` and `/app/.next` as *anonymous volumes*, which Compose reattaches to each new container, and a plain `docker compose up` never rebuilds the image. Both together will happily keep running a months-old `npm install` against current source — which is how the container once ran Next 14 against a Next 16 codebase (silently disabling `reactCompiler`, falling back to webpack, and failing in `patch-incorrect-lockfile`). After any dependency change: `docker compose down -v && docker compose up -d --build`.

## Architecture

**Next.js 16 App Router** on **React 19**, with a mix of Server and Client Components. No TypeScript — plain JavaScript throughout.

Turbopack is the bundler for both `dev` and `build` (the Next.js 16 default), and the **React Compiler** is enabled (`reactCompiler: true` in `next.config.mjs`). The compiler silently skips any component that breaks the rules of React, so the `react-hooks/*` errors ESLint reports are not cosmetic — a violation costs that component its auto-memoisation. In particular: no `setState` called synchronously in an effect body, no reading `ref.current` during render, and no writing to globals (`document.cookie`, …) from a render scope — hoist that into a module-level helper. Client-only values that would otherwise be resolved by a mount effect (platform sniffing, media queries) are read with `useSyncExternalStore` instead; see `NavigationBar.js` and `resume/page.js`.

### Routing & Rendering

- Pages under `src/app/` follow App Router conventions
- Blog pages are **Server Components** (the App Router default — no directive; do **not** add `'use server'`, which declares Server Actions and forbids non-async exports like `export const dynamic`). They read markdown files from `public/` via `fs.readFileSync`, parse YAML frontmatter with `gray-matter`, and render with `markdown-it`
- Interactive pages (home, resume) are **Client Components** (`'use client'`) using hooks
- Dynamic route: `src/app/blog/[post]/` — `params` is a Promise and must be awaited (Next.js 16 removed synchronous access)

### Internationalization

`next-intl` handles EN/FR, with no locale prefix in the URL. `src/i18n/locales.js` is the **single source of truth**: one `LOCALES` map describes each locale completely — switcher label, `aria-label` and Open Graph `language_TERRITORY` tag — and `SUPPORTED_LOCALES` is `Object.keys(LOCALES)`. **Key order is the switcher's display order.** `request.js`, `setLocale.js`, `LanguageSwitcher.js`, `layout.js` and `blogUtils.js` all derive from it; adding a language is one entry in that map plus a messages file.

Because the key order is a display order and not a preference ranking, anything that needs a *fallback* ranking spells it out (see `blogUtils.getPostBySlug`: requested → `DEFAULT_LOCALE` → the rest).

Resolution order is **`NEXT_LOCALE` cookie → `Accept-Language` → `"en"`**, and it all happens in **`src/i18n/request.js`**, which reads both with `cookies()` and `headers()`. There is deliberately **no proxy/middleware layer**: `headers()` already exposes the incoming request headers, so forwarding `Accept-Language` through an `x-locale` header bought nothing and cost a proxy invocation on every request. Do not reintroduce one for this.

`resolveAcceptLanguage()` honours **q-values**, not list position — `de-DE,fr;q=0.9,en;q=0.8` resolves to `fr`. Region subtags are dropped (`fr-CA` → `fr`) and `q=0` entries are discarded.

**Changing language goes through the `setLocale` Server Action** (`src/i18n/setLocale.js`), never `document.cookie` + `router.refresh()`. Two reasons, both load-bearing:

- The cookie must be read by `cookies()` within the same request: an action writes it *after* any request-scoped header has been fixed, so resolving from a header would re-render in the *previous* language.
- The action calls `revalidatePath("/", "layout")`: the messages live in the root layout's `NextIntlClientProvider`, so invalidating only the current page segment would leave the navigation and footer in the old language.

The cookie is written `httpOnly` (nothing reads it from the browser) and `secure` in production only.

Because every page reads request-time data, all pages render dynamically.

All user-facing strings live in `src/i18n/messages/en.json` and `fr.json`. Components use `useTranslations()`. Word *order* that differs per language is data too, not a branch in a component — the home page's `workTitle.order` array is read with `t.raw()` and drives the render, so there is no `locale === "fr"` test in JSX. Resume content (experiences, education) is fully driven by these translation files.

An experience entry may carry an optional `clients` array — sub-missions of one continuous role, used by the freelance entry. Each client takes `start_date`, `end_date`, `name`, optional `role` / `location`, its own `descriptions` (same `paragraph` / `list` blocks as the parent) and its own `stack`. When an experience has clients, put the stack on each client rather than on the experience; `TechStackComponent` renders nothing when a stack is absent or empty.

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
└── common/        # ui/ (design-system components + RichText, LanguageSwitcher), icons/
```

`NextIntlClientProvider` is mounted inline in `src/app/layout.js`; there is no separate provider component.

`RichText.js` is the safe way to render strings that contain `<bold>` markup — use it instead of `dangerouslySetInnerHTML` for translated content.

### Feature flags

`src/utils/featureFlags.js` holds site-wide switches. **The blog is currently off** (`BLOG_ENABLED = false`, since 2.1): the nav entry is filtered out, `/blog` and `/blog/<slug>` call `notFound()`, and the sitemap lists neither. The pages, `blogUtils.js` and `public/blog/` are all untouched — flipping the flag back to `true` is the only step needed to restore it.

### Content

Blog posts are markdown files in `public/blog/`, one post per **three files** (bilingual): `<slug>.md` holds language-invariant metadata (`author`, `image`, `created`, `updated`), while `<slug>.en.md` / `<slug>.fr.md` each hold the per-locale frontmatter (`title`, `description`, `tags`) plus the article body. All reads go through `src/utils/blogUtils.js` (never `fs` directly in pages) — it validates the slug against a whitelist (path-traversal safe), merges shared + locale metadata, and falls back to the other locale if one is missing. Dates are ISO (`YYYY-MM-DD`), formatted per-locale at render.

### SEO

- Default metadata in `src/app/layout.js` — `baseMetadata` holds the locale-independent fields and `generateMetadata()` layers `og:locale` on top from the served locale (`metadata` and `generateMetadata` cannot both be exported). `SITE_URL` lives in `src/utils/linkUtils.js` and is set as `metadataBase`, so canonical/`og:url` are written as relative paths and resolved from it — do not repeat the origin
- Page-specific metadata in each `page.js` via Next.js `metadata` export
- Dynamic sitemap at `src/app/sitemap.js`
- `src/app/opengraph-image.js` renders the social card (1200x630) through **Satori**, which is not a browser: no `mask-image`, no CSS grid, and every multi-child `div` needs an explicit `display: flex`. The site's blueprint canvas is therefore rebuilt there — the radial spotlight is inverted into a beige overlay, and the grid lines run stronger than `--blueprint-*` because a feed displays this image at roughly 500px wide, where a 5% grid disappears. The card is translucent so the grid reads through it; keep the overlay gentle or it erases the grid in the only margin still visible. Check any change by rendering `/opengraph-image` and looking at it, including downscaled
- **No `hreflang` alternates**, on purpose: the locale lives in a cookie, not the URL, so there is no distinct address to point one at. Declaring en/fr alternates that all resolve to the same URL only asserts something untrue. Real hreflang requires moving to URL-prefixed routing.

### Deployment

Self-hosted Docker behind Traefik: `Dockerfile.prod` builds the `output: "standalone"` bundle (Node 24 Alpine, non-root runner, `node server.js`) and `docker-compose.prod.yml` wires the TLS routers for `www.dubillaudb.fr`. There is no CI workflow in this repository.

The site version shown in the footer is the last line of `public/version.txt` — append a line there when releasing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
