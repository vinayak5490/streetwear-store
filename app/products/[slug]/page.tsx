// app/products/[slug]/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductActions from "@/components/ProductActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return {};

  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at DRIP.`,
    openGraph: {
      images: [product.images[0] || "/placeholder.jpg"],
    },
  };
}
type Params = Promise<{ slug: string }>;

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const formattedProduct = {
    ...product,
    price: Number(product.price),
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-900">
              <img
                src={formattedProduct.images[0] || "/placeholder.jpg"}
                alt={formattedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>
            {formattedProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {formattedProduct.images.map((img, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-xl bg-neutral-900">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Purchase Controls */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {formattedProduct.category}
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                {formattedProduct.name}
              </h1>

              <p className="mt-4 text-2xl font-bold">
                ₹{formattedProduct.price.toLocaleString("en-IN")}
              </p>

              <p className="mt-6 text-base leading-relaxed text-neutral-400">
                {formattedProduct.description}
              </p>
            </div>

            {/* Interactive Size Selector & Add to Cart Action */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <ProductActions product={formattedProduct} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}