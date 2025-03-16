import { protectedAction } from "@/features/itenary-generator/server/rateLimitAction"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const { tripDetails } = await req.json()

    // Allow one generation for non-authenticated users
    if (!session?.user) {
      const result = await protectedAction(session?.user.id)
      if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 429 })
      }
    }

    // Rest of your generation logic
  } catch (error) {
    // Error handling
  }
} 