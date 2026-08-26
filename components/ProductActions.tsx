"use client";

import { useState } from "react";
import { useCart } from "@/store/useCart";

const SIZES = ["S", "M", "L", "XL"];

type ProductActionsProps = {
    product: {
        id: string;
        name: string;
        price: string;
        images: string[];
        stock: number;
    };
};

export default function ProductActions({ product }: ProductActionsProps){
    const [selectedSize, setSelectedSize] = useState("M");
    const addItem = useCart((state) => state.addItem);

    const handleAddToCart = () =>{
        addItem({
            id: `${product.id}-${selectedSize}`,
            name: `${product.name} (${selectedSize})`,
            price: product.price,
            image: product.images[0] || "/placeholder.jpg",
        });
    };

    return(
        <div className="space-y-6">
            <div>
                <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Select Size
                </label>
                <div className="flex gap-3">
                    {SIZES.map((size) =>(
                        <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-bold transition ${
                            selectedSize === size
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-neutral-900 text-neutral-400 hover:border-white/30 hover:text-white"
                        }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add to Cart button  */}
            <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500"
            >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    )
}