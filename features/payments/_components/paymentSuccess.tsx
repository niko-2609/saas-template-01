/* eslint-disable @typescript-eslint/no-explicit-any */
// PaymentStatus.js
"use client"

import '@/features/payments/_components/styles.css';
import { color } from 'framer-motion';
// PaymentStatus.js
import { CheckCircle2Icon } from "lucide-react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';



export default function PaymentStatus({ isSuccess }: any) {
    const { width, height } = useWindowSize()
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
        <div className="min-h-screen flex flex-col gap-8">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={confettiPieces}
                run={confettiRun}
            />
            <div className="bg-white shadow-lg p-10 rounded-lg flex items-center justify-between z-10">
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
            </div>
            <div className="bg-white shadow-lg p-10 rounded-lg flex items-center justify-between z-10 my-8">
                <p className="text-3xl mt-6 font-semibold tracking-wide">
                    Subscription Details
                </p>
            </div>
        </div>
    );
}
