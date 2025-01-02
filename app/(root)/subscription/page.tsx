'use client'

import { Button } from "@/components/ui/button"
import SubscriptionStatus from "@/features/payments/_components/SubscriptionStatus"
import TransactionHistory from "@/features/payments/_components/TransactionHistory"
import Link from "next/link"

export default function SubscriptionPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Subscription</h1>
        <Link href="/pricing">
          <Button variant="outline" className="text-[#019992] border-[#019992] hover:bg-[#019992] hover:text-white">
            View Available Plans
          </Button>
        </Link>
      </div>
      
      <div className="space-y-8">
        <SubscriptionStatus />
        <TransactionHistory />
      </div>
    </div>
  )
} 