'use client'

import PaymentStatus from '@/features/payments/_components/paymentSuccess'

export default function PaymentSuccessPage() {
  return (
    <div className="">
      <PaymentStatus isSuccess={true} />
    </div>
  )
}
