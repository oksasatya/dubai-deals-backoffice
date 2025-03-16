import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export function middleware (req:NextRequest) {
	const token = req.cookies.get("token")?.value;

	if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
