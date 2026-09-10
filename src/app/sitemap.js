import { SUPPORTED_LOCALES } from "@/i18n/locales";
import { BLOG_ENABLED } from "@/utils/featureFlags";
import { getAllPosts } from "@/utils/blogUtils";
import { resumePdfPath, SITE_URL } from "@/utils/linkUtils";
import { readVersionDate } from "@/utils/versionUtils";

export default async function sitemap() {
    // Real release date rather than `new Date()`, which claimed every page had
    // changed today on every single crawl and made `lastmod` worthless.
    const lastModified = readVersionDate();

    const staticRoutes = ["/", "/resume", "/contact", ...(BLOG_ENABLED ? ["/blog"] : [])];
    const routes = staticRoutes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified,
        changeFrequency: "monthly",
        priority: route === "/" ? 1.0 : 0.8,
    }));

    // One PDF resume per locale. They are real text-extractable documents, and
    // the sitemap is what makes them discoverable beyond the page that links them.
    const pdfs = SUPPORTED_LOCALES.map((locale) => ({
        url: `${SITE_URL}${resumePdfPath(locale)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
    }));

    // Blog posts — dates are language-invariant (shared metadata), so the default
    // locale is enough to enumerate URLs and their last-modified date.
    const posts = BLOG_ENABLED
        ? getAllPosts().map((post) => ({
              url: `${SITE_URL}/blog/${post.slug}`,
              lastModified: post.data.updated || post.data.created,
              changeFrequency: "monthly",
              priority: 0.6,
          }))
        : [];

    return [...routes, ...pdfs, ...posts];
}
