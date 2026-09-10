import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE, isSupportedLocale, resolveAcceptLanguage } from "@/i18n/locales";

export default getRequestConfig(async () => {
    const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
    const locale = isSupportedLocale(cookieLocale)
        ? cookieLocale
        : resolveAcceptLanguage((await headers()).get("accept-language"));

    return {
        locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default,
    };
});
