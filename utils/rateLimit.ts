import { checkSubscriptionStatus } from '@/features/payments/utils/checkSubscription'
import { redis } from './redis'


export async function rateLimit(userId: string) {
  if (!redis) {
    throw new Error('Redis client not initialized')
  }

  try {
    // Get subscription details including plan info
    const { isSubscribed, subscriptionId, status: subscriptionStatus} = await checkSubscriptionStatus(userId)

    // Get plan details from Razorpay subscription
    let limit = 5 // Default free tier limit

    if (isSubscribed && subscriptionId && subscriptionStatus === 'active') {
      const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`)
      const response = await fetch(
        `https://api.razorpay.com/v1/subscriptions/${subscriptionId}`,
        {
          headers: {
            'Authorization': `Basic ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      
      // Set limits based on plan
      if (data?.plan_id === process.env.RAZORPAY_BASIC_PLAN_ID) {
        limit = 20 // Basic plan limit
      } else if (data?.plan_id === process.env.RAZORPAY_PRO_PLAN_ID) {
        limit = 50 // Pro plan limit
      }
    }

    const date = new Date()
    const key = `rate_limit:${userId}:${date.toDateString()}`
    
    // Get current count
    const count = await redis.get<number>(key) || 0
    
    if (count >= limit) {
      return {
        success: false,
        error: `Daily limit reached. You can generate ${limit} itineraries per day.`,
        remaining: 0,
        total: limit
      }
    }

    // Increment count and set expiry
    await redis.incr(key)
    
    // Set expiry to end of day if not set
    const ttl = await redis.ttl(key)
    if (ttl === -1) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const secondsUntilTomorrow = Math.floor((tomorrow.getTime() - date.getTime()) / 1000)
      await redis.expire(key, secondsUntilTomorrow)
    }

    return {
      success: true,
      remaining: limit - (count + 1),
      total: limit
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    return {
      success: false,
      error: 'Error checking rate limit',
      remaining: 0,
      total: 0
    }
  }
}