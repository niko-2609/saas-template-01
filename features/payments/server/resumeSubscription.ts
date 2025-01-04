'use server'

import { db } from "@/features/db/db"
import { redis } from "@/utils/redis"
import { checkSubscriptionStatus } from '@/features/payments/utils/checkSubscription'

type SubscriptionStatus = 'created' | 'active' | 'completed' | 'expired' | 'paused' | 'cancelled' | 'halted' | 'pending';

const RATE_LIMIT_KEY = (userId: string) => `resume_subscription:${userId}:attempts`
const RATE_LIMIT_DURATION = 60 * 60 // 1 hour in seconds
const MAX_ATTEMPTS = 3

export async function resumeSubscription(userId: string, subscriptionId: string) {
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

    // Check subscription status using existing function
    const { subscriptionId: currentSubId, status: currentStatus } = await checkSubscriptionStatus(userId)

    if (currentStatus !== 'paused' || currentSubId !== subscriptionId) {
      return { error: "No paused subscription found" }
    }

    // Call Razorpay API to resume subscription
    const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`)
    const response = await fetch(
      `https://api.razorpay.com/v1/subscriptions/${subscriptionId}/resume`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resume_at: "now" })
      }
    )

    const data = await response.json()

    if (data.error) {
      return { 
        error: data.error.description || "Failed to resume subscription",
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
        warning: "Subscription resumed but database update failed. Please refresh.",
        status: razorpayStatus
      }
    }

    return { 
      success: true, 
      status: razorpayStatus,
      message: "Subscription resumed successfully"
    }

  } catch (error) {
    console.error("Error resuming subscription:", error)
    return { 
      error: error instanceof Error ? error.message : "An unknown error occurred",
      status: 'error'
    }
  }
} 