import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/app/lib/prisma';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:'2026-07-29.dahlia',
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const cartItems = JSON.parse(session.metadata?.cartItems || '[]');

    // Run order creation and inventory updates in a Prisma Transaction
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerEmail: session.customer_details?.email || session.customer_email!,
          total: (session.amount_total || 0) / 100,
          status: 'PAID',
          stripeSessionId: session.id,
          orderItems: {
            create: cartItems.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        });
      }
    });

    // Dispatch transactional email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: session.customer_details?.email!,
      subject: 'Order Confirmation - DRIP',
      text: `Thank you for your order! Your payment session ID is ${session.id}.`,
    });
  }

  return NextResponse.json({ received: true });
}