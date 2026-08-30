import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import ClearCart from "./ClearCart";
import Link from "next/link";
import { notFound } from "next/navigation";

type SearchParams = Promise<{session_id?: string}>;

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) {
    notFound();
  }

    //Query order details using the stripeSessionId
    const order = await prisma.order.findFirst({
        where:{stripeSessionId: session_id},
        include:{
            orderItems:{
                include:{
                    product: true,
                },
            },
        },
    });

    if(!order){
        notFound();
    }

    return(
        <>
        {/* Clears local storage / Zustand cart state on load  */}
        <ClearCart />
        <Navbar />

        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                Payment Confirmed
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Thank you for your order
            </h1>
            <p className="mt-4 text-sm text-neutral-400">
                Order ID: <span className="font-mono text-white">{order.id}</span>
            </p>

            {/* Order Details Table  */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-left">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-400">
                    Order Summary 
                </h2>

                <div className="divide-y divide-white/5">
                    {order.orderItems.map((item)=>(
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-4"
                        >
                            <div className="flex items-center gap-4">
                                <img src={item.product.images[0]} alt={item.product.name}  className="h-14 w-12 rounded-lg bg-neutral-900 object-cover"/>
                                <div>
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-xs text-neutral-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="font-medium">
                                ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                            </p>

                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex justify-between text-base font-bold">
                    <span>Total Paid</span>
                    <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
                </div>
            </div>

            <div className="mt-10">
                <Link
                    href="/"
                    className="inline-block rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
                >
                    Continue Shopping
                </Link>
            </div>
        </main>
        </>
    )
}