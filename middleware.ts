import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
	const pathname = req.nextUrl.pathname;
	const allCookies = req.cookies.getAll();

	const isProtected =
		pathname.startsWith("/profile") ||
		pathname.startsWith("/create-topic") ||
		pathname.startsWith("/edit-topic");

	const authorized = allCookies.some((cookie) =>
		cookie.name.endsWith(".session-token")
	);

	if (isProtected && !authorized) {
		return NextResponse.redirect(new URL("/register", req.url));
	}
};

export const config = {
	matcher: [
		"/",
		"/topics",
		"/create-topic",
		"/edit-topic/:path*",
		"/register",
		"/profile/:path*",
	],
};
