// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCart((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-[-0.08em]">
            DRIP <span className="text-neutral-500">.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-400 md:flex">
            <Link href="/products" className="transition-colors hover:text-white">Shop</Link>
            <Link href="/products" className="transition-colors hover:text-white">Collections</Link>
            <Link href="/" className="transition-colors hover:text-white">About</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping cart"
              className="relative rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-white/30"
            >
              Cart
              <span className="ml-2 font-bold text-white">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}