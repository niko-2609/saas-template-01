/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ImSpinner } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {  googleSignIn, signInMagicLink, signOutAction } from "../server/signInAction";
import { signIn } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas";
// import { Icons } from "@/components/icons"
// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"
// import { Label } from "@/registry/new-york/ui/label"
// 



export function LoginForm({ className, ...props }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isPending, startTransition] = React.useTransition()

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)

  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      setIsLoading(true)
      try {
        console.log("Captured values:", values)
        await signInMagicLink(values)
      } catch (error: any) {
        throw new Error(error)
      } finally {
        setIsLoading(false)
      }
    })
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: ""
    }
  })

  const handleSignIn = async () => {
    console.log("GOOGLE CLICKED SIGN IN BUTTON")
    startTransition(async () => {
      signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    })
   
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className='border-2 border-blue-200 rounded-lg'
                      style={{border: '1px solid', borderRadius: '5px'}}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending}>
            {isPending && (
              <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      </Form>
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
      <Button variant="outline" type="button" disabled={isPending} onClick={() => handleSignIn()}>
        {isPending ? (
          <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
