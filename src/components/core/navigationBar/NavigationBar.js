"use client";

import styles from "@/components/core/navigationBar/NavigationBar.module.css";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher/LanguageSwitcher";

export default function NavigationBarComponent({}) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navigation");

    const NavLinkComponent = ({ name, path }) => {
        const isHome = path == "/";

        return (
            <div
                className={
                    (isHome && pathname == path) || (!isHome && pathname.includes(path))
                        ? `${styles.nav_link_text} ${styles.nav_link_selected}`
                        : `${styles.nav_link_text} ${styles.nav_link}`
                }
                onClick={() => router.push(path)}
            >
                {name}
            </div>
        );
    };

    return (
        <div className={styles.nav_bar_container}>
            <div className={styles.nav_var_content_container}>
                <div className={styles.hello_message} onClick={() => router.push("/")}>
                    {t("name")}
                </div>
                <div className={styles.actions_container}>
                    <div className={styles.lang_switcher_container}>
                        <LanguageSwitcher />
                    </div>
                    <div className={styles.links_container}>
                        <NavLinkComponent name={t("home")} path="/" />
                        <NavLinkComponent name={t("resume")} path="/resume" />
                        <NavLinkComponent name={t("portfolio")} path="/portfolio"/>
                        {/* <NavLinkComponent name="Blog" path="/blog" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
