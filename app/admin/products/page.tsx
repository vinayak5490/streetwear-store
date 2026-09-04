// app/admin/products/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductPage(){
    const products = await prisma.product.findMany({
        orderBy: {createdAt: "desc"},
    });


    return(
        <main className="min-h-screen bg-black px-6 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">
                            Product Management
                        </h1>
                        <p className="mt-1 text-xs text-neutral-500 uppercase tracking-widest">
                            {products.length} Products Available
                        </p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
                    >
                    + Add Product
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950 p-6">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-xs font-semibold uppercase text-neutral-500">
                                <th className="pb-4">Image</th>
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Stock</th>
                                <th className="pb-4">Price</th>
                                <th className="pb-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5">
                                    <td className="py-4">
                                        <img src={product.images[0]} alt={product.name} 
                                        className="h-12 w-10 rounded-lg object-cover bg-neutral-900"
                                        />
                                    </td>
                                    <td className="py-4 font-bold">
                                        {product.name}
                                    </td>
                                    <td className="py-4 text-neutral-400 capitalize">
                                        {product.category}
                                    </td>
                                    <td className="py-4 font-mono">
                                        {product.stock}
                                    </td>
                                    <td className="py-4 font-bold">
                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-14 text-right">
                                        <DeleteProductButton id={product.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    )
}