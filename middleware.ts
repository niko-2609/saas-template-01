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
// import { createCsrfMiddleware } from '@edge-csrf/nextjs';
// import { getExpectedToken } from "./features/authentication/server/verification"

// // initalize csrf protection middleware
// const csrfMiddleware = createCsrfMiddleware({
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//     },
// });

const { auth } = NextAuth(authConfig);

// The actual middleware function that is invoked by a route
export default auth((req) => {

    const response = NextResponse.next();
    // // get the url and user authentication status from the request  
    // const { nextUrl } = req


    // const isLoggedIn = !!req.auth

    // // check which route is the request incoming 
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // if (isApiAuthRoute) {
    //     return NextResponse.next();
    // }

    // if (isAuthRoute) {
    //     if (isLoggedIn) {
    //         return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    //     }
    //     return NextResponse.next();
    // }

    // if (!isPublicRoute && !isLoggedIn) {
    //     return NextResponse.redirect(new URL(DEFAULT_PUBLIC_REDIRECT, nextUrl))
    // }
    return NextResponse.next();
})


// Regular expression to match all the routes that will invoke the middleware.
// Here all the routes will invoke the middleware
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}