import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-neutral-500">
                The collection
              </p>

              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Featured pieces
              </h2>
            </div>

            <a
              href="/products"
              className="hidden text-sm font-medium text-neutral-400 transition hover:text-white sm:block"
            >
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}