import { SITE_URL } from "@/utils/linkUtils";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // The design-system reference is already `noindex`, but a crawler
                // has to fetch and render 50 KB to find that out. Keep it out of
                // the crawl entirely.
                disallow: ["/design-lab"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
