import { NextResponse } from 'next/server'
import { db } from "@/features/db/db"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await db.user.update({
      where: { id: userId },
      data: { hasCompletedOnboarding: true }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error completing onboarding:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 