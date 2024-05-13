import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBarComponent from "@/components/core/navigationBar/NavigationBar";
import FooterComponent from "@/components/core/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Hi, I'm Baptiste!",
    description: "My personal website built to present my personal projetcs and contributions.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className} style={{margin: 0, padding: 0, width: "100vw"}}>
                <NavigationBarComponent/>
                {children}
                <FooterComponent/>
            </body>
        </html>
    );
}
