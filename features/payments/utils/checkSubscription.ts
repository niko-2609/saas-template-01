'use server'

import { db } from "@/features/db/db"

export const checkSubscriptionStatus = async (userId: string) => {
  if (!userId) {
    return {
      isSubscribed: false,
      subscriptionId: null,
      status: null
    }
  }

  try {
    const subscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        status: {
          in: ['active', 'paused', 'cancelled', 'expired', 'pending', 'halted', 'completed']
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        subId: true,
        status: true
      }
    })

    console.log("Found subscription:", subscription) // Debug log

    return {
      isSubscribed: subscription?.status === "active" || subscription?.status === "paused",
      subscriptionId: subscription?.subId || null,  
      status: subscription?.status || null
    }
  } catch (error) {
    console.error("Error in checkSubscriptionStatus:", error)
    return {
      isSubscribed: false,
      subscriptionId: null,
      status: null
    }
  }
} 