import Link from "next/link";

export default function Navbar(){
    return(
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 blackdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Logo  */}
                <Link
                href="/"
                className="text-2xl font-black tracking-[-0.08em]"
                >
                    DRIP <span className="text-neutral-500">.</span>
                </Link>

                {/* Navigation  */}
                <nav  className="hidden items-center gap-8 text-sm font-medium text-neutral-400 md:flex">
                    <Link href="/products" className="transition-colors hover:text-white">Shop</Link>
                    <Link href="/products" className="transition-colors hover: text-white">Collections</Link>
                    <Link href="/" className="transition-colors hover:text-white">About</Link>
                </nav>

                {/* Actions  */}
                <div className="flex items-center gap-4">
                     <button
            aria-label="Search"
            className="hidden text-neutral-400 transition-colors hover:text-white sm:block"
          >
            Search
          </button>
          <button
            aria-label="Shopping cart"
            className="relative rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-white/30"
          >
            Cart
            <span className="ml-2 text-neutral-500">0</span>
          </button>
                </div>
            </div>

        </header>
    )
}