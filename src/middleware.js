import { NextResponse } from 'next/server'

export async function middleware(request) {
    const accessToken = request.cookies.get('accessToken')?.value ?? ""
    const id = request.cookies.get('id')?.value ?? ""
    const currentPath = request.nextUrl.pathname

    if (id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}users/${id}`, {
            credentials: 'include',
        });

        const data = await res.json();

        if (data.status !== 'active' && currentPath !== '/auth/pending-verification') {
            return NextResponse.redirect(new URL('/auth/pending-verification', request.url));
        }
    } else {
        if (!accessToken && !currentPath.startsWith('/auth/')) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next|favicon.ico|auth|unauthorized|privacy|images|docxs|offer).*)',
    ],
};
