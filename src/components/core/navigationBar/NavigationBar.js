"use client";

import styles from "@/components/core/navigationBar/NavigationBar.module.css";

import { useRouter, usePathname } from "next/navigation";

export default function NavigationBarComponent({}) {
    const router = useRouter();
    const pathname = usePathname();

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
            <div className={styles.hello_message} onClick={() => router.push("/")}>
                Hi, I&apos;m <span className={styles.hello_message_name}>Baptiste</span>!
            </div>
            <div className={styles.links_container}>
                <NavLinkComponent name="Home" path="/" />
                <NavLinkComponent name="Resume" path="/resume" />
                <NavLinkComponent name="Portfolio" path="/portfolio"/>
                {/* <NavLinkComponent name="Blog" path="/blog" /> */}
            </div>
        </div>
    );
}
