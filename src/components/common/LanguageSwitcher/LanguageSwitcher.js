"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
    const router = useRouter();
    const currentLocale = useLocale();
    const [isLoading, setIsLoading] = useState(false);

    const changeLanguage = async (newLocale) => {
        if (newLocale === currentLocale || isLoading) return;

        setIsLoading(true);

        // Set cookie with iOS-compatible settings
        const maxAge = 365 * 24 * 60 * 60; // 1 year
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax; Secure=true`;

        // Refresh the page to apply new locale
        router.refresh();

        setIsLoading(false);
    };

    return (
        <div className={styles.language_switcher}>
            <button
                className={`${styles.language_button} ${currentLocale === "fr" && styles.active}`}
                onClick={() => changeLanguage("fr")}
                disabled={isLoading}
                aria-label="Passer en français"
            >
                FR
            </button>
            <span className={styles.separator}>|</span>
            <button
                className={`${styles.language_button} ${currentLocale === "en" && styles.active}`}
                onClick={() => changeLanguage("en")}
                disabled={isLoading}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
}
