'use server'

import { db } from "@/features/db/db"
import { redis } from "@/utils/redis"
import { checkSubscriptionStatus } from "../utils/checkSubscription"

type SubscriptionStatus = 'created' | 'active' | 'completed' | 'expired' | 'paused' | 'cancelled' | 'halted' | 'pending';

const RATE_LIMIT_KEY = (userId: string) => `cancel_subscription:${userId}:attempts`
const RATE_LIMIT_DURATION = 60 * 60 // 1 hour in seconds
const MAX_ATTEMPTS = 3

export async function cancelSubscription(userId: string, subscriptionId: string) {
  if (!userId || !subscriptionId) {
    return { error: "Invalid request parameters" }
  }

  try {
    // Rate limiting check
    const attempts = await redis.incr(RATE_LIMIT_KEY(userId))
    if (attempts === 1) {
      await redis.expire(RATE_LIMIT_KEY(userId), RATE_LIMIT_DURATION)
    }
    
    if (attempts > MAX_ATTEMPTS) {
      return { error: "Too many attempts. Please try again later." }
    }

    // Check subscription exists and belongs to user
    const { isSubscribed, subscriptionId: currentSubId, status: currentStatus } = await checkSubscriptionStatus(userId)
    if (!isSubscribed || currentSubId !== subscriptionId || currentStatus !== 'active') {
      return { error: "No active subscription found" }
    }

    // Call Razorpay API to cancel subscription
    const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`)
    const response = await fetch(
      `https://api.razorpay.com/v1/subscriptions/${subscriptionId}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    if (data.error) {
      return { 
        error: data.error.description || "Failed to cancel subscription",
        code: data.error.code 
      }
    }

    // Validate Razorpay response
    if (!data.status || typeof data.status !== 'string') {
      return { error: "Invalid response from Razorpay" }
    }

    const razorpayStatus = data.status as SubscriptionStatus

    // Update subscription status in database
    try {
      await db.subscription.update({
        where: { 
          subId: subscriptionId
         },
        data: { 
          status: razorpayStatus,
          updatedAt: new Date()
        }
      })
    } catch (dbError) {
      console.error("Database update failed:", dbError)
      return { 
        warning: "Subscription cancelled but database update failed. Please refresh.",
        status: razorpayStatus
      }
    }

    return { 
      success: true, 
      status: razorpayStatus,
      message: "Subscription cancelled successfully"
    }

  } catch (error) {
    console.error("Error cancelling subscription:", error)
    return { 
      error: error instanceof Error ? error.message : "An unknown error occurred",
      status: 'error'
    }
  }
} 