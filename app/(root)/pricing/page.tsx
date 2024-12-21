/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/pricing.js
"use client"

// useEffect
import { useState } from 'react';
import PlanCard from '@/features/payments/_components/planCard';
import { usePlans } from '@/features/payments/_components/plansContext';
import Script from 'next/script';
import { useSession } from "next-auth/react"
import { activateSubscription, updateSubscriptions } from '@/features/payments/server/subscriptions';
import { useRouter } from 'next/navigation'


export default function Pricing() {

  const router = useRouter();
  const plans: any = usePlans();
  const { data: session, status } = useSession()
  const [selectedCard, setSelectedCard] = useState<string | null>(process.env.NEXT_PUBLIC_DEFAULT_PLAN_ID ? process.env.NEXT_PUBLIC_DEFAULT_PLAN_ID : null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("")
  const handleSelect = (planId: any) => {


    if (status === "authenticated") {
      const userId = session?.user?.id
      console.log("USER ID", userId)
      if (selectedCard === planId) {
        console.log('Proceeding with payment for plan:', planId);
        proceedWithSubscription(userId, planId)
  
  
      }
      if (selectedCard !== planId) {
        setSelectedCard((prev) => (prev === planId ? null : planId)); // Only set if it's a new selection
      }
    } else {
      console.log("USER NOT AUTHENTICATED")
    }
  };

  const proceedWithSubscription = async (userId: string | undefined, planId: string) => {
    // Add your payment logic setError(null);
    setIsProcessing(true);

    // create new subscription and fetch subscription id
    try {
      const data = await activateSubscription(userId, planId);
      //Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data?.id,
        description: "Monthly subscription testing",
        handler: async function (response: any) {
          console.log(response.razorpay_subscription_id, response.razorpay_payment_id, response.razorpay_signature)
          // Update the subscription status in your database
        
          const result = await updateSubscriptions(userId, response.razorpay_payment_id, data?.id, response.razorpay_signature, response.razorpay_subscription_id)

          if (result?.error) {
            router.push('/payment/error');
          }
          router.push('/payment/success')
          /** 
           * Handle successfull payment here
           * We get the following here 
           * 1. razorpay_payment_id
           * 2. razorpay_order_id
           * 3. razorpay_signature
           * 
           * 
           * We need to store these fields in your database along with customer id
           * We can confirm the authenticity of these details by verifying the signature in the next step.
           */
        },
        prefill: { // prefill is recommended, it auto-fills customer contact information, specially thier phone number.
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999", // Provide customer's phone number for better conversion rates
        },
        theme: {
          color: "#3399cc",
        },
      };

      // open razorpay checkout window
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      setError(error);
      router.push(`/payment/error?error=${encodeURIComponent('SERVER_ERROR')}`);
    } finally {
      setIsProcessing(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />


      {/* Loading overlay */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
          <div className="text-white text-lg font-semibold animate-pulse">
            Processing...
          </div>
        </div>
      )}

      {/* Pricing Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold">Pricing</h1>
        <h2 className="text-5xl font-bold">Choose the right plan for you</h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Choose an affordable plan that’s packed with the best features for engaging your audience,
          creating customer loyalty, and driving sales.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {plans?.map((plan: any) => <PlanCard key={plan.id} plan={plan} handleSelect={handleSelect} selectedCard={selectedCard} />)}
      </div>
    </div>
  );
}
