"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [language, setLanguage] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Async function to check if user has completed onboarding
    const checkOnboardingStatus = async () => {
      // Check if session is loading
      if (status === 'loading') return;

      // Check if user is authenticated
      if (status === 'unauthenticated') {
        router.push('/sign-in')
        return;
      }

      // Check if user has completed onboarding
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/onboarding-status')
          const data = await response.json()
             
          // If user has completed onboarding, redirect to dashboard
          if (data.isOnboardingComplete) {
            router.push('/dashboard')
          } 
        } catch (error) {
          console.error('Error checking onboarding status:', error)
        }
      }
      setIsLoading(false)
      return () => {
        setIsLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [status, router])

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        const response = await fetch('/api/user/complete-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone,
            language,
            username,
          }),
        })

        if (response.ok) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error completing onboarding:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" className="text-[#019992]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#019992] bg-opacity-10 flex items-center justify-center p-4">
      <main className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#019992] mb-6">Welcome Onboard!</h1>
        <div className="space-y-4">
          {step === 1 && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Input
                id="language"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter your preferred language"
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />
            </div>
          )}
          <Button onClick={handleNext} className="w-full bg-[#019992] hover:bg-[#019992]/90">
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-[#ffb001]" : "bg-gray-300"}`} />
          ))}
        </div>
      </main>
    </div>
  )
}

