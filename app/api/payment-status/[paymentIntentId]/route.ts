import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: "2023-10-16",
  },
)

export async function GET(request: NextRequest, { params }: { params: { paymentIntentId: string } }) {
  try {
    const { paymentIntentId } = params

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment Intent ID is required" }, { status: 400 })
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      created: paymentIntent.created,
    })
  } catch (error) {
    console.error("Error retrieving payment status:", error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: `Stripe error: ${error.message}` }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to retrieve payment status" }, { status: 500 })
  }
}
