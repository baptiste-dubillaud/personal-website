import { NextResponse } from "next/server";

export function middleware(request) {
    const cookieName = "NEXT_LOCALE";
    const defaultLocale = "en";
    const supportedLocales = ["en", "fr"];

    // Check if locale cookie exists
    let locale = request.cookies.get(cookieName)?.value;

    // If no cookie, try to detect from Accept-Language header
    if (!locale) {
        const acceptLanguage = request.headers.get("accept-language");
        if (acceptLanguage) {
            // Parse Accept-Language header "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
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

            // Find first supported language
            locale = languages.find((lang) => supportedLocales.includes(lang.code))?.code;
        }

        // Checks if requested language is supported, else fallback to default
        if (!locale || !supportedLocales.includes(locale)) {
            locale = defaultLocale;
        }

        // Set the cookie for this session
        const response = NextResponse.next();
        response.cookies.set(cookieName, locale, {
            path: "/",
        });
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
