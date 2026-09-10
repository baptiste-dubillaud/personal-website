"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isSupportedLocale } from "@/i18n/locales";

/* Persist the visitor's language choice. Server Action */

export async function setLocale(locale) {
    if (!isSupportedLocale(locale)) return;

    const store = await cookies();
    store.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
        // Nothing reads this cookie from the browser — only `cookies()` on the
        // server does — so it can stay out of reach of client-side script.
        httpOnly: true,
        // Left off in development, where the site is served over plain http.
        secure: process.env.NODE_ENV === "production",
    });

    revalidatePath("/", "layout");
}
