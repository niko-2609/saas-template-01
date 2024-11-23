" use server"

import crypto from 'crypto';

const secret = process.env.RAZORPAY_KEY_SECRET || "secret"

export const verifySubscription = (razorpay_payment_id: string, subscription_id: string, razorpay_signature: string) => {
    const data = razorpay_payment_id + '|' + subscription_id;
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');

  return generated_signature === razorpay_signature;
 }