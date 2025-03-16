'use server'

import { auth } from "@/auth"
import { streamAIResponse } from "./openai"
import { protectedAction } from "./rateLimitAction"
import { formSchema } from "../schemas"

export async function generateItinerary(formData: unknown) {
  try {
    const session = await auth()
    const validatedValues = formSchema.parse(formData)
    
    // Handle anonymous user generation
    if (!session?.user?.id) {
      const rateLimitCheck = await protectedAction()
      if (!rateLimitCheck.success) {
        return {
          error: rateLimitCheck.error || "Please sign in to generate more itineraries",
          status: 429
        }
      }
    } else {
      // For authenticated users, check their rate limit based on subscription
      const rateLimitCheck = await protectedAction(session.user.id)
      if (!rateLimitCheck.success) {
        return {
          error: rateLimitCheck.error,
          remaining: rateLimitCheck.remaining,
          total: rateLimitCheck.total,
          status: 429
        }
      }
    }

    // Generate itinerary using OpenAI
    const { output, error } = await streamAIResponse(validatedValues)
    
    if (error) {
      return {
        error,
        status: 500
      }
    }

    return {
      success: true,
      output,
      status: 200
    }

  } catch (error) {
    console.error('Error generating itinerary:', error)
    return {
      error: "Failed to generate itinerary",
      status: 500
    }
  }
} 