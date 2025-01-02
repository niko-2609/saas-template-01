'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { checkSubscriptionStatus } from '@/features/payments/utils/checkSubscription'

interface SubscriptionContextType {
  isSubscribed: boolean
  subscriptionId: string | null | undefined
  isLoading: boolean
  refreshStatus: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  subscriptionId: null,
  isLoading: true,
  refreshStatus: async () => {}
})

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionId, setSubscriptionId] = useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkStatus = useCallback(async () => {
    console.log("Checking subscription status...", session?.user?.id)
    if (session?.user?.id) {
      try {
        const status = await checkSubscriptionStatus(session.user.id)
        console.log("Subscription status result:", status)
        setIsSubscribed(!!status?.isSubscribed)
        setSubscriptionId(status?.subscriptionId)
      } catch (error) {
        console.error('Error checking subscription status:', error)
        setIsSubscribed(false)
        setSubscriptionId(null)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsSubscribed(false)
      setSubscriptionId(null)
      setIsLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <SubscriptionContext.Provider value={{ 
      isSubscribed, 
      subscriptionId, 
      isLoading,
      refreshStatus: checkStatus
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => useContext(SubscriptionContext) 