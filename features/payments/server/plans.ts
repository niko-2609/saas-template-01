/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

// import { db } from "@/features/db/db"



// Fetch plans from Razorpay API
export const getPlans = async () => {
    let plan_ids;
    if (process.env.PLAN_IDS) { 
        plan_ids = process.env.PLAN_IDS.split(',');
    }
    const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`);
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + authToken
        }
    };


    // temporary storage to combine all plans
    const plans: any = [];
    
    // iterate over all plans from the configuration
    for (const id of plan_ids || []) {
    try {
        // fetch the plan details from Razorpay API using the plan ID
        const response = await fetch(`https://api.razorpay.com/v1/plans/${id}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // parse the response JSON 
        const data = await response.json();

        // transform the notes to an array of key-value pairs
        data.item.notes = Object.entries(data?.notes).map(([key, item]) => {

        // transform the key format from "notes_key_1" to "Notes key 1"
        const newKey = key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
        return [newKey, item];  
        });
        plans.push(data);
       
        // await db.collection('plans').insertOne(data);
        
       
        // return combined and formatted plans
    } catch (error: any) {
        console.error("Cannot fetch plans, due to:" , error)
    }
};

return plans;
}