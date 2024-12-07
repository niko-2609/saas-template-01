/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import RazorpayError, { RazorpayErrorCode } from '@/features/payments/_components/paymentError'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function PaymentErrorPage({ isErr }: { isErr: RazorpayErrorCode | null }) {
  const [error, setError ] = useState<RazorpayErrorCode | null>(null)
  const searchParams = useSearchParams();
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      // Parse the error to match RazorpayErrorCode type
      const parsedError = errorParam.toUpperCase().replace(/ /g, '_') as RazorpayErrorCode
      setError(parsedError)
    }
  }, [searchParams])
  return (
  
  <div>
    {error && (
        <RazorpayError
        errorCode={error}
        onClose={() => setError(null)}
        className="mb-4"
        customMessage='Something went wrong while processing payment.'
      />
    )}
  </div>
  )
}

export default PaymentErrorPage
