import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

// Notice this is only an object, not a full Auth.js instance
export default {
    /**
     * Adding Credentials provider for siging in with email/passwd
     */
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
} satisfies NextAuthConfig