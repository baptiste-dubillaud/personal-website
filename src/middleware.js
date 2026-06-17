import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";

// Resolve the request locale so the server can render the right language:
// explicit user choice (NEXT_LOCALE cookie) wins, otherwise fall back to the
// browser's Accept-Language, otherwise the default.
function resolveLocale(request) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
        return cookieLocale;
    }

    const acceptLanguage = request.headers.get("accept-language") || "";
    const preferred = acceptLanguage.split(",")[0].split("-")[0].trim().toLowerCase();
    if (SUPPORTED_LOCALES.includes(preferred)) {
        return preferred;
    }

    return DEFAULT_LOCALE;
}

export default function middleware(request) {
    const locale = resolveLocale(request);

    // Forward the resolved locale to Server Components via a request header that
    // src/i18n/request.js reads (`x-locale`).
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);

    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    // Run on pages only — skip static assets, Next internals and API routes.
    matcher: ["/((?!_next|api|.*\\..*).*)"],
};
