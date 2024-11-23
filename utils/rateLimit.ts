import { redis } from './redis'

export async function rateLimit(userId: string) {
  const today = new Date().toISOString().split('T')[0]
  const key = `rateLimit:${userId}:${today}`

  // Get current count for the user
  const count = await redis.get<number>(key) || 0

  if (count >= 10) {
    return {
      error: "Daily query limit reached (10/10)",
      remaining: 0
    }
  }

  // Increment count and set expiry
  await redis.incr(key)

  // Set expiry for 24 hours if not already set
  if (count === 0) {
    await redis.expire(key, 24 * 60 * 60)
  }

  return { remaining: 10 - (count + 1) }
}