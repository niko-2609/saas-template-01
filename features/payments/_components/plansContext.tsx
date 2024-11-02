/* eslint-disable @typescript-eslint/no-explicit-any */
// features/payments/context/PlansContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getPlans } from '@/features/payments/server/plans';

const PlansContext = createContext(null);

export const PlansProvider = ({ children }: {children: React.ReactNode}) => {
    const [plans, setPlans] = useState<any>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await getPlans();
            setPlans([...data]);  // Force new array reference.
        };
        fetchPlans();
    }, []);

    return (
        <PlansContext.Provider value={plans}>
            {children}
        </PlansContext.Provider>
    );
};

export const usePlans = () => useContext(PlansContext);