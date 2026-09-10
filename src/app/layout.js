import { Inter, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { toOpenGraphLocale } from "@/i18n/locales";
import { SITE_URL } from "@/utils/linkUtils";
import { buildPerson, buildWebSite, toJsonLd } from "@/utils/structuredData";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";

const inter = Inter({ subsets: ["latin"] });
// Real monospace for the design-system mono details (MonoLabel, code-ish bits).
// Exposed as the global --font-mono, overriding the previously-unloaded value.
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

const NAME = "Baptiste Dubillaud";

const baseMetadata = {
    // Every relative URL below (canonical, og:url, og:image) resolves against this.
    metadataBase: new URL(SITE_URL),
    title: {
        default: NAME,
        // Segments whose own title already ends in the name opt out with
        // `title: { absolute }` — see the resume and contact layouts.
        template: `%s — ${NAME}`,
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: NAME,
        url: "/",
        siteName: NAME,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: NAME,
    },
};

export async function generateMetadata() {
    // The name is the title in either language, but the description is prose and
    // is what a search result actually shows underneath it, so it follows the
    // served language like every other string on the site.
    const t = await getTranslations("metadata");
    const description = t("description");

    return {
        ...baseMetadata,
        description,
        openGraph: {
            ...baseMetadata.openGraph,
            description,
            locale: toOpenGraphLocale(await getLocale()),
        },
        twitter: { ...baseMetadata.twitter, description },
    };
}

export default async function RootLayout({ children }) {
    // Only needed for `<html lang>`: NextIntlClientProvider resolves the locale
    // and the messages itself when rendered from a Server Component.
    const locale = await getLocale();

    // The job title and summary are translated content, so they come from the
    // message files rather than being repeated here. /resume layers the detailed
    // Person (employment, education, skills) onto the same `@id`.
    const t = await getTranslations("pages.resume");
    const jsonLd = toJsonLd([
        buildWebSite(locale),
        buildPerson({
            jobTitle: t("prensentation.title"),
            description: t("prensentation.intro"),
        }),
    ]);

    return (
        <html lang={locale}>
            <link rel="icon" href="/icon.png" sizes="any" />
            <body className={`${inter.className} ${mono.variable}`} style={{ position: "relative" }}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
                <NextIntlClientProvider>
                    <NavigationBarComponent />
                    {children}
                    <FooterComponent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
