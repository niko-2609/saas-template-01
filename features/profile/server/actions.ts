/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { db } from "@/features/db/db"
import { z } from "zod"
import { profileFormSchema } from "../schemas"


export type ProfileFormData = z.infer<typeof profileFormSchema>

export async function getProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        phone: true,
        country: true,
        language: true,
        timezone: true,
        emailVerified: true,
      }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Convert any Date objects to ISO strings
    const serializedUser = {
      ...user,
      emailVerified: user?.emailVerified?.toISOString(),
    };

    return { user: serializedUser };
  } catch (error) {
    return { error: "Failed to fetch profile" };
  }
}

export async function updateProfile(userId: string, data: ProfileFormData) {
  try {
    // Validate the input data
    const validated = profileFormSchema.parse(data)

    // Check if username is taken (if being updated)
    if (validated?.username) {
      const existing = await db.user.findFirst({
        where: {
          username: validated?.username,
          NOT: { id: userId }
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
      select: {
        username: true,
        email: true,
        phone: true,
        country: true,
        language: true,
        timezone: true,
        emailVerified: true,
      }
    })

    // Serialize the response
    const serializedUser = {
      ...updated,
      emailVerified: updated?.emailVerified?.toISOString(),
    };

    return { success: true, user: serializedUser }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data", details: error.errors }
    }
    return { error: "Failed to update profile" }
  }
} 