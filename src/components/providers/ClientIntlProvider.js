"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

const supportedLocales = ["en", "fr"];

function detectBrowserLocale() {
    if (typeof navigator === "undefined") return "en";
    const lang = navigator.language || navigator.userLanguage || "en";
    const base = lang.split("-")[0].toLowerCase();
    return supportedLocales.includes(base) ? base : "en";
}

const LocaleControllerContext = createContext({ setLocale: () => {} });

export function useLocaleController() {
    return useContext(LocaleControllerContext);
}

export default function ClientIntlProvider({ children }) {
    const [locale, setLocale] = useState("en");
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("NEXT_LOCALE") : null;
        const nextLocale = supportedLocales.includes(stored || "") ? stored : detectBrowserLocale();
        setLocale(nextLocale);
    }, []);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const mod = await import(`@/i18n/messages/${locale}.json`);
                if (!cancelled) setMessages(mod.default);
            } catch {
                if (!cancelled) setMessages(null);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [locale]);

    if (!messages) return null;

    const changeLocale = (next) => {
        if (!supportedLocales.includes(next)) return;
        try {
            localStorage.setItem("NEXT_LOCALE", next);
            setLocale(next);
        } catch {
            setLocale(next);
        }
    };

    return (
        <LocaleControllerContext.Provider value={{ setLocale: changeLocale }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </LocaleControllerContext.Provider>
    );
}
