/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/features/store/hooks"
import { fetchProfile, updateProfileData } from "@/features/store/slices/profileSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { profileFormSchema } from "@/features/profile/schemas"
import { countries, languages, timezones } from "@/features/profile/data"
import { ImageUpload } from "@/components/shared/ImageUpload"
import { toast } from "sonner"
import { getImageUploadUrl, updateProfileImage } from "@/features/profile/server/actions"

export default function UserProfile() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const profile = useAppSelector((state) => state.profile)
  const [s3Url, setS3Url] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: session?.user?.email || "",
      phone: "",
      country: "",
      language: "",
      timezone: "",
    }
  })

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchProfile(session.user.id))
    }
  }, [dispatch, session?.user?.id])

  // Update form when profile data is loaded
  useEffect(() => {
    const formData = {
      ...profile,
      email: session?.user?.email || ""
    }
    form.reset(formData)
  }, [profile, session?.user?.email, form])

  const onSubmit = async (data: any) => {
    if (!session?.user?.id) return
    console.log(data)
    data.image = s3Url
    setIsLoading(true)
    try {
      await dispatch(updateProfileData({ 
        userId: session.user.id, 
        data 
      })).unwrap()
      
      // TODO: Add toast message
    } catch (error: any) {
      // toast.error("Failed to update profile")
      // TODO Add error toast message
    } finally {
      setIsLoading(false)
    }
  }


  const getUploadUrl = async (fileType: string) => {
    if (!session?.user?.id) throw new Error('Not authenticated')
    try {
      const result = await getImageUploadUrl(session.user.id, fileType)
      setS3Url(result?.url)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#019992]">Profile Settings</CardTitle>
          </div>
          <CardDescription>Update your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar section */}
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <ImageUpload
                  onUploadError={(error) => toast.error(error)}
                  getUploadUrl={getUploadUrl}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries?.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages?.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timezones?.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#019992] text-white hover:bg-[#ffb001]"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

