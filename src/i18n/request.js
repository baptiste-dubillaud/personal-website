import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
    // Try to get locale from header set by middleware, fallback to default
    const headersList = await headers();
    let locale = headersList.get("x-locale") || "en";

    // Validate locale
    const supportedLocales = ["en", "fr"];
    if (!supportedLocales.includes(locale)) {
        locale = "en";
    }

    return {
        locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default,
    };
});
