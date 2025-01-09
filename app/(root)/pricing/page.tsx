/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/pricing.js
"use client"

import { useState, useEffect } from 'react';
import PlanCard from '@/features/payments/_components/planCard';
import { usePlans } from '@/features/payments/_components/plansContext';
import Script from 'next/script';
import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/features/store/hooks";
import { 
  initiateSubscription, 
  verifyPayment, 
  resetPaymentState 
} from "@/features/store/slices/paymentSlice";
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle } from 'lucide-react';
import { PricingCardSkeleton } from "@/features/payments/_components/pricing-card-skeleton";
import { useSubscription } from '@/features/payments/context/subscriptionContext'
import { toast } from "sonner"

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export default function Pricing() {
  const router = useRouter();
  const { plans, isLoading: plansLoading } = usePlans();
  const { data: session, status } = useSession()
  const [selectedCard, setSelectedCard] = useState<string | null>(
    process.env.NEXT_PUBLIC_DEFAULT_PLAN_ID ?? null
  );
  const dispatch = useAppDispatch();
  const { 
    isProcessing, 
    error: paymentError, 
    paymentStatus 
  } = useAppSelector((state) => state.payment);
  const { isSubscribed, subscriptionId } = useSubscription()

  useEffect(() => {
    // Reset payment state when component mounts
    dispatch(resetPaymentState());
  }, [dispatch]);

  useEffect(() => {
    // Handle payment status changes
    if (paymentStatus === 'success') {
      router.push('/payment/success');
    }
  }, [paymentStatus, router]);

  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError, {
        duration: 5000,
        onAutoClose: () => dispatch(resetPaymentState())
      });
    }
  }, [paymentError, dispatch]);

  const handleSelect = async (planId: string) => {
    if (status !== "authenticated") {
      router.push('/sign-in');
      return;
    }

    if (selectedCard === planId) {
      await proceedWithSubscription(session?.user?.id, planId);
    } else {
      setSelectedCard(planId);
    }
  };

  const proceedWithSubscription = async (userId: string | undefined, planId: string) => {
    if (!userId) return;
    console.log("Proceeding with Subscription....")
    try {
      console.log("Initiating Subscription....")
      const result = await dispatch(initiateSubscription({ userId, planId })).unwrap();
      console.log("Subscription Result", result?.subscriptionId)
      // Only proceed with Razorpay if we have a valid subscription ID
      if (result?.subscriptionId) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          subscription_id: result?.subscriptionId,
          description: "Monthly Plan Subscription",
          handler: async (response: PaymentResponse) => {
            console.log("RESPONSE", response)
            try {
              await dispatch(verifyPayment({
                userId,
                paymentId: response.razorpay_payment_id,
                subscriptionId: result.subscriptionId,
                signature: response.razorpay_signature,
                razorpaySubscriptionId: response.razorpay_subscription_id
              })).unwrap();
              
              // Only redirect on successful payment
              router.push('/payment/success');
            } catch (error) {
              console.error('Payment verification failed:', error);
              // Stay on page and show error
            }
          },
          prefill: { // prefill is recommended, it auto-fills customer contact information, specially thier phone number.
            name: "John Doe",
            email: "johndoe@example.com",
            contact: "9119758507", // Provide customer's phone number for better conversion rates
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error: any) {
      // The error is already handled by the slice's rejected case
      console.error('Payment initiation failed:', error);
    }
  };

  const renderPlanCard = (plan: any) => {
    const isCurrentPlan = isSubscribed && plan.id === subscriptionId
    
    return (
      <PlanCard 
        key={plan.id} 
        plan={plan} 
        handleSelect={handleSelect} 
        selectedCard={selectedCard}
        disabled={isCurrentPlan}
        isCurrentPlan={isCurrentPlan}
      />
    )
  }

  const renderContent = () => {
    if (plansLoading) {
      return (
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch bg-gray-50">
          <PricingCardSkeleton />
          <PricingCardSkeleton />
        </div>
      );
    }

    if (!plans?.length) {
      return (
        <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
          No plans available at the moment.
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {plans.map(renderPlanCard)}
      </div>
    );
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow max-w-4xl mx-auto p-6 space-y-8">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />

        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
              <Spinner size="lg" className="text-[#019992]" />
              <p className="mt-4 text-lg font-medium">Processing your payment...</p>
            </div>
          </div>
        )}

        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold text-[#019992]">Pricing</h1>
          <h2 className="text-4xl font-bold text-gray-800">Choose the right plan for you</h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Choose an affordable plan that&apos;s packed with the best features for engaging your audience,
            creating customer loyalty, and driving sales.
          </p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
