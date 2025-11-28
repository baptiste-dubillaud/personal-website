"use client";

import styles from "@/components/common/buttons/navigation/NavigationButton.module.css";

export default function NavigationButton({ children, link, alt }) {
    return (
        <a href={link} target="_blank" alt={alt} className={styles.tab_link_container}>
            {children}
        </a>
    );
}
