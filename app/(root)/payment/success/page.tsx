'use client'

import PaymentStatus from '@/features/payments/_components/paymentSuccess'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PaymentStatus isSuccess={true} />
    </div>
  )
}
