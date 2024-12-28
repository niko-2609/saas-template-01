import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/features/db/db"
import { Adapter } from "next-auth/adapters"
import Resend from "next-auth/providers/resend"


const combinedProviders = [
    ...authConfig.providers,
    Resend({
        from: 'noreply@nikojam.com'
    })
]
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error"
    },
    providers: combinedProviders,
    adapter: PrismaAdapter(db) as Adapter,
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,  // 30 days in seconds
    },
    trustHost: true, // prevents using localhost in production, would use whatever is configured in NEXTAUTH_URL in env
    events: {
        async linkAccount({ user }) {
            // once the user is signed in with OAuth provider,
            // this will update the emailVerified field for that user to the present/current date.
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
    
            // Handle session update  scenario
            if (trigger === "update" && session?.user) {
                token.picture = session.user.image
            }

            if (user) { // Only available on sign in
                return {
                    ...token,
                    id: user.id,
                    picture: user.image
                };
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.image = token.picture as string

                console.log("SESSION IN SESSION CALLBACK", session)
                console.log("TOKEN IN SESSION CALLBACK", token)
            }
            return session
        },
    },
})