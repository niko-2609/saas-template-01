'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscriptionStatus() {
  const [status, setStatus] = useState<'active' | 'paused' | 'cancelled'>('active')

  const handlePause = () => setStatus('paused')
  const handleResume = () => setStatus('active')
  const handleCancel = () => setStatus('cancelled')

  return (
    <Card className="border-[#019992] border-2">
      <CardHeader className="bg-[#019992] text-white">
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription className="text-gray-100">Manage your TravelAI subscription here</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-lg font-semibold text-[#019992]">
          Status: <span className={`${status === 'active' ? 'text-[#44ee77]' : status === 'paused' ? 'text-[#ffb001]' : 'text-[#fb475e]'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4">
        {status === 'active' && (
          <Button onClick={handlePause} className="bg-[#ffb001] text-white hover:bg-[#ffb001]/90">
            Pause Subscription
          </Button>
        )}
        {status === 'paused' && (
          <Button onClick={handleResume} className="bg-[#44ee77] text-white hover:bg-[#44ee77]/90">
            Resume Subscription
          </Button>
        )}
        {status !== 'cancelled' && (
          <Button onClick={handleCancel} variant="destructive" className="bg-[#fb475e] hover:bg-[#fb475e]/90">
            Cancel Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

