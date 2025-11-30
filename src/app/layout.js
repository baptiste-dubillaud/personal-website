import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";
import ClientIntlProvider from "@/components/providers/ClientIntlProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL("https://www.dubillaudb.fr"),
    title: {
        default: "Baptiste Dubillaud",
        template: "%s — Baptiste Dubillaud",
    },
    description: "Personal website, blog, portfolio and resume.",
    openGraph: {
        title: "Baptiste Dubillaud",
        description: "Personal website, blog, portfolio and resume.",
        url: "/",
        siteName: "Baptiste Dubillaud",
        images: [
            {
                url: "/images/profile.jpg",
                width: 1200,
                height: 630,
                alt: "Baptiste Dubillaud",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Baptiste Dubillaud",
        description: "Personal website, blog, portfolio and resume.",
        images: ["/images/profile.jpg"],
    },
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <link rel="icon" href="/icon.png" sizes="any" />
            <body className={inter.className} style={{ position: "relative" }}>
                <ClientIntlProvider>
                    <NavigationBarComponent />
                    {children}
                    <FooterComponent />
                </ClientIntlProvider>
            </body>
        </html>
    );
}
