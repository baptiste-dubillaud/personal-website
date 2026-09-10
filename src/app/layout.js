import { Inter, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { toOpenGraphLocale } from "@/i18n/locales";
import { GITHUB_PROFILE, LINKEDIN_PROFILE, SITE_URL } from "@/utils/linkUtils";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";

const inter = Inter({ subsets: ["latin"] });
// Real monospace for the design-system mono details (MonoLabel, code-ish bits).
// Exposed as the global --font-mono, overriding the previously-unloaded value.
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

const NAME = "Baptiste Dubillaud";
const DESCRIPTION = `${NAME} — Tech-Lead & GenAI Software Engineer based in Pau, France. Personal website and resume.`;

const baseMetadata = {
    // Every relative URL below (canonical, og:url, og:image) resolves against this.
    metadataBase: new URL(SITE_URL),
    title: {
        default: NAME,
        template: `%s — ${NAME}`,
    },
    description: DESCRIPTION,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: NAME,
        description: DESCRIPTION,
        url: "/",
        siteName: NAME,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: NAME,
        description: DESCRIPTION,
    },
};

export async function generateMetadata() {
    // Everything above is locale-independent; only og:locale has to follow the
    // language actually being served.
    return {
        ...baseMetadata,
        openGraph: { ...baseMetadata.openGraph, locale: toOpenGraphLocale(await getLocale()) },
    };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    jobTitle: "Software & Data Engineer",
    nationality: "French",
    sameAs: [LINKEDIN_PROFILE, GITHUB_PROFILE],
};

export default async function RootLayout({ children }) {
    // Only needed for `<html lang>`: NextIntlClientProvider resolves the locale
    // and the messages itself when rendered from a Server Component.
    const locale = await getLocale();
    return (
        <html lang={locale}>
            <link rel="icon" href="/icon.png" sizes="any" />
            <body className={`${inter.className} ${mono.variable}`} style={{ position: "relative" }}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <NextIntlClientProvider>
                    <NavigationBarComponent />
                    {children}
                    <FooterComponent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
