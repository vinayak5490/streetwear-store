"use client";

import { useEffect } from "react";
import { useCart } from "@/store/useCart";

export default function ClearCart(){
    const clearCart = useCart((state) => state.clearCart);

    useEffect(()=>{
        clearCart();
    }, [clearCart]);

    return null;
}