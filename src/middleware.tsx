import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./i18n/settings";

acceptLanguage.languages(languages);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(req: NextRequest): NextResponse {
	let lng: string | null | undefined;

	// Get language saved in cookie
	lng = req.cookies.has(cookieName)
		? acceptLanguage.get(req.cookies.get(cookieName)?.value ?? undefined)
		: undefined;

	// Get language from browser settings
	lng = lng ?? acceptLanguage.get(req.headers.get("Accept-Language") ?? undefined);

	// Get language set in settings.js
	lng = lng ?? fallbackLng;

	// Redirect if accessed from http://localhost:3000 or an unexpected language
	if (
		!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith("/_next")
	) {
		return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
	}

	// Set the language in the cookie
	if (req.headers.has("referer")) {
		const refererUrl = new URL(req.headers.get("referer") ?? "");
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next();
		if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
		return response;
	}

	return NextResponse.next();
}
