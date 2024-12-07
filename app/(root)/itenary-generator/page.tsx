"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useRouter } from "next/navigation"
import { protectedAction } from "@/features/itenary-generator/server/rateLimitAction"
import { useSession } from "next-auth/react"
import { useState } from "react"
import GeneratorForm from "@/features/itenary-generator/_components/itinerary-form"

export default function ItineraryGeneratorPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)

  const checkRateLimit = async () => {
    if (!session?.user?.id) {
      setError("Please sign in to generate itineraries")
      return
    }

    const result = await protectedAction(session.user.id)
    
    if (result.error) {
      setError(result.error)
    } else {
      setError(null)
      // Here you'll integrate your form logic later
      console.log("Remaining queries:", result.remaining)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Your Perfect Itinerary</CardTitle>
        <CardDescription className="text-lg">
          Let us help you plan your next adventure with personalized recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <GeneratorForm />
      </CardContent>
    </Card>
  </div>
  )
}