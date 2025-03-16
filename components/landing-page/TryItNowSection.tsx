"use client"

import { useState } from "react"
import  GeneratorForm  from "@/features/itenary-generator/_components/generator-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { generateItinerary } from "@/features/itenary-generator/server/generateItinerary"
import { toast } from "sonner"

export default function TryItNowSection() {
  const [hasGenerated, setHasGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleGeneration = async (formData: unknown) => {
    if (hasGenerated && !session) {
      router.push('/sign-in')
      return
    }
    
    try {
      setIsGenerating(true)
      const response = await generateItinerary(formData)
      
      if (response.error) {
        if (response.status === 429) {
          // Rate limit exceeded - prompt to sign in
          toast.error(response.error)
          router.push('/sign-in')
          return
        }
        throw new Error(response.error)
      }

      // Handle successful generation
      setHasGenerated(true)
      return response.output

    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Try It Now - Free!
        </h2>
        <p className="text-center mb-8">
          Generate your first itinerary without signing up
        </p>
        <GeneratorForm />
        {hasGenerated && !session && (
          <div className="mt-8 text-center">
            <p className="text-lg mb-4">
              Want to generate more itineraries? Sign up now!
            </p>
            <Button 
              onClick={() => router.push('/sign-in')}
              className="bg-[#019992] hover:bg-[#019992]/90"
            >
              Sign Up to Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 