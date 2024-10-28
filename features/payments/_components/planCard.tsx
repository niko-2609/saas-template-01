/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


// interface Plan {
//     type: string;
//     price: number;
//     id: string;
//     features: string[];
//     name: string;
//     description: string;
//     amount: number
// }

function PlanCard({ plan, selectedCard, handleSelect }: { plan: any; selectedCard: string | null; handleSelect: (planType: string) => void; }) {

    const isSelected = selectedCard === plan.type;
    return (
        <Card
            className={`w-full md:w-[45%] transform transition-all duration-300 ${isSelected ? 'scale-105 z-10 shadow-lg' : 'scale-100'
                }`}
        >
            <CardHeader>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <CardTitle className="text-2xl font-semibold">$ {plan.amount.toString()} / month</CardTitle>
                <CardDescription className="text-muted-foreground">
                    {plan.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-2">
                    {plan.features.map((feature:string) => <li key={feature}>✔️ {feature}</li>)}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    variant={isSelected ?  'primary' : 'outline'}
                    className="w-full"
                    onClick={() => handleSelect(plan.type)}
                >
                    {isSelected ? 'Proceed to Payment' : 'Select Plan'}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default PlanCard
