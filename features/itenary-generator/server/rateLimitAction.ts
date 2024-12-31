'use server'

import { rateLimit } from '@/utils/rateLimit'

export async function protectedAction(userId: string) {
  try {
    // Check rate limit before proceeding
    const result = await rateLimit(userId)
    
    if (result?.error) {
      return {
        success: false,
        error: result?.error,
        remaining: result?.remaining,
        total: result?.total
      }
    } else {
      // Your actual query/action logic here
      console.log("remaining queries left", result?.remaining)
      return { 
        success: true, 
        remaining: result?.remaining,
        total: result?.total
      }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      remaining: 0,
      total: 0
    }
  }
}