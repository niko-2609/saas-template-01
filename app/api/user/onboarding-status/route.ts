import { auth } from "@/auth"
import { db } from "@/features/db/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the session
    const session = await auth()

    // Check if the user is logged in
    if (!session?.user?.id) {
      // If the user is not logged in, return an error
      return NextResponse.json(
        { isOnboardingComplete: false, error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get the user from the database
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        phone: true,
        language: true,
        username: true,
        onboardingCompleted: true,
      },
    })

    // Check if the user has completed the onboarding process
    const isOnboardingComplete = !!(
      user?.phone && 
      user?.language && 
      user?.username && 
      user?.onboardingCompleted
    )

    // Return the onboarding status
    return NextResponse.json({ isOnboardingComplete })

  } catch (error) {
    console.error('Error checking onboarding status:', error)

    // Return an error if there is an error
    return NextResponse.json(
      { isOnboardingComplete: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}   