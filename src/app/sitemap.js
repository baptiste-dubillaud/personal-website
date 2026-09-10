import { BLOG_ENABLED } from "@/utils/featureFlags";
import { getAllPosts } from "@/utils/blogUtils";
import { SITE_URL } from "@/utils/linkUtils";

export default async function sitemap() {
    // Static pages
    const staticRoutes = ["/", "/resume", ...(BLOG_ENABLED ? ["/blog"] : [])];
    const routes = staticRoutes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: route === "/" ? 1.0 : 0.8,
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

    return [...routes, ...posts];
}
