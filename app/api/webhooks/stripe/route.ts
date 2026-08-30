// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { transporter } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if(orderId){
      const updateOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID'},
        include: {orderItems: {include: { product: true }}},
      });

      if(session.customer_details?.email){
        await transporter.sendMail({
          from: `"DRIP Store <${process.env.SMTP_USER}>"`,
          to: session.customer_details.email,
          subject: `Order Confirmed - #${updateOrder.id}`,
          html: `
            <h2>Thank you for your order!</h2>
            <p>Your order ID is <strong>${updateOrder.id}</strong>.</p>
            <p>Total Paid: ₹${Number(updateOrder.total || 0).toLocaleString("en-IN")}</p>
          `,
            });
      }
    }
  }

  return NextResponse.json({ received: true });
}