import { getLocale, getTranslations } from "next-intl/server";

import { toOpenGraphLocale } from "@/i18n/locales";
import { SOCIAL_IMAGES } from "@/app/shared-metadata";
import { SITE_URL } from "@/utils/linkUtils";
import { buildPerson, collectSkills, PERSON_ID, toJsonLd } from "@/utils/structuredData";

// Static `metadata` cannot read the served locale, and a child segment replaces
// the parent's whole `openGraph` object — so this page used to advertise en_US
// even when serving French, and pointed `og:image` at a `profile.jpg` that has
// never existed in `public/images/`.
//
// The title and description are the two strings a search result actually shows,
// so they follow the served language like the rest of the page: they live in the
// message files, not as constants here.
export async function generateMetadata() {
    const t = await getTranslations("pages.resume.metadata");
    const title = t("title");
    const description = t("description");

    return {
        // `absolute` opts out of the root layout's `%s — Baptiste Dubillaud`
        // template. The title below already ends in the name, and letting the
        // template run appended it a second time.
        title: { absolute: title },
        description,
        alternates: { canonical: "/resume" },
        openGraph: {
            title,
            description,
            url: "/resume",
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

export default async function ResumeLayout({ children }) {
    const locale = await getLocale();
    const t = await getTranslations("pages.resume");

    // The detailed Person carries the same `@id` as the core one in the root
    // layout, so consumers merge the two into a single entity. ProfilePage tells
    // a crawler what this page *is* — the person's profile — rather than leaving
    // it to infer that from the markup.
    const jsonLd = toJsonLd([
        {
            "@type": "ProfilePage",
            "@id": `${SITE_URL}/resume#profilepage`,
            url: `${SITE_URL}/resume`,
            name: t("metadata.title"),
            description: t("metadata.description"),
            inLanguage: locale,
            mainEntity: { "@id": PERSON_ID },
        },
        buildPerson({
            jobTitle: t("prensentation.title"),
            description: t("prensentation.intro"),
            history: { skills: collectSkills(t.raw("experiences")) },
        }),
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
            {children}
        </>
    );
}
