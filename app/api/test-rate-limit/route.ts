import { NextRequest, NextResponse } from 'next/server'
import { protectedAction } from '@/features/itenary-generator/server/rateLimitAction'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    const results = []
    
    // Test multiple requests
    for (let i = 0; i < body.numberOfRequests; i++) {
      try {
        const result = await protectedAction(userId)
        if (result?.error) {
          results.push({error: result?.error, remaining: result?.remaining})
        } else {
          results.push({data: result?.data, remaining: result?.remaining})
        }
      } catch (error) {
        results.push({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 