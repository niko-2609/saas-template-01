/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { db } from "@/features/db/db"
import { verifySubscription } from "../utils/verifySubscription";

export const activateSubscription = async (userId : any, planId : any) => {
    // get user from db
    const user = await db.user.findUnique({
        where :{ 
            id: userId,
        }
    });

    // return if user not found
    if (!user) {
        throw new Error("User not found");
    }

    // check if user already has a subscription
    const subscription = await db.subscription.findFirst({
        where: {
            userId: userId,
        }
    });

    if (subscription) {
        throw new Error("User already has a subscription");
    }


    const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`);
    const options:any = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plan_id: planId,
            quantity: 1,
            total_count: 12
        })
    }
    // create new subscription
    const newSubscription = await fetch(`https://api.razorpay.com/v1/subscriptions/`, options);
    const data = await newSubscription.json();
    
    if (data?.error) {
        throw new Error(`HTTP error! status: ${data?.error?.code}`);
    }

    return data;
}




// Add subscription to database.
export const updateSubscriptions = async(userId: string | undefined, razorpay_payment_id: string, subscription_id: string, razorpay_signature: string, razorpay_subscription_id: string ) => {
    if (!userId) {
        return { error: "User ID is required" };
    }
    
    const isSuccess = verifySubscription(razorpay_payment_id, subscription_id, razorpay_signature);

    if (!isSuccess) {
        return { error: "Error verifying subscription"};
    }

    const subscription = await db?.subscription?.findFirst({
        where: {
            subId: subscription_id,
        }
    });

    if (!subscription) {
        const newSubscription = await db?.subscription?.create({
            data: {
                subId: subscription_id,
                userId: userId,
                status: "active",
                razorpaySubId: razorpay_subscription_id,
                razorpayPayId: razorpay_payment_id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        console.log(newSubscription)
        return { success: "Subscription added successfully"};
    }
    return { error: "Subscription already exists"};
}



