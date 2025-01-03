'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { checkSubscriptionStatus } from '@/features/payments/utils/checkSubscription'

interface SubscriptionContextType {
  isSubscribed: boolean
  subscriptionId: string | null | undefined
  status: string | null | undefined
  isLoading: boolean
  refreshStatus: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  subscriptionId: null,
  status: null,
  isLoading: true,
  refreshStatus: async () => {}
})

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status: sessionStatus } = useSession()
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
  const [subscriptionId, setSubscriptionId] = useState<string | null | undefined>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionContextType['status']>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkStatus = useCallback(async () => {
    if (sessionStatus === 'loading') {
      return // Don't check until session is ready
    }

    if (!session?.user?.id) {
      setIsSubscribed(false)
      setSubscriptionId(null)
      setIsLoading(false)
      return
    }

    try {
      const status = await checkSubscriptionStatus(session.user.id)
      setIsSubscribed(!!status?.isSubscribed)
      setSubscriptionId(status?.subscriptionId)
      setSubscriptionStatus(status?.status)
    } catch (error) {
      console.error('Error checking subscription status:', error)
      setIsSubscribed(false)
      setSubscriptionId(null)
      setSubscriptionStatus(null)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id, sessionStatus])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // Treat null isSubscribed as loading state
  const effectiveIsLoading = isLoading || isSubscribed === null

  return (
    <SubscriptionContext.Provider value={{ 
      isSubscribed: !!isSubscribed, 
      subscriptionId, 
      status: subscriptionStatus,
      isLoading: effectiveIsLoading,
      refreshStatus: checkStatus
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => useContext(SubscriptionContext) 