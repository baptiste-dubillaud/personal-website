import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";
import ClientIntlProvider from "@/components/providers/ClientIntlProvider";

const inter = Inter({ subsets: ["latin"] });

const DESCRIPTION =
    "Baptiste Dubillaud — Software & Data Engineer based in Pau, France. Personal website, resume, and blog.";

export const metadata = {
    metadataBase: new URL("https://www.dubillaudb.fr"),
    title: {
        default: "Baptiste Dubillaud",
        template: "%s — Baptiste Dubillaud",
    },
    description: DESCRIPTION,
    alternates: {
        canonical: "https://www.dubillaudb.fr",
        languages: {
            en: "https://www.dubillaudb.fr",
            fr: "https://www.dubillaudb.fr",
            "x-default": "https://www.dubillaudb.fr",
        },
    },
    openGraph: {
        title: "Baptiste Dubillaud",
        description: DESCRIPTION,
        url: "/",
        siteName: "Baptiste Dubillaud",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Baptiste Dubillaud",
        description: DESCRIPTION,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Baptiste Dubillaud",
    url: "https://www.dubillaudb.fr",
    jobTitle: "Software & Data Engineer",
    nationality: "French",
    sameAs: [
        "https://www.linkedin.com/in/baptiste-dubillaud/",
        "https://github.com/baptiste-dubillaud",
    ],
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <link rel="icon" href="/icon.png" sizes="any" />
            <body className={inter.className} style={{ position: "relative" }}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <ClientIntlProvider>
                    <NavigationBarComponent />
                    <div className="app_content">{children}</div>
                    <FooterComponent />
                </ClientIntlProvider>
            </body>
        </html>
    );
}
