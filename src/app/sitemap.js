export default async function sitemap() {
    const baseUrl = "https://www.dubillaudb.fr";

    // Static pages
    const routes = ["/", "/blog", "/portfolio", "/resume"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: route === "/" ? 1.0 : 0.8,
    }));

    // If you later add dynamic params, push them here.
    // Example: blog posts and portfolio projects from `public/`.

    return routes;
}
