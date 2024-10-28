/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/pricing.js
"use client"

import { useEffect, useState } from 'react';
import { getPlans } from '@/features/payments/server/plans';
import PlanCard from '@/features/payments/_components/planCard';

export default function Pricing() {
  
  const [plans, setPlans] = useState<any>([])
  const [selectedCard, setSelectedCard] = useState('standard');
  const handleSelect = (planType: any) => {
      if (selectedCard === planType) {
          console.log('Proceeding with payment for plan:', planType);
          // Add your payment logic here, for example:
          // initiatePayment(plan);
      } else {
          setSelectedCard(planType);
      }
  };

  useEffect(() => {
    const getAllPlans = async () => {
      const plans = await getPlans();
      setPlans(plans)
    }
    getAllPlans();
  }, []) 
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
        {/* Basic Plan Card */}
      {plans.map((plan: any) => <PlanCard key={plan.id} plan={plan} handleSelect={handleSelect} selectedCard={selectedCard}/> )}

        {/* Pro Plan Card */}
        {/* <Card
          className={`w-full md:w-[45%] transform transition-all duration-300 ${
            selectedCard === 'pro' ? 'scale-105 z-10 shadow-lg' : 'scale-100'
          }`}
        >
          <CardHeader>
            <h3 className="text-lg font-bold">Pro</h3>
            <CardTitle className="text-2xl font-semibold">$49.99 / month</CardTitle>
            <CardDescription className="text-muted-foreground">
              Perfect for growing businesses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li>✔️ 50 AI Queries / day</li>
              <li>✔️ Priority Support</li>
              <li>✔️ Access to all premium features</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedCard === 'pro' ? 'primary' : 'outline'}
              className="w-full"
              onClick={() => handleSelect('pro')}
            >
              {selectedCard === 'pro' ? 'Proceed to Payment' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}
