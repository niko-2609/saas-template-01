import { auth } from "@/auth"
import { db } from "@/features/db/db"
import { NextResponse } from "next/server"


export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        phone: true,
        language: true,
        username: true,
      },
    })

    const isOnboardingComplete = !!(
      user?.phone && 
      user?.language && 
      user?.username 

    )

    return NextResponse.json({ isOnboardingComplete })
  } catch (error) {
    console.error('Error checking onboarding status:', error)
    return NextResponse.json(
      { error: "Internal Server Error",
        status: 500
       },
    )
  }
} 