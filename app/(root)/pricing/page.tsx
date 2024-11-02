/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/pricing.js
"use client"

// useEffect
import { useState } from 'react';
import PlanCard from '@/features/payments/_components/planCard';
import { usePlans } from '@/features/payments/_components/plansContext';

export default function Pricing() {
  

  // DUMMY DATA
//   const plans = [
//     {
//         id: "basic",
//         name: "Basic Plan",
//         item: {
//             amount: 5000,
//             notes: { note1: "Feature 1", note2: "Feature 2" }
//         },
//         description: "An affordable plan"
//     },
//     {
//         id: "premium",
//         name: "Premium Plan",
//         item: {
//             amount: 15000,
//             notes: { note1: "Premium Feature 1", note2: "Premium Feature 2" }
//         },
//         description: "A premium plan with extra features"
//     }
// ];
  const plans: any = usePlans();
  const [selectedCard, setSelectedCard] = useState<string | null>(process.env.NEXT_PUBLIC_DEFAULT_PLAN_ID ? process.env.NEXT_PUBLIC_DEFAULT_PLAN_ID : null);
  const handleSelect = (planId: any) => {
    console.log("SELECTED PLAN ID", planId);

      if (selectedCard === planId) {
          console.log('Proceeding with payment for plan:', planId);
          // Add your payment logic here, for example:
          // initiatePayment(plan);

          // Call subscription server action.
      } 
      if (selectedCard !== planId) {
        setSelectedCard((prev) => (prev === planId ? null : planId)); // Only set if it's a new selection
    }
  };

  
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
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
      {plans?.map((plan: any) => <PlanCard key={plan.id} plan={plan} handleSelect={handleSelect} selectedCard={selectedCard}/> )}
      </div>
    </div>
  );
}
