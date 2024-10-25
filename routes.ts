/**
 * An array of routes accessible to public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/sign-in",
]


/**
 * An array of routes used for authentication. These are our application routes
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/sign-in",
    "/sign-up",
]


/**
 * The prefix for API authenitcation routes.
 * Routes that start with this prefix are used by next-auth for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"


/**
 * The default redirect path after logging in. 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard"



/** 
 * The default redirect path when user is not logged in
 * @type {string}
 */
export const DEFAULT_PUBLIC_REDIRECT: string = "/sign-in"