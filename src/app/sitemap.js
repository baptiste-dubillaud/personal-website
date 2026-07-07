import { getAllPosts } from "@/utils/blogUtils";

export default async function sitemap() {
    const baseUrl = "https://www.dubillaudb.fr";

    // Static pages
    const routes = ["/", "/blog", "/resume"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: route === "/" ? 1.0 : 0.8,
    }));

    // Blog posts — dates are language-invariant (shared metadata), so the default
    // locale is enough to enumerate URLs and their last-modified date.
    const posts = getAllPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.data.updated || post.data.created,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...routes, ...posts];
}
