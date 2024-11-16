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
        <Card
            className={`w-full md:w-[45%] transform transition-all duration-100 ${isSelected ? 'card-selected' : 'card-unselected'} bg-slate-800`}
        >
            <CardHeader className='text-white'>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <CardTitle className="text-2xl font-semibold">Rs. {plan?.item?.amount / 100} / month</CardTitle>
                <CardDescription className="text-muted-foreground">
                    {plan.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-white">
                <ul className="space-y-2">
                    {plan?.item?.notes?.map(([key, feature]: [string, string]) => (
                        <li key={key}>✔️ {`${feature} ${key}`}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => handleSelect(plan?.id)}
                >
                    {isSelected ? 'Proceed to Payment' : 'Select Plan'}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default PlanCard
