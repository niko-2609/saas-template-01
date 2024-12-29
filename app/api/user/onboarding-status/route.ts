import { NextResponse } from 'next/server'
import { db } from "@/features/db/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { hasCompletedOnboarding: true }
    })

    return NextResponse.json({ 
      hasCompletedOnboarding: user?.hasCompletedOnboarding ?? false 
    })

  } catch (error) {
    console.error('Error checking onboarding status:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 