/* eslint-disable @typescript-eslint/no-explicit-any */
// app/pricing/layout.tsx

import { PlansProvider } from "@/features/payments/_components/plansContext";


export default function PricingLayout({ children }: { children : any}) {
    return <PlansProvider>{children}</PlansProvider>;
}