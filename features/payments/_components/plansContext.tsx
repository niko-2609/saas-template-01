/* eslint-disable @typescript-eslint/no-explicit-any */
// features/payments/context/PlansContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { getPlans } from '@/features/payments/server/plans';

interface PlansContextType {
  plans: any[];
  isLoading: boolean;
  error: string | null;
}

const PlansContext = createContext<PlansContextType>({
  plans: [],
  isLoading: true,
  error: null
});

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const data = await getPlans();
        setPlans([...data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load plans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <PlansContext.Provider value={{ plans, isLoading, error }}>
      {children}
    </PlansContext.Provider>
  );
}

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};