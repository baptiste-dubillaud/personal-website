"use client";

import { Fragment } from "react";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const LOCALES = [
    { code: "fr", label: "FR", ariaLabel: "Passer en français" },
    { code: "en", label: "EN", ariaLabel: "Switch to English" },
];

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();

    const changeLanguage = (newLocale) => {
        if (newLocale === currentLocale) return;
        // Persist the choice; the middleware reads this cookie to localize SSR,
        // then router.refresh() re-renders the tree in the new language.
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
    };

    return (
        <div className={styles.language_switcher}>
            {LOCALES.map(({ code, label, ariaLabel }, index) => (
                <Fragment key={code}>
                    {index > 0 && <span className={styles.separator}>|</span>}
                    <button
                        className={`${styles.language_button} ${currentLocale === code ? styles.active : ""}`}
                        onClick={() => changeLanguage(code)}
                        aria-label={ariaLabel}
                    >
                        {label}
                    </button>
                </Fragment>
            ))}
        </div>
    );
}
