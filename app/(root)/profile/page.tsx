/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/features/store/hooks"
import { fetchProfile, updateProfileData } from "@/features/store/slices/profileSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"



import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { profileFormSchema } from "@/features/profile/schemas"
import { countries, languages, timezones } from "@/features/profile/data"
import { ImageUpload } from "@/components/shared/ImageUpload"
import { getImageUploadUrl } from "@/features/profile/server/actions"


// Add type for form values
type FormValues = z.infer<typeof profileFormSchema>

export default function UserProfile() {
  const { data: session, update: updateSession } = useSession()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const profile = useAppSelector((state) => state.profile)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFormDirty, setIsFormDirty] = useState(false)


  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: session?.user?.email || "",
      phone: "",
      country: "",
      language: "",
      timezone: "",
      image: "",
    }
  })

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      // Get current form values
      const currentValues = form.getValues()
      
      // Check for changes in form fields
      const hasFormChanges = Object.keys(currentValues).some(key => {
        if (key === 'email') return false // Ignore email field
        if (key === 'image') return false // Ignore image field as we handle it separately
        return currentValues[key as keyof FormValues] !== profile[key as keyof FormValues]
      })

      // Form is dirty if either form values changed OR a new file is selected
      setIsFormDirty(hasFormChanges || !!selectedFile)
    })

    // Also update form dirty state when selectedFile changes
    setIsFormDirty(!!selectedFile)

    return () => subscription.unsubscribe()
  }, [form, profile, selectedFile])

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
    setIsLoading(true)
    
    try {
      const updatedData = { ...data }

      // Only handle image upload if a new file is selected
      if (selectedFile) {
        try {
          const { url, fields, key } = await getImageUploadUrl(session.user.id, selectedFile.type);
          
          const formData = new FormData();
          // Add all fields first
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });
          // Add file last
          formData.append('file', selectedFile);

          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error('Upload failed');
          }

          const imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${key}`;
          updatedData.image = imageUrl.trim();
        } catch (error) {
          throw new Error('Failed to upload image');
        }
      } else {
        // Keep existing image if no new file is selected
        updatedData.image = session.user.image || ""
      }

      // Update profile with all data
      await dispatch(updateProfileData({ 
        userId: session.user.id, 
        data: updatedData 
      })).unwrap()

      // Update session only if image was changed
      if (selectedFile) {
        await updateSession({
          user: {
            ...session.user,
            image: updatedData.image
          }
        })
      }
      
      toast.success("Profile updated successfully.")
      setSelectedFile(null)
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile.")
    } finally {
      setIsLoading(false)
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
              <div className="flex flex-col items-center mb-6">
                <ImageUpload
                  onUploadError={(error) => toast.error(error)}
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                  currentImageUrl={session?.user?.image || ""}
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
                disabled={isLoading || !isFormDirty}
              >
                {isLoading ? (
                  <Spinner size="sm" />
                ) : isFormDirty ? (
                  "Save Changes"
                ) : (
                  "No Changes to Save"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

