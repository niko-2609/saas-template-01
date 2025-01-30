"use server"
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { db } from "@/features/db/db"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { phone, language, username } = await req.json()

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        phone,
        language,
        username,
      },
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error('Error completing onboarding:', error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 