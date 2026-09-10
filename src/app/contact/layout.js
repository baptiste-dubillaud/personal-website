import { getLocale, getTranslations } from "next-intl/server";

import { toOpenGraphLocale } from "@/i18n/locales";
import { SOCIAL_IMAGES } from "@/app/shared-metadata";
import { SITE_URL } from "@/utils/linkUtils";
import { PERSON_ID, toJsonLd } from "@/utils/structuredData";

// Same reasons as the resume layout: a child segment replaces the parent's whole
// `openGraph`, so og:locale has to be resolved here rather than inherited, and
// the title/description are translated content rather than constants.
export async function generateMetadata() {
    const t = await getTranslations("pages.contact.metadata");
    const title = t("title");
    const description = t("description");

    return {
        // `absolute`: the title already ends in the name, so the root layout's
        // `%s — Baptiste Dubillaud` template must not append it again.
        title: { absolute: title },
        description,
        alternates: { canonical: "/contact" },
        openGraph: {
            title,
            description,
            url: "/contact",
            siteName: "Baptiste Dubillaud",
            type: "profile",
            locale: toOpenGraphLocale(await getLocale()),
            images: SOCIAL_IMAGES,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: SOCIAL_IMAGES,
        },
    };
}

export default async function ContactLayout({ children }) {
    const locale = await getLocale();
    const t = await getTranslations("pages.contact.metadata");

    const jsonLd = toJsonLd([
        {
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#contactpage`,
            url: `${SITE_URL}/contact`,
            name: t("title"),
            description: t("description"),
            inLanguage: locale,
            mainEntity: { "@id": PERSON_ID },
        },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
            {children}
        </>
    );
}
