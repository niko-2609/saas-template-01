import PaymentStatus from '@/features/payments/_components/paymentSuccess'
import React from 'react'

function PaymentErrorPage() {
  return (
    <PaymentStatus isSuccess={false} />
  )
}

export default PaymentErrorPage
