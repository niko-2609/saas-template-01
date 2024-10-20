"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { ImSpinner } from 'react-icons/im'
import { FaGoogle } from 'react-icons/fa'

function MobileForm() {
    return (
        <div className="w-[100px]">
            <div className="flex flex-col justify-center mx-auto space-y-6" style={{ width: "60%" }}>
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <form className="h-full" onSubmit={() => { }}>
                    <div className='flex flex-col gap-2'>
                        <div className='my-2'>
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={false}
                            />
                        </div>
                        <Button disabled={false}>
                            {false && (
                                <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div >
                    <Button variant="outline" type="button" disabled={false} style={{width: '100%'}}>
                        {false ? (
                            <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <FaGoogle className="mr-2 h-4 w-4" />
                        )}{" "}
                        Google
                    </Button>
                </div>
              <div >
              <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
              </div>
            </div>
        </div>
    )
}

export default MobileForm
