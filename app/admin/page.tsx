//app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { Parisienne } from "next/font/google";
import Link from "next/link";

export default async function AdminDashboardPage(){
    const [totalOrders, paidOrders, totalRevenue, recentOrders] = await Promise.all([
        prisma.order.count(),
        prisma.order.count({where: {status: "PAID"}}),
        prisma.order.aggregate({
            where: {status: "PAID"},
            _sum: {total: true},
        }),

        prisma.order.findMany({
            orderBy: { createdAt: "desc"},
            take: 5,
            include:{
                orderItems:{
                    include: {product: true},
                },
            },
        }),
    ]);

    const revenueAmount = Number(totalRevenue._sum.total || 0);

    return(
        <main className="min-h-screen bg-black px-6 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-xs text-neutral-500 uppercase tracking-widest">
                            Store Metrics & Orders
                        </p>
                    </div>

                    <Link
                    href="/admin/products"
                    className="rounded-full border border-white/20 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:border-white"
                    >
                        Manage Products
                    </Link>
                </div>

                {/* Analytics stat cards  */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
                    <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Total Revenue
                    </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Pair Orders
                        </p>
                        <p className="mt-3 text-3xl font-black">{paidOrders}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Total Placed
                        </p>
                        <p className="mt-3 text-3xl font-black">{totalOrders}</p>
                    </div>
                </div>

                {/* Recent Orders Table  */}
                <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                    <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-neutral-400">
                        Recent Orders
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-xs font-semibold uppercase text-neutral-500">
                                    <th className="pb-4">Order ID</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4">Items</th>
                                    <th className="pb-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order) =>(
                                    <tr key={order.id} className="hover:bg-white/5">
                                        <td className="py-4 font-mono text-xs">{order.id}</td>
                                        <td className="py-4">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                                    order.status === "PAID"
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-neutral-400">
                                            {order.orderItems.length} item(s)
                                        </td>
                                        <td className="py-4 text-right font-bold">
                                            ₹{Number(order.total || 0).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </main>
    )
}