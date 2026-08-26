// components/CartDrawer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/useCart";
import Link from "next/link";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-out Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black uppercase tracking-tight">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-400 transition hover:text-white"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Cart Line Items */}
            <div className="flex-1 overflow-y-auto py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-neutral-500">
                    Your cart is currently empty.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 rounded-full border border-white/20 px-6 py-2 text-xs font-bold transition hover:border-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b border-white/5 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-16 rounded-xl bg-neutral-900 object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <p className="mt-1 text-xs text-neutral-400">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-neutral-900 text-xs hover:border-white/30"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-neutral-900 text-xs hover:border-white/30"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-neutral-500 transition hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Subtotal & Checkout Action */}
            {items.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <div className="mb-4 flex justify-between text-sm">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="font-bold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full rounded-full bg-white py-4 text-center text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}