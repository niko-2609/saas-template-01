"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { protectedAction } from "@/features/itenary-generator/server/rateLimitAction"
import { useSession } from "next-auth/react"
import { useState } from "react"
import GeneratorForm from "@/features/itenary-generator/_components/generator-form"

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
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create Your Perfect Itinerary</CardTitle>
          <CardDescription className="text-md">
            Let us help you plan your next adventure with personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          {/* Placeholder for your future form */}
          <div className="bg-slate-100 p-8 rounded-lg text-left w-full">
            <GeneratorForm />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}