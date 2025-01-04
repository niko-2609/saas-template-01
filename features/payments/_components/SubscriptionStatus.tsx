'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSubscription } from '../context/subscriptionContext'
import { pauseSubscription } from '../server/pauseSubscription'
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSession } from 'next-auth/react'
import { resumeSubscription } from '../server/resumeSubscription'

export default function SubscriptionStatus() {
  const { status, subscriptionId, refreshStatus } = useSubscription()
  const [isLoading, setIsLoading] = useState(false)
  const [showPauseDialog, setShowPauseDialog] = useState(false)
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const { data: session } = useSession()
  const userId = session?.user?.id

  const handlePause = async () => {
    if (!userId || !subscriptionId) return

    setIsLoading(true)
    try {
      const result = await pauseSubscription(userId, subscriptionId)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.warning) {
        toast.warning(result.warning)
      }

      if (result.success) {
        toast.success(result.message)
        await refreshStatus()
        
      }
    } catch (error) {
      toast.error(`Failed to pause subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
      setShowPauseDialog(false)
    }
  }

  const handleResume = async () => {
    if (!userId || !subscriptionId) return

    setIsLoading(true)
    try {
      const result = await resumeSubscription(userId, subscriptionId)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.warning) {
        toast.warning(result.warning)
      }

      if (result.success) {
        toast.success(result.message)
        await refreshStatus()
      }
    } catch (error) {
      toast.error(`Failed to resume subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
      setShowResumeDialog(false)
    }
  }

  const displayStatus = isLoading 
    ? 'Processing...' 
    : status 
      ? status.charAt(0).toUpperCase() + status.slice(1) 
      : 'Loading...'

  return (
    <>
      <Card className="border-[#019992] border-2">
        <CardHeader className="bg-[#019992] text-white">
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription className="text-gray-100">
            Manage your TravelAI subscription here
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg font-semibold text-[#019992]">
            Status:{' '}
            <span
              className={`${
                status === 'active'
                  ? 'text-[#44ee77]'
                  : status === 'paused'
                  ? 'text-[#ffb001]'
                  : 'text-[#fb475e]'
              }`}
            >
              {displayStatus}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4">
          {!isLoading && status === 'active' && (
            <Button
              onClick={() => setShowPauseDialog(true)}
              className="bg-[#ffb001] text-white hover:bg-[#ffb001]/90"
              disabled={isLoading}
            >
              Pause Subscription
            </Button>
          )}
          {!isLoading && status === 'paused' && (
            <Button
              onClick={() => setShowResumeDialog(true)}
              className="bg-[#44ee77] text-white hover:bg-[#44ee77]/90"
              disabled={isLoading}
            >
              Resume Subscription
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pause Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to pause your subscription? You can resume it at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePause}
              className="bg-[#ffb001] text-white hover:bg-[#ffb001]/90"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Pause'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resume Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to resume your subscription? You will be charged according to your billing cycle.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResume}
              className="bg-[#44ee77] text-white hover:bg-[#44ee77]/90"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Resume'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

