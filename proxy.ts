import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname

    const authPages =
        path === '/login' ||
        path === '/signup' ||
        path === '/verifyemail'

    const token = request.cookies.get("token")?.value || ''

    // Prevent logged-in users from visiting login/signup
    if (authPages && token) {
        return NextResponse.redirect(
            new URL('/profile', request.url)
        )
    }

    // Protect private routes
    if (
        path === '/profile' &&
        !token
    ) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/profile',
        '/signup',
        '/about',
        '/verifyemail',
    ],
}