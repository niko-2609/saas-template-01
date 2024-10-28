/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn, signOut } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_PUBLIC_REDIRECT } from "@/routes"



export const googleSignIn = async () => {
    try {
        await signIn("Google",
            {
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            }
        )
    }catch (err: any) {
        if  (err.code === "Configuration") {
            
        }
    }
}

export const signOutAction = async() => {
    try{
        await signOut({
            redirectTo: DEFAULT_PUBLIC_REDIRECT
        })
    } catch(err:any) {
        throw err
    }
}


export const signInMagicLink = async(formData:any) => {
    try{
        await signIn('resend', formData)
    } catch(err) {
        throw err
    }
}