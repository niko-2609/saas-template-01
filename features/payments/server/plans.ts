"use server"

import { db } from "@/features/db/db"

export const getPlans = async () => {
    // const plans = await db.plan.findMany();   
    // return plans

    return db.plan.findMany();
}