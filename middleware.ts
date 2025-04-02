// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;

    if (currentPath.startsWith("/dashboard/")) {
        const pathParts = currentPath.split("/");

        if (pathParts.length !== 3 || pathParts[2].length !== 32) {
            const url = new URL("/", req.url);
            url.hash = "error=" + encodeURIComponent("Invalid access. Please log in first.");
            return NextResponse.redirect(url);
        }

        const token = req.cookies.get("token")?.value;
        if (!token) {
            const url = new URL("/", req.url);
            url.hash = "error=" + encodeURIComponent("Your session has expired. Please log in again to continue.");
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*']
};