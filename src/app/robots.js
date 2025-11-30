export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://www.dubillaudb.fr/sitemap.xml",
        host: "https://www.dubillaudb.fr",
    };
}
