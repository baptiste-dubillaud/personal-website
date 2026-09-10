/**
 * Everything the site knows about a locale, in one place: the request config
 * (cookie + Accept-Language), the Server Action behind the switcher, the
 * switcher's own buttons, the page metadata and the blog reader all derive from
 * this map rather than keeping their own copy.
 */
export const LOCALES = {
    fr: { label: "FR", ariaLabel: "Passer en français", openGraph: "fr_FR" },
    en: { label: "EN", ariaLabel: "Switch to English", openGraph: "en_US" },
};

export const SUPPORTED_LOCALES = Object.keys(LOCALES);
export const DEFAULT_LOCALE = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isSupportedLocale(locale) {
    return Object.hasOwn(LOCALES, locale);
}

export function toOpenGraphLocale(locale) {
    return (LOCALES[locale] ?? LOCALES[DEFAULT_LOCALE]).openGraph;
}

/**
 * Pick the best supported locale out of an `Accept-Language` header, for a
 * visitor who has not chosen one yet.
 */
export function resolveAcceptLanguage(header) {
    const ranked = (header || "")
        .split(",")
        .map((entry) => {
            const [tag, ...params] = entry.trim().split(";");
            const quality = params.find((param) => param.trim().startsWith("q="));
            return {
                locale: tag.split("-")[0].trim().toLowerCase(),
                quality: quality ? Number.parseFloat(quality.split("=")[1]) : 1,
            };
        })
        .filter(({ quality }) => Number.isFinite(quality) && quality > 0)
        // Array#sort is stable, so equal-quality tags keep the browser's order.
        .sort((a, b) => b.quality - a.quality);

    return ranked.find(({ locale }) => isSupportedLocale(locale))?.locale ?? DEFAULT_LOCALE;
}
