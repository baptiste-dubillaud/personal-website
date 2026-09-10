"use client";

import { Fragment, useTransition } from "react";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "next-intl";

import { LOCALES } from "@/i18n/locales";
import { setLocale } from "@/i18n/setLocale";

// Labels, aria labels and render order all come from the locale registry, so a
// locale can never be supported but missing from the switcher (or the reverse).
const LOCALE_ENTRIES = Object.entries(LOCALES);

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const [isPending, startTransition] = useTransition();

    const changeLanguage = (newLocale) => {
        if (newLocale === currentLocale) return;
        // A Server Action, not `document.cookie` + `router.refresh()`: the action
        // writes the cookie and hands back a re-rendered tree, layout included,
        // so the provider holding the messages actually swaps language.
        startTransition(() => setLocale(newLocale));
    };

    return (
        <div className={styles.language_switcher} aria-busy={isPending}>
            {LOCALE_ENTRIES.map(([code, { label, ariaLabel }], index) => (
                <Fragment key={code}>
                    {index > 0 && <span className={styles.separator}>|</span>}
                    <button
                        className={`${styles.language_button} ${currentLocale === code ? styles.active : ""}`}
                        onClick={() => changeLanguage(code)}
                        // Holds off a second click while the action is in flight.
                        disabled={isPending}
                        aria-label={ariaLabel}
                    >
                        {label}
                    </button>
                </Fragment>
            ))}
        </div>
    );
}
