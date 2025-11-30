import { NextResponse } from "next/server";

export function middleware(request) {
    const cookieName = "NEXT_LOCALE";
    const defaultLocale = "en";
    const supportedLocales = ["en", "fr"];

    // First priority: check cookie (set by client-side localStorage)
    let locale = request.cookies.get(cookieName)?.value;

    // Second priority: detect from Accept-Language header
    if (!locale || !supportedLocales.includes(locale)) {
        const acceptLanguage = request.headers.get("accept-language");
        if (acceptLanguage) {
            const languages = acceptLanguage
                .split(",")
                .map((lang) => {
                    const [code, priority] = lang.trim().split(";q=");
                    return {
                        code: code.split("-")[0].toLowerCase(),
                        priority: priority ? parseFloat(priority) : 1.0,
                    };
                })
                .sort((a, b) => b.priority - a.priority);

            const detectedLocale = languages.find((lang) => supportedLocales.includes(lang.code))?.code;
            if (detectedLocale) {
                locale = detectedLocale;
            }
        }
    }

    // Fallback to default
    if (!locale || !supportedLocales.includes(locale)) {
        locale = defaultLocale;
    }

    // Set locale in header for next-intl to read
    const response = NextResponse.next();
    response.headers.set("x-locale", locale);

    return response;
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
