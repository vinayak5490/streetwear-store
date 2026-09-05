// app/products/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // Revalidate every 60 seconds

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;

  // Filter by category if query param exists (e.g. /products?category=hoodies)
  const products = await prisma.product.findMany({
    where: category ? { category: category.toLowerCase() } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            {category ? `${category} Collection` : "All Products"}
          </h1>
          <p className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            {products.length} {products.length === 1 ? "Item" : "Items"} Available
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {["All", "hoodies", "tshirts", "pants", "accessories"].map((cat) => {
            const isActive =
              (!category && cat === "All") ||
              category?.toLowerCase() === cat.toLowerCase();

            return (
              <Link
                key={cat}
                href={cat === "All" ? "/products" : `/products?category=${cat}`}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-white text-black"
                    : "border border-white/20 text-neutral-400 hover:border-white hover:text-white"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-semibold uppercase text-neutral-500">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/5">
                  <Image
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wide group-hover:text-neutral-300">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500 capitalize">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-black">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}