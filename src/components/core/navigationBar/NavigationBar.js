"use client";

import styles from "@/components/core/navigationBar/NavigationBar.module.css";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher/LanguageSwitcher";

import { motion } from "framer-motion";

import HomeIcon from "@/components/common/icons/misc/HomeIcon";
import ResumeIcon from "@/components/common/icons/misc/ResumeIcon";
import EmailIcon from "@/components/common/icons/misc/EmailIcon";

const links = [
    { nameKey: "home", path: "/", icon: HomeIcon },
    { nameKey: "resume", path: "/resume", icon: ResumeIcon },
    { nameKey: "contact", path: "/contact", icon: EmailIcon },
    // { nameKey: "portfolio", path: "/portfolio" },
    // { nameKey: "blog", path: "/blog" },
];

function isActive(pathname, path) {
    const isHome = path == "/";
    return (isHome && pathname == path) || (!isHome && pathname.includes(path));
}

export default function NavigationBarComponent({}) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navigation");

    const NavLinkComponent = ({ name, path }) => {
        return (
            <div
                className={
                    isActive(pathname, path)
                        ? `${styles.nav_link_text} ${styles.nav_link_selected}`
                        : `${styles.nav_link_text} ${styles.nav_link}`
                }
                onClick={() => router.push(path)}
            >
                {name}
            </div>
        );
    };

    const name = t("name");

    return (
        <>
            <div className={styles.nav_bar_container}>
                <div className={styles.nav_var_content_container}>
                    <div key={name} className={styles.typewriter} onClick={() => router.push("/")}>
                        {name.split("").map((char, index) => (
                            <motion.span
                                key={`${name}-${index}`}
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ delay: index * 0.1, duration: 0 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: name.length * 0.1 }}
                            className={styles.typewriter_cursor}
                        ></motion.div>
                    </div>
                    <div className={styles.actions_container}>
                        <motion.div
                            className={styles.lang_switcher_container}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <LanguageSwitcher />
                        </motion.div>
                        <div className={styles.links_container}>
                            {links.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.25 }}
                                >
                                    <NavLinkComponent name={t(link.nameKey)} path={link.path} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile / tablet bottom tab bar */}
            <motion.nav
                className={styles.tab_bar_container}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(pathname, link.path);
                    return (
                        <button
                            key={link.path}
                            className={`${styles.tab_item} ${active ? styles.tab_item_selected : ""}`}
                            onClick={() => router.push(link.path)}
                            aria-current={active ? "page" : undefined}
                            aria-label={t(link.nameKey)}
                        >
                            <Icon size={24} color="currentColor" />
                            <span className={styles.tab_label}>{t(link.nameKey)}</span>
                        </button>
                    );
                })}
            </motion.nav>
        </>
    );
}
