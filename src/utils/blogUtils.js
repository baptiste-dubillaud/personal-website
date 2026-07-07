import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { BLOG_FOLDER_PATH } from "@/utils/linkUtils";

/**
 * Single source of truth for reading blog posts from `public/blog/`.
 *
 * Each post is stored as three files:
 *   - `<slug>.md`      — shared, language-invariant metadata (author, image,
 *                         created, updated). No body.
 *   - `<slug>.en.md`   — English frontmatter (title, description, tags) + body.
 *   - `<slug>.fr.md`   — French  frontmatter (title, description, tags) + body.
 *
 * A resolved post merges the shared metadata with the requested locale's
 * frontmatter (locale wins) and carries that locale's body.
 *
 * Centralising this keeps the security boundary in one place: pages never build
 * a filesystem path from user input directly. A requested slug is only honoured
 * if it matches a real base `.md` file discovered by `getPostSlugs()`, and the
 * locale is validated against a fixed list — so neither can traverse the tree.
 */

// Only plain slugs are ever valid — no separators, no dots, no traversal.
const SLUG_PATTERN = /^[a-z0-9-]+$/i;

export const SUPPORTED_LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";

// Language content files (`<slug>.en.md`) are not posts themselves.
const LOCALE_FILE = /\.(en|fr)\.md$/;

export function getPostSlugs() {
    return fs
        .readdirSync(BLOG_FOLDER_PATH)
        .filter((fileName) => fileName.endsWith(".md") && !LOCALE_FILE.test(fileName))
        .map((fileName) => fileName.replace(/\.md$/, ""));
}

function readSharedMeta(slug) {
    const filePath = path.join(BLOG_FOLDER_PATH, slug + ".md");
    if (!fs.existsSync(filePath)) return null;
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
    return data;
}

function readLocaleFile(slug, locale) {
    const filePath = path.join(BLOG_FOLDER_PATH, `${slug}.${locale}.md`);
    if (!fs.existsSync(filePath)) return null;
    return matter(fs.readFileSync(filePath, "utf-8"));
}

function normaliseLocale(locale) {
    return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

/**
 * Read and parse a single post for a locale. Returns `null` for anything that is
 * not a known, well-formed slug so callers can render a 404 instead of a 500.
 * Falls back to another available locale if the requested one is missing.
 */
export function getPostBySlug(slug, locale = DEFAULT_LOCALE) {
    if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
        return null;
    }
    // Whitelist against real files — the requested slug must exist as a base file.
    if (!getPostSlugs().includes(slug)) {
        return null;
    }

    const shared = readSharedMeta(slug);
    if (!shared) return null;

    const requested = normaliseLocale(locale);
    // Prefer the requested locale, then any other supported locale that exists.
    const order = [requested, ...SUPPORTED_LOCALES.filter((l) => l !== requested)];
    let localized = null;
    let resolvedLocale = requested;
    for (const candidate of order) {
        const file = readLocaleFile(slug, candidate);
        if (file) {
            localized = file;
            resolvedLocale = candidate;
            break;
        }
    }
    if (!localized) {
        localized = { data: {}, content: "" };
    }

    return {
        slug,
        locale: resolvedLocale,
        data: { ...shared, ...localized.data },
        content: localized.content,
    };
}

/**
 * All posts for a locale, newest first. `created`/`updated` are expected to be
 * ISO dates (`YYYY-MM-DD`); anything unparseable sorts last.
 */
export function getAllPosts(locale = DEFAULT_LOCALE) {
    return getPostSlugs()
        .map((slug) => getPostBySlug(slug, locale))
        .filter(Boolean)
        .sort((a, b) => {
            const da = Date.parse(a.data.created);
            const db = Date.parse(b.data.created);
            if (Number.isNaN(da)) return 1;
            if (Number.isNaN(db)) return -1;
            return db - da;
        });
}

/**
 * Format an ISO date string for display. Locale-aware; falls back to the raw
 * value if unparseable. Parses `YYYY-MM-DD` as a local-time date so the day
 * never drifts with the server timezone (bare ISO dates would read as UTC).
 */
export function formatPostDate(isoDate, locale = DEFAULT_LOCALE) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate ?? "");
    if (!match) return isoDate ?? "";
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}
