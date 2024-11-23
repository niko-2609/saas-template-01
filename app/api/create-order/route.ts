/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
// import csrf from 'csrf';
import { getSession } from "next-auth/react";


// create new razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})


// const csrf_secret = process.env.CSRF_SECRET!

// // Initialize CSRF protection
// const csrfProtection = new csrf();

// Initialize new rate limiter
// const createOrderLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // limit each IP to 6 requests per windowMs
//     keyGenerator: (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'default-key',
//     handler: () => {
//         // res.status(429).json({ message: 'Too many requests, please try again later.' });
//         return NextResponse.json({ status: 429, message: "Too many requests, please try again later." });
//     }
// })


// Basic in-memory rate limiter (replace with Redis for production)
// const requestCounts: Record<string, { count: number, timestamp: number }> = {};
// const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
// const RATE_LIMIT_MAX_REQUESTS = 5;





// Call Razorpay create order api (v1/create-order)
export async function POST(req: any) {

    // terminate if request body is empty.
    if (req.body! === null) return NextResponse.json({ status: 400, message: "Bad Request. Try again." });

    // rate limiting
    // add csrf verification

        // Authentication check
        const session = await getSession();
        if (!session) {
            // return res.status(401).json({ message: 'Unauthorized' });
            return NextResponse.json({
                error: "Unauthorized",
                status: 401,
            })
        }

        // get plan id from request body
        const { amount, planId }  = req.body;
        

         // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return NextResponse.json(
            { error: 'Invalid amount' },
            { status: 400 }
        )
    }
        //fetch plan from database
        // TODO: Create getPlanDetails method
        // const plan = getPlanDetails(planId);


        // // if plan not found in db, terminate order creation
        // if(!plan) {
        //     // return res.status(404).json({ message: "Plan not found" });
        //     return NextResponse.json({
        //         error: "Plan not found",
        //         status: 404,
        //     })
        // }

        // console.log(req.body)

        // create order
        try {
            const order = await razorpay.orders.create({
                amount: 100 * 100, // Amount converted to paise
                currency: "INR",
                receipt: `receipt_${Date.now()}_` + Math.random().toString().substring(8),
                notes: { planId } // Random reciept number is generated here.
            })

            console.log("HANDLER FUNCTION", order.id)
            return NextResponse.json({
                order_success: {
                    orderId: order.id,
                    status: 200,
                    order: order
                }
            })
        } catch (error) {
            console.log("Error creating order:", error);
            return NextResponse.json({
                order_failure: {
                    message: "Error creating order",
                    status: 500,
                }
            })
        }
}