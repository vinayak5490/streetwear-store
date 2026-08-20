import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Drop 01 — 2026
          </p>

          <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[10rem]">
            Wear your
            <br />
            <span className="text-neutral-500">attitude.</span>
          </h1>

          <p className="mt-10 max-w-xl text-base leading-7 text-neutral-400 md:text-lg">
            Minimal streetwear built for people who don't need to follow
            the crowd. Oversized silhouettes, utility pieces and everyday
            essentials.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-neutral-200"
            >
              Shop collection
            </Link>

            <Link
              href="/products"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-bold transition hover:border-white/50"
            >
              Explore pieces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}