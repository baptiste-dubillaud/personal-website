"use client";

import styles from "@/components/common/ui/NavigationButton/NavigationButton.module.css";

export default function NavigationButton({ children, link, alt }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={alt}
            className={styles.icon_button}
        >
            {children}
        </a>
    );
}
