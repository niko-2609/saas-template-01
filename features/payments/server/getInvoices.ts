'use server'


interface Invoice {
  id: string
  subscription_id: string
  payment_id: string
  status: string
  amount: number
  amount_paid: number
  issued_at: number
  paid_at: number
  currency: string
  billing_start: number
  billing_end: number
}

export async function getInvoices(subscriptionId: string) {
  if (!subscriptionId) {
    return { error: "Invalid subscription ID" }
  }

  try {
    const authToken = btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`)
    const response = await fetch(
      `https://api.razorpay.com/v1/invoices?subscription_id=${subscriptionId}`,
      {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    if (data.error) {
      return { 
        error: data.error.description || "Failed to fetch invoices",
        code: data.error.code 
      }
    }

    return {
      success: true,
      invoices: data.items.map((invoice: Invoice) => ({
        id: invoice.id,
        subscription_id: invoice.subscription_id,
        payment_id: invoice.payment_id,
        status: invoice.status,
        amount: invoice.amount / 100, // Convert from paise to rupees
        amount_paid: invoice.amount_paid / 100,
        issued_at: invoice.issued_at,
        paid_at: invoice.paid_at,
        currency: invoice.currency,
        billing_start: invoice.billing_start,
        billing_end: invoice.billing_end
      }))
    }
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return { 
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
} 