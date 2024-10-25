import { NextResponse } from "next/server";
import Razorpay from "razorpay";


// create new razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// fire Razorpay order API
export async function POST() {
    try {
        const order = await razorpay.orders.create({
            amount: 100 * 100, // Amount converted to paise
            currency: "INR",
            receipt: "receipt_" + Math.random().toString().substring(8) // Random reciept number is generated here.
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