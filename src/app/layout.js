import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Hi, I'm Baptiste!",
    description: "My personal website built to present my personal projetcs and contributions.",
};

export default async function RootLayout({ children }) {
    const messages = await getMessages();
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <link rel="icon" href="/icon.png" sizes="any" />
            <body className={inter.className} style={{ position: "relative" }}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <NavigationBarComponent />
                    {children}
                    <FooterComponent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
