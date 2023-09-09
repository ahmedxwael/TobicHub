import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
	const pathname = req.nextUrl.pathname;
	const token = await getToken({ req });

	const isProtected =
		pathname.startsWith("/create-topic") || pathname.startsWith("/edit-topic");

	if (isProtected && !token) {
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
