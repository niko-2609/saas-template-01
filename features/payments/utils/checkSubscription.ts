import { db } from "@/features/db/db"

export const checkSubscriptionStatus = async (userId: string) => {
  try {
    const subscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        status: "active"
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      isSubscribed: !!subscription,
      subscriptionId: subscription?.subId
    }
  } catch (error) {
    console.error("Error checking subscription:", error)
    return {
      isSubscribed: false,
      subscriptionId: null
    }
  }
} 