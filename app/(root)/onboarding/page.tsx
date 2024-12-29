'use client'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Welcome from '@/features/onboarding/_components/Welcome'
import HowItWorks from '@/features/onboarding/_components/HowItWorks'
import AIExplanation from '@/features/onboarding/_components/AIExplanation'
import GetStarted from '@/features/onboarding/_components/GetStarted'

const steps = ['Welcome', 'How It Works', 'AI-Powered', 'Get Started']

export default function OnboardingSlider() {
  const [currentStep, setCurrentStep] = useState(0)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/user/onboarding-status?userId=${session.user.id}`)
          const data = await response.json()
          
          if (data.hasCompletedOnboarding) {
            router.replace('/dashboard')
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error)
        }
      }
    }

    if (status === 'unauthenticated') {
      router.replace('/sign-in')
    }
    
    // Only check onboarding status if user is authenticated
    if (status === 'authenticated') {
      checkOnboardingStatus()
    }
  }, [status, router, session])

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      // Mark onboarding as complete when user finishes
      completeOnboarding()
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const completeOnboarding = async () => {
    if (session?.user?.id) {
      try {
        await fetch('/api/user/complete-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: session.user.id }),
        })
        router.push('/dashboard') // or wherever you want to redirect after onboarding
      } catch (error) {
        console.error('Error completing onboarding:', error)
      }
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Welcome />
      case 1:
        return <HowItWorks />
      case 2:
        return <AIExplanation />
      case 3:
        return <GetStarted />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange to-blueGreen flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-4 bg-gray-200" />
        <h2 className="text-2xl font-bold text-blueGreen mb-4">{steps[currentStep]}</h2>
        {renderStep()}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="border-blueGreen text-blueGreen hover:bg-blueGreen hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-blueGreen text-white hover:bg-opacity-90"
          >
            {currentStep === steps.length - 2 ? 'Finish' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

