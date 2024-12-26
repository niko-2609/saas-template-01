"use server"

import { db } from "@/features/db/db"
import { z } from "zod"
import { profileFormSchema } from "../schemas"


export type ProfileFormData = z.infer<typeof profileFormSchema>

export async function updateProfile(userId: string, data: ProfileFormData) {
  try {
    // Validate the input data
    const validated = profileFormSchema.parse(data)

    // Check if username is taken (if being updated)
    if (validated?.username) {
      const existing = await db.user.findFirst({
        where: {
          username: validated?.username,
          NOT: {
            id: userId
          }
        }
      })
      if (existing) {
        return { error: "Username already taken" }
      }
    }

    // Update the user profile
    const updated = await db.user.update({
      where: { id: userId },
      data: validated,
    })

    return { success: true, user: updated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data", details: error.errors }
    }
    return { error: "Failed to update profile" }
  }
} 