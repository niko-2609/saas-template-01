import { checkSubscriptionStatus } from '@/features/payments/utils/checkSubscription'
import { redis } from './redis'


export async function rateLimit(userId: string) {

  if (!redis) {
    throw new Error('Redis client not initialized')
  }

  try {
    const { isSubscribed } = await checkSubscriptionStatus(userId)
    const date = new Date()
    const key = `rate_limit:${userId}:${date.toDateString()}`
    
    // Get current count
    const count = await redis.get<number>(key) || 0
    
    // Set limits based on subscription
    const limit = isSubscribed ? 50 : 10
    
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