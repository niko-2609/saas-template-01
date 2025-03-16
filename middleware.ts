/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_PUBLIC_REDIRECT
} from "@/routes"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const { auth } = NextAuth(authConfig);

// Combine both middleware functions into one
export default auth(async (req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // First layer: Auth checks
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next();
    }

    if (!isPublicRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_PUBLIC_REDIRECT, nextUrl))
    }

    // Second layer: Onboarding checks (only for authenticated users)
    /* Temporarily disabled onboarding
    if (isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/onboarding") {
        try {
            // Use absolute URL with protocol
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || nextUrl.origin;
            const response = await fetch(`${baseUrl}/api/user/onboarding-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': req.headers.get('cookie') || '', // Forward cookies for auth
                },
            });
            
            if (!response.ok) {
                console.error('Onboarding status check failed:', response.status);
                return NextResponse.next();
            }
            
            const data = await response.json();
            
            if (!data.isOnboardingComplete) {
                return NextResponse.redirect(new URL("/onboarding", nextUrl));
            }
        } catch (error) {
            console.error('Error checking onboarding status:', error);
            // On error, allow the request to continue
            return NextResponse.next();
        }
    }
    */

    return NextResponse.next();
})

// Regular expression to match all the routes that will invoke the middleware.
// Here all the routes will invoke the middleware
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}