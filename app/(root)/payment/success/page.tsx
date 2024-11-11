"use client"

import PaymentStatus from '@/features/payments/_components/paymentSuccess'
import React from 'react'

function PaymentSucessPage() {
  return (
    <PaymentStatus isSuccess={true} />
  )
}

export default PaymentSucessPage
