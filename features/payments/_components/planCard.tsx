/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import '@/features/payments/_components/styles.css';


function PlanCard({ plan, selectedCard, handleSelect }: { plan: any; selectedCard: string | null; handleSelect: (planId: string) => void; }) {


    useEffect(() => {
        console.log("Selected card changed:", selectedCard);
    }, [selectedCard]);
    const isSelected = selectedCard === plan?.id
    console.log("isSelected for", plan.id, ":", isSelected);
    return (
        // <Card
        //     className={`w-full md:w-[45%] transform transition-all duration-100 ${isSelected ? 'card-selected' : 'card-unselected'} bg-slate-800`}
        // >
        //     <CardHeader className='text-white'>
        //         <h3 className="text-lg font-bold">{plan.name}</h3>
        //         <CardTitle className="text-2xl font-semibold">Rs. {plan?.item?.amount / 100} / month</CardTitle>
        //         <CardDescription className="text-muted-foreground">
        //             {plan.description}
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent className="space-y-4 text-white">
        //         <ul className="space-y-2">
        //             {plan?.item?.notes?.map(([key, feature]: [string, string]) => (
        //                 <li key={key}>✔️ {`${feature} ${key}`}</li>
        //             ))}
        //         </ul>
        //     </CardContent>
        //     <CardFooter>
        //         <Button
        //             variant={isSelected ? 'primary' : 'outline'}
        //             className="w-full"
        //             onClick={() => handleSelect(plan?.id)}
        //         >
        //             {isSelected ? 'Proceed to Payment' : 'Select Plan'}
        //         </Button>
        //     </CardFooter>
        // </Card>

        <Card
        className={`w-full md:w-[45%] transition-all duration-300 ${
          isSelected ? 'border-[#019992] shadow-lg card-selected' : 'border-gray-200 card-unselected'
        }`}
      >
        <CardHeader>
          <h3 className="text-lg font-bold text-[#019992]">{plan.name}</h3>
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Rs. {plan?.item?.amount / 100} <span className="text-base font-normal text-gray-600">/ month</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            {plan.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {plan?.item?.notes?.map(([key, feature]: [string, string]) => (
              <li key={key} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-[#44ee77]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {`${feature} ${key}`}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            variant={isSelected ? 'default' : 'outline'}
            className={`w-full ${
              isSelected 
                ? 'bg-[#019992] text-white hover:bg-[#018880]' 
                : 'text-[#019992] border-[#019992] hover:bg-[#019992] hover:text-white'
            }`}
            onClick={() => handleSelect(plan?.id)}
          >
            {isSelected ? 'Proceed to Payment' : 'Select Plan'}
          </Button>
        </CardFooter>
      </Card>
    )
}

export default PlanCard
