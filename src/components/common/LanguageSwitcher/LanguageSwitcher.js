"use client";

import { useState } from "react";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "next-intl";
import { useLocaleController } from "@/components/providers/ClientIntlProvider";

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const { setLocale } = useLocaleController();

    const changeLanguage = (newLocale) => {
        if (newLocale === currentLocale || isLoading) return;

        setIsLoading(true);

        // Update client provider (persists to localStorage internally)
        setLocale(newLocale);

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
