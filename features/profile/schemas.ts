import * as z from "zod"

export const profileFormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  image: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema> 