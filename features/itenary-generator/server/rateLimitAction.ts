'use server'

import { rateLimit } from '@/utils/rateLimit'
import { redis } from '@/utils/redis'

export const protectedAction = async (userId?: string) => {
  // For non-authenticated users, use IP-based tracking
  const key = userId || 'anonymous_user'
  
  if (!userId) {
    // Check if anonymous user has already generated
    const anonCount = await redis.get(`generation_count:${key}`) || 0
    if (anonCount && parseInt(anonCount) > 0) {
      return {
        error: "Please sign in to generate more itineraries",
        remaining: 0
      }
    }
  }

  try {
    // Check rate limit before proceeding
    const result = await rateLimit(key)
    
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