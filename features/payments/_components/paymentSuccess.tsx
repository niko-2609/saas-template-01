/* eslint-disable @typescript-eslint/no-explicit-any */
// PaymentStatus.js
"use client"

import '@/features/payments/_components/styles.css';
// PaymentStatus.js
import { CheckCircle2Icon, HomeIcon } from "lucide-react"
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';
import Link from 'next/link';




export default function PaymentStatus({ isSuccess }: any) {
    const [ confettiRun, setConfettiRun] = useState<any>(null)
    const [ confettiPieces, setConfettiPieces ] = useState<any>(100)

    useEffect(() => {
        setConfettiRun(true)
        setTimeout(() => {
            setConfettiPieces(0)
        },5000)
        return () => {
        setConfettiRun(false)
        }
    },[])

    return (
        <div className="w-full max-w-3xl">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={confettiPieces}
                run={confettiRun}
            />
            {/* <div className="bg-white shadow-lg p-10 rounded-lg flex items-center justify-between z-10">
                <div className="text-left">
                    <h1 className="text-4xl font-semibold" style={{ color: 'green' }}>
                        {isSuccess ? 'Congratulations!!!' : 'Oops!'}
                    </h1>
                    <p className="text-3xl mt-6 font-semibold tracking-wide">
                        {isSuccess ? 'Your subscription is now active' : 'Payment failed'}
                    </p>
                </div>
                <div>
                    <CheckCircle2Icon style={{ color: "green" }} height={80} width={80} />
                </div>
            </div> */}
            <div
        className="bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#ffb001] to-[#fb475e] p-6">
          <div
            className="flex items-center justify-center mb-4"
          >
            <CheckCircle2Icon className="h-20 w-20" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            Congratulations!
          </h1>
          <p className="text-xl text-center">
            Your subscription is now active
          </p>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#019992]">Subscription Details</h2>
          <div className="space-y-2 text-gray-600">
            <p><strong>Plan:</strong> Premium</p>
            <p><strong>Billing Cycle:</strong> Monthly</p>
            <p><strong>Next Billing Date:</strong> June 1, 2023</p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 bg-[#44ee77] text-white rounded-md hover:bg-[#019992] transition-colors duration-200">
              <HomeIcon className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
}
